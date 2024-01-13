"use server";
import {
  ConstructValidatedResponseSchema,
  ValidatedStatement,
  ValidationResult,
} from "@/types/oai";
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";

export const generateResponseFromUserQuestion = (
  context: string,
  question: string
) => {
  const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
  });
  const client = Instructor({
    client: oai,
    mode: "TOOLS",
  });

  return client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a world class algorithm to answer questions with correct and exact citations. Make sure to phrase the statement so that it is not a direct copy of the original citation",
      },
      { role: "user", content: `${context}` },
      { role: "user", content: `Question: ${question}` },
    ],
    model: "gpt-4-1106-preview",
    response_model: {
      schema: ConstructValidatedResponseSchema(context, client),
      name: "Validated Response",
    },
    max_retries: 3,
  });
};
