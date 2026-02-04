"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Full-Stack Developer",
  "Software Engineer",
  "UI/UX Designer",
  "Astronomy Enthusiast",
];

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Years Exp" },
  { value: 99.9, suffix: "%", label: "Satisfaction" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  // Mouse tracking for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Typewriter effect
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Animate stats on load
  useEffect(() => {
    stats.forEach((stat, index) => {
      gsap.to(
        {},
        {
          duration: 2,
          delay: 1.5 + index * 0.2,
          ease: "power2.out",
          onUpdate: function () {
            const progress = this.progress();
            setAnimatedStats((prev) => {
              const newStats = [...prev];
              newStats[index] = Number((stat.value * progress).toFixed(1));
              return newStats;
            });
          },
        },
      );
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Staggered text reveal with split effect
      tl.fromTo(
        ".hero-title-line",
        { y: 120, opacity: 0, rotationX: 90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.1,
          delay: 0.2,
        },
      )
        .fromTo(
          ".hero-role",
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          ".hero-tagline",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3",
        )
        .fromTo(
          floatingCardRef.current,
          { x: 100, opacity: 0, scale: 0.8, rotateY: -15 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "back.out(1.2)",
          },
          "-=0.8",
        )
        .fromTo(
          statsCardRef.current,
          { x: -100, opacity: 0, scale: 0.8, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "back.out(1.2)",
          },
          "-=0.8",
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".social-link",
          { y: 20, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
          "-=0.4",
        );

      // Floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((particle, i) => {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          });
          gsap.to(particle, {
            y: "-=100",
            x: `+=${Math.random() * 100 - 50}`,
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }

      // Rotating scroll indicator
      gsap.to(".scroll-circle", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Parallax on scroll
      gsap.to(containerRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Cards parallax on scroll
      gsap.to(floatingCardRef.current, {
        y: -80,
        x: 50,
        rotation: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(statsCardRef.current, {
        y: -60,
        x: -40,
        rotation: -3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    if (floatingCardRef.current) {
      gsap.to(floatingCardRef.current, {
        x: mousePos.x * 30,
        y: mousePos.y * 20,
        rotateY: mousePos.x * 10,
        rotateX: -mousePos.y * 5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (statsCardRef.current) {
      gsap.to(statsCardRef.current, {
        x: mousePos.x * -20,
        y: mousePos.y * -15,
        rotateY: mousePos.x * -8,
        rotateX: -mousePos.y * 4,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mousePos]);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: aboutSection, offsetY: 0 },
        ease: "power3.inOut",
      });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: projectsSection, offsetY: 0 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/50 rounded-full"
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, black 90%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left: Stats Card (glassmorphism) */}
          <div
            ref={statsCardRef}
            className="hidden lg:block w-64 p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              transform: "perspective(1000px)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center text-xs text-white font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-400">30+ Happy Clients</span>
            </div>
            {stats.map((stat, index) => (
              <div key={stat.label} className="mb-4 last:mb-0">
                <div className="text-2xl font-bold text-white">
                  {stat.value % 1 === 0
                    ? Math.floor(animatedStats[index])
                    : animatedStats[index].toFixed(1)}
                  <span className="text-gray-400">{stat.suffix}</span>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Center: Main Content */}
          <div className="text-center flex-1 max-w-3xl">
            <div className="overflow-hidden mb-2">
              <p className="hero-title-line text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                Full-Stack Developer
              </p>
            </div>

            <div className="overflow-hidden">
              <h1 className="hero-title-line text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-2 text-balance">
                Supun
              </h1>
            </div>

            <div className="hero-role h-10 md:h-12 flex items-center justify-center mb-6">
              <span
                className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light"
                aria-live="polite"
              >
                {displayText}
                <span
                  className="animate-pulse ml-1 text-white"
                  aria-hidden="true"
                >
                  |
                </span>
              </span>
            </div>

            <p className="hero-tagline text-sm sm:text-base md:text-lg text-gray-500 max-w-xl mx-auto mb-8 text-pretty">
              Building immersive web & mobile experiences with cutting-edge
              technologies
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={scrollToProjects}
                className="hero-cta group px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
              >
                Explore My Work
                <ArrowDown
                  size={18}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </button>
              <a
                href="#contact"
                className="hero-cta px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/supun-sanjana",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sanjana-supun-b37a952a2",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:infor.ssupun@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Floating Card (glassmorphism) */}
          <div
            ref={floatingCardRef}
            className="hidden lg:block w-72 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              transform: "perspective(1000px)",
            }}
          >
            <div className="aspect-video relative">
              <Image
                src="/placeholder-project-1.jpg"
                alt="Featured project preview"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Latest Project
                </span>
                <h4 className="text-white font-semibold">POS System with AI</h4>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-3">
                Smart inventory management with AI-powered predictions
              </p>
              <div className="flex gap-2">
                {["Next.js", "AI", "Laravel"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToAbout}
          className="relative w-20 h-20 flex items-center justify-center group"
          aria-label="Scroll to about section"
        >
          {/* Rotating text circle */}
          <svg
            className="scroll-circle absolute w-full h-full"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-gray-500 text-[10px] uppercase tracking-[0.3em]">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>
          {/* Center arrow */}
          <ArrowDown
            size={20}
            className="text-white group-hover:translate-y-1 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
