import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-muted shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-playfair text-2xl font-bold text-charcoal">
              Paris<span className="text-coral">Lore</span>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-charcoal hover:text-coral transition-colors duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('stories')}
                className="text-charcoal hover:text-coral transition-colors duration-200 font-medium"
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection('submit')}
                className="text-charcoal hover:text-coral transition-colors duration-200 font-medium"
              >
                Submit
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal hover:text-coral transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-ivory border-t border-muted">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-charcoal hover:text-coral transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('stories')}
              className="block w-full text-left text-charcoal hover:text-coral transition-colors duration-200 font-medium"
            >
              Stories
            </button>
            <button 
              onClick={() => scrollToSection('submit')}
              className="block w-full bg-coral text-white px-6 py-2 rounded-full hover:bg-coral/90 transition-all duration-200 font-medium text-center"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
