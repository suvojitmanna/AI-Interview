import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";
import PrivacyPolicy from "./pages/Privacy";
import TermsOfService from "./pages/Terms";
import InterviewPage from "./pages/InterviewPage";
import InterviewHistory from "./pages/InterviewHistory";
import Pricing from "./pages/Pricing";
import InterviewReport from "./pages/InterviewReport";

export const ServerUrl = import.meta.env.VITE_BASE_URL;

const ProtectedRoute = ({ children, loading }) => {
  const userData = useSelector((state) => state.user.userData);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
        });

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route
        path="/interview"
        element={
          <ProtectedRoute loading={loading}>
            {" "}
            <InterviewPage />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute loading={loading}>
            {" "}
            <InterviewHistory />{" "}
          </ProtectedRoute>
        }
      />

      <Route
        path="/pricing"
        element={
          <ProtectedRoute loading={loading}>
            <Pricing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report/:id"
        element={
          <ProtectedRoute loading={loading}>
            <InterviewReport />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
