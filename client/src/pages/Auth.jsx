import React from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import { ServerUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Link } from "react-router-dom";

const Auth = ({ isModel = false }) => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName: name, email, photoURL: image } = response.user;

      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        { name, email, image },
        { withCredentials: true },
      );

      dispatch(setUserData(result.data));
    } catch (error) {
      console.error("Auth Error:", error);
      dispatch(setUserData(null));
    }
  };

  return (
    <div
      className={`relative w-full ${
        isModel ? "min-h-fit" : "min-h-screen bg-[#f8fafc]"
      }  flex items-center justify-center px-6 overflow-hidden`}
    >
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[120px] opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative "
      >
        <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.12)] relative overflow-hidden">
          {/* Glow Effects */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />

          {/* Premium Border Glow */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4 rounded-3xl shadow-2xl mb-5"
              >
                <BsRobot size={28} />
              </motion.div>

              <h2 className="font-black text-2xl tracking-tight text-slate-800">
                InterView
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500">
                  IQ.AI
                </span>
              </h2>
            </div>

            {/* Heading */}
            <div className="text-center space-y-5 mb-10">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                Elevate Your
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500">
                  Career Journey
                </span>
              </h1>

              <div className="flex justify-center">
                <span className="bg-white/60 backdrop-blur-xl border border-white/40 text-slate-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
                  <IoSparkles className="text-amber-500" />
                  AI Smart Interview
                </span>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed max-w-[300px] mx-auto">
                Join thousands of professionals mastering interviews with
                AI-powered preparation.
              </p>
            </div>

            {/* Google Button */}
            <motion.button
              onClick={handleGoogleAuth}
              whileHover={{
                y: -3,
                scale: 1.01,
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/70 text-slate-700 font-bold shadow-lg transition-all duration-300 cursor-pointer"
            >
              <FcGoogle size={26} />
              <span>Continue with Google</span>
            </motion.button>

            {/* Footer */}
            <p className="mt-8 text-center text-[11px] text-slate-400 leading-relaxed">
              By continuing, you agree to our{" "}
              <Link
                to="/terms"
                className="text-indigo-500 hover:text-indigo-800 transition-colors"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-indigo-500 hover:text-indigo-800 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
