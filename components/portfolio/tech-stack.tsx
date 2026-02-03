"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  { name: "Next.js", icon: "N" },
  { name: "React", icon: "R" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "TW" },
  { name: "GSAP", icon: "GS" },
  { name: "Laravel", icon: "La" },
  { name: "PHP", icon: "P" },
  { name: "Java", icon: "Ja" },
  { name: "MongoDB", icon: "Mo" },
  { name: "PostgreSQL", icon: "Pg" },
  { name: "Node.js", icon: "No" },
  { name: "GraphQL", icon: "GQ" },
  { name: "Docker", icon: "Do" },
  { name: "AWS", icon: "AW" },
  { name: "Git", icon: "Gi" },
  { name: "Figma", icon: "Fi" },
]

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".tech-title",
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
        }
      )

      // Marquee animations
      const createMarquee = (ref: HTMLDivElement | null, direction: number) => {
        if (!ref) return
        const items = ref.querySelectorAll(".tech-item")
        
        gsap.fromTo(
          items,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // Infinite scroll
        gsap.to(ref, {
          x: direction * -50 + "%",
          duration: 30,
          ease: "none",
          repeat: -1,
        })
      }

      createMarquee(marqueeRef.current, 1)
      createMarquee(marqueeRef2.current, -1)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const TechItem = ({ name, icon }: { name: string; icon: string }) => (
    <div className="tech-item flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group cursor-default">
      <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-white font-medium whitespace-nowrap">{name}</span>
    </div>
  )

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #111 0%, #1a1a1a 50%, #111 100%)",
      }}
      aria-label="Tech stack section"
    >
      <div className="max-w-7xl mx-auto px-4 w-full mb-16">
        {/* Header */}
        <div className="text-center tech-title">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Technologies
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
            Tools of the Trade
          </h3>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-6">
        {/* Row 1 - Left to Right */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex gap-6" style={{ width: "200%" }}>
            {[...technologies, ...technologies].map((tech, index) => (
              <TechItem key={`${tech.name}-${index}`} {...tech} />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="overflow-hidden">
          <div
            ref={marqueeRef2}
            className="flex gap-6"
            style={{ width: "200%", transform: "translateX(-50%)" }}
          >
            {[...technologies.slice().reverse(), ...technologies.slice().reverse()].map(
              (tech, index) => (
                <TechItem key={`${tech.name}-reverse-${index}`} {...tech} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Additional Skills Grid */}
      <div className="max-w-7xl mx-auto px-4 w-full mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Projects Completed", value: "50+" },
            { label: "Technologies", value: "20+" },
            { label: "Happy Clients", value: "30+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
