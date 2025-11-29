import { ImageType } from "./ImageCard";
import ImageCard from "./ImageCard";

interface GalleryGridProps {
  images: ImageType[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No images found.</p>
        <p className="text-gray-400 text-sm mt-2">
          Upload some images to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 gap-4 space-y-4">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
