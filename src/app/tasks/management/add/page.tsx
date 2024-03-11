import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { PublishPostComponent } from "@/components/tasks/profile/PublishForm";

// server actions
import { fetchUser } from "@/actions/user";
import { Task } from "@/types/Task";
import { insert } from "@/actions/tasks";

export default async function Publish() {
  const supabase = createClient(cookies());
  const user = await fetchUser(supabase);

  /* payments
  if (user) {
    const n_offers = await fetchUserNumOffers();
    if (n_offers <= 0) return redirect("/pricing?error=wrong num of offers");

    return <PublishPostComponent formAction={insertStartup} startup={{} as Startup} />;
  }
  */

  // need to add formAction={insertTask}
  return (
    <section className="max-w-[110rem] w-full">
      <PublishPostComponent formAction={insert} data={{} as Task} />
    </section>
  )
}