import { Listing } from '@/components/tasks/Listing';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Index() {
  const supabase = createClient(cookies());

  const { data: offers } = await supabase
    .from('startups')
    .select()
    .order('id', { ascending: false })
    .limit(15);

  return (
    <div className="items-center pt-12 max-w-[100rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 xl:gap-72 mt-10 mb-24">
        <div className="lg:mr-auto place-self-center text-center lg:text-left">
          <h1 className="max-w-2xl mb-4 text-3xl md:text-5xl font-bold tracking-tight leading-none dark:text-white">
            You must do it because <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">you said you will do</span>
          </h1>

          <p className="mb-6 lg:mb-8 font-light text-gray-600 dark:text-gray-400  md:text-lg ">
            No more task postponing or procrastination, now everybody has seen that you must do something. Shame or little bit of work?
          </p>

          <a href="/tasks/management/add" className="inline-flex items-center justify-center px-12 py-3 mr-3 text-lg
          text-center rounded-lg bg-primary hover:bg-primary_hover focus:ring-1 text-text">
            Add Task
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd">
              </path>
            </svg>
          </a>
          <a href="/startups/management/publish" className="inline-flex items-center justify-center px-8 py-3 mt-2 text-lg font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Leaderboard
          </a>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#AFA3AC" className="hidden lg:flex max-w-md max-h-md">>
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>
      </div>

      <section className="w-full mt-24">
        <Listing startupList={offers} headerText='Dostępne biznesy:' />
        <a className='text-text' href="/startups?open=20" title="Przeglądaj więcej startupów na venturelist">
          <div className='w-full border border-primary hover:bg-primary  p-2 text-center'>
            More tasks
          </div>
        </a>
      </section>
    </div>
  )
}
