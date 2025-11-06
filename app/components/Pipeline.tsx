/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { usePipeline } from "../context/PipelineContext";
import {
  UploadStage,
  ClassifyStage,
  VectorizeStage,
  ExtractStage,
  StoreStage,
} from "./stages";
import { JsonView } from "./ui/JsonView";
import { ParticleField } from "./ui/ParticleField";

// Keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const PipelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const GridBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(99, 102, 241, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
`;

const FloatingOrb = styled.div<{
  $delay: number;
  $size: number;
  $color: string;
  $top: string;
  $left: string;
}>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    ${(props) => props.$color}40,
    ${(props) => props.$color}10
  );
  filter: blur(50px);
  animation: ${float} ${(props) => 12 + props.$delay * 3}s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
  opacity: 0.6;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  gap: 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin: 1.5rem 0 1rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
  margin-bottom: 0.5rem;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;
const MainContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 1rem;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 51, 102, 0.5);
      border-radius: 3px;
    }
  }
`;

const StageCard = styled.button<{
  $active: boolean;
  $completed: boolean;
  $color: string;
  $index: number;
}>`
  background: ${(props) =>
    props.$active
      ? `linear-gradient(135deg, ${props.$color}15, #ffffff)`
      : props.$completed
      ? "linear-gradient(135deg, #f8fafc, #ffffff)"
      : "#ffffff"};
  border: 2px solid
    ${(props) =>
      props.$active ? props.$color : props.$completed ? "#e2e8f0" : "#f1f5f9"};
  border-radius: 16px;
  padding: 1.25rem 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: ${(props) => (props.$active ? pulse : "none")} 2s ease-in-out
    infinite;
  box-shadow: ${(props) =>
    props.$active
      ? `0 10px 40px ${props.$color}25, 0 4px 12px rgba(0,0,0,0.08)`
      : "0 2px 8px rgba(0,0,0,0.04)"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${(props) => props.$color}20,
      transparent
    );
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    border-color: ${(props) => props.$color};
    transform: translateX(10px) scale(1.02);
    box-shadow: 0 10px 40px ${(props) => props.$color}30,
      0 8px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 1024px) {
    min-width: 200px;
    padding: 1.5rem;
  }
`;

const StageNumber = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  color: ${(props) => props.$color};
  font-weight: 800;
  margin-bottom: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const StageName = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
`;

const StageDescription = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.5;
`;

const VisualizationArea = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  padding: 2.5rem;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.08) 0%,
      transparent 70%
    );
    animation: ${float} 20s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 500px;
  }
`;

const SvgContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  position: sticky;
  bottom: 2rem;
  z-index: 100;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 60px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.08);
`;

const ActionButton = styled.button<{
  $variant?: "primary" | "secondary";
  $color?: string;
}>`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => (props.$variant === "primary" ? "#ffffff" : "#475569")};
  background: ${(props) =>
    props.$variant === "primary"
      ? `linear-gradient(135deg, #6366f1, #8b5cf6)`
      : "transparent"};
  border: 2px solid
    ${(props) => (props.$variant === "primary" ? "transparent" : "#cbd5e1")};
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.$variant === "primary"
      ? `0 10px 30px rgba(99, 102, 241, 0.4)`
      : "none"};

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 400px;
    height: 400px;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${(props) =>
      props.$variant === "primary"
        ? `0 15px 50px rgba(99, 102, 241, 0.5)`
        : "0 10px 30px rgba(0, 0, 0, 0.08)"};
    border-color: ${(props) =>
      props.$variant === "primary" ? "transparent" : "#6366f1"};
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const ResultsContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  text-transform: uppercase;
`;

const stages = [
  { name: "Upload", color: "#6366f1", desc: "Ingest document data" },
  { name: "Classify", color: "#8b5cf6", desc: "Categorize content type" },
  { name: "Vectorize", color: "#ec4899", desc: "Transform to embeddings" },
  { name: "Extract", color: "#14b8a6", desc: "Parse key information" },
  { name: "Store", color: "#f59e0b", desc: "Persist to database" },
];

export default function Pipeline() {
  const {
    currentStage,
    setCurrentStage,
    isAnimating,
    setIsAnimating,
    extractedData,
    setExtractedData,
    setClassification,
    setVectorData,
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
    };
    return stageMap[currentStage] ?? -1;
  };

  const handleStageComplete = (stage: string) => {
    setCompletedStages((prev) => [...prev, stage]);

    const nextStages: Record<string, string> = {
      upload: "classify",
      classify: "vectorize",
      vectorize: "extract",
      extract: "store",
      store: "complete",
    };

    const nextStage = nextStages[stage];
    if (nextStage === "complete") {
      setIsAnimating(false);
      setShowResults(true);
      setCurrentStage("upload");
    } else {
      setTimeout(() => {
        setCurrentStage(nextStage as any);
      }, 500);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !isAnimating) {
      setCompletedStages([]);
      setShowResults(false);
      setCurrentStage("upload");
      setIsAnimating(true);
    }
  };

  const startDemo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetPipeline = () => {
    setCompletedStages([]);
    setShowResults(false);
    setCurrentStage("upload");
    setIsAnimating(false);
    // Clear all data
    setExtractedData(null);
    setClassification(null);
    setVectorData(null);
  };

  return (
    <PipelineContainer>
      <ParticleField />
      <GridBackground />

      {/* Floating orbs */}
      <FloatingOrb
        $delay={0}
        $size={400}
        $color="#ff3366"
        $top="10%"
        $left="10%"
      />
      <FloatingOrb
        $delay={2}
        $size={300}
        $color="#ffaa00"
        $top="60%"
        $left="70%"
      />
      <FloatingOrb
        $delay={4}
        $size={350}
        $color="#00ff99"
        $top="30%"
        $left="80%"
      />
      <FloatingOrb
        $delay={1}
        $size={250}
        $color="#ff6b9d"
        $top="70%"
        $left="20%"
      />

      <ContentWrapper>
        <Header>
          <Title>AI Pipeline</Title>
          <Subtitle>Document Processing Visualization</Subtitle>
        </Header>

        <MainContent>
          <Sidebar>
            {stages.map((stage, index) => (
              <StageCard
                key={stage.name}
                $active={getCurrentStageIndex() === index}
                $completed={completedStages.includes(stage.name.toLowerCase())}
                $color={stage.color}
                $index={index}
                onClick={() =>
                  !isAnimating &&
                  setCurrentStage(stage.name.toLowerCase() as any)
                }
              >
                <StageNumber $color={stage.color}>
                  STAGE {String(index + 1).padStart(2, "0")}
                </StageNumber>
                <StageName>{stage.name}</StageName>
                <StageDescription>{stage.desc}</StageDescription>
              </StageCard>
            ))}
          </Sidebar>

          <VisualizationArea>
            <SvgContainer>
              <svg
                width="100%"
                height="600"
                viewBox="0 0 800 600"
                style={{ overflow: "visible" }}
              >
                {currentStage === "upload" && (
                  <UploadStage
                    onComplete={() => handleStageComplete("upload")}
                    isActive={isAnimating}
                  />
                )}
                {currentStage === "classify" && (
                  <ClassifyStage
                    onComplete={() => handleStageComplete("classify")}
                    isActive={isAnimating}
                  />
                )}
                {currentStage === "vectorize" && (
                  <VectorizeStage
                    onComplete={() => handleStageComplete("vectorize")}
                    isActive={isAnimating}
                  />
                )}
                {currentStage === "extract" && (
                  <ExtractStage
                    onComplete={() => handleStageComplete("extract")}
                    isActive={isAnimating}
                  />
                )}
                {currentStage === "store" && (
                  <StoreStage
                    onComplete={() => handleStageComplete("store")}
                    isActive={isAnimating}
                  />
                )}
              </svg>
            </SvgContainer>
          </VisualizationArea>
        </MainContent>

        <ControlPanel>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            accept=".pdf,.doc,.docx,.txt"
          />

          <ActionButton
            $variant="primary"
            $color="#ff3366"
            onClick={startDemo}
            disabled={isAnimating}
          >
            <span>{isAnimating ? "Processing..." : "Launch Pipeline"}</span>
          </ActionButton>

          {(showResults || completedStages.length > 0) && (
            <ActionButton $variant="secondary" onClick={resetPipeline}>
              <span>Reset</span>
            </ActionButton>
          )}
        </ControlPanel>

        {showResults && extractedData && (
          <ResultsContainer>
            <ResultsTitle>Extracted Data</ResultsTitle>
            <JsonView data={extractedData} />
          </ResultsContainer>
        )}
      </ContentWrapper>
    </PipelineContainer>
  );
}
