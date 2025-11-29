import { redirect } from "next/navigation";
import { checkAdminAuth } from "../actions";
import { supabase } from "@/lib/supabase";
import AdminGallery from "@/components/AdminGallery";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    redirect("/admin");
  }

  const { data: images, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage all uploaded images
          </p>
        </div>
      </div>

      <AdminGallery images={images || []} />
    </div>
  );
}
