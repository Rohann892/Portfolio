import { Code2, Users, Rocket, Lightbulb } from "lucide-react";
import React from "react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices",
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 ">
        <div className="grid lg:grid-cols-2 gap-16 place-items-center">
          {/* left column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-200 text-secondary-foreground">
              Building the future,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one component at a time
              </span>
            </h2>
            {/* description about your  */}
            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I am a passionate software developer and currently a student at
                Jadavpur University. With a strong foundation in computer
                science and 3 months of professional experience, I am dedicated
                to building modern, user-centric web applications that solve
                real-world problems.
              </p>
              <p>
                During my journey so far, I have been honing my skills in
                frontend technologies like React and Tailwind CSS. I am deeply
                interested in creating seamless digital experiences and am
                always eager to learn new frameworks and best practices to
                improve my craft.
              </p>
              <p>
                My mission is to leverage my academic background and hands-on
                experience to build functional and aesthetically pleasing
                digital products. I believe in continuous learning and am
                excited to contribute to innovative projects while growing as a
                developer.
              </p>
            </div>
            {/* mission */}
            <div className="glass p-6 rounded-2xl border glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "My mission is to create digital experiences that are not just
                functional, but truly delightful — products that users love to
                use and developers love to maintain"
              </p>
            </div>
          </div>
          {/* right columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass p-6 rounded-2xl animate-fade-in
              "
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 b">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
