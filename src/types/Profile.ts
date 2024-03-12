import { getForm } from "./Task";

type Profile = {
  id: string;
  inserted_at: string;
  
  username: string;
  image_url?: string;

  reputation?: number;
  ranking?: number;

  upvotes: number;
  downvotes: number;

  activated: boolean;
  user_id: string;
};

function formToProfile(formData: FormData, user_id: string | null): Profile {
  const model = {
    username: getForm<string>("username", formData),
    image_url: getForm<string>("image_url", formData),

    user_id: user_id
  } as Profile

  return model;
}

export { formToProfile };
export type { Profile };
