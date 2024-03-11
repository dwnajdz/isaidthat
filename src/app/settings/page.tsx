import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { fetchUser } from "@/actions/user"

export default async function Settings() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await fetchUser(supabase);
  if (user === null) {
    return redirect("/jobs?error=not authorized");
  }

  return (
    <section className="w-full max-w-[110rem]">
      <div className="max-w-6xl py-24 mx-auto">


        <div className="mb-12 p-3">
          <div id="account_details" className="mb-12">
            <button type="submit" className="w-44 p-3 bg-red-400 dark:bg-red-500 hover:bg-red-600 rounded-lg mb-12 text-xl text-white">
              Usunięcie konta
            </button>

            <h3 className="text-center text-text text-xl mb-2">Informacje:</h3>
            <form action="/api/settings/email" method="POST">
              <div className="mb-3">
                <label className="block mb-2 text-lg text-text">Stary e-mail</label>
                <input name="old_email" type="email"
                  className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                  placeholder="your@mail.com"
                  defaultValue={user.email}
                />
              </div>
              <div className="mb-3">
                <label className="block mb-2 text-lg text-text">Nowy e-mail</label>
                <input name="email" type="email"
                  className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                  placeholder="your@mail.com"
                />
              </div>
              <button type="submit" role="link" className="w-full p-3 mt-3 mb-12 bg-blue-400 dark:bg-blue-500 hover:bg-blue-600 rounded-lg text-xl text-white">
                Resetuj
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}