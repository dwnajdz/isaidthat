import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { TaskPost } from '@/components/tasks/profile/Task'

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
    console.log("error:", error);
    return redirect("/tasks?error=404");
  }
  
  const isUserOwner = user?.id === profile.owner;
  return (
    <TaskPost data={profile} editView={isUserOwner}  />
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
    .from('tasks')
    .select().eq('name', params.name)
    .limit(1)
    .single()
  if (error) return {};

  return {
    title: `Task ${info.id} - isaidthat`,
    description: info.description,
    keywords: `${info.name}, ${info.description}, ${info.ciy}, ${info.founder}`,
    openGraph: {
      title: `${info.name}`,
      description: info.description,
      images: [info.company_logo_url]
    },
  }
}
