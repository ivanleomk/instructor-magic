import { generateResponseFromUserQuestion } from "@/lib/citation";
import { UserQuestion } from "@/types/query";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const data = await request.json();

  const parsedData = UserQuestion.safeParse(data);

  if (!parsedData.success) {
    return Response.json({
      message: parsedData.error,
    });
  }

  const { question, context } = parsedData.data;
  console.log(`Recieved query of ${question}`);
  const response = await generateResponseFromUserQuestion(context, question);

  return Response.json({ ...response });
}
