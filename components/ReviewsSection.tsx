import type { ReviewSection } from "@/lib/types";
import ScrollFadeIn from "./ScrollFadeIn";

export default function ReviewsSection({ reviews }: { reviews: ReviewSection }) {
  return (
    <>
      <ScrollFadeIn className="reviews-top">
        <div>
          <div className="rating-big">{reviews.rating}</div>
          <div className="stars">★★★★★</div>
          <div className="rating-count">
            dari {reviews.count} ulasan di {reviews.platform}
          </div>
        </div>
        <div className="rating-breakdown">
          {reviews.bars.map((bar) => (
            <div key={bar.star} className="bar-row">
              <span className="bar-label">{bar.star}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${bar.pct}%` }} />
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{bar.pct}%</span>
            </div>
          ))}
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn className="reviews-grid">
        {reviews.cards.map((card) => (
          <div key={card.name} className="review-card">
            <div className="review-stars">{"★".repeat(card.stars)}</div>
            <p className="review-text">&ldquo;{card.text}&rdquo;</p>
            <div className="review-author">
              <div className="review-avatar">{card.initials}</div>
              <div>
                <div className="review-name">{card.name}</div>
                <div className="review-platform">{card.platform}</div>
              </div>
            </div>
          </div>
        ))}
      </ScrollFadeIn>
    </>
  );
}
