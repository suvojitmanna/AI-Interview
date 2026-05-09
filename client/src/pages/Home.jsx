import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CountUpModule from "react-countup";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import { BsClock, BsFileEarmarkText, BsMic, BsRobot } from "react-icons/bs";
import ai_ans from "../assets/ai-ans.png";
import config from "../assets/confi.png";
import credit from "../assets/credit.png";
import history from "../assets/history.png";
import HR from "../assets/HR.png";
import MM from "../assets/MM.png";
import pdf from "../assets/pdf.png";
import tech from "../assets/tech.png";
import resume from "../assets/resume.png";
import { BiBarChart } from "react-icons/bi";
import Footer from "../components/Footer";

const CountUp = CountUpModule.default || CountUpModule;
const Home = () => {

  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-green-50/40 to-white" />

            <div className="absolute top-10 sm:top-20 left-1/2 -translate-x-1/2 w-[280px] sm:w-[400px] lg:w-[500px] h-[280px] sm:h-[400px] lg:h-[500px] bg-green-200/20 blur-3xl rounded-full" />

            {/* Top Badge */}
            <div className="flex justify-center mb-6 sm:mb-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 sm:px-5 py-2 rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.08)] flex items-center gap-2 hover:shadow-[0_12px_50px_rgba(34,197,94,0.15)] transition-all duration-300">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                    <HiSparkles size={14} className="text-white" />
                  </div>

                  <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-700 text-center">
                    AI Powered Smart Interview Platform
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Hero Section */}
            <div className="text-center max-w-6xl mx-auto px-4 sm:px-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight text-gray-900"
              >
                Practice interviews with <br />
                <span className="relative inline-flex items-center mt-3 sm:mt-4">
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30 blur-2xl rounded-full" />

                  <span className="relative bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    AI Intelligence
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto px-2"
              >
                Role-based mock interviews with intelligent follow-ups, adaptive
                difficulty, voice interaction and real-time AI performance
                evaluation.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-5 mt-10 sm:mt-14"
              >
                {/* Primary Button */}
                <motion.button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate("/interview");
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden bg-black text-white w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-medium shadow-[0_15px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Interview
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate("/history");
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-800 w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-medium shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] hover:border-gray-300 transition-all duration-300 cursor-pointer"
                >
                  View History
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 1.5,
                  ease: "easeOut",
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mt-14 sm:mt-16 text-sm text-gray-500"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center">
                    <CountUp end={100} duration={4} suffix="K+" />
                  </span>
                  <p className="mt-1 text-gray-600">Interviews Completed</p>
                </div>

                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center">
                    <CountUp end={95} duration={4} suffix="%" />
                  </span>
                  <p className="mt-1 text-gray-600">Accuracy Feedback</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center">
                    <CountUp end={24} duration={4} suffix="/7" />
                  </span>
                  <p className="mt-1 text-gray-600">AI Availability</p>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-15">
            {[
              {
                icon: <BsRobot size={24} />,
                step: "STEP-1",
                title: "Role & Experience Selection",
                desc: "AI adjust difficulty based on selected job role.",
              },
              {
                icon: <BsMic size={24} />,
                step: "STEP-2",
                title: "Smart Voice Interview",
                desc: "Dynamic follow-up questions based on your answers.",
              },
              {
                icon: <BsClock size={24} />,
                step: "STEP-3",
                title: "Timer Based simulation",
                desc: "Real interview pressure with time tracking.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.2 }}
                whileHover={{ duration: 0.8, scale: 1.06 }}
                className={`relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-600 p-10 w-80 max-w-[90%] shadow-md hover:shadow-2xl transition-all duration-300
            ${index === 0 ? "rotate-[-4deg]" : ""}
            ${index === 1 ? "rotate-[-3deg] md:mt-6 shadow-xl" : ""}
            ${index === 2 ? "rotate-[-4deg]" : ""}
            `}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ">
                  {item.icon}
                </div>
                <div className="pt-10 text-center">
                  <div className="text-xs text-green-600 font-semibold mb-2 tracking-wider">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg ">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}{" "}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="relative mb-15">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                Advanced AI{" "}
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Capabilities
                </span>
              </h2>

              <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
                Experience next-generation AI interview simulations powered by
                intelligent analysis, adaptive questioning, and real-time
                feedback.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  image: ai_ans,
                  icon: <BiBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Advanced AI analyzes communication clarity, technical depth, confidence, and delivery in real time.",
                },
                {
                  image: resume,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Interview",
                  desc: "Generate personalized interview questions based on your resume, projects, and experience.",
                },
                {
                  image: pdf,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Download PDF Reports",
                  desc: "Receive detailed reports with strengths, weaknesses, AI insights, and improvement strategies.",
                },
                {
                  image: history,
                  icon: <BiBarChart size={20} />,
                  title: "History & Analytics",
                  desc: "Track interview growth with performance analytics, scoring trends, and topic-level insights.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="group relative overflow-hidden  rounded-[32px] border border-white/40  bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(34,197,94,0.16)] transition-all duration-500 "
                >
                  {/* Glow Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-100 opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-center">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 p-6">
                      <div className=" relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-100  to-emerald-50 p-4 ">
                        <img
                          src={item.image}
                          alt={item.title}
                          className=" w-full h-auto object-contain max-h-72 transition-transform duration-700 group-hover:scale-105
                "
                        />

                        {/* Decorative Blur */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300/30 blur-3xl rounded-full" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 p-8 lg:pr-10">
                      {/* Icon */}
                      <div className=" mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(34,197,94,0.35)] ">
                        {item.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-[15px]">
                        {item.desc}
                      </p>

                      {/* Small Accent Line */}
                      <div className="mt-6 w-14 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative mb-15">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Multiple Interview{" "}
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Models
                </span>
              </h2>

              <p className="mt-4 text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
                Simulate different interview environments with AI-powered
                adaptive questioning and personalized evaluations.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  image: HR,
                  title: "HR Interview Mode",
                  desc: "Behavioral and communication-focused interview simulations.",
                },
                {
                  image: tech,
                  title: "Technical Interview Mode",
                  desc: "Role-specific technical interviews with adaptive AI questions.",
                },
                {
                  image: config,
                  title: "Confidence Detection",
                  desc: "Analyze speaking confidence, tone, and hesitation patterns.",
                },
                {
                  image: credit,
                  title: "Flexible Credit System",
                  desc: "Unlock premium AI interview sessions and advanced analytics.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.18,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.01,
                  }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(34,197,94,0.12)] transition-all duration-500"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-100 opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-3 p-4 lg:p-5">
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                      <div className=" relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-100  to-emerald-50 p-3 ">
                        <img
                          src={item.image}
                          alt={item.title}
                          className=" w-full h-auto object-contain max-h-44 transition-transform duration-700 group-hover:scale-105 "
                        />

                        {/* Blur Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-green-300/20 blur-3xl rounded-full" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                      {/* Mini Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold tracking-wider mb-4">
                        AI POWERED
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.desc}
                      </p>

                      {/* Bottom Accent */}
                      <div className="mt-5 w-14 h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white">
        <div className="max-w-6xl w-full mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
