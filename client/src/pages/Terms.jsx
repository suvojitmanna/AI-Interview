import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  HiArrowLeft, 
  HiOutlineScale, 
  HiOutlineCreditCard, 
  HiOutlineCpuChip, 
  HiOutlineHandRaised 
} from "react-icons/hi2";

const TermsOfService = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "acceptance", title: "1. Acceptance", icon: <HiOutlineScale /> },
    { id: "payments", title: "2. Payments", icon: <HiOutlineCreditCard /> },
    { id: "limitations", title: "3. AI Limitations", icon: <HiOutlineCpuChip /> },
    { id: "conduct", title: "4. User Conduct", icon: <HiOutlineHandRaised /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Sidebar - Navigation */}
          <aside className="lg:w-1/4 lg:sticky lg:top-12 h-fit">
            <button 
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all mb-10 group font-semibold cursor-pointer"
            >
              <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Return
            </button>

            <nav className="hidden lg:block space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 px-4">Agreement Sections</p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-500/5 transition-all border border-transparent hover:border-slate-100"
                >
                  <span className="text-xl">{section.icon}</span>
                  <span className="text-sm font-bold">{section.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Content */}
          <motion.main 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-3/4"
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100">
              <header className="mb-16">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                  Terms & Conditions
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">
                  Terms of Service
                </h1>
                <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                  <span>Last Modified: October 2023</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <span>Version 2.1</span>
                </div>
              </header>

              <div className="space-y-20 text-slate-600 leading-[1.8]">
                
                {/* Section 1 */}
                <section id="acceptance" className="scroll-mt-16">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                      <HiOutlineScale />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Acceptance of Terms</h2>
                  </div>
                  <p className="text-lg">
                    By accessing and using <span className="text-slate-900 font-bold">InterviewIQ.AI</span>, 
                    you enter into a legally binding agreement. Our services are designed to help you excel, 
                    but they require your acknowledgment of the rules outlined herein. If these terms do 
                    not align with your expectations, we respectfully ask that you discontinue use of the platform.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="payments" className="scroll-mt-16">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                      <HiOutlineCreditCard />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Credits and Payments</h2>
                  </div>
                  <p className="mb-8">
                    We utilize a credit-based ecosystem to deliver high-performance AI compute.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-2">Usage Ratio</h4>
                      <p className="text-sm">One credit typically facilitates a single full-length interview session including analysis.</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100">
                      <h4 className="font-bold text-amber-900 mb-2">Non-Refundable</h4>
                      <p className="text-sm text-amber-800/80">To maintain service quality and server costs, all credit purchases are final and non-refundable.</p>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="limitations" className="scroll-mt-16">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-xl">
                      <HiOutlineCpuChip />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">AI Limitations</h2>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-10 text-slate-300 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <p className="text-lg leading-relaxed mb-0">
                        While our AI models are trained on world-class interview methodologies, 
                        the feedback provided is for <span className="text-white font-bold underline decoration-indigo-500 underline-offset-4">educational purposes only</span>. 
                        InterviewIQ.AI does not guarantee specific employment outcomes, salary negotiations, 
                        or success in external hiring processes.
                      </p>
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />
                  </div>
                </section>

                {/* Section 4 */}
                <section id="conduct" className="scroll-mt-16">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
                      <HiOutlineHandRaised />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">User Conduct</h2>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "No reverse-engineering of proprietary AI prompt structures.",
                      "No automated scraping or 'botting' of interview sessions.",
                      "No sharing of accounts to bypass individual credit limits.",
                      "Compliance with all local and international privacy laws."
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                          0{i + 1}
                        </span>
                        <span className="font-medium text-slate-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </section>

              </div>

              <footer className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-400 text-sm font-medium">
                  © 2026 InterviewIQ.AI Global Systems
                </p>
                <div className="flex gap-8">
                   <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:opacity-70 transition-opacity">Contact Support</button>
                   <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Compliance PDF</button>
                </div>
              </footer>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;