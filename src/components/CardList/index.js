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
    <>
      {data.map((album) => {
        return (
          <Link
            href={`/song/${album._id}`}
            key={album._id}
            className="max-w-[300px] rounded flex flex-col cursor-pointer hover:shadow-md hover:shadow-[#766df4] transition-shadow duration-300"
          >
            <Image
              src={album.cover}
              alt={album.title}
              width={300}
              height={300}
              className="card-list"
            />
            <div className="px-4 pt-4">
              <div className="font-semibold text-sm mb-2">
                <div className="line-clamp-2 text-neutral-50">
                  {album.title}
                </div>
                <div className="line-clamp-2 text-neutral-400">
                  {album.release_date}
                </div>
              </div>
            </div>
            <div className="px-4 pt-4">
              <CategoryButtons
                categories={album.category}
                handle={handleRedirect}
              ></CategoryButtons>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CardList;
