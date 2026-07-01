"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface StokData {
  [namaProduk: string]: { stok: number; status: string };
}

interface StokContextType {
  stok: StokData;
  loading: boolean;
}

const StokContext = createContext<StokContextType>({ stok: {}, loading: true });

export function useStok() {
  return useContext(StokContext);
}

export function StokProvider({ children }: { children: ReactNode }) {
  const [stok, setStok] = useState<StokData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stok")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStok(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <StokContext.Provider value={{ stok, loading }}>
      {children}
    </StokContext.Provider>
  );
}
