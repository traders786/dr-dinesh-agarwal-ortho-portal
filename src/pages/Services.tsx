import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle,
  Clock,
  X,
  Stethoscope,
  Activity,
  Award,
  ChevronRight,
  ShieldCheck,
  CalendarDays,
  FileSpreadsheet
} from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  shortDesc: string;
  details: {
    indications: string[];
    process: string;
    recovery: string;
    longTermCare: string;
  };
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Spinal Decompression Surgery",
      icon: "⚡",
      shortDesc: "Relieves severe radiating nerve pain caused by spinal stenosis or herniations.",
      details: {
        indications: [
          "Severe radiating pain down the legs (Sciatica)",
          "Inability to walk more than 100 meters due to calf heaviness",
          "Weakness in ankles or feet (Foot Drop)"
        ],
        process: "The surgeon removes the bone spur, thickened ligament, or bulging disc pressing on the nerve roots, widening the central spinal canal.",
        recovery: "Patients walk on Day 1. Complete bone and tendon healing takes 4-6 weeks with custom physiotherapy exercises.",
        longTermCare: "Maintain posture, perform core muscles strengthening, and avoid sudden heavy lifting."
      }
    },
    {
      id: 2,
      title: "Disc Replacement Surgery",
      icon: "💿",
      shortDesc: "Replaces worn-out degenerative discs with premium motion-preserving implants.",
      details: {
        indications: [
          "Chronic degenerative disc disease of cervical or lumbar spine",
          "Severe pain unresponsive to conservative medical therapy",
          "Desire to maintain full neck or lumbar bending flexibility"
        ],
        process: "Unlike fusion, the diseased disc is entirely removed, and an artificial high-tech joint is anchored to retain full biomechanical motion.",
        recovery: "Immediate walking post-surgery. No heavy cervical brace needed. Neck mobility restores over 2-3 weeks.",
        longTermCare: "Regular non-impact sports (like swimming), avoiding heavy neck impacts."
      }
    },
    {
      id: 3,
      title: "Scoliosis Correction",
      icon: "🐍",
      shortDesc: "Straightening sideways spinal curvatures in adolescent and adult patients.",
      details: {
        indications: [
          "Sideways spinal curvature exceeding 45 degrees",
          "Rib humps, uneven shoulders causing breathing restrictions",
          "Progressive cosmetic deformity or pain"
        ],
        process: "Using advanced intraoperative neuromonitoring, titanium rods, and specialized screws, the spine is safely straightened and fused.",
        recovery: "Hospital stay of 5-7 days. Wear a custom brace for 3 months. Gradual school return within 4 weeks.",
        longTermCare: "Annual checkups. Normal daily active life with excellent spinal alignment."
      }
    },
    {
      id: 4,
      title: "Minimally Invasive Spine Surgery (MISS)",
      icon: "🔬",
      shortDesc: "Keyhole spine procedures ensuring minimal blood loss and swift recovery.",
      details: {
        indications: [
          "Focal herniated discs or local spinal compression",
          "High risk for traditional open surgery",
          "Desire to minimize surgical scars"
        ],
        process: "Special tubes and micro-endoscopes are inserted through small 1.5cm incisions, preserving surrounding major back muscles.",
        recovery: "Often discharged within 24-48 hours. Minimal pain, returning to desk work in 10-14 days.",
        longTermCare: "Maintaining healthy core muscle posture."
      }
    },
    {
      id: 5,
      title: "Knee & Hip Replacement",
      icon: "🦿",
      shortDesc: "Replacing severely arthritic joint surfaces with long-lasting premium implants.",
      details: {
        indications: [
          "End-stage bone-on-bone osteoarthritis of knee/hip",
          "Severe night joint pain and stiffness",
          "Inability to stand or climb stairs"
        ],
        process: "Damaged articular cartilage is shaved off and capped with biocompatible cobalt-chrome alloys and ultra-high molecular weight polyethylene liners.",
        recovery: "Immediate walking with walker. Transition to cane in 2 weeks. Independent mobility in 4-6 weeks.",
        longTermCare: "Avoid extreme squatting or sitting on the floor to maximize implant lifespan up to 25 years."
      }
    },
    {
      id: 6,
      title: "Arthroscopy",
      icon: "🎥",
      shortDesc: "Keyhole joint surgery for ACL reconstruction and meniscus repairs.",
      details: {
        indications: [
          "Ligament tears (ACL/PCL) in young or athletic individuals",
          "Meniscus cartilage tears causing joint locking",
          "Recurrent shoulder dislocations"
        ],
        process: "A high-definition joint camera is introduced. Using specialized micro-shavers, ligaments are rebuilt with tendon grafts.",
        recovery: "Brace support for 3-6 weeks. Custom sports rehabilitation programs spanning 4-6 months before full athletic return.",
        longTermCare: "Pre-sports dynamic warming up and quadriceps strengthening."
      }
    },
    {
      id: 7,
      title: "Fracture & Trauma Management",
      icon: "🦴",
      shortDesc: "Advanced fixations for complex bone fractures and high-impact injuries.",
      details: {
        indications: [
          "Open or displaced fractures of long bones",
          "Pelvic acetabular injuries from vehicular impacts",
          "Geriatric osteoporotic hip fractures requiring emergency fixation"
        ],
        process: "Realignment of bones under fluoroscopic guidance, stabilized using titanium locks, nails, or compression plates.",
        recovery: "Depends on fracture site. Mobilization of joint is started early, partial weight-bearing at 6 weeks.",
        longTermCare: "Calcium and Vitamin D supplements, bone density monitoring for osteoporotic patients."
      }
    },
    {
      id: 8,
      title: "Paediatric Orthopaedics",
      icon: "👶",
      shortDesc: "Correction of childhood bone deformities, clubfoot, and hip dysplasias.",
      details: {
        indications: [
          "Congenital Clubfoot (Deformed foot pointing downwards)",
          "Developmental Dysplasia of Hip (DDH)",
          "Knock knees or bow legs in growing kids"
        ],
        process: "Ponseti casting technique for clubfoot, soft tissue releases, or osteotomies to guide natural straight bone growth.",
        recovery: "Regular serial casting every week or small soft-tissue procedures with fast healing in children.",
        longTermCare: "Periodic growth tracking until bone maturity."
      }
    },
    {
      id: 9,
      title: "Sports Injury Rehabilitation",
      icon: "🏃‍♂️",
      shortDesc: "Tailored recovery schedules for muscle tears, sprains, and athletic joints.",
      details: {
        indications: [
          "Rotator cuff tears, tennis elbow, ankle sprains",
          "Chronic muscle strains from gym/track activities",
          "Partial ligament laxity not needing immediate surgery"
        ],
        process: "Personalized recovery combining stretching, neuromuscular training, and platelet-rich plasma (PRP) therapy.",
        recovery: "Symptom-guided. Gradual step-up in physical stress over 3 to 12 weeks.",
        longTermCare: "Maintaining core fitness, avoiding repetitive strain injuries."
      }
    },
    {
      id: 10,
      title: "Pain Management (Injections)",
      icon: "💉",
      shortDesc: "Targeted spinal injections, nerve blocks, and epidurals for clinical relief.",
      details: {
        indications: [
          "Acute radicular spine pain (Sciatica) limiting physiotherapy",
          "Facet joint arthropathy causing persistent back stiffness",
          "Sacroiliac joint pain"
        ],
        process: "Fluoroscopy-guided delivery of anti-inflammatory steroids and local anaesthetics directly onto the irritated nerve root or facet joint.",
        recovery: "Done as day-care. Immediate pain relief within hours, allowing initiation of spinal core exercises.",
        longTermCare: "Injections are diagnostic and therapeutic; must follow up with posture correction."
      }
    }
  ];

  const treatmentJourney = [
    {
      step: "01",
      title: "Clinical Consultation",
      desc: "Detailed personal physical and neurological examination of spine/joints."
    },
    {
      step: "02",
      title: "Advanced Diagnostics",
      desc: "In-depth spinal MRI, dynamic X-Rays, or CT mapping to pinpoint the true cause."
    },
    {
      step: "03",
      title: "Patient Counseling",
      desc: "Comprehensive explanation of pathology and non-surgical management routes first."
    },
    {
      step: "04",
      title: "Surgical Excellence",
      desc: "If required, high-precision micro-surgical correction with state-of-the-art implants."
    },
    {
      step: "05",
      title: "Rehab & Recovery",
      desc: "Tailored post-operative physiotherapy and posture advice to ensure lasting stability."
    }
  ];

  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20">
      {/* HEADER HERO */}
      <section className="bg-[#0A2F5A] text-white py-16 px-4 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">Orthopaedic & Spinal Services</h1>
          <p className="text-gray-300 font-accent tracking-wider text-sm uppercase max-w-xl mx-auto">
            World-class diagnostic, therapeutic, and surgical interventions for joint & spine health
          </p>
          <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* SERVICES GRID */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Comprehensive Treatment Range</h2>
            <p className="text-sm text-gray-600 mt-2">
              Click on any service to learn about indicators, surgical processes, and post-operative recovery timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F7FB] flex items-center justify-center text-2xl shadow-inner group-hover:bg-[#1A7A7A]/10 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0A2F5A] group-hover:text-[#1A7A7A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-accent font-bold text-[#1A7A7A] hover:text-[#0A2F5A] inline-flex items-center gap-1 uppercase tracking-wider focus:outline-none"
                  >
                    <span>Learn More Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE TREATMENT JOURNEY */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-accent text-[#1A7A7A] uppercase tracking-widest font-bold">The Treatment Path</h3>
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Step-by-Step Patient Journey</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {treatmentJourney.map((step, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm text-center relative overflow-hidden flex flex-col justify-between">
                <span className="absolute -top-4 -right-2 text-6xl font-serif font-black text-gray-100/60 select-none">
                  {step.step}
                </span>
                <div className="space-y-3 z-10 pt-4">
                  <h4 className="font-serif font-bold text-base text-[#0A2F5A]">{step.title}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </div>
                <div className="pt-4 flex justify-center">
                  <span className="w-8 h-8 rounded-full bg-[#1A7A7A]/10 text-[#1A7A7A] flex items-center justify-center font-bold text-xs">
                    {step.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SERVICE MODAL DETAILS */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1A2E]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F7FB] flex items-center justify-center text-3xl shadow-inner">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2F5A]">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-accent uppercase tracking-wider">
                      Momentum Orthopaedics
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-100" />

                {/* Section: Clinical Indications */}
                <div className="space-y-2.5">
                  <h4 className="font-accent font-bold text-[#0A2F5A] text-xs uppercase tracking-widest flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-[#1A7A7A]" />
                    <span>When is this recommended? (Indications)</span>
                  </h4>
                  <ul className="space-y-1.5 pl-1 text-sm text-gray-600">
                    {selectedService.details.indications.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#1A7A7A] shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section: Surgical Process */}
                <div className="space-y-2">
                  <h4 className="font-accent font-bold text-[#0A2F5A] text-xs uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#1A7A7A]" />
                    <span>Treatment/Surgical Execution</span>
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed pl-1">
                    {selectedService.details.process}
                  </p>
                </div>

                {/* Section: Recovery & Long-Term */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 bg-[#F0F7FB] p-5 rounded-2xl border border-[#1A7A7A]/10">
                  <div className="space-y-1">
                    <h5 className="font-accent font-bold text-[#0A2F5A] text-xs uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1A7A7A]" />
                      <span>Post-Op Recovery</span>
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {selectedService.details.recovery}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-accent font-bold text-[#0A2F5A] text-xs uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1A7A7A]" />
                      <span>Long-Term Care</span>
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {selectedService.details.longTermCare}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 text-center">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                    <a
                      href="/book"
                      className="bg-[#1A7A7A] hover:bg-[#0A2F5A] text-white font-accent text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all inline-flex items-center gap-1.5"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Consult Dr. Agarwal on this topic</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
