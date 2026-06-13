import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navlinks = [
  { href: "about", label: "About" },
  { href: "Project", label: "Projects" },
  { href: "experience", label: "Experience" },
  { href: "testimonial", label: "Testimonial" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on a sub-page (e.g. project detail), go home first then scroll
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  const scrollToContact = () => {
    scrollToSection("contact");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 trasition-all duration-500 ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"}  z-100`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          AS <span className="text-primary">.</span>
        </a>

        {/* desktop view */}

        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navlinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <Button size="sm" onClick={scrollToContact}>Contact Me</Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* for mobile view */}
      {open && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navlinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="text-lg text-muted-foreground hover:text-foreground py-2 text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button size="sm" onClick={scrollToContact}>
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
