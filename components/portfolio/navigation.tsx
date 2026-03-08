"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, User, FolderOpen, Layers, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Stack", href: "#tech", icon: Layers },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate top nav on load
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Animate bottom nav on load
    gsap.fromTo(
      bottomNavRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 }
    );

    // Progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Active section tracking
    const sections = navItems.map((item) => item.href.replace("#", ""));
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <>
      {/* Top Nav — desktop only */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-white font-bold text-xl tracking-tight hover:text-gray-300 transition-colors"
              aria-label="Go to home"
            >
              Supun
            </button>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`text-sm font-medium transition-all duration-300 relative ${
                      activeSection === item.href.replace("#", "")
                        ? "text-white"
                        : "text-gray-500 hover:text-white"
                    }`}
                    aria-current={
                      activeSection === item.href.replace("#", "")
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                    {activeSection === item.href.replace("#", "") && (
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-white" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="h-px bg-white origin-left"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
      </nav>

      {/* Bottom Nav — mobile only */}
      <div
        ref={bottomNavRef}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center gap-1 px-3 py-3 bg-[#111]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = activeSection === href.replace("#", "");
            return (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                <span
                  className={`text-[10px] font-medium transition-all duration-300 ${
                    isActive ? "opacity-100 max-h-4" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}