"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Download, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ImageType } from "@/components/ImageCard";

interface ImageActionsProps {
  image: ImageType;
}

export default function ImageActions({ image }: ImageActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setIsDeleting(true);
    try {
      // 1. Delete from Storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([image.image_url]);

      if (storageError) throw storageError;

      // 2. Delete from DB
      const { error: dbError } = await supabase
        .from("images")
        .delete()
        .eq("id", image.id);

      if (dbError) throw dbError;

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
      setIsDeleting(false);
    }
  };

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .download(image.image_url);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.image_url.split("/").pop() || "image";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image");
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={handleDownload}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        <Download className="h-4 w-4" />
        Download
      </button>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        Delete
      </button>
    </div>
  );
}
