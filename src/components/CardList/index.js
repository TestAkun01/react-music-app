import Image from "next/image";
import Link from "next/link";
import CategoryButtons from "../CategoryButtons/CategoryButtons";
import { useRouter } from "next/navigation";

const CardList = ({ data }) => {
  const router = useRouter();
  const handleRedirect = (category) => {
    router.push(`/category/${category}`);
  };
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {data.map((song) => {
        return (
          <Link
            href={`/song/${song._id}`}
            key={song._id}
            className="max-w-sm rounded text-neutral-50 flex flex-col cursor-pointer hover:shadow-md hover:shadow-[#766df4] transition-shadow duration-300"
          >
            <Image src={song.cover} alt={song.title} width={400} height={400} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <div className="line-clamp-2">{song.title}</div>
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <CategoryButtons
                categories={song.category}
                handle={handleRedirect}
              ></CategoryButtons>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CardList;
