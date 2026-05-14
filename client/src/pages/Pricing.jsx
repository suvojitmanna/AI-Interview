import React, { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaCrown, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { ServerUrl } from "../App";

const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      icon: <FaBolt />,
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      button: "Current Plan",
      disabled: true,
      color: "from-gray-400 to-gray-600",
    },

    {
      id: "basic",
      name: "Starter Pack",
      icon: <FaBolt />,
      price: "₹100",
      credits: 150,
      description:
        "Best for focused practice and improving interview confidence.",
      features: [
        "150 AI Interview Credits",
        "Detailed AI Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
      button: "Get Started",
      color: "from-emerald-400 to-green-600",
    },

    {
      id: "pro",
      name: "Pro Pack",
      icon: <FaCrown />,
      price: "₹500",
      credits: 650,
      badge: "POPULAR",
      description: "Advanced AI interview preparation for serious candidates.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
        "Unlimited Interview History",
      ],
      button: "Upgrade Pro",
      color: "from-violet-500 to-indigo-600",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoading(plan.id);

      const amount = plan.id === "basic" ? 100 : plan.id === "pro" ? 500 : 0;

      const result = await axios.post(
        `${ServerUrl}/api/payment/order`,
        {
          planId: plan.id,
          amount,
          credits: plan.credits,
        },
        {
          withCredentials: true,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: result.data.order.amount,
        currency: result.data.order.currency,
        order_id: result.data.order.id,

        name: "AI Interview",

        description: `${plan.name} - ${plan.credits} Credits`,

        handler: async function (response) {
          try {
            const verify = await axios.post(
              `${ServerUrl}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_signature: response.razorpay_signature,
              },
              {
                withCredentials: true,
              },
            );

            toast.success(verify.data.message);

            navigate("/");
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#10b981",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

      razor.on("payment.failed", () => {
        toast.error("Payment Failed");
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-6 py-16 overflow-hidden">
      {/* Top Blur Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-200 rounded-full blur-3xl opacity-30"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-start gap-4 mb-16 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="p-1 sm:p-3 -mt-[30px] rounded-2xl bg-white shadow-lg border border-gray-200 hover:scale-105 transition cursor-pointer"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>

        <div className="w-full text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 whitespace-nowrap">
            Pricing Plans
          </h1>

          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Choose the perfect plan and unlock premium AI interview preparation
            tools.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto relative z-10">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              onClick={() => !plan.disabled && setSelectedPlan(plan.id)}
              className={`relative rounded-[32px] p-[1px] transition-all duration-500
              
              ${isSelected ? `bg-gradient-to-br ${plan.color}` : "bg-gray-200"}
              `}
            >
              {/* Inner Card */}
              <div className="bg-white rounded-[32px] p-8 h-full shadow-xl">
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-5 right-5 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-br ${plan.color} shadow-lg`}
                >
                  {plan.icon}
                </div>

                {/* Name */}
                <h2 className="text-3xl font-bold text-gray-800 mt-6">
                  {plan.name}
                </h2>

                {/* Price */}
                <div className="mt-5">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>

                  <p className="text-gray-500 mt-2">{plan.credits} Credits</p>
                </div>

                {/* Description */}
                <p className="text-gray-500 mt-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-emerald-500" />

                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  disabled={plan.disabled}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!plan.disabled) {
                      handlePayment(plan);
                    }
                  }}
                  className={`w-full mt-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300
                  
                  ${
                    plan.disabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : `bg-gradient-to-r ${plan.color} text-white hover:scale-105 shadow-lg cursor-pointer`
                  }
                  `}
                >
                  {loading === plan.id ? "Processing..." : plan.button}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="text-center mt-16 text-gray-500 relative z-10">
        Secure Payments Powered By Razorpay
      </div>
    </div>
  );
};

export default Pricing;
