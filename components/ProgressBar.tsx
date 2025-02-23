"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(prev => prev + 2), 50);
    return () => clearTimeout(timer);
  }, [progress]);

  return <Progress value={progress} className="w-[60%] h-1.5 mt-1 rounded-sm" />;
};

export default ProgressBar;
