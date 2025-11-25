/**
 * LLM Provider Configuration
 *
 * All LLM configuration is read from environment variables - NO hardcoded defaults.
 *
 * Required environment variables:
 * - LLM_PROVIDER: "openai" | "anthropic" | "google"
 * - LLM_MODEL: Model ID (e.g., "gpt-4o", "claude-sonnet-4-5-20250514", "gemini-2.5-flash")
 *
 * API key environment variables per provider:
 * - OpenAI: OPENAI_API_KEY
 * - Anthropic: ANTHROPIC_API_KEY
 * - Google: GOOGLE_API_KEY
 */

import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";

export type LLMProviderType = "openai" | "anthropic" | "google";

/**
 * Get the configured LLM provider from environment variables
 */
export function getLLMProvider(): LLMProviderType {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();

  if (
    provider === "anthropic" ||
    provider === "google" ||
    provider === "openai"
  ) {
    return provider;
  }

  throw new Error(
    "LLM_PROVIDER environment variable is required. Set to 'openai', 'anthropic', or 'google'."
  );
}

/**
 * Get the configured model ID from environment variables
 */
export function getLLMModel(): string {
  const model = process.env.LLM_MODEL;

  if (!model) {
    throw new Error(
      "LLM_MODEL environment variable is required. Example: 'gpt-4o', 'claude-sonnet-4-5-20250514', 'gemini-2.5-flash'"
    );
  }

  return model;
}

/**
 * Get the language model instance based on environment configuration
 */
export function getLanguageModel() {
  const provider = getLLMProvider();
  const modelId = getLLMModel();

  switch (provider) {
    case "anthropic":
      return anthropic(modelId);
    case "google":
      return google(modelId);
    case "openai":
    default:
      return openai(modelId);
  }
}
