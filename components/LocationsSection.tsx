import type { Location } from "@/lib/types";
import ScrollFadeIn from "./ScrollFadeIn";

const MAPS_LINKS = [
  "https://maps.google.com/?q=Jl+Kolonel+Masturi+12+Cimahi",
  "https://www.google.com/maps/place/Cileunyi,+Cimekar,+Kec.+Cileunyi,+Kabupaten+Bandung,+Jawa+Barat+40623",
];

export default function LocationsSection({ locations }: { locations: Location[] }) {
  return (
    <ScrollFadeIn className="location-grid">
      {locations.map((loc, i) => (
        <div key={loc.name} className="location-card">
          <div className="location-icon">📍</div>
          <div className="location-name">{loc.name}</div>
          <p className="location-addr">{loc.address}</p>
          <div className="location-hours">
            Buka <span>{loc.hours}</span>
          </div>
          <div style={{ marginTop: "16px" }}>
            <a
              href={MAPS_LINKS[i] || "#"}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
              style={{ fontSize: "12px", padding: "8px 16px" }}
            >
              Buka di Maps
            </a>
          </div>
        </div>
      ))}
    </ScrollFadeIn>
  );
}
