import { motion } from "framer-motion";
import { Cog, Car, Brain, Satellite, Wrench } from "lucide-react";
import { Link } from "@/lib/wouter-compat";
import { categories, Category } from "@/data/products";
import { getNewRoute } from "@/lib/route-mapping";

// Mapping from card titles to category IDs
const titleToCategoryId: Record<string, string> = {
  "NVIDIA Developer Kits and Modules": "nvidia-developer-kits-and-modules",
  "AI Edge Computers": "edge-computers",
  "Industrial Edge Computers": "industrial-panel-pc",
  LiDARs: "lidar",
  "Vision systems & cameras": "vision-systems-cameras",
  Actuators: "actuators",
  "Wiring harness and Connectors": "wiring-harness-and-connectors",
  // "AGV Wheels and Parts": "agv-wheels-and-parts",
  // "Industrial Remote Control": "industrial-remote-controls",
};

export default function WhatWeBuildSection() {
  // Function to get navigation URL for a product card
  const getNavigationUrl = (title: string): string => {
    const categoryId = titleToCategoryId[title];
    if (!categoryId) return "#";

    const category = categories.find((c: Category) => c.id === categoryId);
    if (!category) return "#";

    // Category serves products directly — go straight to the category page.
    if (
      !category.subcategories?.length &&
      category.products?.length
    ) {
      return `/${categoryId}`;
    }

    // If category has only 1 subcategory, navigate directly to that subcategory
    if ((category.subcategories?.length ?? 0) === 1) {
      const subcategoryId = category.subcategories![0]!.id;
      const oldRoute = `/${categoryId}/${subcategoryId}`;
      const newRoute = getNewRoute(oldRoute);
      return newRoute || oldRoute;
    }

    // If category has multiple subcategories, navigate to selection page
    const oldRoute = `/${categoryId}/subcategories`;
    const newRoute = getNewRoute(oldRoute);
    return newRoute || oldRoute;
  };
  const products = [
    {
      title: "LiDARs",
      description:
        "Advanced 3D sensing for mapping, navigation, and autonomous mobility.",
      image: "https://assets.core-bolt.com/website-assets/lidars_home.jpg",
    },
    {
      title: "AI Edge Computers",
      description:
        "Rugged computing systems for real-time AI, Industrial automation, and autonomy powered by NVIDIA and Intel.",
      image:
        "https://assets.core-bolt.com/website-assets/AI-Edge-Computers.jpg",
    },
    {
      title: "Industrial Edge Computers",
      description:
        "Rugged industrial computing systems designed for continuous operation, process control, and data acquisition in harsh factory and field environments.",
      image:
        "https://assets.core-bolt.com/website-assets/Industrial-Edge-Computer.jpg",
    },

    {
      title: "Vision systems & cameras",
      description:
        "High-resolution imaging solutions for AI, robotics, and industrial inspection.",
      image: "https://assets.core-bolt.com/website-assets/camera_home.jpg",
    },
    {
      title: "Actuators",
      description:
        "Precision motion control for robotics, automation, and lifting systems.",
      image: "https://assets.core-bolt.com/website-assets/actuators_home.jpg",
    },
    {
      title: "Wiring harness and Connectors",
      description:
        "Custom-engineered wiring solutions for reliable power and data integration.",
      image: "https://assets.core-bolt.com/website-assets/connectors_home.jpg",
    },
    // {
    //   title: "AGV Wheels and Parts",
    //   description:
    //     "Industrial drive and steering modules engineered for AGVs/AMR and robotics.",
    //   image: "https://assets.core-bolt.com/website-assets/agv_home.webp",
    // },
    // {
    //   title: "Industrial Remote Control",
    //   description:
    //     "Durable wireless controllers for safe, accurate, and flexible machine operation.",
    //   image: "https://assets.core-bolt.com/website-assets/remote_home.jpeg",
    // },
  ];

  return (
    <section id="whatWeBuild" className="py-20  bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 text-primary">
            What We Build and Supply
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Advanced hardware solutions shaping the next era of intelligent
            machines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const navigationUrl = getNavigationUrl(product.title);
            return (
              <Link key={index} href={navigationUrl}>
                <motion.div
                  className="bg-[#171b25] rounded-xl shadow-xl shadow-primary/20 transition-all duration-300 group h-full flex flex-col cursor-pointer hover:shadow-primary/40 hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Product Image */}
                  <div className="relative mb-6 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-fill group-hover:scale-105 transition-transform duration-300"
                      style={{ borderRadius: "10px" }}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-4 px-6 pb-6">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-white leading-relaxed flex-1">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
