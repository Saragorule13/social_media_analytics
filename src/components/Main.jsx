import { div } from "framer-motion/client";
import React from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";

export default function Main() {
  return (
    <div className="bg-[#121212] w-[95vw] h-[85vh] relative text-center flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold pt-10">Social Media Performance Analysis using Langflow and Datastax</h1>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}

export const projects = [
  {
    title: "About",
    description:
      "I can help you analyze data and provide insights. Just ask me anything!",
    link: "https://stripe.com",
  },
  {
    title: "Tips",
    description:
      "Ask about performance metrics",
    link: "https://netflix.com",
  },
  {
    title: "Example Prompts",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
];
