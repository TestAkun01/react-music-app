export default function Header({ title }) {
  return (
    <>
      <p className="font-bold text-3xl mt-5 text-neutral-50">{title}</p>
      <hr className="my-5 text-neutral-50 w-full" />
    </>
  );
}
