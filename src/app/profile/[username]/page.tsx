import { fetchUser } from "@/actions/user"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile({
  params
}: {
  params: { username: string }
}) {
  const supabase = createClient(cookies());

  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("username", params.username)
    .single();

  if (error) {
    return redirect("/?error=could not fetch user");
  }

  return (
    <div className="bg-white dark:bg-neutral-800 text-text overflow-hidden rounded-lg border border-secondary mt-24 max-w-[60rem] w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-2xl leading-6 font-medium">
          {profile.username}{' '}<span className="text-accent ml-2">#{profile.ranking ?? "unranked"}</span>
        </h3>
        <p className="mt-1 max-w-2xl text-lg text-gray-500">
          Reputation: {profile.reputation ?? "unknown"}
        </p>
      </div>
      <div className="border-t border-gray-200 dark:border-neutral-700 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-neutral-700">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-medium text-gray-500">
              Upvotes:
            </dt>
            <dd className="mt-1 text-xl text-text sm:mt-0 sm:col-span-2">
              {profile.upvotes}
            </dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-medium text-gray-500">
              Downvotes:
            </dt>
            <dd className="mt-1 text-xl text-text sm:mt-0 sm:col-span-2">
              {profile.downvotes}
            </dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-medium text-gray-500">
              Joined:
            </dt>
            <dd className="mt-1 text-xl text-text sm:mt-0 sm:col-span-2">
              {profile.inserted_at}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}