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

const Step3 = ({ report }) => {
  const navigate = useNavigate();
  if (!report) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700"></div>

        <p className="text-lg font-medium text-slate-600 tracking-wide animate-pulse">
          Loading Report...
        </p>
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
  console.log(questionWiseScore);
  console.log(questionWiseScoreData);
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

    // Background Header

    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 55, "F");
    doc.setFillColor(52, 211, 153);
    doc.circle(pageWidth - 25, 15, 18, "F");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text("AI Interview Report", margin, 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Premium AI-powered interview performance analytics", margin, 32);

    // Date
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated: ${today}`, margin, 42);

    currentY = 70;

    // Score Card
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, currentY, contentWidth, 35, 6, 6, "F");
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(margin, currentY, contentWidth, 35, 6, 6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(100);
    doc.text("Overall Interview Score", margin + 10, currentY + 12);
    doc.setFontSize(28);

    if (finalScore >= 8) {
      doc.setTextColor(16, 185, 129);
    } else if (finalScore >= 5) {
      doc.setTextColor(245, 158, 11);
    } else {
      doc.setTextColor(239, 68, 68);
    }

    doc.text(`${finalScore}/10`, pageWidth - margin - 10, currentY + 20, {
      align: "right",
    });

    // Tagline
    doc.setFontSize(10);
    doc.setTextColor(120);

    let performanceTag = "";

    if (finalScore >= 8) {
      performanceTag = "Excellent Performance";
    } else if (finalScore >= 5) {
      performanceTag = "Good Potential";
    } else {
      performanceTag = "Needs Improvement";
    }

    doc.text(performanceTag, pageWidth - margin - 10, currentY + 28, {
      align: "right",
    });

    currentY += 50;

    // Skill Cards
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
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, currentY, cardWidth, 40, 5, 5, "F");
      doc.setDrawColor(235);
      doc.roundedRect(x, currentY, cardWidth, 40, 5, 5);

      // Top Bar
      doc.setFillColor(...skill.color);
      doc.roundedRect(x, currentY, cardWidth, 5, 5, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(60);
      doc.text(skill.label, x + 5, currentY + 16);
      doc.setFontSize(22);
      doc.setTextColor(...skill.color);
      doc.text(`${skill.value}`, x + 5, currentY + 30);
    });

    currentY += 55;

    // Professional Advice
    let advice = "";
    if (finalScore >= 8) {
      advice =
        "Excellent performance. You demonstrated strong communication, clarity, and structured thinking. Continue refining advanced problem-solving and provide more real-world examples for senior-level interviews.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Focus on improving answer structure, communication clarity, and confidence while explaining technical concepts.";
    } else {
      advice =
        "Significant improvement required. Practice mock interviews regularly and focus on confidence, structured thinking, and concise communication.";
    }

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(17, 24, 39);
    doc.text("Professional Feedback", margin, currentY);
    currentY += 10;

    // Advice Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, contentWidth, 42, 5, 5, "F");
    doc.setDrawColor(230);
    doc.roundedRect(margin, currentY, contentWidth, 42, 5, 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(75);
    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 12);

    currentY += 60;

    // Question Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(16, 185, 129);
    doc.text("Question Breakdown", margin, currentY);

    currentY += 10;

    // Premium Table
    autoTable(doc, {
      startY: currentY,
      margin: {
        left: margin,
        right: margin,
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
        lineColor: [240, 240, 240],
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
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      columnStyles: {
        0: {
          cellWidth: 12,
          halign: "center",
        },
        1: {
          cellWidth: 58,
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

    // Footer
    const finalY = doc.lastAutoTable.finalY || currentY;
    doc.setDrawColor(230);
    doc.line(margin, finalY + 15, pageWidth - margin, finalY + 15);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Generated by AI Interview Analytics Platform",
      pageWidth / 2,
      finalY + 24,
      {
        align: "center",
      },
    );

    // Save
    doc.save("AI_Interview_Report.pdf");
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
            className="group bg-white border border-gray-200 p-4 rounded-2xl hover:bg-emerald-50 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <FaArrowLeft className="text-gray-700 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all duration-300 " />
          </button>

          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">
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
          className="bg-gradient-to-r from-emerald-500 to-green-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-200 px-6 py-4 rounded-2xl font-semibold text-white cursor-pointer"
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
