import Link from "next/link"
import { SearchBar } from "../SearchBar"
import { Startup } from "@/types/Startup";

function Listing({
  startupList,
  showSearchBar = true,
  searchParams,
  totalPosts,
  headerText = "Wyniki"
}: {
  startupList: Array<Startup> | null,
  showSearchBar?: boolean,
  searchParams?: any | null,
  totalPosts?: number,
  headerText?: string,
}) {
  return (
    <div id="job-listings">
      <h1 className="font-bold text-text text-4xl m-2 mb-0">{headerText}</h1>
      <h2 className="font-normal text-text text-lg m-2 mb-12 mt-0">
        Liczba wyników: {startupList?.length}
        {totalPosts && <p>Wszystkie: {totalPosts}</p>}
      </h2>

      {showSearchBar && <SearchBar searchParams={searchParams} />}

      <div className="md:col-span-3 lg:col-span-4" id="startup-listing-cards">
        {startupList?.map((startupData, index) =>
          <ListingCard data={startupData} key={index} />
        )}
      </div>
    </div>
  )
}

function ListingCard({
  data,
}: {
  data?: Startup,
}) {
  const urlToStartup = `/startups/profile/${data?.name}`;
  return (
    <article className="w-full bg-[#e1e1e1] dark:bg-[#1e1e1e] border border border-gray-300 dark:border-[#28282d] 
    pb-4 rounded-none md:rounded-lg mb-0 md:mb-4" id={data?.id}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-4 py-4 rounded-md">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
          <div className="bg-secondary rounded-lg w-auto md:w-20 h-20 text-text text-center flex items-center justify-center">
            <p className="mx-auto font-bold">{data?.business_type}</p>
          </div>

          <div>
            <Link href={urlToStartup} className="font-bold tracking-wide mt-2 text-2xl text-text hover:text-primary">{data?.name}
              <span className="m-1 text-sm text-gray-500 dark:text-neutral-600 font-normal">
                {data?.inserted_at}
              </span>
            </Link>

            <p className="mt-1 leading-2 text-[#1e2826] dark:text-gray-300">{data?.tagline}</p>

            <div className="grid grid-cols-2 md:flex md:items-center gap-5 mt-3">
              <span title="zysk w ciągu miesiąca">
                <p className="text-gray-600 dark:text-gray-400 p-1">Zysk miesięczny</p>
                <p className="bg-secondary text-text rounded-lg px-3 py-1">{data?.monthly_profit} zł</p>
              </span>

              <span title="branża">
                <p className="text-gray-600 dark:text-gray-400 p-1">Branża</p>
                <p className="bg-secondary text-text rounded-lg px-3 py-1">{data?.industry}</p>
              </span>

              <span title="założono">
                <p className="text-gray-600 dark:text-gray-400 p-1">Założenie</p>
                <p className="bg-secondary text-text rounded-lg px-3 py-1">{data?.found_year}</p>
              </span>

              <span title="liczba użytkowników">
                <p className="text-gray-600 dark:text-gray-400 p-1">Użytkownicy</p>
                <p className="bg-secondary text-text rounded-lg px-3 py-1">{data?.n_users}</p>
              </span>

              <span title="liczba pracowników">
                <p className="text-gray-600 dark:text-gray-400 p-1">Pracownicy</p>
                <p className="bg-secondary text-text rounded-lg px-3 py-1">{data?.n_employees}</p>
              </span>

              {data?.city &&
                <span title="miasto, lokalizacja">
                  <p className="text-gray-600 dark:text-gray-400 p-1">Miasto</p>
                  <p className="bg-secondary text-text rounded-lg px-3 py-1">{data.city}</p>
                </span>}
            </div>
          </div>
        </div>

        <div className="md:max-w-[12rem] w-full mt-6 md:mt-0">
          <h3 title="cena">
            <span className="text-gray-600 dark:text-gray-400 mb-1">Cena wywoławcza</span>
            <br />
            <span className="text-2xl font-bold text-text mb-1">{data?.asking_price} zł</span>
          </h3>
          <a href={urlToStartup} title="External link to organisation application page" className="bg-primary hover:bg-primary_hover
           font-lg px-1 py-3 rounded-md flex gap-1 items-center mx-auto">
            <p className="mx-auto text-black dark:text-white">Więcej Informacji</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export { Listing };
