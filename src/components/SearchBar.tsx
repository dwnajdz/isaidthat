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
  const selectedBusiness = searchParams && searchParams['business_type[name]']
  const selectedIndustry = searchParams && searchParams['industry[name]']
  const selectedEmp = searchParams && searchParams['n_employees[name]']
  const selectedUsers = searchParams && searchParams['n_users[name]']

  const extractMinMax = (param: string, defaultValue: number[]) => [
    Number(searchParams?.[param]?.[0] ?? defaultValue[0]),
    Number(searchParams?.[param]?.[1] ?? defaultValue[1]),
  ];

  const [minProfit, maxProfit] = extractMinMax('m_profit', [0, 100000]);
  const [minPrice, maxPrice] = extractMinMax('asking_price', [0, 100000]);

  return (
    <form className="m-12" action="/tasks/search" method="GET">
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        {/*<input type="text" name="cities" className="bg-[#f1f1f1] dark:bg-[#1f1f1f] border 
                    border-[#c2c2c2] dark:border-[#2c2c2c] text-text p-2 rounded-lg w-full" placeholder="Miasto" defaultValue={searchParams?.["cities"]} />*/}
        <DataListbox name="business_type" data={business_type} selectedValue={selectedBusiness} />
        <DataListbox name="industry" data={industry} selectedValue={selectedIndustry} />
        <DataListbox name="n_employees" data={n_employee} selectedValue={selectedEmp} />
        <DataListbox name="n_users" data={n_users} selectedValue={selectedUsers} />

        <Slider
          label="Zysk miesięczny [PLN]"
          name="m_profit"
          step={100}
          minValue={0}
          maxValue={100000}
          defaultValue={[minProfit, maxProfit]}
          formatOptions={{ style: "currency", currency: "USD" }}
          className="text-text"
        />

        <Slider
          label="Cena [PLN]"
          name="asking_price"
          step={100}
          minValue={0}
          maxValue={100000}
          defaultValue={[minPrice, maxPrice]}
          formatOptions={{ style: "currency", currency: "USD" }}
          className="text-text"
        />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-md">
        <button className="flex bg-primary hover:bg-[#a188bd] col-span-2 
                            border border-gray-300 dark:border-neutral-600 py-2 
                            text-xl text-text rounded-lg items-center">
          <p className="ml-3">Szukaj</p>
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

