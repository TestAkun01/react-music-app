import CardList from "@/components/CardList";
import Header from "@/components/Header";

export default async function Page({ params }) {
  const { q } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?q=${q}`,
    { next: { revalidate: 20 } }
  );
  const songs = await response.json();
  return (
    <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
      <Header title={`Search by ${decodeURIComponent(q)}`}></Header>
      {songs.length === 0 ? (
        <div className="flex flex-col items-center text-neutral-50">
          <h1 className="font-bold text-3xl">No results found</h1>
          <p className="text-xl">Try searching for something else</p>
        </div>
      ) : (
        <CardList data={songs} />
      )}
    </div>
  );
}
