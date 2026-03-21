import { formatDate } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live'
import { STARTUP_BY_ID_QUERY, STARTUP_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import Image from 'next/image';
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View';
export const ppr = true;

const md = markdownit()

const page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  const {data: post} = await sanityFetch({query: STARTUP_BY_ID_QUERY , params: {id}})
//   console.log(post)

  if(!post) return notFound()

    const parsedContent = md.render(post?.pitch || '' ) 

  return (
    <>

        <section className='pink_container !min-h-[230px]  ' >
            <p className='tag' >{formatDate(post?._createdAt)}</p>
            <h1 className='heading'>{post?.title}</h1>
            <p className='sub-heading' >{post?.description}</p>
        </section>

        <section className='section_container' >
            <img src={post?.image} alt={post?.title} className='w-full h-auto rounded-xl '  />

            <div className='space-y-5 mt-10 max-w-4xl mx-auto ' >
                <div className='flex-between gap-5 '  >
                    <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center mb-3 '  >
                        <Image src={post?.author?.image} alt={post?.author?.name} width={64} height={64} className='rounded-full drop-shadow-lg ' />
                        <div>
                            <p className='text-20-medium' >{post?.author?.name}</p>
                            <p className='text-16-medium !text-black-300 ' >@{post?.author?.username}</p>
                        </div>
                    </Link>

                    <p className='category-tag' > {post?.category}</p>
                </div>

                <h3 className='text-30-bold' >Pitch Details</h3>
                {parsedContent ? (
                    <article 
                    className='prose max-w-4xl font-work-sans break-all '
                    dangerouslySetInnerHTML={{__html: parsedContent}}
                    />
                ):
                (<p className='no-result' >No pitch details available</p>)}

            </div>

            <hr className='divider' />

            {/* Recommended Startups */}

            <Suspense fallback={<Skeleton className='view-skeleton' />} >
                <View id={id} />
            </Suspense>

        </section>
    </>
  )
}

export default page
