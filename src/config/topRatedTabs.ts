export const TOP_RATED_TABS = [
  { key: "dining", label: "Dining" },
  { key: "events", label: "Events" },
  { key: "businesses", label: "Businesses" },
  { key: "hangouts", label: "Hangouts" },
] as const;

export type TopRatedKey = typeof TOP_RATED_TABS[number]["key"];