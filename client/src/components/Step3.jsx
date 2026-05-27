import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";

const Step3 = ({ report }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-white/70 backdrop-blur-md px-8 py-10 shadow-xl border border-slate-200">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-500"></div>

          <div className="text-center">
            <p className="text-lg font-semibold text-slate-700 animate-pulse">
              Loading Report...
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Please wait while we prepare your data
            </p>
          </div>
        </div>
      </div>
    );
  }
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionWiseScoreData = questionWiseScore.map((q, index) => ({
    name: `Q${index + 1}`,
    score: q.score || 0,
  }));
  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured response.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // =========== LIGHT PREMIUM BACKGROUND ===========
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // =========== PREMIUM TOP HEADER ===========
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 60, "F");

    // Decorative Circle
    doc.setFillColor(52, 211, 153);
    doc.circle(pageWidth - 18, 12, 20, "F");
    doc.setFillColor(110, 231, 183);
    doc.circle(pageWidth - 32, 18, 8, "F");

    // =========== TITLE ===========

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text("AI Interview Report", margin, 23);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Premium AI-powered interview performance analytics", margin, 32);

    // ========== USER DETAILS ===========

    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated: ${today}`, margin, 42);
    doc.text(`Candidate: ${userData?.name || "Anonymous User"}`, margin, 49);
    currentY = 75;

    // ========== OVERALL SCORE CARD ===========

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, currentY, contentWidth, 44, 8, 8, "F");
    doc.setDrawColor(230);
    doc.roundedRect(margin, currentY, contentWidth, 44, 8, 8);

    // Left Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(55);
    doc.text("Overall Interview Score", margin + 12, currentY + 15);

    // Score
    doc.setFontSize(34);
    if (finalScore >= 8) {
      doc.setTextColor(16, 185, 129);
    } else if (finalScore >= 5) {
      doc.setTextColor(245, 158, 11);
    } else {
      doc.setTextColor(239, 68, 68);
    }
    doc.text(`${finalScore}/10`, pageWidth - margin - 12, currentY + 26, {
      align: "right",
    });

    // Tag
    let performanceTag = "";
    if (finalScore >= 8) {
      performanceTag = "Excellent Performance";
    } else if (finalScore >= 5) {
      performanceTag = "Good Potential";
    } else {
      performanceTag = "Needs Improvement";
    }
    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text(performanceTag, pageWidth - margin - 12, currentY + 36, {
      align: "right",
    });
    currentY += 58;

    // ============ SKILL CARDS ===========
    const cardWidth = 52;
    const gap = 8;
    const skillData = [
      {
        label: "Confidence",
        value: confidence,
        color: [59, 130, 246],
      },
      {
        label: "Communication",
        value: communication,
        color: [16, 185, 129],
      },
      {
        label: "Correctness",
        value: correctness,
        color: [245, 158, 11],
      },
    ];
    skillData.forEach((skill, index) => {
      const x = margin + index * (cardWidth + gap);

      // Card
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, currentY, cardWidth, 44, 8, 8, "F");
      doc.setDrawColor(235);
      doc.roundedRect(x, currentY, cardWidth, 44, 8, 8);

      // Top Bar
      doc.setFillColor(...skill.color);
      doc.roundedRect(x, currentY, cardWidth, 5, 8, 8, "F");

      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(70);
      doc.text(skill.label, x + 6, currentY + 18);

      // Value
      doc.setFontSize(24);
      doc.setTextColor(...skill.color);
      doc.text(`${skill.value}`, x + 6, currentY + 34);
    });

    currentY += 65;

    // ============ PROFESSIONAL FEEDBACK ===========

    let advice = "";
    if (finalScore >= 8) {
      advice =
        "Excellent performance. Strong communication, structured thinking, and technical clarity were demonstrated consistently throughout the interview.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve confidence, answer structure, and communication clarity to reach the next level.";
    } else {
      advice =
        "More practice is required. Focus on mock interviews, concise communication, and improving technical confidence.";
    }

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.setTextColor(15, 23, 42);
    doc.text("Professional Feedback", margin, currentY);
    currentY += 12;

    // Advice Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, currentY, contentWidth, 50, 8, 8, "F");
    doc.setDrawColor(235);
    doc.roundedRect(margin, currentY, contentWidth, 50, 8, 8);

    // Advice Text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(80);
    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 15);

    // ============= NEXT PAGE ===========

    doc.addPage();

    // Light Background
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Top Banner
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 42, "F");

    // Decorative Circle
    doc.setFillColor(52, 211, 153);
    doc.circle(pageWidth - 18, 10, 16, "F");

    // Heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text("Question Breakdown", margin, 24);

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Detailed AI evaluation for every interview answer", margin, 32);

    currentY = 55;

    // White Table Container
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, currentY - 10, contentWidth, 210, 8, 8, "F");
    doc.setDrawColor(235);
    doc.roundedRect(margin, currentY - 10, contentWidth, 210, 8, 8);

    // ================== PREMIUM TABLE ===========

    autoTable(doc, {
      startY: currentY,
      margin: {
        left: margin + 4,
        right: margin + 4,
      },
      head: [["#", "Question", "Score", "AI Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question || "No Question",
        `${q.score || 0}/10`,
        q.feedback || "No feedback available",
      ]),
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "middle",
        lineColor: [235, 235, 235],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
        fontSize: 10,
      },
      bodyStyles: {
        textColor: 60,
        fillColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: {
          cellWidth: 12,
          halign: "center",
        },
        1: {
          cellWidth: 60,
        },
        2: {
          cellWidth: 22,
          halign: "center",
        },
        3: {
          cellWidth: "auto",
        },
      },
    });
    // =============== FOOTER ===========

    const finalY = doc.lastAutoTable.finalY;
    doc.setDrawColor(220);
    doc.line(margin, finalY + 15, pageWidth - margin, finalY + 15);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Generated by Premium AI Interview Analytics Platform",
      pageWidth / 2,
      finalY + 24,
      {
        align: "center",
      },
    );

    // ============SAVE ===========

    doc.save(`${userData?.name || "Candidate"}_Interview_Report.pdf`);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden px-4 sm:px-8 lg:px-14 py-10">
      {/* Gradient Blur Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 blur-[120px] rounded-full opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 blur-[140px] rounded-full opacity-50"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/history")}
            className="group bg-white border border-gray-200 p-2 sm:p-4 rounded-2xl hover:bg-emerald-50 transition-all duration-300 shadow-lg ml-[5px] -mt-[90px] sm:-mt-[30px] cursor-pointer"
          >
            <FaArrowLeft className="text-gray-700 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all duration-300 " />
          </button>

          <div className="-ml-[10px]">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 whitespace-nowrap">
              Interview{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">
                Analytics
              </span>
            </h1>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              AI-powered interview intelligence dashboard
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-emerald-500 to-green-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-200 px-6 py-4 rounded-3xl font-semibold text-white cursor-pointer"
        >
          Download Report
        </button>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="space-y-8">
          {/* Performance Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <p className="text-gray-500 text-sm mb-6">Overall Performance</p>

            <div className="w-36 h-36 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#10b981",
                  textColor: "#111827",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {performanceText}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">{shortTagline}</p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-8">
              Skill Evaluation
            </h3>

            <div className="space-y-7">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700">{s.label}</span>

                    <span className="font-bold text-emerald-500">
                      {s.value}/10
                    </span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value * 10}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">
                Performance Trend
              </h3>

              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-medium">
                Live Analytics
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionWiseScoreData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis domain={[0, 10]} stroke="#64748b" />

                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      borderRadius: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    strokeWidth={4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Question Breakdown
              </h3>

              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold">
                AI Evaluation
              </div>
            </div>

            <div className="space-y-6">
              {questionWiseScore.map((q, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Top */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                        Question {i + 1}
                      </p>

                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                        {q.question || "Question not available"}
                      </h4>
                    </div>

                    {/* Score Badge */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-400 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 min-w-[90px] text-center">
                      {q.score ?? 0}/10
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-6"></div>

                  {/* Feedback */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

                      <p className="text-emerald-700 font-semibold text-sm">
                        AI Feedback
                      </p>
                    </div>

                    <p className="text-gray-700 leading-8 text-[15px]">
                      {q.feedback?.trim()
                        ? q.feedback
                        : "No feedback available for this question."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
