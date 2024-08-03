import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center text-[40px] font-bold ">
      <Image
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        width={100}
        height={100}
        alt="Your Company"
      ></Image>
    </div>
  );
}
