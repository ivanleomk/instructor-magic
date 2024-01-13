import UserQuery from "@/components/UserQuery";
import CodeSnippet from "@/components/code-snippet";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { install_config } from "@/config/install";
import { site_config } from "@/config/site";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center ">
          <h2 className="font-semibold tracking-wide text-4xl uppercase mx-auto">
            {site_config.name}
          </h2>
          <p className="mt-1  text-gray-900 sm:tracking-tight max-w-lg mx-auto">
            {site_config.description}
          </p>
          <div className="my-4" />
          <CodeSnippet commands={install_config.commands} />
        </div>
        <div className="max-w-xl mx-auto mt-20">
          <h2 className="font-semibold tracking-wide text-2xl uppercase mx-auto">
            Validate Citations
          </h2>
          <p className="text-sm mt-2">
            See an example on how to use structed extraction to provide
            character level citations that allow us to fact check each statement
            in the context, minimizing halucinations.
          </p>
        </div>
        <UserQuery />
      </div>
    </div>
  );
}
