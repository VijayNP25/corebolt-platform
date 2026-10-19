export const PERCEPTION_KITS_IMAGES = {
  hero: "https://www.core-bolt.com/home-replica/Perception-Kits-white.jpeg",
  ioInterfaces: "https://assets.core-bolt.com/website-assets/Edge-Ai.png",
  lidar: "https://assets.core-bolt.com/website-assets/lidarimage.png",
  cameras: "https://assets.core-bolt.com/website-assets/camaera121.png",
} as const;

export const APPLICATIONS = [
  {
    image: "https://assets.core-bolt.com/website-assets/Autonomous-Robotics.jpeg",
    title: "Autonomous Robotics",
    desc: "AMRs · navigation · obstacle avoidance",
  },
  {
    image: "https://assets.core-bolt.com/website-assets/Autonomous-Vehicles.jpeg",
    title: "Autonomous Vehicles",
    desc: "AGVs · outdoor ground vehicles",
  },
  {
    image: "https://assets.core-bolt.com/website-assets/Smart-Manufacturing.jpeg",
    title: "Smart Manufacturing",
    desc: "Visual inspection · defect detection",
  },
  {
    image: "https://assets.core-bolt.com/website-assets/Drone-&-UAV-Systems.jpeg",
    title: "Drone & UAV Systems",
    desc: "Aerial perception · obstacle avoidance",
  },
  {
    image: "https://assets.core-bolt.com/website-assets/Smart-Infrastructure-for-robotic.jpeg",
    title: "Smart Infrastructure",
    desc: "Traffic monitoring · security systems",
  },
  {
    image: "https://assets.core-bolt.com/website-assets/Logistics-&-Warehousing-corebolt.jpeg",
    title: "Logistics & Warehousing",
    desc: "Automated picking · fleet management",
  },
] as const;

export const IO_INTERFACES = [
  {
    name: "Ethernet",
    spec: "2× RJ45 Gigabit Ethernet Ports (10/100/1000Base-T)",
  },
  {
    name: "USB",
    spec: "4× USB 3.2 Type-A, 1× USB Type-C (Programming), 1× Micro USB (Debugging)",
  },
  {
    name: "Camera Interface",
    spec: "2× 4-in-1 GMSL1/GMSL2 camera connectors (supports up to 8 camera channels)",
  },
  {
    name: "Sync I/O_A",
    spec: [
      "1. 2× CAN/CAN-FD interface",
      "2. 2× RS-232 interface",
      "3. 1× RS-422/ RS-485 interface",
      "4. 2× Digital Input",
      "5. 2× High Side Output (1× 12V Output, 1× 5V Output)",
    ],
  },
  {
    name: "Video Output",
    spec: "1× HDMI 2.0 Type - A",
  },
] as const;

export const SPEC_CARDS = [
  {
    image: PERCEPTION_KITS_IMAGES.ioInterfaces,
    alt: "I/O Interfaces",
    title: "Edge Computers",
    desc: "Built on NVIDIA Jetson and Intel Core architectures, our Edge AI computers deliver high-performance AI inference, computer vision, and multi-sensor processing.",
    cta: "Explore 900SR Computer →",
    href: "/edge-computers/hyperedge-series/hyperedge-900sr-ai-edge-computer",
  },
  {
    image: PERCEPTION_KITS_IMAGES.lidar,
    alt: "LiDAR Sensors",
    title: "3D LiDAR Sensors",
    desc: "High-resolution 3D point cloud sensors from Hesai, RoboSense, Livox, SICK, Ouster and Velodyne for depth mapping, obstacle detection, and environmental modelling.",
    cta: "Explore LiDAR Sensors →",
    href: "/lidar-sensor-price-in-india",
  },
  {
    image: PERCEPTION_KITS_IMAGES.cameras,
    alt: "Vision Cameras",
    title: "Machine Vision Cameras",
    desc: "GMSL automotive cameras, Intel RealSense depth cameras, and MIPI CSI-2 imaging, validated for seamless integration with CORE BOLT Edge AI computers.",
    cta: "Explore Vision Cameras →",
    href: "/vision-systems-cameras-for-automation",
  },
] as const;

export const WHY_CORE_BOLT = [
  {
    title: "Pre-Validated Integration",
    desc: "Every kit is engineered with verified compatibility between Edge AI computers, LiDAR, cameras, communication interfaces, and power systems, reducing engineering effort and deployment risk.",
    icon: "layers",
  },
  {
    title: "Engineering Expertise",
    desc: "Work directly with our engineering team to configure the right hardware architecture based on your application requirements and deployment environment.",
    icon: "expertise",
  },
  {
    title: "Complete AI Hardware Stack",
    desc: "From NVIDIA Jetson Edge AI computers to LiDAR, machine vision cameras, industrial networking, and accessories, everything is available from a single trusted source.",
    icon: "chip",
  },
  {
    title: "Faster Time to Market",
    desc: "Minimize hardware integration time and accelerate prototype development with deployment-ready perception kits designed for rapid implementation.",
    icon: "delivery",
  },
  {
    title: "Industrial-Grade Reliability",
    desc: "Designed for continuous operation in demanding industrial, mobile robotics, transportation, and autonomous machine applications.",
    icon: "shield",
  },
  {
    title: "End-to-End Support",
    desc: "From hardware selection and integration to deployment assistance, CORE BOLT supports your complete Edge AI journey.",
    icon: "support",
  },
] as const;

export const OVERVIEW_PARAGRAPHS = [
  "The CORE BOLT Edge Computer Integration Kit is a comprehensive connectivity solution engineered to streamline the deployment of AI-powered edge computing systems across industrial, robotics, autonomous, and intelligent transportation applications. Designed for maximum compatibility, it provides everything required to connect sensors, cameras, and peripherals to your edge platform.",
  "Built for mission-critical environments, the integration kit eliminates the complexity of hardware interfacing by providing a complete ecosystem of industrial-grade cables, interface adapters, communication modules, power distribution components, and mounting accessories. Every component is selected to ensure robust connectivity, high-speed data transmission, and long-term operational stability in demanding industrial conditions.",
  "Supporting a broad range of high-performance interfaces—including USB 3.0, Gigabit Ethernet, MIPI CSI, GMSL, CAN Bus, RS-232/RS-485, UART, GPIO, HDMI, and DisplayPort—the kit enables rapid integration with modern AI edge computing platforms while reducing development time and engineering effort.",
  "Whether developing autonomous mobile robots (AMRs), autonomous guided vehicles (AGVs), AI-driven machine vision systems, intelligent surveillance solutions, smart manufacturing equipment, warehouse automation platforms, or edge AI gateways, the CORE BOLT Edge Computer Integration Kit provides the reliable connectivity foundation required to accelerate innovation and simplify deployment.",
] as const;
