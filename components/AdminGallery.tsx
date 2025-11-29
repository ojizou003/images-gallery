"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Loader2, LogOut } from "lucide-react";
import { ImageType } from "./ImageCard";
import { deleteImage, logoutAdmin } from "@/app/admin/actions";

interface AdminGalleryProps {
  images: ImageType[];
}

export default function AdminGallery({ images: initialImages }: AdminGalleryProps) {
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteImage(id, imageUrl);

      if (result.success) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        alert(result.error || "Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAdmin();
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoggingOut(false);
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No images found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => {
          const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${image.image_url}`;
          const isDeleting = deletingId === image.id;

          return (
            <div
              key={image.id}
              className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={publicUrl}
                  alt={image.caption || "AI Generated Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>

              <div className="p-2">
                {image.style && (
                  <span className="inline-block px-1.5 py-0.5 mb-1 text-[10px] font-medium bg-indigo-50 text-indigo-700 rounded">
                    {image.style}
                  </span>
                )}
                {image.caption && (
                  <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                    {image.caption}
                  </p>
                )}
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                  <span>{new Date(image.created_at).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => handleDelete(image.id, image.image_url)}
                  disabled={isDeleting}
                  className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-red-50 border border-red-200 rounded text-red-600 text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
