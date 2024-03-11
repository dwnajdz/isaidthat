import markdownToHtml from "@/utils/markdown/markdownToHtml"
import Link from "next/link"

function TaskPost({
  data,
  editView = false,
}: {
  data: any,
  editView?: boolean,
}) {
  return (
    <article className="w-full max-w-[110rem] p-3">
      <div className="max-w-6xl py-24 mx-auto">
        <TaskHeader data={data ?? {}} editView={editView} />
        <p className="text-xl mb-6 text-primary_hover hover:text-red-500">Deadline:
          <span className="text-2xl font-bold"> {data.deadline}</span>
        </p>

        <div className="space-y-5 md:space-y-8">
          <TaskBody postContent={data?.description} />

          {editView &&
            <Link href={"/task/done"} rel="nofollow noopener" title="Mark this task as done!" className="bg-green-700 hover:bg-green-800 text-white font-bold
            text-lg px-6 md:w-52 py-4 rounded-md flex gap-1 items-center">
              Mark as Done
            </Link>
          }
        </div>
      </div>
    </article>
  )
}

function TaskHeader({
  data,
  editView = false,
}: {
  data: any,
  editView?: boolean,
}) {
  if (data === undefined) return;

  // so user dont have to search back for data
  const backUrl: string = `/tasks#${data.id}`
  const editUrl: string = `/company/posts/edit/${data.id}`
  const deleteUrl: string = `/company/posts/delete/${data.id}`

  return (
    <header>
      <Link href={backUrl} title="Redirects to jobs lists to current job post"
        className="text-text hover:text-accent text-2xl md:text-xl p-2 rounded-md text-center mb-4 hover:underline w-1/4">
        &larr;
        Back
      </Link>

      {editView &&
        <section className="mt-2">
          <Link href={editUrl} title="Edit post content" className="
            text-green-700 hover:text-green-800 text-2xl md:text-xl p-3 rounded-md text-center mb-4 hover:underline w-1/4">
            🛠️ Edit
          </Link>
          <Link href={deleteUrl} title="Deletes post" className="
            text-red-700 hover:text-red-800 text-2xl md:text-xl p-3 rounded-md text-center mb-4 hover:underline w-1/4">
            🗑️ Delete
          </Link>
        </section>
      }

      <div className="flex justify-between items-center mb-6 mt-6">
        <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
          <div className="flex-shrink-0">
            <img className="h-16 w-16 rounded-full" src={data.company_logo_url ?? ""} alt={data.company} loading="lazy" />
          </div>
          <div className="grow">
            <div className="flex justify-between items-center gap-x-2">

              <div>
                <Link href={`/user`} className="font-semibold text-xl text-primary_hover hover:underline">
                  user1
                </Link>


                <ul className="text-lg text-gray-500">
                  <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                    {data.inserted_at}
                  </li>
                  <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                    Believed: {data.upvotes}
                  </li>
                  <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                    Doubted: {data.downvotes}
                  </li>
                </ul>
              </div>

              <div className="space-y-5">
                <Link href="/" title="I believe in this guy, he is gonna do that."
                  className="bg-primary hover:bg-primary_hover text-text text-lg px-6 md:px-12 py-4 rounded-md flex gap-1 items-center">
                  Believe - {data.upvotes}
                </Link>
                <Link href="/" title="He is not going to do this task."
                  className="bg-secondary hover:bg-accent text-text text-lg px-6 md:px-12 py-4 rounded-md flex gap-1 items-center">
                  Doubt - {data.downvotes}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

async function TaskBody({
  postContent
}: {
  postContent: string
}) {
  const content: string = await markdownToHtml(postContent || '')
  return (
    <div
      className="prose dark:prose-invert lg:prose-xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export {
  TaskPost,
  TaskHeader,
  TaskBody,
}