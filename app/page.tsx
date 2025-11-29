import { supabase } from "@/lib/supabase";
import GalleryGrid from "@/components/GalleryGrid";
import SearchBar from "@/components/SearchBar";

export const revalidate = 0;

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q: query } = await searchParams;

  let supabaseQuery = supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    // Using ilike for partial match on style or caption
    supabaseQuery = supabaseQuery.or(
      `style.ilike.%${query}%,caption.ilike.%${query}%`
    );
  }

  const { data: images, error } = await supabaseQuery;

  if (error) {
    console.error("Error fetching images:", error);
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load images
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            AI Image Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore the collection of AI generated artworks
          </p>
        </div>
        <SearchBar />
      </div>

      <GalleryGrid images={images || []} />
    </div>
  );
}
