import { Slider } from "@nextui-org/react";
import { DataListbox } from "./Listboxes"
import {
  business_type,
  industry,
  n_employee,
  n_users
} from "@/utils/data"

export function SearchBar({
  searchParams,
}: {
  searchParams?: {
    "cities"?: string,
    "profit"?: string,
    "business_type[name]"?: string,
    "industry[name]"?: string,
    "startup_stage[name]"?: string,
    "n_employees[name]"?: string,
    "n_users[name]"?: string,
    "m_profit"?: string[],
    [key: string]: string | string[] | undefined;
  },
}) {
  return (
    <form className="m-12" action="/tasks/search" method="GET">
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <input type="text" name="username" className="bg-[#f1f1f1] dark:bg-[#1f1f1f] border 
                    border-[#c2c2c2] dark:border-[#2c2c2c] text-text p-2 rounded-lg w-full" placeholder="Username" defaultValue={searchParams?.["cities"]} />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-md">
        <button className="flex bg-primary hover:bg-[#a188bd] col-span-2 
                            border border-gray-300 dark:border-neutral-600 py-2 
                            text-xl text-text rounded-lg items-center">
          <p className="ml-3">Search</p>
          <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd">
            </path>
          </svg>
        </button>
        <a href="/startups" className="bg-secondary hover:bg-gray-500 border border-gray-300 dark:border-neutral-600 text-lg rounded-lg text-text items-center py-2">
          <p className="ml-2">Reset</p>
        </a>
      </div>
    </form>
  )
}

