import { update } from "@/actions/tasks";
import { PublishPostComponent } from "@/components/startups/profile/PublishForm";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Edit({
  params
}: {
  params: { id: string }
}) {
  const supabase = createClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/tasks?error=invalid user");

  const { data: profile, error } = await supabase
    .from('tasks')
    .select().eq('id', params.id)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    return redirect("/tasks/management?error=404");
  }

  const isUserOwner = user.id === profile.owner;
  if (!isUserOwner)
    return redirect("/tasks/management?error=not authorized");

  const updateAction = update.bind(null, params.id);
  return <PublishPostComponent formAction={updateAction} data={profile} buttonText="Update" />;
}