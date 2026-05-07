import React from "react";
import { BsRobot, BsTwitterX, BsGithub, BsLinkedin } from "react-icons/bs";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer>
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="
          relative z-10
          max-w-7xl mx-auto
          rounded-[36px]
          border border-white/40
          bg-white/70 backdrop-blur-xl
          shadow-[0_10px_50px_rgba(0,0,0,0.06)]
          px-6 md:px-12
          py-14
        "
      >
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-5">
              {/* Logo */}
              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-gradient-to-br from-green-500 to-emerald-600
                  text-white
                  flex items-center justify-center
                  shadow-[0_10px_25px_rgba(34,197,94,0.35)]
                "
              >
                <BsRobot size={24} />
              </div>

              {/* Name */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  InterviewIQ.AI
                </h2>

                <p className="text-sm text-green-600 font-medium">
                  AI Powered Interview Platform
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              Practice smarter with AI-driven interview simulations, real-time
              feedback, adaptive questioning, and detailed performance
              analytics.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-5">Product</h3>

              <div className="space-y-3 text-sm text-gray-600">
                <p className="hover:text-green-600 transition cursor-pointer">
                  AI Interviews
                </p>

                <p className="hover:text-green-600 transition cursor-pointer">
                  Resume Analysis
                </p>

                <p className="hover:text-green-600 transition cursor-pointer">
                  Analytics
                </p>

                <p className="hover:text-green-600 transition cursor-pointer">
                  PDF Reports
                </p>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-5">Company</h3>

              <div className="space-y-3 text-sm text-gray-600">
                <p className="hover:text-green-600 transition cursor-pointer">
                  About
                </p>

                <p className="hover:text-green-600 transition cursor-pointer">
                  Careers
                </p>

                <p className="hover:text-green-600 transition cursor-pointer">
                  Contact
                </p>

                <p className="hover:text-green-600 transition cursor-pointer">
                  Privacy Policy
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-5">Social</h3>

              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10 h-10 rounded-xl
                    bg-gray-100 hover:bg-green-500
                    hover:text-white
                    transition-all duration-300
                    flex items-center justify-center
                    cursor-pointer
                  "
                >
                  <BsTwitterX size={16} />
                </div>

                <div
                  className="
                    w-10 h-10 rounded-xl
                    bg-gray-100 hover:bg-green-500
                    hover:text-white
                    transition-all duration-300
                    flex items-center justify-center
                    cursor-pointer
                  "
                >
                  <a href="https://github.com/suvojitmanna/AI-Interview">
                    <BsGithub size={16} />
                  </a>
                </div>

                <div
                  className="
                    w-10 h-10 rounded-xl
                    bg-gray-100 hover:bg-green-500
                    hover:text-white
                    transition-all duration-300
                    flex items-center justify-center
                    cursor-pointer
                  "
                >
                  <a href="https://www.linkedin.com/in/suvojit-manna-505614327/">
                    <BsLinkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>@ 2026 InterviewIQ.AI. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <p className="hover:text-green-600 transition cursor-pointer">
              Terms
            </p>

            <p className="hover:text-green-600 transition cursor-pointer">
              Privacy
            </p>

            <p className="hover:text-green-600 transition cursor-pointer">
              Cookies
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
