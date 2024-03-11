import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { fetchUser } from "@/actions/user";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await fetchUser(supabase);
  if (user === null) redirect("/settings?mailChangeSuccess=false");

  const userFormData = await request.formData();
  const newMail = userFormData.get("email") as string;

  const { data: _, error } = await supabase.auth.updateUser({
    email: newMail
  });

  if (error) {
    console.log(error);
    return redirect("/settings?mailChangeSuccess=false");
  }

  return redirect("/settings?mailChangeSuccess=true");
}