import { z } from "zod";

export const UserQuestion = z.object({
  question: z.string(),
  context: z.string(),
});
