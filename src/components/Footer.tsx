import React from "react";
import { Link } from "react-router-dom";
import { Activity, Mail, Phone, MapPin, Clock, Heart, Award, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-[#1A1A2E] text-gray-300 border-t border-white/5">
      {/* Top Banner - Callout Emergency */}
      <div className="bg-[#0A2F5A] py-6 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20 animate-pulse">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-accent font-bold tracking-wide uppercase text-xs">Emergency Spinal & Orthopaedic Helpline</p>
              <p className="text-sm text-gray-300">Available 24/7 for acute trauma, fractures, or extreme spine injuries</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:9709702233"
              className="bg-red-600 hover:bg-red-700 text-white font-accent font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>970 970 2233</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="./logo.jpg"
                alt="Dr. Dinesh Kumar Agarwal Logo"
                className="w-10 h-10 rounded-lg object-cover shadow-md border border-white/20"
              />
              <div>
                <span className="font-serif text-lg font-bold text-white block">Dr. Dinesh K. Agarwal</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-accent">M.S., DNB (Ortho) · Spine Fellow</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Consultant Orthopaedic & Spine Surgeon with over 10 years of clinical expertise. Specialized in complex spine surgeries, scoliosis correction, and joint replacements trained at CMC Vellore.
            </p>
            <div className="flex items-center space-x-2 text-xs bg-white/5 border border-white/10 p-3 rounded-xl max-w-max">
              <Award className="w-4 h-4 text-[#E8A838]" />
              <span className="text-gray-300">CMC Vellore Spine Fellow</span>
            </div>
          </div>

          {/* Column 2 - Clinical Centers */}
          <div className="space-y-4">
            <h4 className="text-sm font-accent font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Our Centers</h4>
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="font-semibold text-white">Momentum Speciality Clinic</p>
                <p className="text-xs text-gray-400 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1A7A7A] shrink-0 mt-0.5" />
                  <span>Chandra Arcade, Dhaiya, Dhanbad</span>
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1A7A7A]" />
                  <span>Mon-Fri: 07:00 PM - 09:00 PM</span>
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <p className="font-semibold text-white">Nichtipur Hospital & Research Center</p>
                <p className="text-xs text-gray-400 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1A7A7A] shrink-0 mt-0.5" />
                  <span>Katras Bazar, Dhanbad</span>
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1A7A7A]" />
                  <span>Mon-Fri: 10:00 AM - 04:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-accent font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#E8A838] transition-colors flex items-center gap-1">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E8A838] transition-colors flex items-center gap-1">Doctor Biography</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#E8A838] transition-colors flex items-center gap-1">Surgical & Trauma Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E8A838] transition-colors flex items-center gap-1">Clinic Timings & Contact</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-[#E8A838] transition-colors flex items-center gap-1">Patient Resources & Blog</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#E8A838] transition-colors flex items-center gap-1">Clinical Gallery</Link>
              </li>
              <li>
                <Link to="/book" className="text-[#E8A838] hover:underline flex items-center gap-1">Book Online Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Disclaimers & Helplines */}
          <div className="space-y-4">
            <h4 className="text-sm font-accent font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Clinic Contacts</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:03264008249" className="flex items-center gap-2 hover:text-[#E8A838] transition-colors">
                <Phone className="w-4 h-4 text-[#1A7A7A]" />
                <div>
                  <p className="text-xs text-gray-400">Momentum Phone</p>
                  <p className="font-semibold text-white">0326-4008249</p>
                </div>
              </a>
              <a href="tel:03263570833" className="flex items-center gap-2 hover:text-[#E8A838] transition-colors">
                <Phone className="w-4 h-4 text-[#1A7A7A]" />
                <div>
                  <p className="text-xs text-gray-400">Nichtipur Phone</p>
                  <p className="font-semibold text-white">0326-3570833</p>
                </div>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1A7A7A]" />
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="text-white">info@momentumspine.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Dr. Dinesh Kumar Agarwal. All rights reserved. Designed for excellence in orthopaedics and spinal care.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-xs text-gray-500 hover:text-white transition-colors">Admin Portal Login</Link>
            <span className="text-gray-600">|</span>
            <button
              onClick={scrollToTop}
              className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
            >
              <span>Scroll to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
