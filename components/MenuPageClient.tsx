"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { MenuItem } from "@/lib/types";
import MenuCard from "./MenuCard";

const CATEGORIES = [
  { id: "all", label: "Semua Menu", emoji: "🍽️" },
  { id: "dimsum", label: "Dimsum", emoji: "🥟", tagline: "Dikukus, bukan dipanaskan." },
  { id: "bakso", label: "Bakso", emoji: "🍜", tagline: "Kuah spesial, gigitan yang berasa." },
  { id: "bites", label: "Cemilan", emoji: "🍖", tagline: "Gigitan yang nggak setengah-setengah." },
  { id: "snack", label: "Snack", emoji: "🍟", tagline: "Renyah, nagih, susah berhenti." },
  { id: "sweet", label: "Dessert", emoji: "🍫", tagline: "Buat yang pengen happy ending." },
  { id: "sips", label: "Minuman", emoji: "🥤", tagline: "Pelengkap yang bikin makin kerasa." },
  { id: "kopi", label: "Kopi", emoji: "☕", tagline: "Buat yang butuh semangat." },
];

const CAT_MAP: Record<string, string> = {
  dimsum: "dimsum",
  kebab: "bites",
  bakso: "bakso",
  coklat: "sweet",
  bites: "bites",
  snack: "snack",
  sweet: "sweet",
  sips: "sips",
  kopi: "kopi",
};

function MenuPageContent({ items }: { items: MenuItem[] }) {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cat = searchParams.get("cat");

    if (cat) {
      const mapped = CAT_MAP[cat.toLowerCase()] || cat;
      setActiveCategory(mapped);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = items;

    if (activeCategory !== "all") {
      result = result.filter((i) => i.cat === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q)
      );
    }

    return result;
  }, [items, activeCategory, search]);

  const grouped = useMemo(() => {
    if (activeCategory !== "all") {
      return [{ cat: activeCategory, items: filtered }];
    }

    return CATEGORIES.filter((c) => c.id !== "all")
      .map((cat) => ({
        cat: cat.id,
        items: filtered.filter((i) => i.cat === cat.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered, activeCategory]);

  return (
    <div className="menu-page-layout">
      {/* Sidebar */}
      <aside className="menu-sidebar fade-in in-view" id="menuSidebar">
        <div className="sidebar-label">Kategori</div>

        {CATEGORIES.map((cat, idx) => {
          const count =
            cat.id === "all"
              ? items.length
              : items.filter((i) => i.cat === cat.id).length;

          if (count === 0) return null;

          return (
            <div key={cat.id}>
              {idx === 1 && <div className="sidebar-divider" />}

              <button
                className={`sidebar-cat${
                  activeCategory === cat.id ? " active" : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="sidebar-cat-emoji">{cat.emoji}</span>
                {cat.label}
                <span className="sidebar-cat-count">{count}</span>
              </button>
            </div>
          );
        })}
      </aside>

      {/* Main */}
      <main className="menu-main">
        <div className="menu-search-bar fade-in in-view">
          <span className="menu-search-icon">🔍</span>

          <input
            className="menu-search-input"
            type="text"
            placeholder="Cari menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span className="menu-search-count">
            {filtered.length} menu
          </span>
        </div>

        <div id="menuContent">
          {filtered.length === 0 ? (
            <p
              style={{
                color: "var(--text-muted)",
                padding: "40px 0",
              }}
            >
              Menu tidak ditemukan. Coba kata kunci lain.
            </p>
          ) : (
            grouped.map(({ cat, items: catItems }) => {
              const catInfo = CATEGORIES.find((c) => c.id === cat);

              return (
                <div key={cat} className="menu-category-section">
                  {activeCategory === "all" && catInfo && (
                    <div className="menu-category-header">
                      <span className="menu-category-emoji">
                        {catInfo.emoji}
                      </span>

                      <div>
                        <div className="menu-category-title">
                          {catInfo.label}
                        </div>

                        {"tagline" in catInfo && (
                          <div className="menu-category-tagline">
                            {catInfo.tagline}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="menu-grid">
                    {catItems.map((item) => (
                      <MenuCard key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default function MenuPageClient({
  items,
}: {
  items: MenuItem[];
}) {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <MenuPageContent items={items} />
    </Suspense>
  );
}
