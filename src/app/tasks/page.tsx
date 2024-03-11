import { rangeQuery, countPosts } from "@/actions/tasks";
import InfiniteListing from "./InfiniteListing";

export default async function ListingsView({
  searchParams,
}: {
  searchParams: { open: string | null },
}) {
  // Counting from 0 so 20 = 19
  const PAGE_VIEW_LIMIT = 19;

  // When a user clicks on a post and then navigates back,
  // they will be redirected to the last clicked post
  const openedPosts: number = Number(searchParams.open ?? PAGE_VIEW_LIMIT);

  const getPosts = rangeQuery(false, 0, openedPosts) ?? [];
  const getTotalPosts = countPosts();
  const [posts, totalPosts] = await Promise.all([getPosts, getTotalPosts]);

  return (
    <section className="w-full max-w-[85rem] mx-auto py-24">
      <InfiniteListing initialItems={posts ?? []} totalPosts={totalPosts} PAGE_VIEW_LIMIT={openedPosts} />
    </section>
  )
} 
