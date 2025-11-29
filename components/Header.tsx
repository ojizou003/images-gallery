import Link from "next/link";
import { PlusCircle, Image as ImageIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
        >
          <ImageIcon className="h-6 w-6 text-indigo-600" />
          <span>AI Gallery</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/upload"
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
          >
            <PlusCircle className="h-4 w-4" />
            Upload
          </Link>
        </nav>
      </div>
    </header>
  );
}
