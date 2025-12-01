import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ShareLink from "@/components/ShareLink";
import DownloadButton from "@/components/DownloadButton";

interface ImageDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ImageDetailPage({
  params,
}: ImageDetailPageProps) {
  const { id } = await params;

  const { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !image) {
    notFound();
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${image.image_url}`;
  const shareUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/images/${id}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        ギャラリーに戻る
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative w-full">
          <Image
            src={publicUrl}
            alt={image.caption || "AI Generated Image"}
            width={1200}
            height={1200}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            {image.caption && (
              <h1 className="text-2xl font-bold text-gray-900">
                {image.caption}
              </h1>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              {image.style && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-full">
                  {image.style}
                </span>
              )}
              <span className="text-sm text-gray-500">
                {new Date(image.created_at).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <ShareLink url={publicUrl} />

          <DownloadButton imageUrl={image.image_url} />
        </div>
      </div>
    </div>
  );
}
