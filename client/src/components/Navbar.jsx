import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BsCoin, BsRobot, BsChevronDown } from "react-icons/bs";
import { FaUserAstronaut, FaHistory } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useOutsideClick } from "../utils/outsideClick";
import AuthModel from "./AuthModel";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const creditRef = useOutsideClick(() => setShowCreditPopup(false));
  const userRef = useOutsideClick(() => setShowUserPopup(false));
  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${ServerUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      sessionStorage.clear();

      dispatch(setUserData(null));

      setShowCreditPopup(false);
      setShowUserPopup(false);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Popup Animation Variants
  const popupVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 8, scale: 0.95 },
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 pt-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2rem] px-6 md:px-10 py-3 flex justify-between items-center pointer-events-auto"
      >
        {/* Logo Section */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 text-white p-2.5 rounded-2xl shadow-lg group-hover:rotate-6 transition-transform duration-300">
            <BsRobot size={22} />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-slate-800 hidden md:block">
            InterView
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
              IQ.AI
            </span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          {/* Credit Pill */}
          <div ref={creditRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2.5 bg-slate-100/50 hover:bg-white border border-slate-200/60 px-4 py-2 rounded-full transition-all cursor-pointer group"
            >
              <BsCoin
                className="text-amber-500 group-hover:rotate-12 transition-transform"
                size={20}
              />
              <span className="font-bold text-slate-700">
                {userData?.credits || 0}
              </span>
              <BsChevronDown
                size={12}
                className={`text-slate-400 transition-transform duration-300 ${showCreditPopup ? "rotate-180" : ""}`}
              />
            </motion.button>

            <AnimatePresence>
              {showCreditPopup && (
                <motion.div
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group absolute top-full mt-4 w-[95vw] sm:w-[360px] max-w-[360px] left-1/2 sm:left-auto -translate-x-[63%] sm:translate-x-5 right-auto sm:right-0 rounded-[24px] sm:rounded-[32px] border border-white/30 bg-white/80 backdrop-blur-2xl shadow-[0_25px_80px_-20px_rgba(15,23,42,0.22)] transition-all duration-500 p-4 sm:p-7 z-50 origin-top-right overflow-hidden"
                >
                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] ring-1 ring-inset ring-white/40 pointer-events-none" />

                  {/* Ambient Glows */}
                  <div className="absolute -top-28 -right-20 w-40 sm:w-56 h-40 sm:h-56 bg-indigo-200/40 rounded-full blur-3xl" />

                  <div className="absolute -bottom-28 -left-20 w-40 sm:w-56 h-40 sm:h-56 bg-fuchsia-200/30 rounded-full blur-3xl" />

                  {/* Top Gradient Line */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

                  <div className="relative">
                    {/* Credits Badge */}
                    <div className="inline-flex items-center gap-3 px-3 sm:px-4 py-2 rounded-full bg-white/75 border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
                        <BsCoin className="text-emerald-500" size={16} />
                      </div>

                      <div className="flex flex-col leading-none">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold text-slate-400">
                          Credits
                        </span>

                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {userData?.credits || 0} remaining
                        </span>
                      </div>

                      <div className="ml-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Heading */}
                    <div className="mt-3">
                      <h3 className="text-[20px] sm:text-[24px] leading-[1.2] tracking-tight font-bold text-slate-900">
                        Continue your{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                          AI interview preparation
                        </span>
                      </h3>

                      <p className="mt-4 text-[13px] sm:text-[15px] leading-6 sm:leading-7 text-slate-600">
                        Unlock more{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-bold">
                          sessions, deeper feedback, and uninterrupted
                        </span>{" "}
                        practice whenever you need it.
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                          Remaining credits
                        </span>

                        <span className="text-[11px] sm:text-xs font-semibold text-slate-700">
                          {userData?.credits || 0}/100
                        </span>
                      </div>

                      <div className="h-[6px] rounded-full bg-slate-200/70 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(userData?.credits || 0, 100)}%`,
                          }}
                          transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`h-full rounded-full transition-all duration-100 ${
                            (userData?.credits || 0) < 100
                              ? "bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400"
                              : "bg-gradient-to-r from-emerald-500 via-indigo-500 to-violet-500"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Primary Button */}
                    <button
                      onClick={() => navigate("/pricing")}
                      className="group/button relative mt-5 w-full overflow-hidden bg-slate-900 py-3 sm:py-4  text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.015] hover:-translate-y-[1px] hover:shadow-[0_20px_45px_rgba(79,70,229,0.35)] active:scale-[0.985] rounded-2xl sm:rounded-3xl cursor-pointer "
                    >
                      {/* Hover Gradient */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />

                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get More Credits
                      </span>
                    </button>

                    {/* Secondary Button */}
                    <button
                      onClick={() => setShowCreditPopup(false)}
                      className=" mt-4 w-full text-xs sm:text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer underline font-bold "
                    >
                      Maybe later
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div ref={userRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className="group relative w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white overflow-hidden border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer transition-shadow hover:shadow-indigo-500/20"
            >
              {userData ? (
                userData.image ? (
                  <img
                    src={userData?.image}
                    alt="user"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="font-bold text-sm tracking-tight">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )
              ) : (
                <FaUserAstronaut
                  size={18}
                  className="text-slate-400 group-hover:text-white transition-colors"
                />
              )}
            </motion.button>

            <AnimatePresence>
              {showUserPopup && (
                <motion.div
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-64 bg-white/80 backdrop-blur-2xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden z-50 origin-top-right"
                >
                  {/* Header Section */}
                  <div className="px-5 py-4 bg-gradient-to-b from-slate-50/50 to-transparent">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">
                      Account Workspace
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                          {userData?.image ? (
                            <img
                              src={userData.image}
                              alt="avatar"
                              referrerPolicy="no-referrer"
                              crossOrigin="anon"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            userData?.name?.charAt(0).toUpperCase()
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 truncate text-sm leading-none mb-1">
                          {userData?.name}
                        </span>
                        <span className="text-xs text-slate-500 truncate leading-none">
                          {userData?.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Actions */}
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => navigate("/history")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100/80 text-slate-600 hover:text-indigo-600 font-medium transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                        <FaHistory size={14} />
                      </div>
                      <span className="text-[13px]">Activity History</span>
                    </button>

                    <div className="h-px bg-slate-100 my-1 mx-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50/50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                        <HiOutlineLogout size={16} />
                      </div>
                      <span className="text-[13px]">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </nav>
  );
};

export default Navbar;
