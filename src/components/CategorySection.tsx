const categories = [
  { name: "Bars", emoji: "🍸" },
  { name: "Clubs", emoji: "🕺" },
  { name: "Lounges", emoji: "🛋️" },
];

const CategorySection = () => {
  return (
    <section className="my-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-gray-100 text-center py-6 rounded-lg hover:bg-gray-200 transition"
          >
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <div className="text-lg font-medium">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;