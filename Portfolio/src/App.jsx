import React from "react";
import "./App.css";
import Navbar from "./layouts/Navbar";
import { Hero } from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonial from "./sections/Testimonial";
import { Contact } from "./sections/Contact";
import { Footer } from "./layouts/Footer";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
