import React from 'react'
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import { useState } from 'react';

const InterviewPage = () => {
  const [step, setStep] = useState(1);
  const [interViewData, setInterViewData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 1 && (
        <Step1
          onStart={(data) => {
            setInterViewData(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Step2
          interviewData={interViewData}
          onFinish={(report) => {
            setInterViewData(report);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <Step3 report={interViewData} />}
    </div>
  );
}

export default InterviewPage