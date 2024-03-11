import Link from "next/link"
import { SearchBar } from "../SearchBar"
import { Task } from "@/types/Task";

function Listing({
  list,
  showSearchBar = true,
  searchParams,
  totalPosts,
  headerText = "Results"
}: {
  list: Array<Task> | null,
  showSearchBar?: boolean,
  searchParams?: any | null,
  totalPosts?: number,
  headerText?: string,
}) {
  return (
    <div id="tasks" title="Available tasks">
      <h1 className="font-bold text-text text-4xl m-2 mb-0">{headerText}</h1>
      <h2 className="font-normal text-text text-lg m-2 mb-12 mt-0">
        Tasks: {list?.length}
        {totalPosts && <p>Wszystkie: {totalPosts}</p>}
      </h2>

      {showSearchBar && <SearchBar searchParams={searchParams} />}

      <div className="md:col-span-3 lg:col-span-4" id="startup-listing-cards">
        {list?.map((data, index) =>
          <ListingCard data={data} key={index} />
        )}
      </div>
    </div>
  )
}

function ListingCard({
  data,
}: {
  data?: Task,
}) {
  const url = `/tasks/${data?.id}`;
  return (
    <article className="w-full bg-[#e1e1e1] dark:bg-[#1e1e1e] dark: border border border-gray-300 dark:border-neutral-700 
    pb-4 rounded-none md:rounded-lg mb-0 md:mb-4" id={data?.id}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-4 py-4 rounded-md">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div>
            <h3>
              <span className="font-semibold text-lg text-text">
                user15{' '}
              </span>
              <span className="m-2 text-lg font-bold text-text mb-1">1</span>
            </h3>

            <Link href={url} className="font-bold tracking-wide mt-2 text-2xl text-text hover:text-primary">{data?.title}</Link>
            <p className="mt-1 leading-2 text-[#1e2826] dark:text-gray-300">{data?.description}</p>
            <div className="grid grid-cols-2 md:flex md:items-center gap-3 mt-2">
              <span className="bg-secondary text-text rounded-lg px-3 py-1 text-sm">
                {data?.deadline}
              </span>
            </div>
          </div>
        </div>
        <div className="md:max-w-[12rem] w-full mt-6 md:mt-0">
          <div className="space-y-5">
            <Link href="/" title="I believe in this guy, he is gonna do that."
              className="bg-primary hover:bg-primary_hover text-text text-lg px-12 py-4 rounded-md flex gap-1 items-center">
              Believe - {data?.upvotes}
            </Link>
            <Link href="/" title="He is not going to do this task."
              className="bg-secondary hover:bg-accent text-text text-lg px-12 py-4 rounded-md flex gap-1 items-center">
              Doubt - {data?.downvotes}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export { Listing };
