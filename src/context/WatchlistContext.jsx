import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext();
export const useWatchlist = () => useContext(Ctx);

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('watchlist')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(items));
  }, [items]);

  const has = (id, type) => items.some((i) => i.id === id && i.type === type);
  const toggle = (item) =>
    setItems((prev) =>
      has(item.id, item.type)
        ? prev.filter((i) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    );

  return <Ctx.Provider value={{ items, has, toggle }}>{children}</Ctx.Provider>;
}