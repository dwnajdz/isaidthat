"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { fetchUser } from "./user"

import { formToTask } from "@/types/Task"
import type { Task } from "@/types/Task"

const DB_TABLE_NAME = "tasks";

async function insert(formData: FormData) {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);
  if (!user) return;

  // no need to check if user is owner of
  // as it is checked on the form side


  if (true) {
    const newStartup = formToTask(formData, user.id) as Task;

    const { error } = await supabase
      .from(DB_TABLE_NAME)
      .insert(newStartup);

    if (error) {
      console.log(error);
      return redirect("/tasks/management/add?error=cant upload new offer");
    }

    return redirect("/tasks/management?added=success");
  } else {
    return redirect("/error=account not activated");
  }
}

async function update(id: string, formData: FormData) {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);

  if (!user) return;

  const newData = formToTask(formData, user.id);
  const { error } = await supabase
    .from(DB_TABLE_NAME)
    .update(newData)
    .eq("id", id);

  if (error) {
    return redirect("/tasks/management?error=cannot update task");
  }

  return redirect(`/tasks/${id}?update=success`);
}

async function rangeQuery(ascending = false, from: number, to: number): Promise<Array<any> | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: job_postings, error } = await supabase
    .from(DB_TABLE_NAME)
    .select()
    .eq('done', 'FALSE') 
    .order('id', { ascending: ascending })
    .range(from, to);

  if (error) return null;
  return job_postings;
}

async function countPosts(): Promise<number> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: _, count } = await supabase
    .from(DB_TABLE_NAME)
    .select('*', { count: 'exact', head: true })

  return count ?? 0;
}

export {
  insert,
  update,
  rangeQuery,
  countPosts,
};