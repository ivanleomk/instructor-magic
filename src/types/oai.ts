import { z } from "zod";
import Instructor from "@instructor-ai/instructor";

export const ValidationResult = z.object({
  isValid: z.boolean().describe(""),
  error: z
    .string()
    .optional()
    .describe(
      "This is the error message to describe why the validation has failed"
    ),
});

// .parseAsync(async (val) => {

//   });

export const ConstructValidatedResponseSchema = (
  context: string,
  client: ReturnType<typeof Instructor>
) => {
  return z.object({
    statements: z
      .array(
        z.object({
          statement: z
            .string()
            .describe(
              "This is a statement which helps to answer the user's original question"
            ),
          relevant_portions: z
            .array(z.string())
            .describe(
              "These are the specific sentences or paragraphs in the original source that directly support the statement"
            ),
        })
      )
      .min(
        2,
        "Make sure to provide at least two statements. Break up a single statement into two if necessary."
      ),
  });
};

// const result = await client.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a world class algorithm to answer questions with correct and exact citations. You are about to be passed a short statement along with the original source and relevant portions from the source that support the claim. Your job is to determine if the claim is valid.",
//       },
//       {
//         role: "assistant",
//         content: `The statement is ${val.statement}`,
//       },
//       {
//         role: "assistant",
//         content: `The relevant portions that our answer is citing is ${val.relevant_portions.join(
//           ","
//         )}`,
//       },
//       {
//         role: "user",
//         content:
//           "Is this a valid statement that has the evidence to support it?",
//       },
//     ],
//     model: "gpt-4",
//     response_model: {
//       schema: ValidationResult,
//       name: "Validation Result",
//     },
//     max_retries: 2,
//   });

export type ValidatedResponse = ReturnType<
  typeof ConstructValidatedResponseSchema
>;
