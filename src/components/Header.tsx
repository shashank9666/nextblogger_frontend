"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { CSSProperties } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle: CSSProperties = {
    color: "var(--color-text-secondary)",
    transition: "all 0.2s ease",
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, isEnter: boolean) => {
    const target = e.currentTarget;
    target.style.color = isEnter ? "var(--color-text-primary)" : "var(--color-text-secondary)";
    target.style.backgroundColor = isEnter ? "var(--color-hover-bg)" : "transparent";
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold transition-opacity hover:opacity-80"
            style={{ color: "var(--color-text-primary)" }}
          >
            NextBlogger
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 items-center">
            {[
              { href: "/", label: "Home" },
              { href: "/posts", label: "Posts" },
              { href: "/posts/new", label: "Write" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-md transition-colors"
                style={linkStyle}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                {label}
              </Link>
            ))}

            {/* Theme Toggle with hover effect */}
            <div 
              className="ml-2 p-2 rounded-md transition-colors"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for mobile with hover effect */}
            <div 
              className="p-2 rounded-md transition-colors"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <ThemeToggle />
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md transition-colors"
              style={linkStyle}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden py-2 border-t"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex flex-col space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/posts", label: "Posts" },
                { href: "/posts/new", label: "Write" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-3 rounded-md transition-colors"
                  style={linkStyle}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}