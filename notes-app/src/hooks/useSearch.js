import { useMemo } from "react";
 
export const useSearch = (note, searchTeg) => {
  const searchTags = useMemo(() => {
    if (searchTeg) {
      return [...note].filter((note) => note.tegs.includes(searchTeg));
    }
    return note;
  }, [searchTeg, note]);

  return searchTags;
}