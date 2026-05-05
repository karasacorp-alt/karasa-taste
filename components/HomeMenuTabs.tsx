"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import MenuCard from "./MenuCard";

const CATS = [
  { id: "all", label: "Semua" },
  { id: "dimsum", label: "🥟 Dimsum" },
  { id: "bakso", label: "🍜 Bakso" },
  { id: "bites", label: "🍖 Bites" },
  { id: "snack",  label: "🍟 Snack" },
  { id: "sweet", label: "🍫 Sweet" },
  { id: "sips", label: "🧋 Sips" },
  { id: "kopi",   label: "☕ Kopi" },
];

export default function HomeMenuTabs({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? items : items.filter((i) => i.cat === active);

  return (
    <>
      <div className="menu-tabs fade-in in-view">
        {CATS.map((cat) => (
          <button
            key={cat.id}
            className={`tab${active === cat.id ? " active" : ""}`}
            onClick={() => setActive(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="menu-grid" id="menuGrid">
        {filtered.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </>
  );
}
