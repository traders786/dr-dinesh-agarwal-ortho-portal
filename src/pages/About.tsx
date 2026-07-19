import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Heart,
  ShieldAlert,
  Star,
  Target,
  UserCheck
} from "lucide-react";

export default function About() {
  const [activeAccordionIdx, setActiveAccordionIdx] = useState<number | null>(0);

  const timeline = [
    {
      year: "Post-Graduate Residency",
      degree: "M.S. (Orthopaedics)",
      detail: "Earned clinical distinction and specialized in orthopaedic trauma and surgical techniques."
    },
    {
      year: "Board Certification",
      degree: "DNB (Orthopaedics)",
      detail: "Certified by the National Board of Examinations, signifying peak board proficiency."
    },
    {
      year: "Super-Specialty Fellowship",
      degree: "Spinal Disorder Surgery (CMC Vellore)",
      detail: "Completed super-specialization at Christian Medical College (CMC) Vellore, premier training center in spinal corrections and microdiscectomy."
    },
    {
      year: "Momentum Clinic Inception",
      degree: "Consultant Spine Surgeon",
      detail: "Began advanced diagnostic spinal consultations and complex surgical work in Dhanbad, establishing high-standard care."
    }
  ];

  const whyChooseReasons = [
    {
      title: "Super-Specialized Training (CMC Vellore)",
      content: "Dr. Dinesh Kumar Agarwal completed his fellowship in Spine Surgery at Christian Medical College, Vellore, which is widely recognized as India's premier spinal research institute. This gives him unparalleled expertise in complex spinal disorders."
    },
    {
      title: "10+ Years & 5000+ Successful Surgeries",
      content: "Having executed thousands of successful procedures from routine fracture trauma care to high-complexity scoliosis corrections and dual joint replacements, Dr. Agarwal brings top-tier hands-on clinical wisdom."
    },
    {
      title: "Minimally Invasive Focus (Faster Recovery)",
      content: "He specializes in keyhole (minimally invasive) spinal surgeries. These procedures involve smaller incisions, less muscle damage, minimal blood loss, and significantly faster patient recovery."
    },
    {
      title: "Compassionate, Non-Surgical Treatment First",
      content: "Dr. Agarwal has a philosophy of conservative treatment. Surgery is only recommended as a final option after exploring customized physical therapies, targeted epidurals, and core rehab paths."
    }
  ];

  const handleAccordionToggle = (idx: number) => {
    setActiveAccordionIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen">
      {/* HEADER HERO */}
      <section className="bg-[#0A2F5A] text-white py-16 px-4 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">About Dr. Dinesh Kumar Agarwal</h1>
          <p className="text-gray-300 font-accent tracking-wider text-sm uppercase max-w-xl mx-auto">
            M.S. (Ortho) · DNB (Ortho) · Fellowship in Spinal Disorder Surgery (CMC Vellore)
          </p>
          <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        {/* PROFILE SECTION */}
        <section id="biography" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Picture Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Decorative behind border */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-[#1A7A7A]/30 z-0" />
              {/* Image Frame */}
              <div className="w-80 h-96 sm:w-96 sm:h-[480px] rounded-3xl bg-gradient-to-br from-[#0A2F5A] to-[#1A7A7A] overflow-hidden shadow-xl z-10 relative flex items-center justify-center text-center p-8 text-white">
                <div className="space-y-4">
                  <span className="text-7xl block">👨‍⚕️</span>
                  <h3 className="font-serif text-2xl font-bold text-[#E8A838]">Dr. Dinesh K. Agarwal</h3>
                  <p className="text-xs text-gray-300 font-accent uppercase tracking-widest">Consultant Spine Surgeon</p>
                  <p className="text-sm font-light leading-relaxed text-gray-200">
                    "My mission is to restore mobility through compassionate care and surgical precision."
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-white">10+ Yrs Exp</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-white">CMC Vellore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-accent text-[#1A7A7A] uppercase tracking-wider font-bold">The Surgeon's Journey</span>
              <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Decade of Spine & Trauma Excellence</h2>
            </div>
            <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
              <p>
                Dr. Dinesh Kumar Agarwal is a highly respected Orthopaedic & Spine Surgeon with over a decade of clinical excellence. He completed his post-graduation, earning his **M.S. (Ortho)** and **DNB (Ortho)** with clinical distinction, marking early on his dedication to orthopaedic science.
              </p>
              <p>
                Following his board certifications, Dr. Agarwal pursued a prestigious **Fellowship in Spinal Disorder Surgery at Christian Medical College (CMC) Vellore** – one of India's foremost medical institutions. There, he trained under pioneer spine specialists, mastering microdiscectomy, decompression, and scoliosis corrections.
              </p>
              <p>
                He specializes in complex spinal surgeries, joint replacements, and high-energy trauma management, combining cutting-edge surgical techniques with compassionate, patient-first care. Currently, he serves as the Lead Consultant Orthopaedic & Spine Surgeon at **Momentum Speciality Clinic**, which has become a centre of excellence for back pain and spinal disorders in Dhanbad.
              </p>
            </div>

            {/* Counter cards (animated look) */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1A7A7A]">10+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-accent uppercase tracking-wider font-semibold">Years Exp</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0A2F5A]">5000+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-accent uppercase tracking-wider font-semibold">Surgeries</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#E8A838]">10k+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-accent uppercase tracking-wider font-semibold">Patients Healed</p>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION TIMELINE */}
        <section id="timeline" className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-sm font-accent text-[#1A7A7A] uppercase tracking-wider font-bold">Academic Journey</h3>
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Education & Board Speciality</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          <div className="relative border-l-2 border-[#1A7A7A]/30 pl-6 ml-4 md:ml-10 space-y-8 max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <span className="absolute -left-10 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[#1A7A7A] flex items-center justify-center shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8A838]" />
                </span>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2">
                  <span className="text-[#1A7A7A] font-accent text-xs font-bold uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#0A2F5A]">{item.degree}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section id="mission-vision" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A2F5A] text-white rounded-3xl p-8 sm:p-12 space-y-4 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-lg" />
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#E8A838]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Our Medical Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              To provide evidence-based, highest standard orthopaedic and spinal surgeries. We pledge to treat each spine as a delicate structural system, preferring minimally invasive, non-disruptive treatments wherever medically sound to return patients to active lifestyles swiftly.
            </p>
          </div>

          <div className="bg-[#1A7A7A] text-white rounded-3xl p-8 sm:p-12 space-y-4 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-lg" />
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#E8A838]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Patient Vision</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              To make high-end, super-specialized spinal deformity, scoliosis, and arthritis surgeries accessible and localized for the population of Jharkhand and neighboring regions, ensuring patients do not have to travel far to receive world-class outcomes.
            </p>
          </div>
        </section>

        {/* ACCORDION WHY CHOOSE */}
        <section id="why-choose" className="space-y-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h3 className="text-sm font-accent text-[#1A7A7A] uppercase tracking-wider font-bold">Patient Values</h3>
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Why Consult Dr. Dinesh K. Agarwal?</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          <div className="space-y-4">
            {whyChooseReasons.map((item, idx) => {
              const isOpen = activeAccordionIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => handleAccordionToggle(idx)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left font-serif text-base sm:text-lg font-bold text-[#0A2F5A] hover:bg-gray-50 focus:outline-none transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-[#1A7A7A]" />
                      <span>{item.title}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#E8A838]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#E8A838]" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-[#F0F7FB]/20">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
