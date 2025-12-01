import Image from "next/image";
import Link from "next/link";

export interface ImageType {
  id: string;
  image_url: string;
  style: string;
  caption: string;
  created_at: string;
}

interface ImageCardProps {
  image: ImageType;
}

export default function ImageCard({ image }: ImageCardProps) {
  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${image.image_url}`;

  return (
    <Link href={`/images/${image.id}`}>
      <div className="group relative break-inside-avoid mb-4 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative w-full">
          <Image
            src={publicUrl}
            alt={image.caption || "AI Generated Image"}
            width={500}
            height={500}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
          />
        </div>

        <div className="p-3">
          {image.style && (
            <span className="inline-block px-2 py-0.5 mb-2 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
              {image.style}
            </span>
          )}
          {image.caption && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {image.caption}
            </p>
          )}
          <div className="flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-gray-400">
              {new Date(image.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
