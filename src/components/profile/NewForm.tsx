'use client'
import { useState } from "react"
import type { Profile } from "@/types/Profile";

export function NewProfileForm({
  formAction,
  data,
}: {
  formAction: any,
  data: Profile
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsLoading(true);

    await formAction(formData);
  }

  return (
    <section className="w-full max-w-[110rem]">
      <div className="max-w-6xl py-24 mx-auto">
        <form onSubmit={handleSubmit} className="border-t border-b border-gray-300 dark:border-neutral-700 mb-12 p-3">
          <div id="startup_details" className="mb-12">
            <h3 className="text-center text-text text-xl">Profile:</h3>
            <div className="mb-5">
              <label className="block mb-2 text-lg text-text">Username*</label>
              <input name="username"
                defaultValue={data.username}
                className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                placeholder="myuser123"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-lg text-text">Profile picture (url)</label>
              <input name="image_url"
                defaultValue={data.image_url}
                className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                placeholder="https://images.com/myuser"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-primary hover:bg-primary_hover rounded-lg mb-12 text-xl text-white dark:text-black"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create'}
          </button>
        </form>
      </div>
    </section>
  )
}
