"use client";
import { useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { useRouter } from "next/navigation";
import { Listing } from "@/components/tasks/Listing";
import { rangeQuery} from "@/actions/tasks";

type ItemsProps = {
  initialItems: Array<any>;
  totalPosts: number,
  PAGE_VIEW_LIMIT: number,
};

export default function InfiniteListing({ initialItems, totalPosts, PAGE_VIEW_LIMIT }: ItemsProps) {
  const fetching = useRef(false);
  const canLoad = useRef(true);
  const router = useRouter();

  const [pages, setPages] = useState([initialItems]);
  const items = pages.flatMap((page) => page);

  const loadMore = async (page: number) => {
    if (!fetching.current) {
      try {
        fetching.current = true;

        let rangeTo: number = page + PAGE_VIEW_LIMIT;
        if (rangeTo >= totalPosts) rangeTo = totalPosts;

        const newPosts = await rangeQuery(false, page, rangeTo) ?? [];
        setPages((prev) => [...prev, newPosts]);

        // Redirect the user to the last position where they opened a post
        router.replace(`?open=${rangeTo}`, { scroll: false });

        if (rangeTo >= totalPosts) {
          throw new Error("limit of offers");
        }
      } catch (e) {
        canLoad.current = false;
        return;
      } finally {
        fetching.current = false;
      }
    }
  };

  return (
    <InfiniteScroll
      hasMore={canLoad.current}
      pageStart={0}
      pageChangeNumber={PAGE_VIEW_LIMIT + 1}
      loadMore={loadMore}
      loader={
        <span key={0} className="loader text-text">
          Loading...
        </span>
      }
      element="main"
    >
      <Listing list={items} showSearchBar={true} totalPosts={totalPosts} />
    </InfiniteScroll>
  );
}