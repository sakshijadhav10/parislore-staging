import stripe
import os
from flask import Flask, jsonify, request, redirect, render_template, url_for
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
# DOMAIN_URL should be your ngrok URL or public URL when testing webhooks
# For local development where frontend and backend are on the same Flask app,
# we can use url_for for success/cancel URLs.
# However, Stripe needs an absolute URL for success/cancel.
# So, ensure DOMAIN_URL is set correctly, especially for webhook testing.
DOMAIN = os.getenv("DOMAIN_URL", "http://localhost:4242") 

# --- Flask App Initialization ---
# Make sure you have a 'templates' folder in the same directory as this app.py
app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = os.getenv("FLASK_SECRET_KEY", "your_very_secret_flask_key_for_sessions_if_needed")


# --- In-memory "database" for ticket count (for simulation) ---
# In a real application, you would use a proper database and user sessions.
user_ticket_counts = {
    "user123": 0 # Example user, you'd typically get this from a logged-in session
}
# For simplicity, we'll use a fixed user ID. In a real app, integrate Flask-Login or similar.
CURRENT_USER_ID = "user123"

# --- Frontend Routes ---
@app.route('/')
def index():
    """
    Renders the main landing page with the current ticket count.
    """
    # Ensure the user exists in our mock DB, if not, initialize.
    if CURRENT_USER_ID not in user_ticket_counts:
        user_ticket_counts[CURRENT_USER_ID] = 0
    
    ticket_count = user_ticket_counts.get(CURRENT_USER_ID, 0)
    # Pass your Stripe Publishable Key to the template for Stripe.js
    stripe_publishable_key = os.getenv("STRIPE_PUBLISHABLE_KEY") 
    if not stripe_publishable_key:
        app.logger.warning("STRIPE_PUBLISHABLE_KEY is not set. Stripe.js might not initialize correctly on the frontend.")

    return render_template('index.html', ticket_count=ticket_count, stripe_publishable_key=stripe_publishable_key)

@app.route('/payment-success')
def payment_success():
    """
    Renders the payment success page.
    The session_id can be used to retrieve more details if needed.
    """
    session_id = request.args.get('session_id')
    # You could fetch the session from Stripe to display more details:
    # try:
    #     checkout_session = stripe.checkout.Session.retrieve(session_id)
    #     customer_email = checkout_session.customer_details.email
    # except Exception as e:
    #     app.logger.error(f"Error retrieving session {session_id}: {e}")
    #     customer_email = None
    # For now, we'll just pass the ticket count.
    ticket_count = user_ticket_counts.get(CURRENT_USER_ID, 0)
    return render_template('payment_success.html', session_id=session_id, ticket_count=ticket_count)

@app.route('/payment-cancelled')
def payment_cancelled():
    """
    Renders the payment cancellation page.
    """
    return render_template('payment_cancelled.html')

# --- API Endpoint to Create Checkout Session ---
@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    """
    Creates a Stripe Checkout session.
    """
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'inr',
                        'product_data': {
                            'name': 'ParisLore Raffle Ticket',
                            'images': ['https://placehold.co/100x100/E91E63/FFFFFF?text=Ticket'],
                        },
                        'unit_amount': 100,  # Amount in cents (€1.00)
                    },
                    'quantity': 1,
                }
            ],
            mode='payment',
            success_url=DOMAIN + url_for('payment_success', _external=True) + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=DOMAIN + url_for('payment_cancelled', _external=True),
            # If you have user authentication, pass user_id in metadata
            # metadata={
            #     'user_id': CURRENT_USER_ID # Example
            # }
        )
        return jsonify({'sessionId': checkout_session.id})
    except Exception as e:
        app.logger.error(f"Error creating checkout session: {e}")
        return jsonify({'error': str(e)}), 500


# --- API Endpoint for Stripe Webhooks ---
@app.route('/api/stripe-webhook', methods=['POST'])
def stripe_webhook():
    """
    Handles incoming webhooks from Stripe.
    """
    if webhook_secret is None:
        app.logger.error("Stripe webhook secret (STRIPE_WEBHOOK_SECRET) is not configured.")
        # For dev, you might allow it to pass but log a warning. For prod, always require it.
        if os.getenv("FLASK_ENV") == "production":
             return jsonify(success=False, error="Webhook secret not configured"), 500
        else:
            app.logger.warning("Webhook secret not configured. Skipping signature verification (DEV MODE ONLY).")
    
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    event = None

    try:
        # Only verify signature if webhook_secret is set
        if webhook_secret:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        else: # In dev mode without secret, parse the event directly (INSECURE for production)
            event = json.loads(payload)
            app.logger.warning("Parsed webhook event directly without signature verification (DEV MODE).")

    except ValueError as e:
        app.logger.error(f"Webhook ValueError: {e}")
        return jsonify(success=False, error="Invalid payload"), 400
    except stripe.error.SignatureVerificationError as e:
        app.logger.error(f"Webhook SignatureVerificationError: {e}")
        return jsonify(success=False, error="Invalid signature"), 400
    except Exception as e: # Catch other potential errors during construction or parsing
        app.logger.error(f"Webhook construction/parsing error: {e}")
        return jsonify(success=False, error="Webhook processing error"), 500
        
    # Handle the event
    if event and event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        app.logger.info(f"Checkout session completed: {session['id']}")
        
        # Retrieve user_id from metadata if you passed it
        # user_id_from_metadata = session.get('metadata', {}).get('user_id', CURRENT_USER_ID)
        # For this example, we'll stick to the global CURRENT_USER_ID
        user_to_update = CURRENT_USER_ID 

        # Idempotency: Check if this event has been processed
        # You would typically check against a database record of processed event IDs.
        # For simulation, we'll skip this.

        if user_to_update in user_ticket_counts:
            user_ticket_counts[user_to_update] += 1
            new_count = user_ticket_counts[user_to_update]
            app.logger.info(f"Ticket count for {user_to_update} updated to: {new_count}")
            return jsonify(success=True, message="Payment successful, tickets updated.", tickets=new_count)
        else:
            # This case should ideally not happen if user_id comes from a valid session/metadata
            user_ticket_counts[user_to_update] = 1 # Initialize if somehow not present
            app.logger.warning(f"User {user_to_update} not found, initialized ticket count to 1.")
            return jsonify(success=True, message="Payment successful, user initialized and tickets updated.", tickets=1)

    elif event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        app.logger.info(f"PaymentIntent succeeded: {payment_intent['id']}")
        # You might handle other payment-related events here
    
    else:
        if event:
            app.logger.info(f"Unhandled event type {event['type']}")
        else:
            app.logger.error("Event object is None after try-except block in webhook.")


    return jsonify(success=True, received=True)


# --- Main Execution ---
if __name__ == '__main__':
    if not stripe.api_key:
        print("ERROR: Stripe API key not set. Please set the STRIPE_SECRET_KEY environment variable.")
    if not os.getenv("STRIPE_PUBLISHABLE_KEY"):
        print("WARNING: STRIPE_PUBLISHABLE_KEY is not set. Frontend Stripe.js might not work.")
    
    # Note: Webhook secret check is now inside the webhook handler for more context.
    # Ensure your .env file has:
    # STRIPE_SECRET_KEY=sk_test_...
    # STRIPE_PUBLISHABLE_KEY=pk_test_...
    # STRIPE_WEBHOOK_SECRET=whsec_... (get this from Stripe Dashboard after setting up webhook endpoint)
    # DOMAIN_URL=http://your-ngrok-or-public-url (if testing webhooks from external Stripe)
    # FLASK_SECRET_KEY=a_strong_random_string (for session management if you add it)

    app.run(port=4242, debug=True)
