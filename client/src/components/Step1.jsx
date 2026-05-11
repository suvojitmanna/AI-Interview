import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBriefcase,
  FaChartLine,
  FaFileUpload,
  FaMicrophoneAlt,
  FaUserTie,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Step1 = ({ onStart }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError(""); // Reset error

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB limit.");
        setResumeFile(null);
      } else {
        setResumeFile(file);
      }
    }
  };

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) {
      return;
    }
    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formData,
        { withCredentials: true },
      );
      console.log(result.data);
      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || "");
      setSkills(result.data.skills || "");
      setResumeText(result.data.resumeFile || "");
      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true },
      );
      console.log(result.data);
      if (userData) {
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
      }
      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 "
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* left Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center "
        >
          <motion.button
            onClick={() => navigate("/")}
            className="absolute top-6 left-8 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
            whileHover="hover"
            initial="initial"
          >
            <motion.div
              variants={{
                initial: { x: 0 },
                hover: { x: -5 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-2"
            >
              <FaArrowLeft size={20} />
            </motion.div>
          </motion.button>
          <h2 className="text-4xl font-bold text-gray-800 mb-6 ">
            Start Your AI Interview
          </h2>
          <p className="text-gray-600 mb-10">
            Practice real interview scenarios powered by AI. Improve
            communication, technical skills, and confidence.
          </p>
          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie className="text-green-600 text-xl" />,
                text: "Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                text: "Smart Voice Interview",
              },
              {
                icon: <FaChartLine className="text-green-600 text-xl" />,
                text: "Performance Analytics",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 bg-white p-4  shadow-sm cursor-pointer rounded-full "
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                {item.icon}
                <span className="text-gray-700 font-medium">{item.text} </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* right side */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 bg-white"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Interview SetUp
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-gray-400 " />
              <input
                type="text"
                placeholder="Enter role"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>
            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-gray-400 " />
              <input
                type="text"
                placeholder="Experience (e.g. 2 years)"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>
            <div className="relative">
              <FaMicrophoneAlt className="absolute top-4 left-4 text-gray-400" />
              <select
                onChange={(e) => setMode(e.target.value)}
                value={mode}
                className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition appearance-none bg-white cursor-pointer"
              >
                <option value="Technical">Technical Interview</option>
                <option value="HR">HR Interview</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-gap-3 border-gray-300
               rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition "
              >
                <FaFileUpload className="text-4xl mx-auto text-green-600 mbs-3" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size > 5 * 1024 * 1024) {
                      alert(
                        "File is too large! Please upload a PDF smaller than 5MB.",
                      );
                      e.target.value = null;
                      setResumeFile(null);
                      return;
                    }
                    setResumeFile(file);
                  }}
                />
                <p
                  className={`${resumeFile ? "text-gray-800 font-medium" : "text-gray-400"}`}
                >
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume (Optional)"}
                </p>
                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  >
                    {analyzing ? "Analyzing..." : "Analyzing resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 "
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Resume Analysis Result
                </h3>
                {projects.length > 0 && (
                  <div className="">
                    <p className="font-medium text-gray-700 mb-1">projects:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {projects.map((p, i) => (
                        <li key={i}>{p} </li>
                      ))}{" "}
                    </ul>
                  </div>
                )}
                {skills.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-gray-700 mb-2">
                      Skills Found:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200 hover:bg-green-200 transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || analyzing || loading}
              whileHover={{ scale: !role || !experience ? 1 : 1.03 }}
              whileTap={{ scale: !role || !experience ? 1 : 0.95 }}
              className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md mt-4 cursor-pointer"
            >
              {loading ? "Initializing..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1;
