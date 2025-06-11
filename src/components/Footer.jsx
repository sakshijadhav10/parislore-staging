import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId) => {
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
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Paris<span className="text-coral">Lore</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Celebrating the stories, culture, and hidden gems of Paris through the voices of those who live, love, and explore the City of Light.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('stories')}
                  className="text-gray-300 hover:text-coral transition-colors duration-200"
                >
                  All Stories
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                  Contributors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                  About
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('submit')}
                  className="text-gray-300 hover:text-coral transition-colors duration-200"
                >
                  Submit Story
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-coral transition-colors duration-200">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 ParisLore. Made with <span className="text-coral">♥</span> in Paris.
          </p>
        </div>
      </div>
    </footer>
  );
}
