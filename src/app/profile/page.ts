import { fetchProfile } from "@/actions/profile";
import { fetchUser } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const suapbase = createClient(cookies());
  const user = await fetchUser(suapbase);

  if (user === null) return redirect("/tasks?error=unauthorized");

  const profile = await fetchProfile(suapbase, user.id);
  if (profile) {
    return redirect(`/profile/${profile.username}`);
  }

  return redirect("/profile/new")
}