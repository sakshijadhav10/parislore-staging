export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative py-20 lg:py-32 paris-pattern">
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 to-ivory/70"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-charcoal leading-tight mb-6">
              Discover the<br />
              <span className="text-coral">Heart of Paris</span>
            </h2>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              Where locals and visitors share Parisian tales, hidden histories, and cultural insights through photos, videos, poems, and street art. Every corner of Paris has a story waiting to be told.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('stories')}
                className="bg-coral text-white px-8 py-3 rounded-full hover:bg-coral/90 transition-all duration-200 font-medium text-center"
              >
                Explore Stories
              </button>
              <button 
                onClick={() => scrollToSection('submit')}
                className="border border-charcoal text-charcoal px-8 py-3 rounded-full hover:bg-charcoal hover:text-white transition-all duration-200 font-medium text-center"
              >
                Share Your Tale
              </button>
            </div>
          </div>
          <div className="lg:order-first animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://i.pinimg.com/736x/f3/a1/d7/f3a1d764c7013dde3639ea0d58b30b54.jpg" 
              alt="Parisian café scene with outdoor seating" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
