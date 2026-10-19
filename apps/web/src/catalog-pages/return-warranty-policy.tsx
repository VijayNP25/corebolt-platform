import { useEffect } from "react";
import { motion } from "framer-motion";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import { useSeo } from "@/lib/seo";

const TERMS: { title: string; paragraphs: string[] }[] = [
  {
    title: "1. Validity",
    paragraphs: [
      "This document is valid until the Expiration date shown, or 7 days from the date of issue where no date is shown. Prices and availability are confirmed only at the time of order acceptance.",
    ],
  },
  {
    title: "2. Order Acceptance",
    paragraphs: [
      "An order becomes binding only when CoreBolt confirms it in writing and receives the payment due under the Payment Terms. Purchase orders must quote this document's reference number. These terms prevail over any terms in the buyer's purchase order unless CoreBolt agrees otherwise in writing.",
    ],
  },
  {
    title: "3. Prices and Taxes",
    paragraphs: [
      "All prices are in Indian Rupees and exclude GST, which is charged at the applicable rate. Freight, packing, transit insurance, installation and on-site support are charged extra unless shown as a line item in this document.",
    ],
  },
  {
    title: "4. Imported Products",
    paragraphs: [
      "Prices of imported products are based on the exchange rate, customs duty and OEM pricing prevailing on the date of issue. If any of these change by more than 2% before full payment is received, CoreBolt may revise the price, and the buyer may either accept the revised price or withdraw the order with a refund of any advance paid.",
    ],
  },
  {
    title: "5. Payment",
    paragraphs: [
      "Payment is due as per the Payment Terms stated in this document and, where none are stated, 100% in advance along with the purchase order. Payment is treated as received only when funds are credited to CoreBolt's bank account. Bank charges are borne by the buyer.",
    ],
  },
  {
    title: "6. Late Payment",
    paragraphs: [
      "Interest at 21% per annum is charged on any amount unpaid after the due date, from the due date until the date of payment. CoreBolt may withhold dispatch, warranty service and technical support on any order while dues remain outstanding.",
    ],
  },
  {
    title: "7. Ownership",
    paragraphs: [
      "Title to the goods passes to the buyer only on receipt of full payment.",
    ],
  },
  {
    title: "8. Delivery and Risk",
    paragraphs: [
      "Lead times are indicative and run from the later of order confirmation and receipt of payment, and depend on OEM availability, customs clearance and logistics. Delays do not entitle the buyer to cancel the order or claim damages. Goods are dispatched from Hyderabad, and our risk and responsibility cease as soon as the goods leave our premises or are handed to the carrier. Partial shipments are permitted.",
    ],
  },
  {
    title: "9. Inspection on Receipt",
    paragraphs: [
      "The buyer must inspect the goods on delivery and report any shortage, wrong supply or visible transit damage in writing within 24 hours, supported by photographs or an unboxing video. Goods not reported within this period are deemed accepted in good condition.",
    ],
  },
  {
    title: "10. Transit Insurance",
    paragraphs: [
      "Transit insurance is the buyer's responsibility unless CoreBolt has agreed in writing to arrange it at the buyer's cost, in which case claims are settled as per the insurer's policy and CoreBolt will provide reasonable assistance.",
    ],
  },
  {
    title: "11. Cancellation and Returns",
    paragraphs: [
      "Confirmed orders cannot be cancelled. Goods once sold are not eligible for return or exchange, except for valid warranty claims under clauses 12 and 13. Advances paid for imported or special-order items are non-refundable, except as provided in clause 4.",
    ],
  },
  {
    title: "12. Warranty on CoreBolt Products",
    paragraphs: [
      "HyperEdge, HyperCore and other CoreBolt-branded products carry a One Year Warranty against Manufacturing Defects from the date of the tax invoice. CoreBolt will, at its option, repair or replace the defective unit or part, and replacements may be new or refurbished of equal specification.",
      "The warranty does not cover damage from physical impact, liquid, improper power supply or electrical surges, use outside published specifications, unauthorised opening, modification or repair, firmware or software not approved by CoreBolt, accessories, consumables or normal wear, and is void if the serial label is removed or tampered with.",
      "CoreBolt bears the shipping charges both ways for valid warranty claims, while claims found not covered by warranty are charged to the buyer for shipping and any repair. Repaired or replaced items are covered for the remainder of the original warranty period.",
    ],
  },
  {
    title: "13. Warranty on Third-Party Products",
    paragraphs: [
      "Products of other brands, including but not limited to Livox, Ouster, AutoL and RoboSense, carry Warranty as per the OEM. CoreBolt will facilitate warranty claims with the OEM, but the OEM's assessment, decision and turnaround time are final, and CoreBolt gives no separate warranty on these products. Shipping, customs and related charges for OEM warranty claims are borne by the buyer.",
    ],
  },
  {
    title: "14. Suitability and Integration",
    paragraphs: [
      "Technical recommendations, compatibility information and sample code are advisory and given in good faith. The buyer is solely responsible for confirming suitability for its application and for the integration, testing, safety validation and certification of any system in which the products are used, including autonomous vehicles and robots. Compatibility issues with third-party hardware, software, drivers or sensors are not manufacturing defects.",
    ],
  },
  {
    title: "15. Software and Firmware",
    paragraphs: [
      "Software, firmware, BSPs and SDKs supplied with the products are licensed, not sold, under the terms of CoreBolt or the respective OEM, and all intellectual property remains with them. The buyer shall not reverse engineer, decompile or redistribute CoreBolt firmware or software.",
    ],
  },
  {
    title: "16. Limitation of Liability",
    paragraphs: [
      "CoreBolt is not liable for any indirect, incidental or consequential loss, including loss of profit, revenue, data, production or project delays. CoreBolt's total liability under any order is limited to the price paid for the specific product giving rise to the claim.",
    ],
  },
  {
    title: "17. Force Majeure",
    paragraphs: [
      "CoreBolt is not liable for any delay or failure caused by events beyond its reasonable control, including natural disasters, epidemics, war, government action, import restrictions, customs delays, OEM supply shortages, transport disruptions and strikes.",
    ],
  },
  {
    title: "18. Confidentiality",
    paragraphs: [
      "The prices and commercial terms in this document are confidential and shall not be disclosed to any third party without CoreBolt's written consent.",
    ],
  },
  {
    title: "19. Errors and Omissions",
    paragraphs: [
      "Clerical, typographical or calculation errors in this document may be corrected by CoreBolt. E&O.E.",
    ],
  },
  {
    title: "20. Governing Law and Jurisdiction",
    paragraphs: [
      "These terms are governed by the laws of India and are subject to Hyderabad jurisdiction only.",
    ],
  },
];

export default function ReturnWarrantyPolicyPage() {
  useSeo({
    title: "Terms & Conditions | Core Bolt",
    canonical: "https://www.core-bolt.com/return-warranty-policy",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ReplicaSiteLayout>
      <ReplicaInnerHero
        label="Legal"
        title="Terms & Conditions"
        description="Last updated: October 2026"
      />

      <section className="replica-site-section">
        <div className="replica-site-wrap" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="replica-prose">
            <p>
              {"Thank you for choosing CORE BOLT. Please read these Terms & Conditions carefully before placing an order. They apply to all quotations, proforma invoices and orders for products supplied by CORE BOLT."}
            </p>

            {TERMS.map((clause) => (
              <div key={clause.title} className="border-t border-white/10 pt-8 mt-8">
                <h2>{clause.title}</h2>
                {clause.paragraphs.map((text) => (
                  <p key={text} className="leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            ))}

            <div className="border-t border-white/10 pt-8 mt-8">
              <p>Thank you for doing business with us.</p>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
    </ReplicaSiteLayout>
  );
}
