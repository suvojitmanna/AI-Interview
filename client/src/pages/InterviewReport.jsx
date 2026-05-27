import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import Step3 from "../components/Step3";

const InterviewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          `${ServerUrl}/api/interview/report/${id}`,
          {
            withCredentials: true,
          },
        );
        setReport(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReport();
  }, []);
  return <Step3 report={report} />;
};

export default InterviewReport;
