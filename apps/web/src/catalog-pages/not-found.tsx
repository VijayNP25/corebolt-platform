import { Link } from "wouter";
import { Home } from "lucide-react";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import { ArrowIcon } from "@/components/replica-pages/replica-page-shared";
import { useServerNotFound } from "@/lib/redirect";

export default function NotFound() {
  useServerNotFound();

  return (
    <ReplicaSiteLayout>
      <ReplicaInnerHero
        label="Error"
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have moved."
      />

      <section className="replica-site-section">
        <div className="replica-not-found">
          <div className="replica-not-found-code">404</div>
          <h2>We couldn&apos;t find that page</h2>
          <p>
            Check the URL or head back to the homepage. For product enquiries,
            our engineering team is happy to help.
          </p>
          <div className="replica-not-found-actions">
            <Link href="/" className="btn btn-primary">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <Link href="/contact-us" className="btn btn-outline">
              Contact Support
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </ReplicaSiteLayout>
  );
}
