"use client";

import { Config, Result } from "@/lib/types";
import { DynamicChart } from "@/components/dynamic-chart";

interface ChartOnlyViewProps {
  results: Result[];
  chartConfig: Config | null;
}

export function ChartOnlyView({ results, chartConfig }: ChartOnlyViewProps) {
  if (!chartConfig || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No data available
      </div>
    );
  }

  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  // Disable chart if insufficient data
  const chartDisabled = columns.length <= 1 || results.length < 2;

  if (chartDisabled) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Insufficient data for visualization
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-center">
      <DynamicChart chartData={results} chartConfig={chartConfig} />
    </div>
  );
}
