import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkNavbar() {
  const pathName = usePathname();
  const navigation = [
    { name: "Home", href: "/", current: pathName === "/" },
    { name: "Latest", href: "/latest", current: pathName === "/latest" },
    {
      name: "Category",
      href: "/category/All",
      current: pathName.startsWith("/category"),
    },
    { name: "About", href: "/about", current: pathName === "/about" },
    { name: "Admin", href: "/admin", current: pathName.startsWith("/admin") },
    {
      name: "Dasboard",
      href: "/user/dashboard",
      current: pathName.startsWith("/user"),
    },
  ];

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-gray-300 rounded-md px-3 py-2 text-sm font-semibold ${
            item.current
              ? "bg-gray-700 text-white cursor-default"
              : "hover:bg-gray-700 hover:text-white hover:text-[#766df4]"
          }`}
          aria-current={item.current ? "page" : undefined}
          onClick={(e) => (item.current ? e.preventDefault() : null)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}
