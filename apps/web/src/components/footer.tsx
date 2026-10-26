import { Link } from "@/lib/wouter-compat";
import { Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-">
          <div className="space-y-4">
            <div
              className="text-2xl font-bold text-primary"
              style={{
                color: "white",
                fontFamily: "Bank Gothic Medium BT",
                fontSize: "1.75rem",
              }}
            >
              CORE BOLT
            </div>
            <p className="text-muted-foreground">
              Driving Advanced Solutions in Robotics and Engineering.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/corebolt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Core Bolt LinkedIn profile"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/core.bolt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Core Bolt Instagram profile"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Our Products
            </h3>
            <ul className="space-y-2">
              <li>
                {/* <Link href="/lidar/livox"> */}
                <span className="text-muted-foreground ">
                  NVIDIA Developer Kits and Modules
                </span>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href="/vision-systems-cameras/orbbec"> */}
                <span className="text-muted-foreground ">
                  AI Edge & Industrial Computers
                </span>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href="/nvidia-developer-kits-and-modules/nvidia-jetson-developer-kits"> */}
                <span className="text-muted-foreground ">LiDARs</span>
                {/* </Link> */}
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <ul className="space-y-2 mt-10">
              <li>
                {/* <Link href="/actuators/linear-actuators"> */}
                <span className="text-muted-foreground ">
                  OEM/ODM Wiring Harness & Connectors
                </span>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href="/nvidia-developer-kits-and-modules/nvidia-jetson-som-modules"> */}
                <span className="text-muted-foreground ">
                  Vision Systems & Cameras
                </span>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href="/ai-edge/m-series"> */}
                <span className="text-muted-foreground ">Actuators</span>
                {/* </Link> */}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#computing-platforms"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Edge Computing
                </a>
              </li>
              <li>
                <a
                  href="/#perception-systems"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Vision &amp; Sensing
                </a>
              </li>
              <li>
                <a
                  href="/#integration-kits"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Integration Kits
                </a>
              </li>
              <li>
                <Link href="#about">
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="/#applications"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Applications
                </a>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    Blogs
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#contact">
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy">
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    Shipping
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/return-warranty-policy">
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                    Return & Warranty Policy
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Technical Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Downloads
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div> */}
          <div>
            <h5 className="text-lg font-medium mb-4">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone
                  className="h-5 w-5 text-secondary mr-3 mt-1"
                  color="white"
                />
                <div className="flex flex-col">
                  <a
                    href="tel:+91-9849035858"
                    className="text-neutral-300 hover:text-secondary transition-colors"
                  >
                    +91 98490 35858
                  </a>
                  <a
                    href="tel:+919652659992"
                    className="text-neutral-300 hover:text-secondary transition-colors"
                  >
                    +91 96526 59992
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-3" color="white" />
                <a
                  href="mailto:sales@core-bolt.com "
                  className="text-neutral-300 hover:text-secondary transition-colors"
                >
                  sales@core-bolt.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className=" text-secondary mt-1 mr-3" color="white" />
                <span className="text-neutral-300">
                  Hyderabad &amp; Kakinada, India
                  <br />
                  Shenzhen, China
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; 2025 CORE BOLT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
