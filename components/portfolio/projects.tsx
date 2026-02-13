"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Hotel Management System (MERN) ",
    description:
      "A complete MERN-based hotel management system for managing bookings, rooms, customers, and staff.",
    image: "/placeholder-project-1.jpg",
    tech: ["React", "Express", "Mongo db", "Node js","Tailwind","Vercel", "GitHub Actions"],
    liveUrl: "https://luxesphere.vercel.app",
    githubUrl: "#",
  },
  {
    title: "Client Sync",
    description:
      "CRM application built to help businesses manage clients, projects, and internal operations",
    image: "/placeholder-project-2.jpg",
    tech: ["React", "Express" , "Node.js", "PostgreSQL","Tailwind", "Vercel", "GitHub Actions"],
    liveUrl: "https://client-sync-sig.vercel.app",
    githubUrl: "#",
  },
  {
    title: "NVTI Baddegama Website (Pure PHP)",
    description:
      "An official website developed using pure PHP for the National Vocational Training Authority (NVTI) Baddegama center, providing institutional information, course details, and announcements with a simple and reliable backend.",
    image: "/placeholder-project-3.jpg",
    tech: ["php", "mysql", "Tailwind"],
    liveUrl: "https://zenleaf.nvtibaddegama.site",
    githubUrl: "#",
  },
  {
    title: "ERP System (Next.js)",
    description:
      "A modern internal ERP system built with Next.js to manage company operations, including workflows, data management, and role-based access, optimized for performance and scalability.",
    image: "/placeholder-project-4.jpg",
    tech: ["Next.js", "Tailwind", "Prisma", "PostgreSQL", "Vercel", "GitHub Actions", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Landing page for Plantation Company",
    description:
      "A responsive and SEO-friendly company website developed with Next.js, showcasing services, brand identity, and key information with fast load times and a modern user experience.",
    image: "/placeholder-project-5.jpg",
    tech: ["Next.js", "Tailwind", "gsap", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
  }
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".projects-title",
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

      // Staggered card animations
      const cards = cardsRef.current?.querySelectorAll(".project-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen bg-black text-white py-20 px-4"
      aria-label="Projects section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 projects-title">
          <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Featured Work
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Selected Projects
          </h3>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-card group relative bg-gray-900 rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Fallback placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    aria-label={`View live demo of ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    aria-label={`View source code of ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
