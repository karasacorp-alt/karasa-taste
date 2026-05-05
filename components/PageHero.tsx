import Link from "next/link";

interface Props {
  title: string;
  desc: string;
  breadcrumb: string;
}

export default function PageHero({ title, desc, breadcrumb }: Props) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className="page-hero-inner fade-in in-view">
          <div className="page-breadcrumb">
            <Link href="/">Beranda</Link>
            <span className="page-breadcrumb-sep">›</span>
            <span className="page-breadcrumb-current">{breadcrumb}</span>
          </div>
          <h1 className="display page-hero-title">{title}</h1>
          <p className="page-hero-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}
