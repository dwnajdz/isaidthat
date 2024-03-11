'use client'
import { useState } from "react"
import type { Task } from "@/types/Task";

export function PublishPostComponent({
  formAction,
  data,
  buttonText = "Add",
}: {
  formAction: any,
  data: Task
  buttonText?: string,
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
            <h3 className="text-center text-text text-xl">Task information:</h3>
            <div className="mb-5">
              <label className="block mb-2 text-lg text-text">Title*</label>
              <input name="title"
                defaultValue={data.title}
                className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                placeholder="NaszStartup AI"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-lg text-text">Description
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                  (max. 10,000)
                </span>
              </label>
              <textarea name="description"
                defaultValue={data.description}
                className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                placeholder="Nasza firma zajmuje się..."
                maxLength={10000}
                rows={6}
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-lg text-text">Deadline*</label>
              <input name="deadline"
                defaultValue={data.deadline}
                type="date"
                className="bg-gray-50 dark:bg-neutral-800 text-text w-full p-2.5 rounded-lg"
                placeholder="Rozwijamy sztuczną inteligencję"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-primary hover:bg-primary_hover rounded-lg mb-12 text-xl text-white dark:text-black"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}
