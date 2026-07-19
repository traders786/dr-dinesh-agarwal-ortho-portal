import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Activity,
  Award,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Shield,
  Star,
  Users,
  Briefcase,
  Phone
} from "lucide-react";
import { Testimonial } from "../types";
import { api } from "../api";

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  useEffect(() => {
    // Fetch testimonials from API
    api.getTestimonials()
      .then((data) => {
        // Filter only approved ones
        const approved = data.filter((t: Testimonial) => t.approved);
        setTestimonials(approved.length > 0 ? approved : data);
      })
      .catch((err) => console.error("Failed to fetch testimonials", err));
  }, []);

  const trustIndicators = [
    { label: "Clinical Experience", val: "10+ Years", icon: Briefcase },
    { label: "Successful Surgeries", val: "5000+", icon: Activity },
    { label: "Specialist Training", val: "CMC Vellore", icon: Award },
    { label: "Clinic Certification", val: "ISO Certified", icon: Shield },
  ];

  const quickServices = [
    {
      title: "Spine Surgery",
      desc: "Specialized procedures including spinal decompression, microdiscectomy, and stabilization.",
      icon: "🦴",
      color: "border-[#1A7A7A]"
    },
    {
      title: "Joint Replacement",
      desc: "State-of-the-art knee and hip replacements returning pain-free movement.",
      icon: "🦿",
      color: "border-[#0A2F5A]"
    },
    {
      title: "Complex Trauma Care",
      desc: "Expert management of advanced bone fractures, sports tears, and orthopaedic trauma.",
      icon: "🩹",
      color: "border-[#E8A838]"
    }
  ];

  const clinics = [
    {
      name: "Momentum Speciality Clinic",
      role: "Primary Consultation Center",
      address: "Chandra Arcade, Dhaiya (Near CMRI), Dhanbad",
      timings: "Monday – Friday, 7 PM – 9 PM",
      phone: "0326-4008249",
      directions: "https://maps.google.com/?q=Momentum+Speciality+Clinic+Dhaiya+Dhanbad",
      accent: "bg-[#1A7A7A]"
    },
    {
      name: "Nichtipur Hospital & Research Center",
      role: "In-Patient & Surgery Center",
      address: "Katras Bazar, Dhanbad",
      timings: "Monday – Friday, 10 AM – 4 PM",
      phone: "0326-3570833",
      directions: "https://maps.google.com/?q=Nichtipur+Hospital+Katras+Dhanbad",
      accent: "bg-[#0A2F5A]"
    }
  ];

  const handleNextReview = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevReview = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative overflow-hidden pt-16">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0A2F5A] via-[#0D3B6F] to-[#1A7A7A] text-white py-20 px-4">
        {/* Animated Background Graphics */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Hero Decorative Spine Curve (SVG illustration) */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 hidden lg:block pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 800" fill="none">
            <path
              d="M50 0 C70 150 20 300 50 450 C80 600 30 750 50 900"
              stroke="#E8A838"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={i} cx={50 + Math.sin(i) * 15} cy={i * 60 + 50} r="10" fill="#1A7A7A" opacity="0.6" />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-accent tracking-wider text-[#E8A838]"
            >
              <Award className="w-4.5 h-4.5 text-[#E8A838]" />
              <span>CMC VELLORE SPINE FELLOW</span>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight"
              >
                Dr. Dinesh Kumar Agarwal
              </motion.h1>

              {/* Subtitle with typing effect or fade-up */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-lg sm:text-xl font-accent text-gray-200 font-light"
              >
                M.S. (Ortho), DNB (Ortho) · Fellowship in Spinal Disorder Surgery
              </motion.p>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl font-serif italic text-[#E8A838] border-l-4 border-[#1A7A7A] pl-4"
            >
              Consultant Orthopaedic & Spine Surgeon
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-300 max-w-xl text-base leading-relaxed"
            >
              Dedicated to restoring mobility and enhancing life quality. Providing state-of-the-art spinal solutions, disc replacements, and premium musculoskeletal trauma care in Dhanbad.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/book"
                className="bg-[#E8A838] hover:bg-[#d4962d] text-[#1A1A2E] font-accent font-bold px-8 py-3 rounded-full shadow-lg shadow-[#E8A838]/20 transition-all transform hover:scale-105 animate-pulse"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-white font-accent font-bold px-8 py-3 rounded-full transition-all"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>

          {/* Rotating 3D Floating Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ rotateY: 15, rotateX: 10, scale: 1.03 }}
              className="bg-white/10 backdrop-blur-md border border-white/25 p-8 rounded-3xl shadow-2xl relative w-full max-w-sm overflow-hidden group cursor-pointer"
            >
              {/* Highlight flare effect */}
              <div className="absolute -inset-y-12 -inset-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-12 group-hover:translate-x-96 transition-transform duration-1000 ease-out" />

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1A7A7A] to-[#E8A838] flex items-center justify-center text-white text-3xl font-serif shadow-inner">
                  M
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#E8A838] uppercase tracking-wide">
                    Momentum Clinic
                  </h3>
                  <p className="text-sm font-accent text-white font-semibold">
                    A Centre For Backpain & Spinal Disorders
                  </p>
                </div>
                <div className="w-full h-px bg-white/10 my-2" />
                <div className="space-y-2 text-xs text-gray-300 font-light">
                  <p>📍 Chandra Arcade, Dhaiya, Dhanbad</p>
                  <p>📞 Phone: 0326-4008249</p>
                  <p>🕰️ Timings: 7:00 PM – 9:00 PM (Mon-Fri)</p>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-accent text-[#E8A838] font-bold border border-[#E8A838]/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    Aesthetic Spine Center
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS STRIP (Horizontal ticker style) */}
      <section id="trust-strip" className="bg-[#1A1A2E] text-white py-6 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustIndicators.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center space-y-1 group">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#1A7A7A] group-hover:text-[#E8A838] group-hover:bg-[#1A7A7A]/10 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-white block">
                    {item.val}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-accent block">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SNAPSHOT */}
      <section id="services-snapshot" className="py-20 bg-[#F0F7FB] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h3 className="text-sm font-accent text-[#1A7A7A] uppercase tracking-wider font-bold">
              Specialized Care
            </h3>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2F5A]">
              Core Orthopaedic & Spine Expertise
            </h2>
            <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full" />
            <p className="text-gray-600 text-sm">
              Dr. Dinesh Kumar Agarwal provides complete multi-disciplinary care using advanced diagnostic insights and custom patient pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickServices.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-white rounded-3xl p-8 border-t-4 ${service.color} shadow-md transition-all flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="text-4xl">{service.icon}</div>
                  <h4 className="text-xl font-serif font-bold text-[#0A2F5A]">{service.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
                <div className="pt-6">
                  <Link
                    to="/services"
                    className="text-xs font-accent font-bold text-[#1A7A7A] hover:text-[#0A2F5A] inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    Learn Treatment Process &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md transition-all inline-block"
            >
              View All 10 Diagnostic Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CLINIC LOCATIONS */}
      <section id="locations" className="py-20 bg-white px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h3 className="text-sm font-accent text-[#1A7A7A] uppercase tracking-wider font-bold">
              Easy Access
            </h3>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A2F5A]">
              Clinic Locations & Timings
            </h2>
            <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full" />
            <p className="text-gray-600 text-sm">
              Consult Dr. Dinesh Kumar Agarwal at his specialized primary clinic or full-service hospital surgery center in Dhanbad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {clinics.map((clinic, idx) => (
              <div
                key={idx}
                className="bg-[#F0F7FB] border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group"
              >
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#1A7A7A]/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

                <div className="space-y-4 z-10">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-accent text-white uppercase tracking-wider ${clinic.accent}`}>
                    {clinic.role}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#0A2F5A]">{clinic.name}</h3>
                  <div className="space-y-2.5 text-sm text-gray-600">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#1A7A7A] shrink-0 mt-1" />
                      <span>{clinic.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1A7A7A]" />
                      <span>{clinic.timings}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#E8A838] fill-[#E8A838]" />
                      <span>Monday to Friday consultations available</span>
                    </p>
                  </div>
                </div>

                <div className="pt-8 flex flex-wrap gap-4 items-center border-t border-gray-200/50 mt-6 z-10">
                  <a
                    href={`tel:${clinic.phone}`}
                    className="bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
                  >
                    Call {clinic.phone}
                  </a>
                  <a
                    href={clinic.directions}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#1A7A7A]/30 hover:border-[#1A7A7A] text-[#1A7A7A] font-accent font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS CAROUSEL */}
      <section id="testimonials" className="py-20 bg-[#0A2F5A] text-white px-4 relative overflow-hidden">
        {/* Abstract graphics */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-10 bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-2">
            <Users className="w-8 h-8 text-[#E8A838] mx-auto" />
            <h3 className="text-xs font-accent text-[#E8A838] uppercase tracking-widest font-bold">
              Patient Testimonials
            </h3>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Words of Trust and Healing
            </h2>
            <div className="w-12 h-1 bg-[#1A7A7A] mx-auto rounded-full mt-2" />
          </div>

          {testimonials.length > 0 ? (
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
                {/* Quote symbol */}
                <span className="absolute top-4 left-6 text-6xl text-[#E8A838]/20 font-serif font-black select-none pointer-events-none">
                  “
                </span>

                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Stars */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: testimonials[activeTestimonialIdx].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#E8A838] fill-[#E8A838]" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg italic text-gray-200 leading-relaxed font-light">
                    "{testimonials[activeTestimonialIdx].content}"
                  </p>

                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-full bg-[#1A7A7A] flex items-center justify-center text-white text-base font-bold shadow-md">
                      {testimonials[activeTestimonialIdx].initials}
                    </div>
                    <div>
                      <p className="font-serif text-white font-bold text-base">
                        {testimonials[activeTestimonialIdx].name}
                      </p>
                      <p className="text-xs text-gray-300 font-accent tracking-wider uppercase">
                        {testimonials[activeTestimonialIdx].age} Years Old ·{" "}
                        <span className="text-[#E8A838]">{testimonials[activeTestimonialIdx].condition}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              {testimonials.length > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <button
                    onClick={handlePrevReview}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-[#0A2F5A] transition-all"
                    aria-label="Previous patient testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-accent tracking-widest text-gray-300 uppercase">
                    {activeTestimonialIdx + 1} of {testimonials.length}
                  </span>
                  <button
                    onClick={handleNextReview}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-[#0A2F5A] transition-all"
                    aria-label="Next patient testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-300 text-sm">No patient reviews available at the moment.</p>
          )}

          <div className="text-center mt-12">
            <Link
              to="/resources"
              className="text-[#E8A838] hover:underline font-accent text-xs font-semibold uppercase tracking-widest"
            >
              Read More Patient Resources &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION APPOINTMENT */}
      <section className="py-16 bg-[#1A7A7A] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Because Your Spine Deserves the Best
          </h2>
          <p className="text-gray-100 max-w-xl mx-auto text-sm leading-relaxed">
            Don't let backpain restrict your life. Book a customized physical assessment and diagnostic spine consultation with Dr. Dinesh Kumar Agarwal.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/book"
              className="bg-[#E8A838] hover:bg-[#d4962d] text-[#1A1A2E] font-accent font-bold px-8 py-3.5 rounded-full shadow-lg transition-all text-sm uppercase tracking-wider"
            >
              Book Consultation Online
            </Link>
            <a
              href="tel:08071967624"
              className="border border-white/40 hover:border-white bg-white/10 hover:bg-white/20 text-white font-accent font-bold px-8 py-3.5 rounded-full transition-all text-sm uppercase tracking-wider flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-[#E8A838]" />
              <span>Call IVR Helpline</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
