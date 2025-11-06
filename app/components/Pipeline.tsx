/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { usePipeline } from "../context/PipelineContext";
import {
  UploadStage,
  ClassifyStage,
  VectorizeStage,
  ExtractStage,
  StoreStage,
} from "./stages";
import { JsonView } from "./ui/JsonView";

const PipelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #000000;
  padding: 4rem 2rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

const SvgContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 500px;
  background: #000000;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const UploadButton = styled.button`
  margin-top: 3rem;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;

  &:hover:not(:disabled) {
    background: #60a5fa;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 3rem;
  width: 100%;
  max-width: 1000px;
  position: relative;
  z-index: 1;
`;

const StageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const StageBadge = styled.div<{ $active: boolean; $completed: boolean }>`
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  background: ${(props) =>
    props.$active
      ? "#3b82f6"
      : props.$completed
      ? "rgba(59, 130, 246, 0.1)"
      : "transparent"};
  color: ${(props) =>
    props.$active || props.$completed ? "#ffffff" : "rgba(255, 255, 255, 0.4)"};
  border: 1px solid
    ${(props) =>
      props.$active
        ? "#3b82f6"
        : props.$completed
        ? "rgba(59, 130, 246, 0.3)"
        : "rgba(255, 255, 255, 0.1)"};
  transition: all 0.2s ease;
`;

const stages = ["Upload", "Classify", "Vectorize", "Extract", "Store"];

export default function Pipeline() {
  const {
    currentStage,
    setCurrentStage,
    isAnimating,
    setIsAnimating,
    extractedData,
  } = usePipeline();
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCurrentStageIndex = () => {
    const stageMap: Record<string, number> = {
      upload: 0,
      classify: 1,
      vectorize: 2,
      extract: 3,
      store: 4,
      complete: 5,
    };
    return stageMap[currentStage] || 0;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isAnimating) return;

    setIsAnimating(true);
    setCompletedStages([]);
    setShowResults(false);
    setCurrentStage("upload");

    // Reset will happen through the stage completions
  };

  const handleStageComplete = (stageName: string) => {
    setCompletedStages((prev) => [...prev, stageName]);

    const stageOrder: Record<string, string> = {
      upload: "classify",
      classify: "vectorize",
      vectorize: "extract",
      extract: "store",
      store: "complete",
    };

    const nextStage = stageOrder[stageName];
    if (nextStage) {
      setCurrentStage(nextStage as any);

      if (nextStage === "complete") {
        setIsAnimating(false);
        setShowResults(true);
      }
    }
  };

  const startDemo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <PipelineContainer>
      <Title>AI Document Processing Pipeline</Title>
      <Subtitle>
        Visualize data transformation through five intelligent stages
      </Subtitle>

      <StageIndicator>
        {stages.map((stage, index) => (
          <StageBadge
            key={stage}
            $active={getCurrentStageIndex() === index}
            $completed={completedStages.includes(stage.toLowerCase())}
          >
            {stage}
          </StageBadge>
        ))}
      </StageIndicator>

      <SvgContainer>
        <svg width="100%" height="100%" viewBox="0 0 800 500">
          {currentStage === "upload" && (
            <UploadStage onComplete={() => handleStageComplete("upload")} />
          )}
          {currentStage === "classify" && (
            <ClassifyStage onComplete={() => handleStageComplete("classify")} />
          )}
          {currentStage === "vectorize" && (
            <VectorizeStage
              onComplete={() => handleStageComplete("vectorize")}
            />
          )}
          {currentStage === "extract" && (
            <ExtractStage onComplete={() => handleStageComplete("extract")} />
          )}
          {currentStage === "store" && (
            <StoreStage onComplete={() => handleStageComplete("store")} />
          )}
        </svg>
      </SvgContainer>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        accept=".pdf,.doc,.docx,.txt"
      />

      <UploadButton onClick={startDemo} disabled={isAnimating}>
        {isAnimating ? "Processing..." : "Start Pipeline"}
      </UploadButton>

      {showResults && extractedData && (
        <ResultsContainer>
          <h2
            style={{
              background: "linear-gradient(135deg, #00ffff 0%, #8a2be2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              textAlign: "center",
              fontSize: "1.75rem",
              fontWeight: "bold",
            }}
          >
            ✨ Extraction Complete
          </h2>
          <JsonView data={extractedData} />
        </ResultsContainer>
      )}
    </PipelineContainer>
  );
}
