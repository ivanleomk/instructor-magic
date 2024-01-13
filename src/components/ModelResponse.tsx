import React, { useState } from "react";
import { response } from "./response";
import { cn } from "@/lib/utils";
import { ValidatedResponse } from "@/types/oai";

type ModelResponseProps = {
  response: ValidatedResponse | null;
};

const ModelResponse = ({ response }: ModelResponseProps) => {
  const [selectedQuote, setSelectedQuote] = useState<null | number>(null);

  if (!response) {
    return null;
  }
  return (
    <div className="flex justify-between  bg-white ">
      <div className="flex flex-col w-1/2">
        <div className="text-lg font-semibold text-gray-700 mb-2">Response</div>
        <div className="text-gray-800 prose text-md">
          {response["statements"].map((item, idx) => {
            return (
              <span
                key={idx}
                className={cn(
                  idx === selectedQuote ? "underline" : "",
                  "cursor-pointer mr-1"
                )}
                onMouseEnter={() => {
                  setSelectedQuote(idx);
                }}
              >
                {item.statement}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-1/2 ml-6">
        <div className="text-sm font-semibold text-gray-700 mb-2">
          See Relevant Quotation from the source below
        </div>

        <ol className="prose ">
          {selectedQuote !== null &&
            response["statements"]
              .at(selectedQuote)
              ["relevant_portions"].map((item) => {
                return (
                  <li key={item} className="text-md my-2 list-disc ml-4">
                    {item}
                  </li>
                );
              })}
        </ol>
      </div>
    </div>
  );
};

export default ModelResponse;
