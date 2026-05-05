"use client";

import { useCartStore } from "@/lib/store";
import { formatRupiah } from "@/lib/utils";
import { showToast } from "./Toast";
import type { MenuItem } from "@/lib/types";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem, changeQty, items } = useCartStore();

  const inCart = items.find((i) => i.name === item.name);
  const qty = inCart?.qty ?? 0;

  function handleAdd() {
    addItem(item.name, item.price);
    showToast(`${item.name} ditambahkan!`);
  }

  function handleDec() {
    changeQty(item.name, -1);
  }

  return (
    <div
      className={`menu-item visible`}
      data-cat={item.cat}
      data-name={item.name}
      data-price={item.price}
    >
      <div className={`menu-item-top ${item.bg}`} style={{
  backgroundImage: item.image ? `url(${item.image})` : undefined,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}>
  {!item.image && <span className="menu-item-emoji">{item.emoji}</span>}
  {item.tag && (
    <span className={`tag ${item.tag.class}`}>{item.tag.label}</span>
  )}
</div>
      <div className="menu-item-body">
        <div className="menu-item-name">{item.name}</div>
        {item.portion && (
    <div style={{
      display: "inline-block",
      fontSize: "11px",
      fontWeight: 700,
      color: "var(--orange)",
      background: "#FBE9DC",
      borderRadius: "100px",
      padding: "2px 10px",
      marginBottom: "6px",
      fontFamily: "Nunito, sans-serif",
    }}>
      {item.portion}
    </div>
  )}


        <div className="menu-item-desc">{item.desc}</div>
      </div>
      <div className="menu-item-footer">
        <div className="menu-item-price">{formatRupiah(item.price)}</div>
        <div className="menu-item-footer-right">
          {qty === 0 ? (
            <button
              className="add-btn"
              onClick={handleAdd}
              aria-label={`Tambah ${item.name}`}
            >
              +
            </button>
          ) : (
            <div className="menu-qty-ctrl">
              <button className="menu-qty-btn dec" onClick={handleDec}>−</button>
              <span className="menu-qty-num">{qty}</span>
              <button className="menu-qty-btn inc" onClick={handleAdd}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
