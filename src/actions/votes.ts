"use server"

import { createClient } from "@/utils/supabase/server"
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers"

async function addUpvote(id: string, upvotes: number): Promise<PostgrestError | null> {
  const supabase = createClient(cookies());

  const { error } = await supabase
    .from("tasks")
    .update({ "upvotes": upvotes })
    .eq("id", id);

  if (error) {
    console.log('Adding upvote:', error);
    return error;
  }

  return null
}

async function addDownvote(id: string) {
  const supabase = createClient(cookies());


}

export {
  addUpvote,
  addDownvote,
}