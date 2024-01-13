"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { generateSlugFromName } from "@/lib/string";
import essays from "../essays/essays.json";
import { Card } from "./ui/card";
import UserInputQuery from "./UserInputQuery";
import { mockResponse } from "./response";
import ModelResponse from "./ModelResponse";
import { ValidatedResponse } from "@/types/oai";

const SampleQueries = [
  "What are things that don't scale?",
  "What is an example of Schlep Blindness",
  "Why do things that don't scale?",
];

const slugs = Object.keys(essays).map((item) => generateSlugFromName(item));
type essaySlugs = (typeof slugs)[number];

const UserQuery = () => {
  const [text, setText] = useState("");
  const [selectedEssay, setSelectedEssay] = useState<essaySlugs>(
    slugs.at(0) as string
  );
  const [response, SetResponse] = useState<ValidatedResponse | null>(null);
  const hasRun = useRef(false);

  const handleSubmit = (question: string) => {
    return fetch("/question", {
      method: "POST",
      body: JSON.stringify({
        question,
        context: essays[selectedEssay]["raw_markdown"],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        SetResponse(res);
      });
  };

  const memoizedUserInputQuery = useMemo(
    () => (
      <UserInputQuery
        submitQuestion={handleSubmit}
        hasRun={hasRun}
        text={text}
        setText={setText}
        sampleQueries={SampleQueries}
      />
    ),
    [hasRun, text, setText, SampleQueries]
  );

  return (
    <>
      {memoizedUserInputQuery}
      <div className="grid gap-x-8 mt-8 w-full grid-cols-3 max-w-3xl mx-auto">
        {Object.keys(essays).map((slug) => {
          const title = essays[slug]["title"];
          return (
            <Card
              key={slug}
              className={`w-48 h-36 ${
                selectedEssay === slug ? "border-purple-600" : "border-gray-300"
              } bg-white rounded-lg border-2 shadow p-4`}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p
                    className={`${
                      selectedEssay === slug
                        ? "text-purple-600"
                        : "text-gray-500"
                    } text-md font-semibold`}
                  >
                    {title}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedEssay(slug)}
                >
                  Select Source
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="py-4" />
      <div className="max-w-4xl mx-auto my-4">
        <ModelResponse response={response} />
        {/* {JSON.stringify(mockResponse["statements"])} */}
      </div>

      <div className="prose max-w-4xl mt-10 mx-auto">
        <h1 className="text-lg font-extrabold">
          {essays[selectedEssay]["title"]}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: essays[selectedEssay]["html"],
          }}
        />
      </div>
    </>
  );
};

export default UserQuery;
