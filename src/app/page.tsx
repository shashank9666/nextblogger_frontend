"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function HomePage() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Hero animation with proper cleanup and SSR safeguards
  useGSAP(
    () => {
      const elements = [titleRef.current, subtitleRef.current, ...document.querySelectorAll(".cta-button")];
      
      // Set initial state (important for SSR)
      gsap.set(elements, { opacity: 1, y: 0 });

      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power3.out",
          immediateRender: false // Important for SSR
        } 
      });

      tl.from(titleRef.current, { 
        y: -40, 
        opacity: 0, 
        duration: 0.8,
        autoAlpha: 1
      })
      .from(subtitleRef.current, { 
        y: 20, 
        opacity: 0, 
        duration: 0.6,
        autoAlpha: 1 
      }, "-=0.4")
      .from(".cta-button", { 
        y: 10, 
        opacity: 0, 
        duration: 0.5,
        autoAlpha: 1,
        stagger: 0.1 
      }, "-=0.3");

      return () => {
        tl.kill(); // Clean up the timeline
      };
    },
    { scope: sectionRef }
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <section
        ref={sectionRef}
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
      >
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 will-change-transform opacity-100"
        >
          NextBlogger
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-8 max-w-2xl text-[var(--color-text-secondary)] will-change-transform opacity-100"
        >
          Share your ideas with the world. A modern publishing platform built
          with Next.js and Node.js.
        </p>
        <Link
          href="/posts"
          className="cta-button inline-block px-6 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] rounded transition-transform transform hover:scale-105 opacity-100"
        >
          View All Posts
        </Link>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {[
            {
              title: "Modern Design",
              desc: "Clean, responsive design that works perfectly on all devices",
            },
            {
              title: "Fast Performance",
              desc: "Built with Next.js for lightning-fast page loads and SEO optimization",
            },
            {
              title: "Easy Publishing",
              desc: "Simple and intuitive writing interface for creating amazing content",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] will-change-transform opacity-100"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}