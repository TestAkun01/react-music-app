export default function CategoryButtons({ categories, handle }) {
  function handleClick(event, category) {
    event.preventDefault();
    handle(category);
  }

  let sortedCategories = [...categories].sort((a, b) => a.localeCompare(b));

  return (
    <div className="mb-3">
      {sortedCategories.map((category, i) => (
        <button
          key={i}
          onClick={(event) => handleClick(event, category)}
          className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-neutral-50 mr-2 mb-2 hover:shadow hover:shadow-[#766df4] transition-shadow duration-300"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
