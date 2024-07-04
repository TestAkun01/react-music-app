import CardList from "@/components/CardList";
import Header from "@/components/Header";

export default async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dbsong`,
    { next: { revalidate: 20 } }
  );

  const songs = await response.json();
  return (
    <div className="xl:mx-40 lg:mx-28 md:mx-20 sm:mx-20 mx-5">
      <Header title="New Music"></Header>
      <CardList data={songs} />
    </div>
  );
}
