"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/lib/hooks"; // We need to create this hook or just use timeout

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  // Simple debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== searchParams.get("q")) {
        startTransition(() => {
          if (query) {
            router.push(`/?q=${encodeURIComponent(query)}`, { scroll: false });
          } else {
            router.push("/", { scroll: false });
          }
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full px-5 py-3.5 text-base border-2 border-gray-200 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md hover:border-gray-300"
          placeholder="作風やセリフで検索..."
        />
        <p> </p>
        {isPending && (
          <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
            <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        {query && !isPending && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
