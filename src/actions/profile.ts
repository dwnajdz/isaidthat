"use server"
import { Profile, formToProfile } from "@/types/Profile";
import { SupabaseClient } from "@supabase/supabase-js"
import { fetchUser } from "./user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function fetchProfile(supabase: SupabaseClient<any, "public", any>, user_id: string): Promise<Profile | null> {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select()
      .eq("user_id", user_id)
      .single();

    if (error) {
      throw error;
    }

    return profile;
  } catch (err) {
    return null;
  }
}

async function insertProfile(formData: FormData): Promise<void> {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);
  if (!user) return;

  const newProfile = formToProfile(formData, user.id) as Profile;

  const { error } = await supabase
    .from("profile")
    .insert(newProfile);

  if (error) {
    console.log(error);
    return redirect("/profile/new?error=cant upload new offer");
  }

  return redirect("/tasks/management?profile=success");
}

export {
  fetchProfile,
  insertProfile,
}