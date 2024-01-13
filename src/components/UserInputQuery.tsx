import React, {
  MutableRefObject,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ClipLoader from "react-spinners/ClipLoader";

type UserInputQueryProps = {
  text: string;
  setText: (s: string) => void;
  hasRun: MutableRefObject<boolean>;
  sampleQueries: string[];
  submitQuestion: (question: string) => Promise<void>;
};

const UserInputQuery = ({
  text,
  setText,
  hasRun,
  sampleQueries,
  submitQuestion,
}: UserInputQueryProps) => {
  const isTyping = useRef(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const element = document.getElementById("UserQuery") as HTMLInputElement;

    const simulateTyping = async () => {
      if (hasRun.current) {
        return;
      }
      hasRun.current = true;

      const iterateQueries = async () => {
        while (true) {
          if (isTyping.current) return; // Break if user starts typing
          for (const query of sampleQueries) {
            for (const char of query) {
              if (isTyping.current) return; // Break if user starts typing
              element.value += char + "|";
              await new Promise((resolve) => setTimeout(resolve, 70));
              element.value = element.value.slice(0, -1);
            }
            if (isTyping.current) return; // Break if user starts typing

            while (element.value) {
              element.value = element.value.slice(0, -1);
              await new Promise((resolve) => setTimeout(resolve, 20));
            }
          }
        }
      };
      iterateQueries();
    };

    simulateTyping();

    const handleFocus = async () => {
      if (isTyping.current) {
        return;
      }
      isTyping.current = true;

      while (element.value) {
        element.value = element.value.slice(0, -1);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      setText("");
    };

    element.addEventListener("focus", handleFocus);

    return () => {
      element.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    submitQuestion(text).finally(() => setIsFetching(false));
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="mx-auto max-w-3xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md p-4 mt-10"
    >
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        id="UserQuery"
        autoComplete="off"
        className="block w-full sm:text-sm border-none rounded-none focus-visible:ring-0"
      />
      <div className="flex justify-end">
        <Button
          disabled={isFetching}
          className="col-span-1 flex w-56 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {isFetching ? (
            <ClipLoader speedMultiplier={0.4} color="white" size={24} />
          ) : (
            "Generate Response"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserInputQuery;
