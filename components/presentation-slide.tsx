"use client";

import { Config, Result } from "@/lib/types";
import { ChartOnlyView } from "@/components/chart-only-view";
import { Loader2 } from "lucide-react";

interface PresentationSlideProps {
  query: string;
  results: Result[];
  chartConfig: Config | null;
  loading: boolean;
  loaded: boolean;
  error?: string;
}

export function PresentationSlide({
  query,
  results,
  chartConfig,
  loading,
  loaded,
  error,
}: PresentationSlideProps) {
  return (
    <div className="flex flex-col items-center h-full w-full px-12 py-6">
      <h2 className="!text-3xl md:!text-4xl font-bold text-center mb-4 max-w-5xl leading-tight flex-shrink-0">
        {query}
      </h2>

      <div className="w-full flex-1 flex items-center justify-center min-h-0">
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-xl text-muted-foreground">Analyzing data...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl text-destructive">Error loading data</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && loaded && (
          <ChartOnlyView results={results} chartConfig={chartConfig} />
        )}

        {!loading && !error && !loaded && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl text-muted-foreground">
              Press any key to load data
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
