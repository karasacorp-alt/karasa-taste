"use client";

interface Props {
  status: "tersedia" | "terbatas" | "habis" | "loading";
  stok?: number;
  maxPorsi?: number;
}

export default function StokBadge({ status, stok, maxPorsi }: Props) {
  if (status === "loading") {
    return (
      <div style={{
        height: "20px", width: "80px",
        background: "rgba(0,0,0,0.06)",
        borderRadius: "100px",
        animation: "pulse-skeleton 1.5s infinite",
      }} />
    );
  }

  const config = {
    tersedia: {
      dot: "#5A7C52",
      bg: "rgba(90,124,82,0.1)",
      color: "#3D5E38",
      label: maxPorsi !== undefined
        ? `✅ Tersedia (maks. ${maxPorsi} porsi)`
        : "✅ Tersedia",
    },
    terbatas: {
      dot: "#C9963A",
      bg: "rgba(201,150,58,0.12)",
      color: "#8B6914",
      label: maxPorsi !== undefined
        ? `⚠️ Terbatas (maks. ${maxPorsi} porsi)`
        : "⚠️ Terbatas",
    },
    habis: {
      dot: "#C1440E",
      bg: "rgba(193,68,14,0.1)",
      color: "#8B2410",
      label: "❌ Stok Habis",
    },
  };

  const c = config[status];

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: c.bg, color: c.color,
      borderRadius: "100px", padding: "3px 10px",
      fontSize: "11px", fontWeight: 700,
      fontFamily: "var(--font-body)",
    }}>
      <span style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: c.dot, flexShrink: 0,
      }} />
      {c.label}
    </div>
  );
}