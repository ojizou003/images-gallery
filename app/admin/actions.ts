"use server";

import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function loginAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  }

  return { success: false, error: "Invalid password" };
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return !!session;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}

export async function deleteImage(id: string, imageUrl: string) {
  const isAdmin = await checkAdminAuth();
  
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from("images")
      .remove([imageUrl]);

    if (storageError) {
      console.error("Storage deletion error:", storageError);
      throw storageError;
    }

    // 2. Delete from DB
    const { error: dbError } = await supabase
      .from("images")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Database deletion error:", dbError);
      throw dbError;
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: "Failed to delete image" };
  }
}
