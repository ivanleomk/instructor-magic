export const generateSlugFromName = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-");
