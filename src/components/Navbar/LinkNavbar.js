import Link from "next/link";

export default function LinkNavbar() {
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Category", href: "/category", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Admin", href: "/admin", current: false },
  ];
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={
            "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold hover:text-[#766df4]"
          }
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}
