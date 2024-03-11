"use server"
import { SupabaseClient, User } from "@supabase/supabase-js"

export async function fetchUser(supabase: SupabaseClient<any, "public", any>): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};