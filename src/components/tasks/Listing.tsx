'use client'

import Link from "next/link"
import { SearchBar } from "../SearchBar"
import { Task } from "@/types/Task";
import { useState } from "react";

function Listing({
  list,
  showSearchBar = true,
  searchParams,
  totalPosts,
  headerText = "Results",
  upvoteAction,
  downvoteAction,
}: {
  list: Array<Task> | null,
  showSearchBar?: boolean,
  searchParams?: any | null,
  totalPosts?: number,
  headerText?: string,
  upvoteAction: any,
  downvoteAction: any,
}) {
  return (
    <div id="tasks" title="Available tasks">
      <h1 className="font-bold text-text text-4xl m-2 mb-0">{headerText}</h1>
      <h2 className="font-normal text-text text-lg m-2 mb-12 mt-0">
        Tasks: {list?.length}
        {totalPosts && <p>Wszystkie: {totalPosts}</p>}
      </h2>

      {showSearchBar && <SearchBar searchParams={searchParams} />}

      <div className="md:col-span-3 lg:col-span-4" id="tasks">
        {list?.map((data, index) =>
          <ListingCard data={data} key={index} upvoteAction={upvoteAction} downvoteAction={downvoteAction} />
        )}
      </div>
    </div>
  )
}

function ListingCard({
  data,
  upvoteAction,
  downvoteAction
}: {
  data?: Task,
  upvoteAction: any,
  downvoteAction: any
}) {
  const [upvotes, setUpvotes] = useState(data?.upvotes ?? 0);
  const [downvotes, setDownvotes] = useState(data?.downvotes ?? 0);

  const addUpvote = async (e: any) => {
    setUpvotes(upvotes + 1);
    await upvoteAction(data?.id, upvotes);
  };

  const url = `/tasks/${data?.id}`;
  return (
    <article className="w-full bg-[#e1e1e1] dark:bg-[#1e1e1e] dark: border border border-gray-300 dark:border-neutral-700 
    pb-4 rounded-none md:rounded-lg mb-0 md:mb-4" id={data?.id}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-4 py-4 rounded-md">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <img src={' '} className="rounded-full w-20 h-20" width={20} height={20} loading="lazy" />

          <div>
            <h3>
              <span className="font-semibold text-lg text-text">
                {data?.owner_name}{' '}
              </span>
              <span className="m-2 text-lg font-bold text-text mb-1">{data?.id}</span>
            </h3>

            <Link href={url} className="font-bold tracking-wide mt-2 text-2xl text-text hover:text-primary">{data?.title}</Link>
            <div className="grid grid-cols-2 md:flex md:items-center gap-3 mt-2">
              <p className="bg-secondary text-text rounded-lg px-3 py-1 text-sm">
                Deadline: <span className="font-bold">{data?.deadline}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="md:max-w-[15rem] w-full mt-6 md:mt-0">
          <div className="space-y-5">
            <form action={addUpvote}>
              <button type="submit" title="I believe in this guy, he is gonna do that."
                className="bg-primary hover:bg-primary_hover text-text text-lg px-12 py-4 rounded-md flex gap-1 items-center">
                Believe - {upvotes}
              </button>
            </form>
            <form>
              <button type="submit" title="He is not going to do this task."
                className="bg-secondary hover:bg-accent text-text text-lg px-12 py-4 rounded-md flex gap-1 items-center">
                Doubt - {downvotes}
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export { Listing };
