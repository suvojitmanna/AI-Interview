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
      await axios.get(`${ServerUrl}/api/auth/logout`, {
        withCredentials: true,
      });

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
                  className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6 z-50 origin-top-right"
                >
                  <p className="text-sm font-medium text-slate-500 mb-4 leading-relaxed">
                    Ready to ace your next session? Your credits allow for
                    unlimited AI practice.
                  </p>
                  <button
                    onClick={() => navigate("/pricing")}
                    className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-2xl font-semibold shadow-xl shadow-indigo-100 transition-all cursor-pointer"
                  >
                    Get More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div ref={userRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }}
              className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white overflow-hidden border-2 border-white shadow-md cursor-pointer"
            >
              {userData ? (
                userData.image ? (
                  <img
                    src={userData?.image}
                    alt="user"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-bold tracking-tighter">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )
              ) : (
                <FaUserAstronaut size={20} />
              )}
            </motion.button>

            <AnimatePresence>
              {showUserPopup && (
                <motion.div
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-4 w-60 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 origin-top-right"
                >
                  <div className="px-6 py-5 border-b border-white/20 bg-gradient-to-br from-slate-50/80 to-white/40 backdrop-blur-xl">
                    {/* Label */}
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-2">
                      Account
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {userData?.image ? (
                          <img
                            src={userData.image}
                            alt="user"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          userData?.name?.charAt(0).toUpperCase()
                        )}
                      </div>

                      {/* Name + Email */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 truncate text-[15px]">
                          {userData?.name}
                        </p>

                        <p className="text-sm text-slate-500 truncate">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => navigate("/history")}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
                    >
                      <FaHistory size={16} />
                      History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-colors cursor-pointer"
                    >
                      <HiOutlineLogout size={18} />
                      Logout
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
