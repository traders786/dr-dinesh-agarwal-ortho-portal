import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Download,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  ArrowRight,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";
import { BlogArticle } from "../types";
import { api } from "../api";

export default function Resources() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readingBlog, setReadingBlog] = useState<BlogArticle | null>(null);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    api.getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to load blog articles", err));
  }, []);

  const categories = ["All", "Spine Health", "Joint Care", "Paediatric Ortho"];

  const pdfGuides = [
    {
      title: "Pre-Operative Surgery Checklist",
      desc: "Crucial instructions, lab checks, fasting schedules, and list of medications to stop 7 days before surgery.",
      size: "1.4 MB · PDF",
      fileUrl: "#"
    },
    {
      title: "Spinal Lumbar Core Exercises",
      desc: "Gentle physiotherapist-approved exercises to build support, reduce lower back stiffness, and prevent strains.",
      size: "2.8 MB · PDF",
      fileUrl: "#"
    },
    {
      title: "Post-Operative Joint Care Mobility",
      desc: "A daily rehabilitation guide outlining ankle pumps, heel slides, walking progression, and wound precautions.",
      size: "1.9 MB · PDF",
      fileUrl: "#"
    }
  ];

  const faqs = [
    {
      q: "Are all spine disorders treated with surgery?",
      a: "Absolutely not. In fact, over 90% of back pain and spinal disorders are successfully resolved through conservative, non-surgical therapies. This includes targeted physiotherapy, core stabilization exercises, weight management, and fluoroscopy-guided spinal injections. Surgery is only considered when nerve weakness progressive (like Foot Drop) or when severe pain persists after 6-8 weeks of core conservative treatment."
    },
    {
      q: "What is Minimally Invasive Spine Surgery (MISS)?",
      a: "MISS is a modern surgical approach where spinal decompression or fusions are executed through small keyhole incisions (usually less than 2cm) using specialized tubular retractors and endoscopes. This minimizes damage to surrounding muscles, dramatically reduces blood loss, limits post-operative surgical pain, and results in rapid recovery—most patients are discharged within 24-48 hours."
    },
    {
      q: "How long is the recovery period for Total Knee Replacement?",
      a: "Under Dr. Agarwal's advanced care pathways, patients stand and take assisted steps on the very next day of joint surgery. Walking with a walker continues for 2 weeks, followed by a cane or independent walking by week 4. Complete routine recovery takes around 6 weeks, while deep tissue healing and maximum active range continue to refine for up to 6 months."
    },
    {
      q: "When should I consult a spine specialist for back pain?",
      a: "Consult Dr. Agarwal immediately if your back pain is accompanied by 'red flag' indications: severe shooting pain radiating down your leg (sciatica), numbness or tingling in your limbs, persistent weakness in your feet/toes, pain that worsens during rest or night, or any sudden alteration in bladder or bowel control."
    }
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20">
      {/* HEADER HERO */}
      <section className="bg-[#0A2F5A] text-white py-16 px-4 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">Patient Resources & Education</h1>
          <p className="text-gray-300 font-accent tracking-wider text-sm uppercase max-w-xl mx-auto">
            Explore validated blogs on spinal hygiene, download pre/post recovery charts, and read FAQs
          </p>
          <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* DOWNLOADABLE PDF GUIDES */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-accent text-[#1A7A7A] uppercase tracking-widest font-bold">Patient Downloads</h3>
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Pre & Post Surgical Guides</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pdfGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#0A2F5A]">{guide.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mt-2">{guide.desc}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">{guide.size}</span>
                  <a
                    href={guide.fileUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Successfully downloading the compiled Patient Guide: "${guide.title}"`);
                    }}
                    className="text-xs font-accent font-bold text-[#1A7A7A] hover:text-[#0A2F5A] inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Download</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLINICAL BLOGS */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-accent text-[#1A7A7A] uppercase tracking-widest font-bold">Spine & Ortho Insights</h3>
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Doctor's Medical Blog</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          {/* Search and Category Filters */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            {/* Search */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#1A7A7A]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-lg font-accent transition-all ${
                    selectedCategory === cat
                      ? "bg-[#1A7A7A] text-white font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#1A7A7A]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Header Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#0A2F5A]/90 text-white text-[10px] font-accent font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>

                    {/* Meta & Title */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-accent">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{blog.readTime}</span>
                        </span>
                        <span>•</span>
                        <span>📅 {blog.date}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#0A2F5A] leading-snug hover:text-[#1A7A7A] transition-colors line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-50">
                    <button
                      onClick={() => setReadingBlog(blog)}
                      className="text-xs font-accent font-bold text-[#1A7A7A] hover:text-[#0A2F5A] inline-flex items-center gap-1 uppercase tracking-wider focus:outline-none"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-sm font-accent">
                No clinical articles match the filters. Try another search.
              </div>
            )}
          </div>
        </section>

        {/* CLINICAL FAQ SECTION */}
        <section id="faq" className="space-y-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#E8A838] mx-auto" />
            <h3 className="text-xs font-accent text-[#1A7A7A] uppercase tracking-widest font-bold">Common Inquiries</h3>
            <h2 className="text-3xl font-serif font-bold text-[#0A2F5A]">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-[#E8A838] mx-auto rounded-full mt-2" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left font-serif text-base font-bold text-[#0A2F5A] hover:bg-gray-50 focus:outline-none transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#E8A838]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#E8A838]" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50 bg-[#F0F7FB]/20">
                      <p className="whitespace-pre-wrap">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FULL BLOG READER MODAL */}
      <AnimatePresence>
        {readingBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1A2E]/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-gray-100"
            >
              {/* Close button */}
              <button
                onClick={() => setReadingBlog(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="h-64 sm:h-80 relative overflow-hidden">
                <img
                  src={readingBlog.image}
                  alt={readingBlog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="bg-[#1A7A7A] text-[10px] font-accent font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {readingBlog.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold leading-tight">
                    {readingBlog.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-300 font-accent">
                    <span>⏱️ {readingBlog.readTime}</span>
                    <span>•</span>
                    <span>📅 {readingBlog.date}</span>
                    <span>•</span>
                    <span>By Dr. Dinesh Kumar Agarwal</span>
                  </div>
                </div>
              </div>

              {/* Blog body */}
              <div className="p-6 sm:p-10 space-y-4">
                {/* Introduction Summary */}
                <p className="text-base font-serif italic text-gray-700 border-l-4 border-[#1A7A7A] pl-4 leading-relaxed bg-[#F0F7FB] p-4 rounded-r-2xl">
                  {readingBlog.summary}
                </p>

                {/* Article Content - simple markdown parsing for headings/points */}
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-4 pt-4">
                  {readingBlog.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("## ")) {
                      return (
                        <h4 key={i} className="font-serif text-lg sm:text-xl font-bold text-[#0A2F5A] pt-4">
                          {para.replace("## ", "")}
                        </h4>
                      );
                    }
                    if (para.startsWith("### ")) {
                      return (
                        <h5 key={i} className="font-serif text-base sm:text-lg font-bold text-[#1A7A7A] pt-2">
                          {para.replace("### ", "")}
                        </h5>
                      );
                    }
                    if (para.startsWith("- ") || para.startsWith("1. ")) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                          {para.split("\n").map((li, j) => (
                            <li key={j}>{li.replace(/^(-\s*|\d+\.\s*)/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{para}</p>;
                  })}
                </div>

                <div className="pt-8 border-t border-gray-100 text-center space-y-4">
                  <p className="text-xs text-gray-400">
                    Disclaimer: This article provides validated educational resources but should not substitute individual orthopaedic spine examinations. Consult Dr. Dinesh Kumar Agarwal for custom diagnoses.
                  </p>
                  <button
                    onClick={() => {
                      setReadingBlog(null);
                      // Navigate to book page
                      window.location.href = "/book";
                    }}
                    className="bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Schedule Diagnostic Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
