import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Activity, Calendar, Phone, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top on path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Timings", path: "/contact" },
    { name: "Resources", path: "/resources" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A2F5A]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-[#0A2F5A] shadow-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#1A7A7A] flex items-center justify-center text-white shadow-md shadow-[#1A7A7A]/20 transition-transform duration-300 group-hover:rotate-12">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                Dr. Dinesh K. Agarwal
              </span>
              <span className="block text-xs text-gray-300 font-accent tracking-wider font-light uppercase">
                Orthopaedic & Spine Surgeon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors hover:text-[#E8A838] py-1 ${
                    isActive ? "text-[#E8A838]" : "text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E8A838]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Callouts */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="tel:08071967624"
              className="flex items-center space-x-2 text-xs text-white bg-[#0A2F5A]/60 hover:bg-[#0A2F5A] border border-white/10 px-3 py-1.5 rounded-full transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8A838]" />
              <span className="font-accent font-semibold tracking-wider">IVR: 08071967624</span>
            </a>
            <Link
              to="/book"
              className="relative overflow-hidden flex items-center space-x-2 bg-gradient-to-r from-[#1A7A7A] to-[#0A2F5A] hover:from-[#E8A838] hover:to-[#E8A838] hover:text-[#1A1A2E] text-white px-5 py-2 rounded-full font-accent font-semibold text-xs tracking-wider uppercase shadow-md transition-all duration-300 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
              <span className="absolute right-0 top-0 h-full w-4 bg-white/10 transform skew-x-12 -translate-x-12 group-hover:translate-x-48 transition-transform duration-1000 ease-out" />
            </Link>
            <Link
              to="/admin"
              title="Admin Portal"
              className={`p-2 rounded-full border transition-all ${
                location.pathname === "/admin"
                  ? "bg-[#E8A838]/20 border-[#E8A838] text-[#E8A838]"
                  : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
            </Link>
          </div>

          {/* Hamburger Menu Mobile button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              to="/book"
              className="sm:hidden flex items-center justify-center p-2 rounded-full bg-[#1A7A7A] text-white shadow-md"
              title="Book Appointment"
            >
              <Calendar className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0A2F5A] border-t border-white/10"
          >
            <div className="px-2 pt-3 pb-6 space-y-1 sm:px-3 text-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? "bg-[#1A7A7A] text-white font-semibold"
                        : "text-gray-200 hover:bg-white/5 hover:text-[#E8A838]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/10 px-4 space-y-3">
                <a
                  href="tel:08071967624"
                  className="flex items-center justify-center space-x-2 text-sm text-white bg-white/5 border border-white/10 p-3 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4 text-[#E8A838]" />
                  <span className="font-accent font-semibold">IVR Appt: 08071967624</span>
                </a>
                <Link
                  to="/book"
                  className="block text-center bg-[#E8A838] text-[#1A1A2E] py-3 rounded-xl font-accent font-bold text-sm uppercase tracking-wider shadow-md hover:bg-white hover:text-[#1A7A7A] transition-all"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center justify-center space-x-2 text-xs text-gray-400 hover:text-white pt-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Login Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
