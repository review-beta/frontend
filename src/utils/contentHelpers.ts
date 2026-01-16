export function pickRandomFeatured<T extends { is_featured: boolean }>(items: T[]) {
  const featured = items.filter(i => i.is_featured)
  if (!featured.length) return null
  return featured[Math.floor(Math.random() * featured.length)]
}

/* ---------- Date helpers ---------- */

export function formatReleaseDate(date?: string): string | null {
  if (!date) return null;

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ---------- Genre helpers ---------- */

export function formatGenre(
  genres?: { name: string }[]
): string | null {
  if (!genres || !genres.length) return null;
  return genres.map(g => g.name).join(" | ");
}

/* ---------- Location helpers ---------- */

export function formatLocation(
  item: any,
  cities?: Record<number, any>,
  states?: Record<number, string>
): string {
  // City already a string
  if (typeof item.city === "string") {
    return item.city;
  }

  // City is an ID
  if (typeof item.city === "number" && cities) {
    const city = cities[item.city];
    if (!city) return "-";

    const stateName = states?.[city.state];
    return `${city.name}${stateName ? `, ${stateName}` : ""}`;
  }

  return "-";
}

/* ---------- Unified display helpers ---------- */

export function getItemMeta(
  item: any,
  cities?: Record<number, any>,
  states?: Record<number, string>
): string {
  // Movies → release date
  if ("release_date" in item) {
    return formatReleaseDate(item.release_date) ?? "-";
  }

  // Others → location
  return formatLocation(item, cities, states);
}

export function getItemCategory(item: any): string {
  // Movies → genres
  if ("genre" in item) {
    return formatGenre(item.genre) ?? "-";
  }

  // Others → category-like field
  return (
    item.business_type ||
    item.type ||
    item.category ||
    item.cuisine_type ||
    "-"
  );
}