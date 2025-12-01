"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ShareLinkProps {
  url: string;
}

export default function ShareLink({ url }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">共有URL</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          readOnly
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
        />
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              コピー済み
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              コピー
            </>
          )}
        </button>
      </div>
    </div>
  );
}
