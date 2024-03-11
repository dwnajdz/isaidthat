import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div  className="prose dark:prose-invert lg:prose-xl mt-24">
      <h2 className='text-red-500'>404 Not Found</h2>
      <p>Could not find requested resource</p>
      <a href="/startups">Return Home</a>
    </div>
  )
}