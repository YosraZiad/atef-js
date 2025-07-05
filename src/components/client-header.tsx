"use client";

import { LanguageToggle } from "@/components/language-toggle";

export default function ClientHeader() {
  return (
    <header className="w-full flex justify-end p-4">
      <LanguageToggle />
    </header>
  );
}
