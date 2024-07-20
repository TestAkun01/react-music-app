import Image from "next/image";
import React from "react";
import Header from "../Header/Header";
export default function PosterContent() {
  return (
    <div className="fixed w-[350px] text-white ps-8">
      <div>
        <Header title={"MyGO!!!!! 6th Live"} />
        <div className="flex ">
          <Image
            src={
              "https://s3-ap-northeast-1.amazonaws.com/bang-dream-portal/d9482c1f-bd3a-4496-85ea-abc93d1c40a5.jpg"
            }
            alt={"Poster MyGO!!!!! 6th Live"}
            width={230}
            height={350}
            className="w-[40%]"
          />
          <div className="text-md text-neutral-50 text-semibold ms-4 flex flex-col justify-center">
            <p>Date : July 27-28, 2024</p>
            <p>Venue : Musashino Forest Sports Plaza</p>
          </div>
        </div>
      </div>
      <div>
        <Header title={"Mugendai Mewtype 1st LIVE"} />
        <div className="flex ">
          <Image
            src={
              "https://s3-ap-northeast-1.amazonaws.com/bang-dream-portal/b8936cef-7fab-405b-8161-3c8e6a446b6d.png"
            }
            alt={"Poster MyGO!!!!! 6th Live"}
            width={230}
            height={350}
            className="w-[40%]"
          />
          <div className="text-md text-neutral-50 text-semibold ms-4 flex flex-col justify-center">
            <p>Date : August 24, 2024</p>
            <p>Venue : 1000CLUB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
