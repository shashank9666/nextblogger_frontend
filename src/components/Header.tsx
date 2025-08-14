"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 bg-white/20 backdrop-blur-md shadow-sm border border-white/30 rounded-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2 sm:py-3">
        {/* Logo - Left Side */}
        <Link 
          href="/" 
          className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex-shrink-0"
        >
          NextBlogger
        </Link>
        
        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden sm:flex items-center gap-6 lg:gap-8">
          <Link 
            href="/" 
            className="text-sm lg:text-base text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group px-1 py-2"
          >
            <span className="relative">
              Home
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
            </span>
          </Link>
          
          <Link 
            href="/posts" 
            className="text-sm lg:text-base text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group px-1 py-2"
          >
            <span className="relative">
              Posts
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
            </span>
          </Link>
          
          <Link
            href="/posts/new"
            className="text-sm lg:text-base text-slate-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group px-1 py-2"
          >
            <span className="relative">
              Write
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button - Only Visible on Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 text-slate-700 hover:text-indigo-600 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close icon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu icon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu - Only Visible on Mobile */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 mt-2 bg-white/100 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <nav className="flex flex-col p-4">
            <Link 
              href="/" 
              className="text-slate-700 hover:text-indigo-600 font-medium py-3 px-2 border-b border-gray-200/50 last:border-b-0 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              href="/posts" 
              className="text-slate-700 hover:text-indigo-600 font-medium py-3 px-2 border-b border-gray-200/50 last:border-b-0 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Posts
            </Link>
            
            <Link
              href="/posts/new"
              className="text-slate-700 hover:text-indigo-600 font-medium py-3 px-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
