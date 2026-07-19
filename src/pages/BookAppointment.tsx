import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Activity,
  Calendar,
  AlertCircle,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Clock
} from "lucide-react";
import { Appointment } from "../types";
import { api } from "../api";

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    type: "Consultation" as Appointment["type"],
    clinic: "Momentum Speciality Clinic" as Appointment["clinic"],
    date: "",
    timeSlot: "",
    symptoms: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppt, setBookedAppt] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const steps = [
    { num: 1, label: "Personal Details", icon: User },
    { num: 2, label: "Appointment Type", icon: Activity },
    { num: 3, label: "Clinic & Slot", icon: Calendar },
    { num: 4, label: "Symptoms Detail", icon: FileText },
    { num: 5, label: "Review & Booking", icon: CheckCircle2 }
  ];

  const timeSlots = [
    "10:00 AM - 10:15 AM",
    "11:00 AM - 11:15 AM",
    "12:30 PM - 12:45 PM",
    "02:00 PM - 02:15 PM",
    "07:00 PM - 07:15 PM",
    "07:30 PM - 07:45 PM",
    "08:00 PM - 08:15 PM",
    "08:30 PM - 08:45 PM"
  ];

  // Validate step transitions
  const validateStep = (step: number) => {
    setErrorMsg("");
    if (step === 1) {
      if (!formData.name) return "Please enter your full name.";
      if (!formData.age || Number(formData.age) <= 0) return "Please enter a valid age.";
      if (!formData.phone || formData.phone.length < 10) return "Please enter a valid 10-digit mobile number.";
    }
    if (step === 3) {
      if (!formData.date) return "Please pick a preferred date.";
      if (!formData.timeSlot) return "Please select an available appointment time slot.";
    }
    if (step === 4) {
      if (!formData.symptoms) return "Please share a brief description of your symptoms.";
    }
    return "";
  };

  const handleNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      setErrorMsg(error);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectTimeSlot = (slot: string) => {
    setFormData((prev) => ({ ...prev, timeSlot: slot }));
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const apptData = await api.createAppointment(formData);
      setBookedAppt(apptData);
      setCurrentStep(6); // special step for success screen
    } catch (err) {
      setErrorMsg((err as Error).message || "Failed to communicate with booking server. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-[#F0F7FB] min-h-screen pb-20">
      {/* HEADER HERO */}
      <section className="bg-[#0A2F5A] text-white py-12 px-4 mb-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">Book Spinal & Orthopaedic Examination</h1>
          <p className="text-gray-300 font-accent tracking-wider text-xs uppercase max-w-xl mx-auto">
            Book online and receive digital/SMS appointment status confirmations
          </p>
          <div className="w-16 h-1 bg-[#E8A838] mx-auto rounded-full mt-3" />
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4">
        {/* STEP PROGRESS BAR */}
        {currentStep <= 5 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-8 border border-gray-100">
            {/* Visual Progress Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
              <div
                className="absolute inset-y-1/2 left-0 h-0.5 bg-[#1A7A7A] -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
              <div className="flex justify-between items-center relative z-10">
                {steps.map((s) => {
                  const IconComp = s.icon;
                  const isCompleted = currentStep > s.num;
                  const isActive = currentStep === s.num;
                  return (
                    <div key={s.num} className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-[#1A7A7A] border-[#1A7A7A] text-white"
                            : isActive
                            ? "bg-white border-[#0A2F5A] text-[#0A2F5A] shadow-md shadow-[#0A2F5A]/10 scale-110"
                            : "bg-white border-gray-200 text-gray-400"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <IconComp className="w-4 h-4" />}
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-accent uppercase tracking-wider mt-2 hidden sm:block ${
                        isActive ? "text-[#0A2F5A] font-bold" : "text-gray-400"
                      }`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-accent tracking-widest text-[#1A7A7A] uppercase font-bold">
                Step {currentStep} of 5: {steps[currentStep - 1].label}
              </span>
            </div>
          </div>
        )}

        {/* STEP CONTENT BODY */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-md">
          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm p-4 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Patient's Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Patient Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 45"
                    className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200/80 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Mobile Number (For confirmations) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="patient@example.com"
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Appointment Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#0A2F5A] text-center">Select Type of Medical Consultation</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    value: "Consultation",
                    title: "First-Time Consultation",
                    desc: "Comprehensive orthopedic or spinal assessment including initial diagnosis."
                  },
                  {
                    value: "Follow-up",
                    title: "Routine Follow-up",
                    desc: "Checking recovery indices, reviewing recent MRI scans, or medication alterations."
                  },
                  {
                    value: "Surgery",
                    title: "Pre-Surgical Review",
                    desc: "Detailed planning and pre-anaesthesia evaluation for planned spinal or replacement procedures."
                  }
                ].map((item) => (
                  <label
                    key={item.value}
                    onClick={() => setFormData((prev) => ({ ...prev, type: item.value as Appointment["type"] }))}
                    className={`border rounded-2xl p-5 block cursor-pointer transition-all ${
                      formData.type === item.value
                        ? "bg-[#F0F7FB] border-[#1A7A7A] shadow-sm"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="type"
                        value={item.value}
                        checked={formData.type === item.value}
                        onChange={() => {}}
                        className="text-[#1A7A7A] focus:ring-[#1A7A7A]"
                      />
                      <div>
                        <span className="font-serif font-bold text-sm sm:text-base text-[#0A2F5A] block">{item.title}</span>
                        <span className="text-xs text-gray-500 block">{item.desc}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Clinic & Slot Selector */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Preferred Treatment Center</label>
                <select
                  name="clinic"
                  value={formData.clinic}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200/80 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                >
                  <option value="Momentum Speciality Clinic">Momentum Speciality Clinic (Dhaiya, Dhanbad)</option>
                  <option value="Nichtipur Hospital & Research Center">Nichtipur Hospital & Research Center (Katras, Dhanbad)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>

              {/* Slots selector */}
              <div className="space-y-2.5">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Available Consultation Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => selectTimeSlot(slot)}
                        className={`text-xs p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 font-accent ${
                          isSelected
                            ? "bg-[#1A7A7A] border-[#1A7A7A] text-white font-semibold"
                            : "border-gray-100 hover:border-gray-300 text-gray-600 bg-white"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Symptoms Detail */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0A2F5A]">Clinical Condition & Symptoms</h3>
              <div className="space-y-1">
                <label className="block text-xs font-accent uppercase tracking-wider text-gray-500 font-semibold">Briefly explain symptoms & past treatments *</label>
                <textarea
                  name="symptoms"
                  rows={5}
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Explain symptoms, e.g. severe low back pain, sciatica down leg, duration, any previous spinal surgeries, spinal injections..."
                  className="w-full border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1A7A7A]"
                />
              </div>
              <p className="text-xs text-gray-400">
                Sharing specific symptoms helps Dr. Dinesh Kumar Agarwal and medical assistants prepare diagnostic charts before your active evaluation.
              </p>
            </div>
          )}

          {/* STEP 5: Review & Confirm */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#0A2F5A] text-center border-b border-gray-100 pb-2">Review Appointment Credentials</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1 bg-[#F0F7FB] p-4 rounded-xl">
                  <p className="text-gray-400 font-accent uppercase tracking-wider text-[10px]">Patient Profile</p>
                  <p className="font-semibold text-[#0A2F5A]">{formData.name}</p>
                  <p className="text-gray-600">{formData.age} Years Old · {formData.gender}</p>
                  <p className="text-gray-600">📱 {formData.phone}</p>
                  {formData.email && <p className="text-gray-600">✉️ {formData.email}</p>}
                </div>

                <div className="space-y-1 bg-[#F0F7FB] p-4 rounded-xl">
                  <p className="text-gray-400 font-accent uppercase tracking-wider text-[10px]">Appointment Specifications</p>
                  <p className="font-semibold text-[#1A7A7A] uppercase tracking-wide text-xs">{formData.type}</p>
                  <p className="text-gray-800 font-semibold">{formData.clinic}</p>
                  <p className="text-gray-600 font-semibold">📅 {formData.date}</p>
                  <p className="text-gray-600">🕰️ {formData.timeSlot}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-4 rounded-xl">
                ⚠️ **Confirmation Notice**: Final appointment validation is subject to clinic slot confirmation. You will receive an SMS/Call checking credentials within 2 hours.
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  disabled={isSubmitting}
                  className="bg-[#1A7A7A] hover:bg-[#0A2F5A] text-white font-accent font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider shadow-md transition-all inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? "Finalizing Booking..." : "Confirm & Book Slot"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS SCREEN (Step 6) */}
          {currentStep === 6 && bookedAppt && (
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-[#0A2F5A]">Appointment Registered!</h2>
                <p className="text-sm text-gray-500">
                  Your clinical slot for Dr. Dinesh Kumar Agarwal has been successfully logged under ID:
                </p>
                <code className="bg-[#F0F7FB] border border-[#1A7A7A]/10 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#1A7A7A] inline-block">
                  {bookedAppt.id}
                </code>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6 bg-[#F0F7FB]/50 max-w-md mx-auto text-left space-y-1.5 text-xs sm:text-sm text-gray-600">
                <p><strong className="text-[#0A2F5A]">Patient:</strong> {bookedAppt.name}</p>
                <p><strong className="text-[#0A2F5A]">Center:</strong> {bookedAppt.clinic}</p>
                <p><strong className="text-[#0A2F5A]">Consultation Date:</strong> {bookedAppt.date}</p>
                <p><strong className="text-[#0A2F5A]">Time Slot:</strong> {bookedAppt.timeSlot}</p>
                <p><strong className="text-[#0A2F5A]">Status:</strong> <span className="bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded text-[10px] uppercase">{bookedAppt.status}</span></p>
              </div>

              <p className="text-xs text-gray-400">
                An automatic SMS confirmation request has been sent to **+91 {bookedAppt.phone}**. For changes or same-day cancellations, please call clinic phone lines.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: "",
                      age: "",
                      gender: "Male",
                      phone: "",
                      email: "",
                      type: "Consultation",
                      clinic: "Momentum Speciality Clinic",
                      date: "",
                      timeSlot: "",
                      symptoms: ""
                    });
                    setBookedAppt(null);
                    setCurrentStep(1);
                  }}
                  className="bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}

          {/* Step controls */}
          {currentStep <= 5 && (
            <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="font-accent text-xs font-bold text-gray-500 hover:text-gray-800 inline-flex items-center gap-1 uppercase tracking-wider disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {currentStep < 5 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0A2F5A] hover:bg-[#1A7A7A] text-white font-accent text-xs font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-1"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
