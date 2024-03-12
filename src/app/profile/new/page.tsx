import { fetchProfile, insertProfile } from "@/actions/profile";
import { fetchUser } from "@/actions/user";
import { NewProfileForm } from "@/components/profile/NewForm";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewProfile() {
  const suapbase = createClient(cookies());
  const user = await fetchUser(suapbase);

  if (user === null) return redirect("/tasks?error=unauthorized");

  const profile = await fetchProfile(suapbase, user.id);
  if (profile) {
    return <NewProfileForm formAction={"/"} data={profile} />
  }

  return <NewProfileForm formAction={insertProfile} data={{} as any} />
}