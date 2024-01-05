"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, Clipboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  commands: {
    label: string;
    command: string;
  }[];
};

const CodeSnippet = ({ commands }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Card className="bg-gray-800 max-w-sm rounded-md mx-auto">
      <CardContent className="p-0 flex items-center justify-between py-1">
        <span className="ml-4 text-white font-mono text-center text-sm flex-grow-1">
          {commands.at(0)?.command}
        </span>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer hover:bg-zinc-700 hover:text-zinc-50 text-zinc-50 px-2 rounded-md py-1">
              {dropdownOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {commands.map((item) => {
              return (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => copyToClipboard(item.command)}
                >
                  {item.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default CodeSnippet;
