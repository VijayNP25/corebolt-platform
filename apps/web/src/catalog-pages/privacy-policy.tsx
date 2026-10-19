import { useEffect } from "react";
import { motion } from "framer-motion";
import ReplicaSiteLayout from "@/components/replica-pages/replica-site-layout";
import ReplicaInnerHero from "@/components/replica-pages/replica-inner-hero";
import { useSeo } from "@/lib/seo";

export default function PrivacyPolicyPage() {
  useSeo({
    title: "Privacy Policy | Core Bolt",
    canonical: "https://www.core-bolt.com/privacy-policy",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ReplicaSiteLayout>
      <ReplicaInnerHero
        label="Legal"
        title="Privacy Policy"
        description="How Core Bolt collects, uses, and protects your information."
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
              This Privacy Policy describes how CORE BOLT ("Core Bolt", "we",
              "us", or "our") collects, uses, discloses, and protects
              information when you visit or use our website at{" "}
              <a
                href="https://www.core-bolt.com"
                className=""
              >
                https://www.core-bolt.com
              </a>{" "}
              (the "Site") and when you interact with us for product enquiries,
              quotations, orders, and support related to our robotics, mobility,
              and industrial hardware solutions.
            </p>
            <p>
              By accessing or using the Site, you agree to the collection and
              use of information in accordance with this Privacy Policy. If you
              do not agree, please do not use the Site.
            </p>

            <section className="mt-12">
              <h2>
                Who we are
              </h2>
              <p>
                CORE BOLT is a hardware design, manufacturing, and technology
                supply company providing components and systems for robotics,
                mobility, and intelligent/industrial applications.
              </p>
              <p>
                The Site is primarily intended for business users, including
                OEMs, system integrators, and industrial customers who wish to
                learn about, evaluate, or purchase our products and services.
              </p>
              <p className="leading-relaxed text-white/80">
                If you have any questions about this Privacy Policy, you can
                contact us using the details provided in the "Contact us"
                section below.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Information we collect
              </h2>
              <p>
                CORE BOLT may collect the following categories of information
                when you use the Site or interact with us:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white/80">
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Contact and business information:
                  </strong>{" "}
                  Name, company name, job title, business email address, phone
                  number, and any other details you provide when filling out
                  enquiry forms, requesting quotes, subscribing to newsletters,
                  or communicating with us.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Transactional and communication data:
                  </strong>{" "}
                  Records of enquiries, RFQs, purchase orders, invoices,
                  delivery details, support requests, and related correspondence
                  between you and our sales or support teams.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Technical and usage data:
                  </strong>{" "}
                  IP address, browser type, device identifiers, pages visited,
                  time and date of visits, referring/exit pages, and other
                  analytics data generated when you browse the Site. This data
                  may be collected through cookies, pixels, and similar
                  technologies.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Marketing preferences:
                  </strong>{" "}
                  Your preferences for receiving marketing communications, event
                  invites, product updates, and your interactions (opens,
                  clicks) with such communications.
                </li>
              </ul>
              <p className="leading-relaxed text-white/80 mt-4">
                Where you provide information about other individuals (for
                example, colleagues added as technical or purchasing contacts),
                you represent that you have the authority to do so and that
                those individuals have been informed about this Privacy Policy.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                How we use your information
              </h2>
              <p>
                CORE BOLT uses the information collected for the following
                purposes:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    To provide and improve our products and services:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-white/80">
                    <li className="leading-relaxed">
                      Responding to enquiries, RFQs, demo or sample requests,
                      and support tickets.
                    </li>
                    <li className="leading-relaxed">
                      Processing and fulfilling orders, deliveries, and
                      after-sales service.
                    </li>
                    <li className="leading-relaxed">
                      Improving our hardware offerings and documentation based
                      on feedback and usage trends.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    To operate and improve the Site:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-white/80">
                    <li className="leading-relaxed">
                      Monitoring, maintaining, and enhancing the performance,
                      security, and user experience of the Site.
                    </li>
                    <li className="leading-relaxed">
                      Analyzing aggregated usage patterns to understand how
                      visitors engage with pages, content, and forms.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    To communicate with you:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-white/80">
                    <li className="leading-relaxed">
                      Sending administrative messages related to transactions,
                      account changes, and service notifications.
                    </li>
                    <li className="leading-relaxed">
                      Sending marketing communications about new products,
                      updates, events, case studies, or technical content, in
                      accordance with your preferences and applicable law.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    To comply with legal and contractual obligations:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-white/80">
                    <li className="leading-relaxed">
                      Maintaining business records, satisfying tax and
                      accounting requirements, and responding to lawful requests
                      from authorities.
                    </li>
                    <li className="leading-relaxed">
                      Enforcing our terms, protecting our rights, and preventing
                      fraud, misuse, or security incidents.
                    </li>
                  </ul>
                </div>
              </div>
              <p className="leading-relaxed text-white/80 mt-4">
                Where required by law, CORE BOLT relies on your consent, the
                performance of a contract, compliance with legal obligations, or
                legitimate business interests as legal bases for processing your
                personal data.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Cookies and tracking technologies
              </h2>
              <p>
                The Site may use cookies and similar technologies (such as
                pixels, tags, and scripts) to remember your preferences,
                understand how the Site is used, and improve performance and
                security.
              </p>
              <p>
                Cookies may be set by CORE BOLT (first-party cookies) or by
                third-party providers that supply analytics, embedded content,
                or marketing tools.
              </p>
              <p>
                You can typically control cookies through your browser settings
                (for example, to block or delete cookies). However, disabling
                certain cookies may affect Site functionality or your
                experience.
              </p>
              <p className="leading-relaxed text-white/80">
                If required by applicable law, a cookie banner or preference
                manager will allow you to manage non-essential cookies when you
                first visit the Site.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                How we share information
              </h2>
              <p>
                CORE BOLT does not sell your personal information. We may share
                information in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white/80">
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Service providers:
                  </strong>{" "}
                  With trusted third-party vendors that perform services on our
                  behalf, such as hosting, analytics, CRM, email delivery,
                  payment processing, logistics, and IT/security support. These
                  providers are permitted to use personal data only as necessary
                  to provide services to us and are subject to appropriate
                  contractual safeguards.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Business partners and distributors:
                  </strong>{" "}
                  With channel partners, system integrators, logistics partners,
                  or resellers where needed to respond to enquiries, fulfil
                  orders, or provide localised support and services, in line
                  with your relationship or request.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Legal and compliance purposes:
                  </strong>{" "}
                  When required to comply with applicable law, regulation, legal
                  process, or enforceable governmental request; to protect the
                  rights, property, or safety of Core Bolt, our customers, or
                  others; or to detect and prevent fraud, security, or technical
                  issues.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Business transfers:
                  </strong>{" "}
                  In connection with any merger, acquisition, financing,
                  reorganization, or sale of all or part of our business or
                  assets. In such cases, we will take reasonable steps to ensure
                  your information continues to be protected and that you are
                  notified of any material changes.
                </li>
              </ul>
              <p className="leading-relaxed text-white/80 mt-4">
                Any sharing will always be limited to what is necessary to
                achieve the relevant purpose and subject to appropriate
                safeguards.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                International data transfers
              </h2>
              <p>
                Depending on the location of our infrastructure, service
                providers, and business partners, your information may be
                processed in countries other than your own, which may have
                different data protection laws.
              </p>
              <p className="leading-relaxed text-white/80">
                Where required, CORE BOLT will implement appropriate safeguards
                (such as contractual data protection clauses) to ensure that
                your personal data receives a level of protection consistent
                with applicable legal requirements when transferred across
                borders.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Data retention
              </h2>
              <p>
                CORE BOLT retains personal data only for as long as necessary to
                fulfill the purposes described in this Privacy Policy, including
                to meet legal, accounting, or reporting obligations and to
                resolve disputes.
              </p>
              <p>
                Retention periods may vary depending on the type of data, the
                nature of our relationship with you or your organization, and
                regulatory or contractual requirements (for example, records
                associated with financial transactions or long-term industrial
                projects may need to be kept for longer periods).
              </p>
              <p className="leading-relaxed text-white/80">
                When data is no longer required, it will be deleted or
                irreversibly anonymized in a secure manner, consistent with
                applicable laws and our internal policies.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Your rights and choices
              </h2>
              <p>
                Depending on your location and applicable law, you may have some
                or all of the following rights over your personal data:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-white/80">
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to access:
                  </strong>{" "}
                  Request confirmation of whether we process your personal data
                  and receive a copy of such data.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to rectification:
                  </strong>{" "}
                  Request that inaccurate or incomplete personal data be
                  corrected or updated.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to deletion:
                  </strong>{" "}
                  Request deletion of your personal data, subject to certain
                  legal or contractual exceptions.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to restriction:
                  </strong>{" "}
                  Request that we limit the processing of your personal data in
                  specific circumstances.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to objection:
                  </strong>{" "}
                  Object to certain types of processing, including direct
                  marketing, where permitted by law.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to data portability:
                  </strong>{" "}
                  Request that certain personal data be provided in a
                  structured, commonly used, and machine-readable format.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-primary font-semibold">
                    Right to withdraw consent:
                  </strong>{" "}
                  Where processing is based on consent, you may withdraw your
                  consent at any time, without affecting the lawfulness of
                  processing before withdrawal.
                </li>
              </ul>
              <p className="leading-relaxed text-white/80 mt-4">
                You can exercise your rights or update your marketing
                preferences by contacting us using the details in the "Contact
                us" section. We may need to verify your identity before
                fulfilling certain requests.
              </p>
              <p className="leading-relaxed text-white/80 mt-4">
                You may also have the right to lodge a complaint with a data
                protection authority or relevant regulator in your jurisdiction
                if you believe that your rights have been violated.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Security
              </h2>
              <p>
                CORE BOLT uses reasonable technical and organizational measures
                to protect personal data against unauthorised access,
                alteration, disclosure, or destruction, taking into account the
                nature of the data and the risks involved in processing.
              </p>
              <p>
                Measures may include access controls, encryption, secure
                infrastructure, logging and monitoring, employee training, and
                internal policies designed to safeguard information and manage
                incidents.
              </p>
              <p className="leading-relaxed text-white/80">
                Despite these safeguards, no method of transmission or storage
                is completely secure, and CORE BOLT cannot guarantee absolute
                security. Where required by law, you will be notified of any
                breach affecting your personal data.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Third‑party links and content
              </h2>
              <p>
                The Site may contain links to or integrations with third-party
                websites, services, or social media platforms. These third
                parties operate independently and have their own privacy
                policies, which CORE BOLT does not control or endorse.
              </p>
              <p className="leading-relaxed text-white/80">
                You are encouraged to review the privacy policies of any
                third-party sites or services you visit or use. Your
                interactions with these third parties are governed solely by
                their own terms and policies.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Children's privacy
              </h2>
              <p>
                The Site and our products and services are intended for business
                and professional users and are not directed to children. CORE
                BOLT does not knowingly collect personal data from children
                under the age of 18.
              </p>
              <p className="leading-relaxed text-white/80">
                If you believe a child has provided personal data to us, please
                contact us so that appropriate steps can be taken to delete such
                information as required by law.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Changes to this Privacy Policy
              </h2>
              <p>
                CORE BOLT may update this Privacy Policy from time to time to
                reflect changes in our practices, technologies, or legal
                requirements. Any updated version will be posted on the Site
                with an updated "last updated" date.
              </p>
              <p className="leading-relaxed text-white/80">
                In case of material changes, CORE BOLT may also provide
                additional notice (for example, by prominent notice on the Site
                or by email where appropriate). Your continued use of the Site
                after the effective date of any changes constitutes acceptance
                of the revised Privacy Policy.
              </p>
            </section>

            <section className="mt-12">
              <h2>
                Contact us
              </h2>
              <p className="leading-relaxed text-white/80">
                If you have any questions about this Privacy Policy, your
                personal data, or our data protection practices, or if you wish
                to exercise your rights, please contact us at:{" "}
                <a
                  href="mailto:sales@core-bolt.com"
                  className=""
                >
                  sales@core-bolt.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
        </div>
      </section>
    </ReplicaSiteLayout>
  );
}
