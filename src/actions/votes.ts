"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

async function addUpvote(id: string, upvotes: number) {
  const supabase = createClient(cookies());

  const { error } = await supabase
    .from("tasks")
    .update({ "upvotes": upvotes })
    .eq("id", id);

  if (error) {
    console.log('Adding upvote:', error);
  }
}

async function addDownvote(id: string) {
  const supabase = createClient(cookies());


}

export {
  addUpvote,
  addDownvote,
}