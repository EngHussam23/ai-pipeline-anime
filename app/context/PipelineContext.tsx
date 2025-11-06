"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type PipelineStage =
  | "upload"
  | "classify"
  | "vectorize"
  | "extract"
  | "store"
  | "complete";

export interface ClassificationData {
  fileType: string;
  tags: string[];
  summary: string;
  confidence: number;
}

export interface VectorData {
  dimensions: number[];
  currentDim: number;
}

export interface ExtractedData {
  title: string;
  author: string;
  date: string;
  category: string;
  keywords: string[];
  content_preview: string;
}

interface PipelineContextType {
  currentStage: PipelineStage;
  setCurrentStage: (stage: PipelineStage) => void;
  fileName: string;
  setFileName: (name: string) => void;
  classification: ClassificationData | null;
  setClassification: (data: ClassificationData | null) => void;
  vectorData: VectorData | null;
  setVectorData: (data: VectorData | null) => void;
  extractedData: ExtractedData | null;
  setExtractedData: (data: ExtractedData | null) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const PipelineContext = createContext<PipelineContextType | undefined>(
  undefined
);

export const usePipeline = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error("usePipeline must be used within PipelineProvider");
  }
  return context;
};

interface PipelineProviderProps {
  children: ReactNode;
}

export const PipelineProvider: React.FC<PipelineProviderProps> = ({
  children,
}) => {
  const [currentStage, setCurrentStage] = useState<PipelineStage>("upload");
  const [fileName, setFileName] = useState<string>("");
  const [classification, setClassification] =
    useState<ClassificationData | null>(null);
  const [vectorData, setVectorData] = useState<VectorData | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: PipelineContextType = {
    currentStage,
    setCurrentStage,
    fileName,
    setFileName,
    classification,
    setClassification,
    vectorData,
    setVectorData,
    extractedData,
    setExtractedData,
    isAnimating,
    setIsAnimating,
    error,
    setError,
  };

  return (
    <PipelineContext.Provider value={value}>
      {children}
    </PipelineContext.Provider>
  );
};
