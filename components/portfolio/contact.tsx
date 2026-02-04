"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".contact-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Black hole parallax effect (subtle warp)
      if (blackHoleRef.current) {
        gsap.to(blackHoleRef.current, {
          scale: 1.5,
          opacity: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // Reset submission state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-white text-black py-20 px-4 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Astronomy Easter Egg - Black Hole Effect */}
      <div
        ref={blackHoleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 0%, transparent 30%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 contact-title">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Get in Touch
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Let&apos;s Work Together
          </h3>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
            I&apos;m always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent rounded-lg text-black placeholder-gray-500 focus:border-black focus:bg-white focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent rounded-lg text-black placeholder-gray-500 focus:border-black focus:bg-white focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent rounded-lg text-black placeholder-gray-500 focus:border-black focus:bg-white focus:outline-none transition-all duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : isSubmitted ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/supun-sanjana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                  aria-label="Visit my GitHub profile"
                >
                  <Github
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanjana-supun-b37a952a2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="mailto:infor.ssupun@gmail.com"
                  className="p-4 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
                  aria-label="Send me an email"
                >
                  <Mail
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                Email
              </h4>
              <a
                href="mailto:infor.ssupun@gmail.com"
                className="text-xl font-medium hover:text-gray-600 transition-colors"
              >
                infor.ssupun@gmail.com
              </a>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                Location
              </h4>
              <p className="text-xl font-medium">Galle, Sri Lanka</p>
              <p className="text-gray-500 mt-1">Available for remote work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
