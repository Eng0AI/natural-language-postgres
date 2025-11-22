"use client";

import { useEffect, useRef, useState } from "react";
import { PresentationSlide } from "@/components/presentation-slide";
import {
  useSlideData,
  usePrefetchNextSlide,
  getSuggestedQueries,
} from "@/hooks/use-slide-data";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

const SUGGESTED_QUERIES = getSuggestedQueries();

export function PresentationMode() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<any>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Fetch current slide data (only if not title slide)
  const { data, isLoading, error } = useSlideData(
    currentSlideIndex,
    currentSlideIndex > 0 // Don't fetch for title slide
  );

  // Prefetch next slide for instant navigation
  usePrefetchNextSlide(currentSlideIndex);

  // Initialize reveal.js
  useEffect(() => {
    const initReveal = async () => {
      if (deckRef.current) return; // Prevent double initialization

      const Reveal = (await import("reveal.js")).default;

      const deck = new Reveal(deckDivRef.current!, {
        controls: true,
        progress: true,
        hash: true,
        center: true,
        transition: "slide",
        keyboard: true,
        touch: true,
        loop: false,
        margin: 0.04,
        width: 1280,
        height: 720,
      });

      await deck.initialize();
      deckRef.current = deck;

      // Listen to slide changes
      deck.on("slidechanged", (event: any) => {
        const slideIndex = event.indexh;
        setCurrentSlideIndex(slideIndex);
      });
    };

    initReveal();

    return () => {
      if (deckRef.current) {
        deckRef.current.destroy();
        deckRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={deckDivRef} className="reveal">
      <div className="slides">
        {/* Title Slide */}
        <section>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Natural Language Postgres
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
            Unicorn Companies Data Insights
          </p>
          <p className="text-lg text-muted-foreground">
            Press <kbd className="px-2 py-1 bg-muted rounded">→</kbd> or{" "}
            <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> to begin
          </p>
        </section>

        {/* Data Slides */}
        {SUGGESTED_QUERIES.map((query, index) => {
          const slideIndex = index + 1;
          const isCurrentSlide = currentSlideIndex === slideIndex;

          return (
            <section key={index}>
              {isCurrentSlide ? (
                // Only render slide content when it's the current slide
                <PresentationSlide
                  query={query}
                  results={data?.results || []}
                  chartConfig={data?.chartConfig || null}
                  loading={isLoading}
                  loaded={!!data && !isLoading}
                  error={error?.message}
                />
              ) : (
                // Placeholder for non-current slides
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 max-w-4xl">
                    {query}
                  </h2>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
