import { useState, useCallback, useEffect } from "react";

const BOOKMARKS_KEY = "techcurator-bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarks]));
    } catch {
      // localStorage full or unavailable
    }
  }, [bookmarks]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.has(id),
    [bookmarks]
  );

  const bookmarkCount = bookmarks.size;

  return { bookmarks, toggleBookmark, isBookmarked, bookmarkCount };
};
