"use client";

export default function StripTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div id="strip" style={{
      background: "var(--orange)",
      overflow: "hidden",
      padding: "14px 0",
      whiteSpace: "nowrap",
    }}>
      <div style={{
        display: "inline-flex",
        animation: "ticker 20s linear infinite",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: "13px",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            color: "var(--espresso)",
            padding: "0 32px",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}