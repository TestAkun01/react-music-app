import Image from "next/legacy/image";
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
      {data.map((album) => (
        <Link
          href={`/song/${album._id}`}
          key={album._id}
          className="rounded flex flex-col cursor-pointer hover:shadow-md hover:shadow-[#766df4] transition-all duration-300"
        >
          <div className="relative w-full aspect-square">
            <Image
              src={album.cover}
              alt={`Image ${album.title}`}
              layout="fill"
              objectFit="cover"
              priority="true"
            />
          </div>

          <div className="px-4 pt-4">
            <div className="font-semibold text-sm mb-2">
              <div className="line-clamp-2 text-neutral-50">{album.title}</div>
              <div className="text-gray-400">
                {album.artist.map((data, index) => (
                  <div key={index} className="w-full overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/artist/${data._id}`);
                      }}
                      className="hover:underline text-start py-2"
                    >
                      {data.artist}
                    </button>
                    {index < album.artist.length - 1 && " & "}
                  </div>
                ))}
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
      ))}
    </>
  );
};

export default CardList;
