"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { generateQuery, runGenerateSQLQuery, generateChartConfig } from "@/app/actions";
import { Config, Result } from "@/lib/types";

const SUGGESTED_QUERIES = [
  "Compare count of unicorns in SF and NY over time",
  "Compare unicorn valuations in the US vs China over time",
  "Countries with highest unicorn density",
  "Show the number of unicorns founded each year over the past two decades",
  "Display the cumulative total valuation of unicorns over time",
  "Compare the yearly funding amounts for fintech vs healthtech unicorns",
  "Which cities have with most SaaS unicorns",
  "Show the countries with highest unicorn density",
  "Show the number of unicorns (grouped by year) over the past decade",
  "Compare the average valuation of AI companies vs. biotech companies",
  "Investors with the most unicorns",
];

export interface SlideData {
  query: string;
  sqlQuery: string;
  results: Result[];
  chartConfig: Config | null;
}

async function fetchSlideData(slideIndex: number): Promise<SlideData> {
  const query = SUGGESTED_QUERIES[slideIndex - 1]; // Offset for title slide

  // Step 1: Generate SQL query
  const sqlQuery = await generateQuery(query);

  // Step 2: Run SQL query
  const results = await runGenerateSQLQuery(sqlQuery);

  // Step 3: Generate chart config
  const { config } = await generateChartConfig(results, query);

  return {
    query,
    sqlQuery,
    results,
    chartConfig: config,
  };
}

/**
 * Hook to fetch slide data with React Query
 * @param slideIndex - The slide index (1-based, 0 is title slide)
 * @param enabled - Whether to enable the query
 */
export function useSlideData(slideIndex: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["slide", slideIndex],
    queryFn: () => fetchSlideData(slideIndex),
    enabled: enabled && slideIndex > 0, // Don't fetch for title slide (index 0)
    staleTime: Infinity, // Data never goes stale
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 2, // Retry twice on failure
  });
}

/**
 * Hook to prefetch multiple upcoming slides
 * @param currentSlideIndex - Current slide index
 * @param prefetchCount - Number of slides to prefetch ahead (default: 2)
 */
export function usePrefetchNextSlide(
  currentSlideIndex: number,
  prefetchCount: number = 2
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Only prefetch if we're on a data slide (not title slide)
    if (currentSlideIndex > 0) {
      const totalDataSlides = SUGGESTED_QUERIES.length;

      // Prefetch next N slides with boundary check
      for (let i = 1; i <= prefetchCount; i++) {
        const targetSlideIndex = currentSlideIndex + i;

        // Boundary check: don't exceed total slides
        if (targetSlideIndex <= totalDataSlides) {
          queryClient.prefetchQuery({
            queryKey: ["slide", targetSlideIndex],
            queryFn: () => fetchSlideData(targetSlideIndex),
            staleTime: Infinity,
            gcTime: 30 * 60 * 1000,
          });
        }
      }
    }
  }, [currentSlideIndex, prefetchCount, queryClient]);
}

/**
 * Get the total number of slides (including title slide)
 */
export function getTotalSlides() {
  return SUGGESTED_QUERIES.length + 1; // +1 for title slide
}

/**
 * Get suggested queries array
 */
export function getSuggestedQueries() {
  return SUGGESTED_QUERIES;
}
