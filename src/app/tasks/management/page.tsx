import { createClient } from "@/utils/supabase/server";
import { fetchUser } from "@/actions/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Listing } from "@/components/startups/Listing";


export default async function PageManagement() {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);

  if (!user) return redirect("/error?unauthorized");

  const { data: userData, error } = await supabase
    .from("tasks")
    .select().eq("owner", user.id)
    .order("id", { ascending: false });

  if (error) {
    return <p>we could not fetch your data, try to refresh this page</p>;
  }

  return (
    <div className="w-full max-w-[85rem] mx-auto py-24">
      <Listing startupList={userData} showSearchBar={false} headerText="Moje oferty" />
    </div>
  );
}