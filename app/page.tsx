"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Projects } from "@/components/portfolio/projects";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Portfolio() {
  // useEffect(() => {
  //   // Smooth scroll configuration
  //   const sections = document.querySelectorAll("section")

  //   sections.forEach((section) => {
  //     ScrollTrigger.create({
  //       trigger: section,
  //       start: "top top",
  //       end: "bottom top",
  //       snap: {
  //         snapTo: 1,
  //         duration: { min: 0.2, max: 0.6 },
  //         delay: 0.1,
  //         ease: "power1.inOut",
  //       },
  //     })
  //   })

  //   // Respect reduced motion preference
  //   const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  //   if (mediaQuery.matches) {
  //     gsap.globalTimeline.timeScale(0)
  //     ScrollTrigger.getAll().forEach((trigger) => {
  //       trigger.disable()
  //     })
  //   }

  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  //   }
  // }, [])

  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
