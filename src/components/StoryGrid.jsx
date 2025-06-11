import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function StoryGrid() {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['/api/stories']
  });

  if (isLoading) {
    return (
      <section id="stories" className="py-20 bg-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Stories from the City of Light
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Discover hidden gems, cultural insights, and personal tales that bring Paris to life through the eyes of those who know it best.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full h-48 bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-3 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="stories" className="py-20 bg-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Stories from the City of Light
            </h2>
            <p className="text-lg text-destructive">
              Unable to load stories at this time. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="stories" className="py-20 bg-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
            Stories from the City of Light
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Discover hidden gems, cultural insights, and personal tales that bring Paris to life through the eyes of those who know it best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories && stories.map((story, index) => (
            <article 
              key={story.id} 
              className="story-card bg-white rounded-2xl shadow-lg overflow-hidden relative group" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-3">
                  {story.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>
              <div className="read-more-overlay absolute inset-0 bg-coral/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  className="bg-white text-coral px-6 py-2 rounded-full font-medium hover:bg-ivory transition-colors duration-200"
                  variant="secondary"
                >
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-charcoal text-charcoal px-8 py-3 rounded-full hover:bg-charcoal hover:text-white transition-all duration-200 font-medium"
          >
            Load More Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
