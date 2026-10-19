/**
 * Related/featured products shown at the bottom of each blog post, keyed by slug.
 * Product IDs are looked up live against the catalogue in `@/data/products` (via
 * `locateProduct` / `buildProductPath`), so name, image, price, and the product URL
 * always stay in sync with the real catalogue instead of being duplicated here.
 *
 * Posts not listed here (Actuators, Connectors, Servo Lift Column, Motion Control ΓÇö
 * topics with no matching CoreBolt catalogue products yet) simply render no
 * related-products section.
 */
export const blogRelatedProductIds: Record<string, string[]> = {
  "livox-mid-360s-lidar-sensor": ["livox-mid-360S-lidar-sensor", "livox-avia-lidar-sensor", "livox-tele-15-lidar-sensor"],
  "robosense-airy-96-beam-lidar-sensor": ["robosense-airy-96-beam-lidar-sensor", "robosense-e1r-lidar-sensor", "robosense-fairy-lidar-sensor", "robosense-helios-16-lidar-sensor"],
  "robosense-ruby-plus": ["robosense-ruby-plus-lidar-sensor", "robosense-m1-plus-lidar-sensor", "robosense-helios-32-h32f70-lidar-sensor", "robosense-helios-32-h32F26-lidar-sensor"],
  "robosense-e1r-vs-e1-comparison": ["robosense-e1r-lidar-sensor", "robosense-e1-lidar-sensor"],
  "robosense-m1plus-vs-m2-comparison": ["robosense-m1-plus-lidar-sensor", "robosense-m2-lidar-sensor"],
  "lidar-vs-cameras-what-each-sensor-sees": ["robosense-airy-96-beam-lidar-sensor", "livox-mid-360S-lidar-sensor", "robosense-e1r-lidar-sensor"],
  "lidar-vs-vision-systems": ["robosense-airy-96-beam-lidar-sensor", "jetson-agx-orin-som-32gb", "livox-mid-360S-lidar-sensor"],
  "compute-for-vision-lidar-workloads": ["jetson-agx-orin-som-32gb", "jetson-agx-orin-som-64gb", "hyperedge-900dr-ai-edge-computer", "robosense-airy-96-beam-lidar-sensor"],
  "ai-edge-computer-gmsl-cameras-integration": ["hyperedge-900dr-ai-edge-computer", "jetson-agx-orin-som-32gb", "jetson-agx-orin-som-64gb"],
  "ai-edge-comuter-complete-guide-to-edge-ai-gpu-computing-nvidia-jetson": ["jetson-agx-developer-kit-64gb", "jetson-agx-orin-som-32gb", "jetson-orin-nx-som-16gb", "jetson-orin-nano-developer-kit-8gb"],
  "nvidia-developer-kits": ["jetson-agx-developer-kit-64gb", "jetson-orin-nano-developer-kit-8gb", "jetson-agx-thor-developer-kit-128gb", "jetson-t5000-SOM-128gb"],
  "rugged-computing-for-modern-industries": ["hypercore-m300", "hypercore-m500", "hypercore-700r"],
  "industrial-panel-pc-guide-for-factory-automation": ["hypercore-ipc-s-series", "hypercore-ipc-g-series", "hypercore-ipc-t-series"],
  "gmsl-depth-camera-outdoor-vision-systems": ["zed-x-nano", "zed-x-mini"],
  "why-robots-need-perception": ["robosense-airy-96-beam-lidar-sensor", "hyperedge-900dr-ai-edge-computer", "zed-x-nano"],
};

/**
 * Product whose price should also be shown on the blog *listing* card
 * (client/src/pages/blog.tsx) for these specific posts.
 */
export const blogCardProductIds: Record<string, string> = {
  "livox-mid-360s-lidar-sensor": "livox-mid-360S-lidar-sensor",
  "robosense-airy-96-beam-lidar-sensor": "robosense-airy-96-beam-lidar-sensor",
  "robosense-ruby-plus": "robosense-ruby-plus-lidar-sensor",
};
