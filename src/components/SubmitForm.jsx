import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertSubmissionSchema } from "../shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Loader2, Heart } from "lucide-react";

export default function SubmitForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      body: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest("POST", "/api/submit-lore", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/submissions'] });
      toast({
        title: "Story submitted successfully!",
        description: "Thank you for sharing your Parisian tale.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your story. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    submitMutation.mutate(data);
  };

  const handleClear = () => {
    form.reset();
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <section id="submit" className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white rounded-2xl shadow-xl">
            <CardContent className="text-center py-16">
              <div className="text-coral mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-2">
                Merci beaucoup!
              </h3>
              <p className="text-charcoal/70 mb-6">
                Your Parisian tale has been received and will be reviewed by our team. Thank you for contributing to the tapestry of Paris stories.
              </p>
              <Button 
                onClick={() => setShowSuccess(false)}
                className="bg-coral text-white px-8 py-3 rounded-full hover:bg-coral/90 transition-all duration-200 font-medium"
              >
                Submit Another Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="submit" className="py-20 bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
            Share Your Parisian Tale
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Have a story about Paris that deserves to be told? Share your experience, memory, or discovery with our community.
          </p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-charcoal font-medium">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all duration-200"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-coral" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-charcoal font-medium">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com" 
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all duration-200"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-coral" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-charcoal font-medium">Story Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Give your story a compelling title" 
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all duration-200"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-coral" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-charcoal font-medium">Your Story</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={8}
                          placeholder="Tell us your Parisian tale... What makes this story special? What emotions, sights, or sounds made this moment memorable?"
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-coral" />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={submitMutation.isPending}
                    className="bg-coral text-white px-8 py-3 rounded-full hover:bg-coral/90 transition-all duration-200 font-medium flex items-center justify-center"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Share Your Story"
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleClear}
                    className="border-charcoal text-charcoal px-8 py-3 rounded-full hover:bg-charcoal hover:text-white transition-all duration-200 font-medium"
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
