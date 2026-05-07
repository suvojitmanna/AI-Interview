import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineDatabase } from "react-icons/hi";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "collection", title: "1. Information Collection", icon: <HiOutlineDatabase /> },
    { id: "usage", title: "2. Data Usage", icon: <HiOutlineShieldCheck /> },
    { id: "security", title: "3. Data Security", icon: <HiOutlineLockClosed /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Sidebar - Navigation */}
          <aside className="lg:w-1/4 lg:sticky lg:top-12 h-fit">
            <button 
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all mb-10 group font-medium cursor-pointer"
            >
              <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>

            <nav className="hidden lg:block space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-4">Contents</p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all border border-transparent hover:border-slate-100"
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-sm font-semibold">{section.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Content */}
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-3/4"
          >
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80">
              <header className="mb-12 border-b border-slate-50 pb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-4">
                  LEGAL DOCUMENT
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                  Privacy Policy
                </h1>
                <p className="text-slate-400 font-medium tracking-wide">
                  Effective Date: <span className="text-slate-600 font-semibold">October 24, 2023</span>
                </p>
              </header>

              <div className="space-y-16 text-slate-600 text-lg leading-relaxed">
                
                <section id="collection" className="scroll-mt-12">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm italic">1</span>
                    Information We Collect
                  </h2>
                  <p className="mb-4">
                    At <span className="text-indigo-600 font-bold">InterviewIQ.AI</span>, we value your trust above all else. When you authenticate via Google, we access:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {["Full Name", "Email Address", "Profile Picture"].map((item) => (
                      <div key={item} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="bg-indigo-50/50 p-6 rounded-2xl border-l-4 border-indigo-500 italic">
                    "We capture audio/video data and text transcripts during mock interviews solely to provide 
                    qualitative AI feedback. These sessions are never used for marketing purposes."
                  </p>
                </section>

                <section id="usage" className="scroll-mt-12">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm italic">2</span>
                    How We Use Your Data
                  </h2>
                  <div className="space-y-4">
                    {[
                      { title: "AI Analysis", desc: "Generating performance metrics and behavioral insights." },
                      { title: "Session History", desc: "Archiving your past performances for progress tracking." },
                      { title: "Billing", desc: "Managing credit limits and secure subscription status." }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 group">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform shadow-sm shadow-indigo-200" />
                        <div>
                          <h4 className="font-bold text-slate-800">{item.title}</h4>
                          <p className="text-base text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="security" className="scroll-mt-12">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm italic">3</span>
                    Data Security & Integrity
                  </h2>
                  <p className="mb-6">
                    We implement <strong>AES-256 encryption</strong> at rest and TLS encryption in transit. 
                    We do not sell your personal data. Interview data is shared with our AI processors 
                    (OpenAI/Google Cloud) via encrypted API calls under Data Processing Addendums (DPA).
                  </p>
                  <div className="p-6 rounded-3xl bg-slate-900 text-slate-300 text-sm">
                    <div className="flex items-center gap-2 mb-2 text-white font-bold">
                      <HiOutlineLockClosed className="text-emerald-400" />
                      Zero-Knowledge Architecture Goal
                    </div>
                    We are constantly working toward minimizing data retention and improving our security protocols.
                  </div>
                </section>

              </div>

              <footer className="mt-20 pt-10 border-t border-slate-100 text-center text-slate-400 text-sm">
                Questions regarding this policy? Reach out at 
                <a href="mailto:privacy@interviewiq.ai" className="ml-1 text-indigo-600 font-bold hover:underline">
                  privacy@interviewiq.ai
                </a>
              </footer>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;