"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Sparkles,
  User,
} from "lucide-react";

const WHATSAPP_NUMBER = "27837212432";

const services = [
  {
    id: "general-repairs",
    name: "General repairs",
    category: "Repairs",
    description: "Professional repairs for everyday clothing and garments.",
  },
  {
    id: "invisible-seams",
    name: "Invisible seams",
    category: "Repairs",
    description: "Precise, discreet repairs designed to preserve the original look.",
  },
  {
    id: "childrens-clothing-alterations",
    name: "Children's clothing alterations",
    category: "Alterations",
    description: "Careful alterations for children's clothing and growing sizes.",
  },
  {
    id: "leather-repair",
    name: "Leather repair",
    category: "Repairs",
    description: "Specialist repair work for leather garments and items.",
  },
  {
    id: "mens-clothing-alterations",
    name: "Men's clothing alterations",
    category: "Alterations",
    description: "Professional alterations for shirts, jackets, trousers and more.",
  },
  {
    id: "trouser-alterations",
    name: "Trouser alterations",
    category: "Alterations",
    description: "Waist, length, tapering and fit adjustments.",
  },
  {
    id: "shirt-tailoring",
    name: "Shirt tailoring",
    category: "Tailoring",
    description: "Custom adjustments and tailoring for a refined fit.",
  },
  {
    id: "suit-tailoring",
    name: "Suit tailoring",
    category: "Tailoring",
    description: "Precision tailoring to achieve a sharp, personal fit.",
  },
  {
    id: "uniform-tailoring",
    name: "Uniform tailoring",
    category: "Tailoring",
    description: "Reliable tailoring and alterations for uniforms.",
  },
  {
    id: "waist-adjustments",
    name: "Waist adjustments",
    category: "Alterations",
    description: "Precise waist adjustments for a more comfortable fit.",
  },
  {
    id: "wedding-dress-alterations",
    name: "Wedding dress alterations",
    category: "Bridal",
    description: "Delicate alterations for one of life's most important garments.",
  },
  {
    id: "womens-clothing-alterations",
    name: "Women's clothing alterations",
    category: "Alterations",
    description: "Expert alterations across dresses, skirts, jackets and more.",
  },
];

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const steps = [
  {
    number: 1,
    label: "Service",
  },
  {
    number: 2,
    label: "Date & time",
  },
  {
    number: 3,
    label: "Your details",
  },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId),
    [serviceId]
  );

  const minimumDate = new Date().toISOString().split("T")[0];

  function canContinue() {
    if (step === 1) return Boolean(serviceId);
    if (step === 2) return Boolean(date && time);
    if (step === 3) {
      return Boolean(name.trim() && phone.trim());
    }

    return false;
  }

  function nextStep() {
    if (!canContinue()) return;

    if (step < 3) {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  }

  function submitBooking() {
    if (!canContinue() || !selectedService) return;

    const message = [
      "Hello, I would like to book an appointment.",
      "",
      `Service: ${selectedService.name}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : "",
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    setSubmitted(true);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  function resetBooking() {
    setStep(1);
    setServiceId("");
    setDate("");
    setTime("");
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-20%] top-[-15%] h-[500px] w-[500px] rounded-full bg-[#c9a35a]/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#c9a35a]/[0.05] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.08] bg-[#0b0b0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition group-hover:border-[#c9a35a]/40 group-hover:bg-[#c9a35a]/10">
              <ArrowLeft className="h-4 w-4" />
            </span>

            <span className="hidden sm:inline">Back to website</span>
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a35a]">
              Cape Town
            </p>

            <p className="mt-1 text-sm font-medium tracking-[0.18em] text-white">
              BESPOKE TAILORING
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-[#c9a35a]/40 hover:bg-[#c9a35a]/10 hover:text-[#c9a35a]"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        {/* Intro */}
        <section className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a35a]/30 bg-[#c9a35a]/10">
              <Scissors className="h-5 w-5 text-[#c9a35a]" />
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#c9a35a]">
              Appointment
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Let&apos;s create the
              <span className="block font-serif italic text-[#c9a35a]">
                perfect fit.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Tell us what you need and your preferred time. We&apos;ll
              confirm your appointment and take care of the rest.
            </p>
          </motion.div>
        </section>

        {/* Steps */}
        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <div className="flex items-center justify-center">
            {steps.map((item, index) => {
              const active = step === item.number;
              const complete = step > item.number;

              return (
                <div key={item.number} className="flex items-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-all sm:h-9 sm:w-9",
                        complete
                          ? "border-[#c9a35a] bg-[#c9a35a] text-[#0b0b0a]"
                          : active
                            ? "border-[#c9a35a] bg-[#c9a35a]/10 text-[#c9a35a]"
                            : "border-white/10 bg-white/[0.03] text-white/30",
                      ].join(" ")}
                    >
                      {complete ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        item.number
                      )}
                    </div>

                    <span
                      className={[
                        "hidden text-xs transition sm:block",
                        active || complete
                          ? "text-white"
                          : "text-white/30",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={[
                        "mx-3 h-px w-8 sm:mx-5 sm:w-14",
                        step > item.number
                          ? "bg-[#c9a35a]"
                          : "bg-white/10",
                      ].join(" ")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Card */}
        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <motion.div
            layout
            className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-[32px]"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 sm:p-8 lg:p-10"
                >
                  {/* Step 1 */}
                  {step === 1 && (
                    <div>
                      <div className="mb-7">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#c9a35a]">
                          Step 01
                        </p>

                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">
                          What can we help you with?
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                          Select the service you&apos;re interested in.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {services.map((service) => {
                          const selected = serviceId === service.id;

                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => setServiceId(service.id)}
                              className={[
                                "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                                selected
                                  ? "border-[#c9a35a]/60 bg-[#c9a35a]/10"
                                  : "border-white/[0.08] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]",
                              ].join(" ")}
                            >
                              {selected && (
                                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a35a] text-[#0b0b0a]">
                                  <Check className="h-3 w-3" />
                                </div>
                              )}

                              <div className="pr-7">
                                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9a35a]">
                                  {service.category}
                                </span>

                                <h3 className="mt-2 text-sm font-medium text-white">
                                  {service.name}
                                </h3>

                                <p className="mt-2 text-xs leading-5 text-white/35">
                                  {service.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div>
                      <div className="mb-7">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#c9a35a]">
                          Step 02
                        </p>

                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">
                          When would you like to visit?
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                          Choose your preferred date and time.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="booking-date"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/50"
                          >
                            Preferred date
                          </label>

                          <input
                            id="booking-date"
                            type="date"
                            min={minimumDate}
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition focus:border-[#c9a35a]/60 [color-scheme:dark]"
                          />
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <label
                              htmlFor="booking-time"
                              className="block text-xs font-medium uppercase tracking-[0.18em] text-white/50"
                            >
                              Preferred time
                            </label>

                            <span className="text-xs text-white/30">
                              Mon – Sat
                            </span>
                          </div>

                          <div className="relative">
                            <select
                              id="booking-time"
                              value={time}
                              onChange={(event) => setTime(event.target.value)}
                              className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-black/20 px-4 pr-12 text-sm text-white outline-none transition focus:border-[#c9a35a]/60"
                            >
                              <option value="" className="bg-[#151513]">
                                Select a time
                              </option>

                              {timeSlots.map((slot) => (
                                <option
                                  key={slot}
                                  value={slot}
                                  className="bg-[#151513]"
                                >
                                  {slot}
                                </option>
                              ))}
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                          </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-2xl border border-[#c9a35a]/15 bg-[#c9a35a]/[0.04] p-4">
                          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a35a]" />

                          <p className="text-xs leading-5 text-white/40">
                            Your selected time is a preferred appointment
                            time. We&apos;ll confirm availability with you on
                            WhatsApp.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div>
                      <div className="mb-7">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#c9a35a]">
                          Step 03
                        </p>

                        <h2 className="mt-2 text-2xl font-light sm:text-3xl">
                          Tell us about yourself.
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                          We&apos;ll use these details to confirm your
                          appointment.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label
                            htmlFor="booking-name"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/50"
                          >
                            Full name *
                          </label>

                          <div className="relative">
                            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

                            <input
                              id="booking-name"
                              type="text"
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                              placeholder="Your full name"
                              className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#c9a35a]/60"
                            />
                          </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="booking-phone"
                              className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/50"
                            >
                              Phone / WhatsApp *
                            </label>

                            <div className="relative">
                              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

                              <input
                                id="booking-phone"
                                type="tel"
                                value={phone}
                                onChange={(event) =>
                                  setPhone(event.target.value)
                                }
                                placeholder="+27 ..."
                                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#c9a35a]/60"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="booking-email"
                              className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/50"
                            >
                              Email
                            </label>

                            <div className="relative">
                              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

                              <input
                                id="booking-email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-[#c9a35a]/60"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="booking-notes"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-white/50"
                          >
                            Anything else we should know?
                          </label>

                          <textarea
                            id="booking-notes"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            placeholder="Tell us about the garment, fitting requirements, deadline, or anything else..."
                            rows={5}
                            className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/20 transition focus:border-[#c9a35a]/60"
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-7 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a35a]">
                          Appointment summary
                        </p>

                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <p className="text-xs text-white/30">Service</p>
                            <p className="mt-1 text-white/80">
                              {selectedService?.name}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-white/30">Date</p>
                            <p className="mt-1 text-white/80">{date}</p>
                          </div>

                          <div>
                            <p className="text-xs text-white/30">Time</p>
                            <p className="mt-1 text-white/80">{time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-6">
                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={step === 1}
                      className={[
                        "inline-flex items-center gap-2 text-sm transition",
                        step === 1
                          ? "pointer-events-none text-white/15"
                          : "text-white/50 hover:text-white",
                      ].join(" ")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!canContinue()}
                        className={[
                          "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition-all",
                          canContinue()
                            ? "bg-[#c9a35a] text-[#0b0b0a] shadow-lg shadow-[#c9a35a]/10 hover:bg-[#d8b76e]"
                            : "cursor-not-allowed bg-white/10 text-white/25",
                        ].join(" ")}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={submitBooking}
                        disabled={!canContinue()}
                        className={[
                          "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition-all",
                          canContinue()
                            ? "bg-[#c9a35a] text-[#0b0b0a] shadow-lg shadow-[#c9a35a]/10 hover:bg-[#d8b76e]"
                            : "cursor-not-allowed bg-white/10 text-white/25",
                        ].join(" ")}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Request Appointment
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 py-16 text-center sm:px-10 sm:py-20"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a35a]/30 bg-[#c9a35a]/10">
                    <Check className="h-7 w-7 text-[#c9a35a]" />
                  </div>

                  <p className="mt-7 text-xs uppercase tracking-[0.3em] text-[#c9a35a]">
                    Request received
                  </p>

                  <h2 className="mt-3 text-3xl font-light sm:text-4xl">
                    Almost there.
                  </h2>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/45">
                    WhatsApp has opened with your appointment details. Send
                    the message to complete your booking request.
                  </p>

                  <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/[0.08] bg-black/20 p-5 text-left">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a35a]" />

                      <div>
                        <p className="text-sm text-white/80">
                          {selectedService?.name}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          {date} at {time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c9a35a] px-6 text-sm font-medium text-[#0b0b0a] transition hover:bg-[#d8b76e]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Open WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={resetBooking}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
                    >
                      Make another request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Contact / location */}
        <section className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <MapPin className="h-4 w-4 text-[#c9a35a]" />
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/30">
              Location
            </p>
            <p className="mt-1 text-sm text-white/70">Cape Town</p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <Clock3 className="h-4 w-4 text-[#c9a35a]" />
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/30">
              Hours
            </p>
            <p className="mt-1 text-sm text-white/70">Mon – Sat</p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <Phone className="h-4 w-4 text-[#c9a35a]" />
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/30">
              WhatsApp
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-white/70 transition hover:text-[#c9a35a]"
            >
              +27 83 721 2432
            </a>
          </div>
        </section>

        <p className="mt-10 text-center text-[11px] leading-5 text-white/20">
          Appointment requests are subject to availability. We&apos;ll
          confirm your requested time directly with you.
        </p>
      </div>
    </main>
  );
}
