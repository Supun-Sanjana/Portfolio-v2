"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Code, Layers, Palette, Rocket, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Laravel",
  "PHP",
  "React Native",
  "Android",
  "MongoDB",
  "PostgreSQL",
  "AI/ML",
  "Node.js",
  "GraphQL",
];

const services = [
  { icon: Code, title: "Web Development", desc: "Modern, scalable web apps" },
  { icon: Layers, title: "Mobile Apps", desc: "Cross-platform solutions" },
  { icon: Palette, title: "UI/UX Design", desc: "Beautiful interfaces" },
  { icon: Rocket, title: "AI Integration", desc: "Smart, AI-powered features" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Mouse tracking for image parallax
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!imageContainerRef.current || !isHoveringImage) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    },
    [isHoveringImage],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Apply 3D tilt effect on image
  useEffect(() => {
    if (imageRef.current && isHoveringImage) {
      gsap.to(imageRef.current, {
        rotateY: mousePos.x * 15,
        rotateX: -mousePos.y * 10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    } else if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mousePos, isHoveringImage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".about-section-label",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating badge animation
      if (floatingBadgeRef.current) {
        gsap.fromTo(
          floatingBadgeRef.current,
          { scale: 0, opacity: 0, rotation: -20 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Continuous floating animation
        gsap.to(floatingBadgeRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });
      }

      // Content reveal with stagger
      gsap.fromTo(
        ".about-content-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Skills with wave effect
      const skillBadges = skillsRef.current?.querySelectorAll(".skill-badge");
      if (skillBadges) {
        gsap.fromTo(
          skillBadges,
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: {
              each: 0.05,
              from: "start",
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Services cards animation
      const serviceCards =
        servicesRef.current?.querySelectorAll(".service-card");
      if (serviceCards) {
        gsap.fromTo(
          serviceCards,
          { y: 60, opacity: 0, rotateX: 20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center bg-white text-black py-24 px-4 overflow-hidden"
      aria-label="About section"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Label */}
        <div className="about-section-label text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs uppercase tracking-[0.2em] rounded-full">
            <Sparkles size={14} />
            About Me
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with 3D effect */}
          <div
            ref={imageContainerRef}
            className="relative"
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <div
              ref={imageRef}
              className="aspect-[4/5] relative overflow-hidden bg-gray-100 rounded-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/placeholder-profile.jpg"
                alt="Supun - Full-Stack Developer"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Shine effect on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ transform: "translateX(-100%) rotate(45deg)" }}
              />
            </div>

            {/* Floating badge */}
            <div
              ref={floatingBadgeRef}
              className="absolute -right-4 top-8 p-4 bg-black text-white rounded-xl shadow-2xl"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="text-3xl font-bold">5+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Years Exp
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 border border-black/20 rounded-2xl -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gray-100 rounded-full -z-10"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="about-content-item">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Crafting Digital
                <br />
                <span className="text-gray-400">Experiences</span>
              </h3>
            </div>

            <div className="about-content-item space-y-4 text-gray-600 leading-relaxed">
              <p>
                I&apos;m a passionate full-stack developer with expertise in
                building modern web and mobile applications. My journey spans
                across various technologies including Next.js, React, Laravel,
                and Android development.
              </p>
              <p>
                I specialize in creating e-commerce platforms, POS systems, and
                integrating AI capabilities into applications. When I&apos;m not
                coding, you&apos;ll find me exploring the cosmos through my
                telescope.
              </p>
            </div>

            {/* Services Grid */}
            <div
              ref={servicesRef}
              className="about-content-item grid grid-cols-2 gap-4"
            >
              {services.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="service-card group p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all duration-500 cursor-default"
                >
                  <Icon
                    size={24}
                    className="mb-2 text-gray-400 group-hover:text-white transition-colors"
                  />
                  <h4 className="font-semibold text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="about-content-item">
              <h4 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
                Tech Stack
              </h4>
              <div ref={skillsRef} className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
