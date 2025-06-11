// src/components/CareDuelBanner.tsx
import React from "react";

const CareDuelBanner = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#424242] font-serif">
      {/* Hero Section */}
      <header className="bg-[ivory] py-12 px-4 text-center font-['Playfair_Display']">
        <h1 className="text-4xl font-bold mb-2">Welcome to ParisLore</h1>
        <p className="text-lg">Discover tales, legends & street art from the heart of Paris</p>
      </header>

      {/* CareDuel Banner */}
      <section className="bg-pink-600 text-white text-center py-4 px-6 mx-auto my-6 w-4/5 rounded-lg font-bold animate-fade-in">
        <a
          href="https://careduel.com/topic-of-the-week"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-lg no-underline"
        >
          Topic of the Week
        </a>
      </section>

      {/* Awards Panel */}
      <section className="flex justify-center gap-4 flex-wrap px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 w-52 text-center hover:shadow-lg transition">
          <a
            href="https://top216.com/vote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium"
          >
            Vote Now
          </a>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 w-52 text-center hover:shadow-lg transition">
          <a
            href="https://thetop36.com/highlights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium"
          >
            See Finalists
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareDuelBanner;
