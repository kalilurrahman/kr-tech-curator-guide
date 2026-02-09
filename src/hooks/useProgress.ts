import { useState, useCallback, useEffect } from "react";

const PROGRESS_KEY = "techcurator-progress";

export const useProgress = () => {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]));
    } catch {
      // localStorage full or unavailable
    }
  }, [completed]);

  const toggleCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (id: string) => completed.has(id),
    [completed]
  );

  const getPathProgress = useCallback(
    (resourceIds: string[]) => {
      if (resourceIds.length === 0) return 0;
      const done = resourceIds.filter((id) => completed.has(id)).length;
      return Math.round((done / resourceIds.length) * 100);
    },
    [completed]
  );

  const getPathCompletedCount = useCallback(
    (resourceIds: string[]) => {
      return resourceIds.filter((id) => completed.has(id)).length;
    },
    [completed]
  );

  return { completed, toggleCompleted, isCompleted, getPathProgress, getPathCompletedCount };
};
