import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import { SupabaseClient, User } from "@supabase/supabase-js"
import { fetchUser } from "@/actions/user"

const DB_TABLE_NAME = "tasks";

async function isUserOwner(
  supabase: SupabaseClient<any, "public", any>,
  user: User | null,
  id: string
): Promise<boolean> {
  const { data: offer, error } = await supabase
    .from(DB_TABLE_NAME)
    .select().eq('id', id)
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return user?.id === offer.owner;
}

export default async function DeletePost({ params }: { params: { id: string } }) {
  const supabase = createClient(cookies());

  const user: User | null = await fetchUser(supabase)
  if (user === null) {
    return redirect(`/tasks/${params.id}?error=user not authenticated`);
  }

  const isOwner: boolean = await isUserOwner(supabase, user, params.id)
  if (!isOwner) {
    return redirect(`/tasks/${params.id}?error=user not owner`);
  }

  const { error } = await supabase
    .from(DB_TABLE_NAME)
    .delete()
    .eq('id', params.id);

  if (error) {
    return redirect(`/tasks/${params.id}?error=could not delete offer`);
  }

  return redirect(`/tasks/management?delete=success`);
}