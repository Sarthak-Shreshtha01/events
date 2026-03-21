import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({searchParams}: {
  searchParams: Promise<{query: string}>
}) {
  const query = (await searchParams).query

  const params = {search: query || null}

  const session = await auth()
  console.log(session?.id)

  // const posts = await client.fetch(STARTUP_QUERY);
  const {data: posts} = await sanityFetch({query: STARTUP_QUERY , params})

  console.log(JSON.stringify(posts, null, 2));

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: {_id : 1 , name: "Sarthak"},
  //     _id :1 ,
  //     description: 'This is description!! ',
  //     image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category : "Robots",
  //     title: "We Robots"
  //   }
  // ]

  return (
    <>
      <section className="pink_container" >
        <h1 className="heading " >Find Events <br /> With US </h1>

        <p className="sub-heading !max-w-3xl " >
          Search for the type of event :-
        </p>

        <SearchForm query={query} />

      </section>

      <section className="section-container" > 
        <p className="text-30-semibold w-full mx-auto flex justify-center items-center " >
          {query ? `Search results for "${query}"` : 'All Events'}
        </p>

        <ul className="mt-7 card_grid " >
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard , index: number) => (
              <StartupCard key={post?._id} post={post} />
             )
          ) ) :
          (
            <p className="no-result" >
              No results found
            </p>
          )
        }
        </ul>

      </section>

      <SanityLive />

    
    </>
  );
}
