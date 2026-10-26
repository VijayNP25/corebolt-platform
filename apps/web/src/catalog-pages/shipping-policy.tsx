import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import { useSeo } from "@/lib/seo";

const SECTIONS: { title: string; paragraphs: string[] }[] = [
  {
    title: "Shipping amount",
    paragraphs: [
      "Each product carries its own shipping amount. That amount is shown with the price, then again in the cart and at checkout. An order with more than one product adds the shipping amount of each product.",
      "The figure on the checkout page is the shipping charge for that order.",
    ],
  },
  {
    title: "Lead time",
    paragraphs: [
      "Lead time is confirmed when CoreBolt accepts the order and payment has been received. It depends on the manufacturer, customs clearance, and the carrier.",
      "A date on a quotation is a guide. The confirmed lead time is the one CoreBolt sends with the order acceptance.",
    ],
  },
  {
    title: "Minimum order",
    paragraphs: [
      "Some products are sold only from a minimum quantity. When a product has a minimum, it is written on that product page. A smaller quantity is handled as a quote through sales@core-bolt.com.",
    ],
  },
  {
    title: "Dispatch",
    paragraphs: [
      "Goods are dispatched from Hyderabad. CoreBolt’s responsibility for the shipment ends when the goods leave our premises or are handed to the carrier. The order page shows the carrier and tracking number after the order is marked shipped.",
    ],
  },
];

export default function ShippingPolicyPage() {
  useSeo({
    title: "Shipping | Core Bolt",
    canonical: "https://www.core-bolt.com/shipping-policy",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ReplicaSiteLayout>
      <ReplicaInnerHero
        label="Orders"
        title="Shipping"
        description="How shipping, lead time, and minimum quantities work on an order."
      />
      <section className="replica-site-section">
        <div className="replica-site-wrap" style={{ maxWidth: 800 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="replica-prose">
              {SECTIONS.map((section) => (
                <div key={section.title} className="border-t border-white/10 pt-8 mt-8">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((text) => (
                    <p key={text} className="leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              ))}
              <p className="mt-8">
                Delivery, cancellation, and warranty are in the{" "}
                <Link href="/return-warranty-policy">Terms & Conditions</Link>. Questions go to{" "}
                <a href="mailto:sales@core-bolt.com">sales@core-bolt.com</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </ReplicaSiteLayout>
  );
}
