"use client";

import { useContext } from "react";
import { REPLICA_IMAGES } from "@/lib/replica-home-images";
import { buildBackgroundImageValue } from "@/lib/webp-image";
import { NavTrailContext, SiteBreadcrumb } from "@/components/replica-pages/replica-site-layout";

export default function ReplicaInnerHero({
  label,
  title,
  description,
  image = REPLICA_IMAGES.edgeComputer,
}: {
  label?: string;
  title: string;
  description?: string;
  image?: string;
}) {
  const trail = useContext(NavTrailContext);
  return (
    <>
    <section className="pg-header pg-header--inner" data-nav-tone="dark">
      <div
        className="pg-header-bg"
        style={{ backgroundImage: buildBackgroundImageValue(image) }}
      />
      <div className="pg-header-vignette" />
      <div className="pg-header-inner">
        {label && (
          <div className="lbl">
            <span style={{ color: "var(--g-lt)" }}>{label}</span>
          </div>
        )}
        <h1 className="d1-dk">{title}</h1>
        {description && <p className="pg-header-desc">{description}</p>}
      </div>
    </section>
    <SiteBreadcrumb trail={trail} />
    </>
  );
}
