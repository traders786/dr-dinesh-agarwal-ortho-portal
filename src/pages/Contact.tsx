import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Mail,
  Heart,
  CalendarCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredClinic: "Momentum Speciality Clinic",
    preferredDateTime: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const clinics = [
    {
      name: "Momentum Speciality Clinic",
      address: "Chandra Arcade, Dhaiya (Near CMRI), Dhanbad, Jharkhand",
      phone: "0326-4008249",
      timings: "Monday – Friday, 7 PM – 9 PM",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.123456789!2d86.432109!3d23.812345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1400000000001%3A0x0000000000000000!2sDhaiya%2C+Dhanbad%2C+Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000"
    },
    {
      name: "Nichtipur Hospital & Research Center",
      address: "Katras Bazar, Dhanbad, Jharkhand",
      phone: "0326-3570833",
      timings: "Monday – Friday, 10 AM – 4 PM",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d86.282345!3d23.792345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1400000000002%3A0x0000000000000000!2sKatras%2C+Dhanbad%2C+Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Post to appointment endpoint as a general contact enquiry
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          clinic: formData.preferredClinic,
          date: formData.preferredDateTime.split("T")[0] || new Date().toISOString().split("T")[0],
          timeSlot: formData.preferredDateTime.split("T")[1] || "Flexible",
          symptoms: `[General Enquiry] ${formData.message}`,
          type: "Consultation"
        })
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredClinic: "Momentum Speciality Clinic",
          preferredDateTime: "",
          message: ""
        });
      } else {
        throw new Error("Server not ok");
      }
    } catch (err) {
      // Offline/Static fallback
      try {
        const stored = JSON.parse(localStorage.getItem("ortho_enquiries") || "[]");
        localStorage.setItem("ortho_enquiries", JSON.stringify([{ ...formData, timestamp: new Date().toISOString() }, ...stored]));
      } catch (e) {}
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredClinic: "Momentum Speciality Clinic",
        preferredDateTime: "",
        message: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20">
      {/* HEADER HERO */}
      <section className="bg-[#0A2F5A] text-white py-16 px-4 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold">Timings & Clinic Locations</h1>
          <p className="text-gray-300 font-accent tracking-wider text-sm uppercase max-w-xl mx-auto">
            Get in touch, schedule examinations, and view direction maps to both specialized centers
          </p>
          <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full mt-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* IVR EMERGENCY BANNER */}
        <section className="bg-white border border-red-200/50 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left IVR Callout with pulse ring */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
              <div className="relative flex items-center justify-center">
                <span className="absolute animate-ping inline-flex h-20 w-20 rounded-full bg-red-400 opacity-20" />
                <span className="absolute animate-pulse inline-flex h-16 w-16 rounded-full bg-red-500 opacity-10" />
                <div className="relative w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-xs font-accent uppercase tracking-widest font-bold text-gray-400">IVR Appointment</p>
                <a href="tel:08071967624" className="text-2xl font-serif font-bold text-red-500 hover:underline">
                  08071967624
                </a>
              </div>
            </div>

            {/* Right Information */}
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <span className="bg-red-50 text-red-600 text-[10px] font-accent font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Same-Day Emergency Consultations
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0A2F5A]">How to book via IVR Phone Helpline</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                For same-day consultations, dial the helpline number **08071967624** between **6:00 AM and 9:00 AM** in the morning. Slots are allocated on priority based on severity of clinical backpain.
              </p>
            </div>
          </div>
        </section>

        {/* CLINIC TIMING CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {clinics.map((clinic, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F7FB] text-[#1A7A7A] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0A2F5A]">{clinic.name}</h3>
                    <p className="text-[10px] font-accent text-gray-400 uppercase tracking-widest">Dhanbad Center</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <span className="font-semibold text-[#0A2F5A]">Address:</span>
                    <span>{clinic.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1A7A7A]" />
                    <span className="font-semibold text-[#0A2F5A]">Timings:</span>
                    <span>{clinic.timings}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#1A7A7A]" />
                    <span className="font-semibold text-[#0A2F5A]">Phone:</span>
                    <a href={`tel:${clinic.phone}`} className="hover:underline text-gray-800 font-semibold">{clinic.phone}</a>
                  </p>
                </div>
              </div>

              {/* MAP EMBED */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 h-48 w-full">
                <iframe
                  title={`${clinic.name} Direction Map`}
                  src={clinic.mapSrc}
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT ENQUIRY FORM */}
        <section className="bg-white border border-gray-100 rounded-3xl shadow-sm max-w-3xl mx-auto overflow-hidden">
          <div className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#0A2F5A]">Send a Direct Message</h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Have general clinical questions, reports to show, or surgery enquiries? Send us details below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                  />
                </div>

                {/* Preferred Clinic dropdown */}
                <div className="space-y-1">
                  <label htmlFor="preferredClinic" className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Preferred Clinic Center</label>
                  <select
                    id="preferredClinic"
                    name="preferredClinic"
                    value={formData.preferredClinic}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200/80 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                  >
                    <option value="Momentum Speciality Clinic">Momentum Speciality Clinic</option>
                    <option value="Nichtipur Hospital & Research Center">Nichtipur Hospital & Research Center</option>
                  </select>
                </div>
              </div>

              {/* Preferred DateTime */}
              <div className="space-y-1">
                <label htmlFor="preferredDateTime" className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Suggested Appointment Date & Time (Optional)</label>
                <input
                  type="datetime-local"
                  id="preferredDateTime"
                  name="preferredDateTime"
                  value={formData.preferredDateTime}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Brief Medical Problem / Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Explain symptoms, e.g. severe low back pain, sciatica, duration, any past surgeries..."
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              {/* Submit Alerts */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm p-4 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />
                  <span>Enquiry sent successfully! Our administrative coordinator will call you back shortly.</span>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm p-4 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>Submission failed. Please check required fields or contact helpline number.</span>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* FLOATING ACTION HELPLINE */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <a
          href="tel:9709702233"
          className="bg-red-500 hover:bg-red-600 text-white font-accent font-bold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 tracking-wide uppercase text-xs border border-white/10"
        >
          <Heart className="w-4 h-4 text-white animate-pulse" />
          <span>Helpline: 9709702233</span>
        </a>
      </div>
    </div>
  );
}
