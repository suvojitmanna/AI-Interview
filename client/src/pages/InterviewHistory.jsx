import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

import { ServerUrl } from "../App";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaBriefcase,
  FaChartLine,
  FaTrophy,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("down");
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (!previous) return;
    if (latest > previous) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
  });

  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const rotateGlow = useTransform(scrollY, [0, 1000], [0, 25]);
  const headerScale = useTransform(scrollY, [0, 200], [1, 0.96]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.92]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const getMyInterview = async () => {
      try {
        const result = await axios.get(
          `${ServerUrl}/api/interview/get-interview`,
          {
            withCredentials: true,
          },
        );
        setInterviews(result.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    getMyInterview();
  }, []);

  // Rating Helper: Logic to render stars based on 0-10 score
  const renderStars = (score) => {
    const starValue = score / 2; 
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= starValue) {
        stars.push(<FaStar key={i} className="text-amber-400" />);
      } else if (i - 0.5 <= starValue) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const completedInterviews = interviews.filter(
    (item) => item.status === "completed",
  );

  const averageScore =
    completedInterviews.length > 0
      ? (
          completedInterviews.reduce(
            (acc, curr) => acc + (curr.finalScore || 0),
            0,
          ) / completedInterviews.length
        ).toFixed(1)
      : 0;

  const bestScore =
    completedInterviews.length > 0
      ? Math.max(...completedInterviews.map((i) => i.finalScore || 0))
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-10 px-4"
    >
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <motion.div
        style={{
          y: y1,
          rotate: rotateGlow,
        }}
        className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-emerald-300/20 blur-3xl rounded-full"
      />
      <motion.div
        style={{
          y: y2,
          rotate: rotateGlow,
        }}
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-cyan-300/20 blur-3xl rounded-full"
      />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          animate={{
            y: scrollDirection === "down" ? -8 : 0,
            scale: scrollDirection === "down" ? 0.985 : 1,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          style={{
            scale: headerScale,
            opacity: headerOpacity,
          }}
          className="sticky top-4 z-50 backdrop-blur-2xl bg-white/70 border border-white/50 rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate("/")}
                className="group p-4 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all duration-300 shadow-sm"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              </button>

              <div>
                <h1 className="text-4xl font-black tracking-tight text-gray-900">
                  Interview <span className="text-emerald-600">History</span>
                </h1>

                <p className="text-gray-500 mt-2 font-medium">
                  Review your interview reports and analytics.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white/80 border border-gray-100 rounded-2xl px-5 py-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                    <FaBriefcase />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                      Total
                    </p>
                    <h3 className="text-2xl font-black text-gray-800">
                      {interviews.length}
                    </h3>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white/80 border border-gray-100 rounded-2xl px-5 py-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600">
                    <FaChartLine />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                      Average
                    </p>
                    <h3 className="text-2xl font-black text-gray-800">
                      {averageScore}
                    </h3>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white/80 border border-gray-100 rounded-2xl px-5 py-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
                    <FaTrophy />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                      Best
                    </p>
                    <h3 className="text-2xl font-black text-gray-800">
                      {bestScore}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-36 rounded-3xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : interviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-2xl border border-white rounded-3xl p-16 text-center shadow-xl"
          >
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(16,185,129,0.25)] animate-pulse">
                <FaBriefcase className="text-emerald-600 text-3xl" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                No Interviews Yet
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Start your first mock interview and track your growth like a
                pro.
              </p>

              <button
                onClick={() => navigate("/start")}
                className="mt-8 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-300 hover:scale-105"
              >
                Start Interview
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6"
          >
            {interviews.map((item, index) => {
              const score = item.finalScore || 0;

              const gradId = `grad-${index}`;

              const scoreColor =
                score >= 8
                  ? "text-emerald-500"
                  : score >= 5
                    ? "text-amber-500"
                    : "text-rose-500";

              const progressOffset = 214 - (214 * score) / 10;

              return (
                <motion.div
                  key={item.id || index}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -180 : 180,
                    y: 100,
                    scale: 0.8,
                    rotate: index % 2 === 0 ? -8 : 8,
                    filter: "blur(14px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.03,
                    rotateX: 5,
                    rotateY: 5,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                  onClick={() => navigate(`/report/${item._id}`)}
                  className={`group relative cursor-pointer rounded-[32px] p-[1px] overflow-hidden ${
                    scrollDirection === "down"
                      ? "translate-y-[2px]"
                      : "-translate-y-[2px]"
                  }`}
                >
                  {/* Animated Border */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-[32px] opacity-100 bg-[linear-gradient(120deg,#10B981,#06B6D4,#8B5CF6,#10B981)] bg-[length:300%_300%]"
                  />

                  {/* Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-400/20 blur-3xl rounded-full"
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{
                      boxShadow: "0 30px 80px rgba(16,185,129,0.20)",
                    }}
                    className="relative h-full rounded-[30px] bg-white/85 backdrop-blur-2xl border border-white/60 p-7 overflow-hidden transition-all duration-500"
                  >
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] [background-size:20px_20px]" />

                    {/* Hover Shine */}
                    <motion.div
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "220%" }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />

                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                      {/* Left Side */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          <motion.span
                            whileHover={{ scale: 1.08 }}
                            className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${
                              item.status === "completed"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {item.status}
                          </motion.span>

                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <FaCalendarAlt size={12} />
                            {new Date(item.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </div>

                        {/* Role */}
                        <motion.h2
                          whileHover={{ x: 6 }}
                          className="text-3xl font-black tracking-tight text-gray-800 group-hover:text-emerald-600 transition-all duration-300"
                        >
                          {item.role}
                        </motion.h2>

                        {/* Rating Component */}
                        <div className="flex items-center gap-1 mt-2 mb-4">
                          {renderStars(item.finalScore || 0)}
                          <span className="text-xs font-bold text-gray-400 ml-2">
                            ({((item.finalScore || 0) / 2).toFixed(1)} / 5)
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-3 mt-5">
                          <motion.span
                            whileHover={{ scale: 1.06 }}
                            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
                          >
                            {item.experience}
                          </motion.span>

                          <span className="text-gray-300">•</span>

                          <motion.span
                            whileHover={{ scale: 1.06 }}
                            className="px-4 py-2 rounded-xl bg-cyan-50 text-cyan-700 text-sm font-semibold capitalize"
                          >
                            {item.mode} Mode
                          </motion.span>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-6 lg:pt-0">
                        {/* Score Circle */}
                        <motion.div
                          initial={{ rotate: -180, scale: 0 }}
                          whileInView={{ rotate: 0, scale: 1 }}
                          transition={{
                            duration: 1.2,
                            type: "spring",
                          }}
                          className="relative w-28 h-28"
                        >
                          <svg className="w-28 h-28 rotate-[-90deg]">
                            <circle
                              cx="56"
                              cy="56"
                              r="40"
                              stroke="#E5E7EB"
                              strokeWidth="8"
                              fill="none"
                            />

                            <motion.circle
                              cx="56"
                              cy="56"
                              r="40"
                              stroke={`url(#grad-${index})`}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray="251"
                              initial={{ strokeDashoffset: 251 }}
                              whileInView={{
                                strokeDashoffset:
                                  251 - (251 * (item.finalScore || 0)) / 10,
                              }}
                              transition={{
                                duration: 1.8,
                                ease: "easeOut",
                              }}
                              strokeLinecap="round"
                            />

                            <defs>
                              <linearGradient
                                id={`grad-${index}`}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop offset="0%" stopColor="#10B981" />
                                <stop offset="100%" stopColor="#06B6D4" />
                              </linearGradient>
                            </defs>
                          </svg>

                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              className={`text-3xl font-black ${
                                item.finalScore >= 8
                                  ? "text-emerald-500"
                                  : item.finalScore >= 5
                                    ? "text-amber-500"
                                    : "text-rose-500"
                              }`}
                            >
                              {item.finalScore || 0}
                            </motion.span>

                            <span className="text-[10px] uppercase text-gray-400 tracking-[3px] font-bold">
                              SCORE
                            </span>
                          </div>
                        </motion.div>

                        {/* Arrow Button */}
                        <motion.div
                          whileHover={{
                            x: 10,
                            rotate: -10,
                            scale: 1.12,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          className="p-5 rounded-2xl bg-gray-50 text-gray-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-md"
                        >
                          <HiOutlineArrowNarrowRight size={28} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Animated Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom Fade */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-10" />
    </motion.div>
  );
};

export default InterviewHistory;
