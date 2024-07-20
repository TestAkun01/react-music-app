export default function Header({ title }) {
  return (
    <>
      <h1 className="font-bold text-3xl mt-5 text-neutral-50">{title}</h1>
      <hr className="my-5 text-neutral-50 w-full" />
    </>
  );
}
