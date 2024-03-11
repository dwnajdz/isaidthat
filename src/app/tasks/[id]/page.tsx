import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export default async function Post({
  params
}: {
  params: { id: string }
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from('tasks')
    .select().eq('id', params.id)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    return redirect("/startups?error=404");
  }
  
  const isUserOwner = user?.id === profile.owner;
  return (
    <div className="w-full mx-auto">
      <div className="relative isolate overflow-hidden bg-[#e1e1e1] dark:bg-[#1e1e1e] py-24 sm:py-32">
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-primary to-primary_hover opacity-20"></div>
        </div>

        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-24 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-primary_hover to-accent opacity-20"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {isUserOwner &&
            <section className="mb-6">
              <a href={`/startups/management/edit/${params.id}`} title="Edit your company informations" className="
          text-green-700 hover:text-green-800 text-2xl md:text-xl p-2 rounded-md text-center mb-4 hover:underline w-1/4 border border-green-700">
                Edit
              </a>

              <a href={`/startups/management/delete/${params.id}`} title="Edit your company informations" className="
          text-green-700 hover:text-green-800 text-2xl md:text-xl p-2 rounded-md text-center mb-4 hover:underline w-1/4 border border-green-700">
                Delete
              </a>
            </section>
          }
          <ul className="text-lg text-gray-500 mb-6">
            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
              {profile.inserted_at}
            </li>

            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
              {profile.found_year}
            </li>

            <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-neutral-500 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
              {profile.business_type}
            </li>
          </ul>

          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="flex flex-col-reverse border-b border-neutral-400 dark:border-neutral-600 text-center md:text-left">
              <dt className="text-base leading-7 text-gray-800 dark:text-gray-300 mt-1 mb-6">Cena sprzedaży</dt>
              <dd className="text-3xl font-bold leading-9 tracking-tight text-text">{profile.asking_price} zł</dd>
            </div>

            <div className='mt-6'>
              <a href={profile.website} target="_blank" className="text-4xl font-bold tracking-tight text-text sm:text-6xl hover:underline" >{profile.name}{" "}
                <span className="text-lg text-neutral-100 ml-2 font-normal bg-primary rounded-lg">
                  {/*(zweryfikowano)*/}
                </span>
              </a>
              <p className="mt-2 text-lg leading-8 text-gray-800 dark:text-gray-300">{profile.tagline}</p>
            </div>
          </div>

          <div className="grow">
            <div className="flex justify-between items-center gap-x-2">
              <div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-lg font-semibold leading-7 text-text sm:grid-cols-2 md:flex lg:gap-x-10">
                    {profile.website && <a href={profile.website} target="_blank" className="hover:underline">Strona <span aria-hidden="true">&rarr;</span></a>}
                    {profile.github && <a href={profile.github} className="hover:underline">GitHub <span aria-hidden="true">&rarr;</span></a>}
                    {profile.twitter && <a href={profile.twitter} className="hover:underline">Twitter <span aria-hidden="true">&rarr;</span></a>}
                    {profile.linkedin && <a href={profile.linkedin} className="hover:underline">Linkedin <span aria-hidden="true">&rarr;</span></a>}
                    {profile.youtube && <a href={profile.youtube} className="hover:underline">YouTube<span aria-hidden="true">&rarr;</span></a>}
                  </div>
                </div>
              </div>

              <a href={`mailto:${profile.contact}`} title="Kontakt do sprzedającego" className="bg-primary hover:bg-primary_hover
                      text-text text-lg px-12 py-4 rounded-md flex gap-1 items-center">
                Kontakt
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto">
        <article className="w-full p-3">
          <div className="max-w-6xl py-24 mx-auto">
            <main className="space-y-5 md:space-y-20">

              {/*
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </div>
                <div>
                  <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                </div>
                <div>
                  <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                </div>
              </div>
              */}

              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none border-b border-neutral-300 dark:border-neutral-600">
                <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Dochód miesięczny</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.monthly_revenue} zł</dd>
                  </div>

                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Zysk miesięczny</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile?.monthly_profit} zł</dd>
                  </div>

                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Zysk</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.net_profit} zł</dd>
                  </div>

                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Użytkownicy </dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.n_users} <span className='text-sm tracking-wide font-normal'>/miesiąc</span></dd>
                  </div>
                </dl>
              </div>

              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none border-b border-neutral-300 dark:border-neutral-600">
                <dl className="mt-16 md:mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Typ biznesu</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.business_type}</dd>
                  </div>


                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Branża</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.industry}</dd>
                  </div>

                  <div className="flex flex-col-reverse">
                    <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Liczba pracowników</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.n_employees}</dd>
                  </div>

                  {profile.city &&
                    <div className="flex flex-col-reverse">
                      <dt className="text-base leading-7 text-gray-800 dark:text-gray-300">Miasto</dt>
                      <dd className="text-2xl font-bold leading-9 tracking-tight text-text">{profile.city}</dd>
                    </div>
                  }
                </dl>
              </div>

              <div className="prose dark:prose-invert lg:prose-xl">
                <h2>Opis</h2>

                <p>{profile.description}</p>
              </div>

              <div className='prose dark:prose-invert lg:prose-xl'>
                <h2>Uzasadnienie ceny</h2>

                <p>{profile.asking_price_reason}</p>
              </div>

              <div className='prose dark:prose-invert lg:prose-xl'>
                <h2>Powód sprzedaży</h2>

                <p>{profile.sell_reason}</p>
              </div>

              <div className='prose dark:prose-invert lg:prose-xl'>
                <h2>Sposób monetyzacji</h2>

                <p>{profile.revenue_reason}</p>
              </div>

              <a href={`mailto:${profile.contact}`} title="Email do sprzedającego" className="bg-primary hover:bg-primary_hover
            text-text text-lg px-12 md:w-52 py-4 rounded-md flex gap-1 items-center">
                Kontakt
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

            </main>
          </div>
        </article>
      </div>
    </div >
  );
}

type Props = {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: info, error } = await supabase
    .from('startups')
    .select().eq('name', params.name)
    .limit(1)
    .single()
  if (error) return {};

  return {
    title: `${info.name} - venturelist`,
    description: info.description,
    keywords: `${info.name}, ${info.description}, ${info.ciy}, ${info.founder}`,
    openGraph: {
      title: `${info.name}`,
      description: info.description,
      images: [info.company_logo_url]
    },
  }
}
