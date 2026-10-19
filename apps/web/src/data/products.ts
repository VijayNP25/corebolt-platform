export interface ProductApplication {
  title: string;
  image: string;
  /** Optional subtitle shown under the card title (homepage-style). */
  subtitle?: string;
}

export interface ProductApplicationsSection {
  heading?: string;
  description?: string;
  items: ProductApplication[];
}

export interface ProductCompatibleModule {
  name: string;
  image: string;
}

export interface ProductCompatibleModulesSection {
  label?: string;
  items: ProductCompatibleModule[];
}

export interface ProductFeatureTableRow {
  parameter: string;
  value?: string;
  /** Additional column values (used when table has 3+ columns). */
  values?: string[];
  /** Colspan for the value cell when it spans remaining columns. On sectionHeader rows, spans the full table width. */
  colspan?: number;
  /** Full-width header row inside the table (e.g. PACKING LIST). */
  sectionHeader?: boolean;
  /** Highlight this row (e.g. accent section dividers in packing list tables). */
  accent?: boolean;
}

export interface ProductFeatureTable {
  title: string;
  columns?: string[];
  rows: ProductFeatureTableRow[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  overview?: string;
  overviewTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  price?: number | null;
  image: string;
  images?: string[];
  category: string;
  /** Optional — when omitted, the product lives directly on the category. */
  subcategory?: string;
  features: string[];
  featureTables?: ProductFeatureTable[];
  /** Optional "Built For Demanding Applications" section on the product page. */
  applicationsSection?: ProductApplicationsSection;
  /** Certification badges shown in the product hero (e.g. "CE Certified"). */
  certifications?: string[];
  /** Compatible modules / SOM cards shown in the product hero. */
  compatibleModulesSection?: ProductCompatibleModulesSection;
  fileUrl: string | null;
}

export interface Category {
  id: string;
  name: string;
  /** Either subcategories (multi-tier) or products (single-tier) — at least one should be set. */
  subcategories?: Subcategory[];
  /** Products that live directly on the category (skip the subcategory tier). */
  products?: Product[];
  description?: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  overview?: string;
  overviewTitle?: string;
}

export interface ProductGroup {
  id: string;
  name: string;
  /** Shown on category selection cards for this group */
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  overview?: string;
  overviewTitle?: string;
  /** Leaf products when this group has no further breakdown */
  products?: Product[];
  /** Optional sub-tiers (e.g. Area / Line under GigE) */
  productGroups?: ProductGroup[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  overview?: string;
  overviewTitle?: string;
  /** Optional brand/platform tag rendered as a badge on subcategory cards (e.g. "NVIDIA", "Intel"). */
  brand?: string;
  products: Product[];
  /** Optional mid-level (e.g. GMSL1 / GMSL2 / GMSL3) between subcategory and products */
  productGroups?: ProductGroup[];
}

export const categories: Category[] = [
  {
    id: "lidar",
    name: "3D LiDARs",
    image: "https://assets.core-bolt.com/website-assets/ouster-osdome-lidar-sensor.png",
    metaTitle: "3D LiDAR Sensor Solutions for Robotics and Mapping",
    metaDescription:
      "Shop 3D LiDAR sensors from Ouster, Hesai, Livox, RoboSense & SICK for robotics, AMRs, drones & autonomous navigation. Get pricing & support from CoreBolt.",
    metaKeywords:
      "Lidar, lidar sensor, lidar scanner, LiDAR Sensor Price in India, 3D LiDAR Sensor, Livox LiDAR India, LiDAR for Robotics, Industrial LiDAR Sensor, Autonomous Vehicle LiDAR, AMR LiDAR Sensor , Drone LiDAR Sensor, RoboSense LiDAR India, Sick Lidar,  Ouster Lidar , Hesai Lidar , Livox Lidar , RoboSense Lidar , Sick Lidar",
    overview:
      "CoreBolt provides advanced LiDAR sensors solutions from Livox, Hesai, RoboSense, Ouster & Velodyne & Sick designed for robotics, industrial automation, autonomous vehicles, drones, intelligent transportation, and smart infrastructure applications. Our portfolio includes industry-leading LiDAR technologies from globally recognized manufacturers, delivering accurate environmental perception, real-time object detection,v mapping, localization, and navigation capabilities. These 3D lidars from Livox, Hesai, RoboSense, Ouster & Velodyne & Sick offer high-performance 3D LiDAR sensors, LiDAR scanners, and industrial-grade sensing solutions that generate precise point cloud data for demanding applications. Whether deploying autonomous mobile robots (AMRs), automated guided vehicles (AGVs), robotic systems, smart factories, or unmanned aerial vehicles, our LiDAR solutions enable reliable performance in complex environments ",
    overviewTitle:
      " Advanced LiDAR Sensors for Robotics, Industrial Automation & Autonomous Systems",
    subcategories: [
      {
        id: "ouster-velodyne",
        name: "Ouster & Velodyne",
        image:
          "https://assets.core-bolt.com/website-assets/ouster-velodyne-lidar-sensors-hero-image.jpg",

        description:
          "High-resolution lidar sensors, perception software, and solutions are ushering in a new era for safety, efficiency, and sustainability by integrating into existing and future applications.",
        metaTitle: "Ouster & Velodyne LiDAR for Robotics & AMRs | CoreBolt",
        metaDescription:
          "Explore Ouster & Velodyne 3D LiDAR sensors for robotics, AMRs, AGVs & autonomous vehicles — SLAM, mapping & obstacle detection. Pricing from CoreBolt.",
        metaKeywords:
          "Ouster & Velodyne 3D LiDAR , Ouster and Velodyne LiDAR Solutions, Ouster Velodyne LiDAR for Autonomous Systems, Ouster Velodyne Industrial LiDAR Solutions,  Ouster and Velodyne lidar, Ouster LiDAR, Ouster sensor, 360 degree LiDAR sensor, SLAM LiDAR, ROS compatible LiDAR, High resolution LiDAR, Multi beam LiDAR, Point cloud LiDAR, ouster os dome, ouster os0, ouster os1, ouster os2, vlp-16 puck, vlp 16  puck lite ",
        overview:
          "CoreBolt provides advanced Ouster and Velodyne LiDAR solutions designed for robotics, industrial automation, autonomous systems, autonomous vehicles, drones, intelligent transportation, and smart infrastructure applications. Our solutions incorporate industry-leading 3D LiDAR technologies, enabling accurate environmental perception, real-time object detection, mapping, localization, and navigation for next-generation intelligent systems. CoreBolt offer high-performance Ouster LiDAR sensors and Velodyne LiDAR systems, including the Ouster OS0, Ouster OS1, Ouster OS2, Ouster Dome, VLP-16 Puck, and VLP-16 Puck Lite. These high-resolution, multi-beam LiDAR sensors generate detailed 3D point cloud data and provide 360-degree sensing capabilities for demanding industrial and autonomous applications.Whether deploying Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), mobile robotics platforms, warehouse automation systems, autonomous vehicles, or drone-based solutions, Ouster and Velodyne LiDAR technologies deliver reliable performance in complex environments. With support for SLAM, ROS-compatible robotics frameworks, obstacle detection, real-time mapping, and autonomous navigation, these advanced LiDAR solutions help accelerate the development and deployment of intelligent robotic and automation systems. ",
        overviewTitle:
          "Ouster & Velodyne 3D LiDAR Systems for Robotics, Automation & Autonomous Systems",
        products: [
          {
            id: "ouster-os-dome-lidar-sensor",
            name: "OUSTER OS Dome",
            description:
              "OS Dome – A hemispherical lidar sensor with a 180º field of view, ideal for security, smart infrastructure, and autonomous system awareness.",
            metaTitle: "Ouster OS Dome 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the Ouster OS Dome hemispherical lidar sensor with 180deg FoV for security, smart infrastructure and robotics. Ask price from Core Bolt India today.",
            metaKeywords:
              "Ouster OS Dome, Ouster OS Dome LiDAR, Ouster OS Dome LiDAR Sensor, Ouster OS Dome Price, Buy Ouster OS Dome, Ouster Digital LiDAR, Ouster Dome 3D LiDAR, Ouster LiDAR for Robotics, Ouster LiDAR for AMR & AGV ",
            overview:
              " OUSTER OS Dome (Ask Price). The Ouster OS Dome is an advanced digital 3D LiDAR sensor designed for robotics, autonomous navigation, industrial automation, warehouse automation, smart infrastructure, and intelligent transportation applications. Featuring a unique hemispherical field of view, the sensor delivers comprehensive environmental perception and high-resolution point cloud data for next-generation autonomous systems. Built for demanding robotic and automation environments, the Ouster OS Dome enables accurate obstacle detection, object tracking, localization, mapping, and real-time navigation. Its advanced digital LiDAR architecture provides reliable 3D sensing performance, helping intelligent systems achieve improved situational awareness and operational efficiency. The Ouster OS Dome is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), robotic platforms, autonomous navigation systems, smart factories, logistics automation, and industrial mobility applications. Its high-quality point cloud generation capabilities support SLAM, collision avoidance, path planning, environmental monitoring, and autonomous decision-making. With robust performance, precise spatial perception, and seamless integration into modern automation ecosystems, the Ouster OS Dome helps enable safer navigation, improved productivity, and enhanced operational intelligence across a wide range of industrial and autonomous applications. Buy the Ouster OS Dome hemispherical lidar sensor with 180deg FoV for security, smart infrastructure and robotics. Ask price from Core Bolt India today.",
            overviewTitle:
              " Ouster OS Dome 3D LiDAR for Robotics, AMRs, AGVs & Intelligent Automation",
            image:
              "https://assets.core-bolt.com/website-assets/ouster-osdome-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/OSDome-1.png",
              "https://assets.core-bolt.com/website-assets/OSDome-sketch.png",
               "https://assets.core-bolt.com/website-assets/OSDome-info.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/datasheet-rev7p1-osdome.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: null,
            features: [
              "Vertical Field of View : 180°",
              "Range at 10% : 20m",
              "Range at 80% : 45m",
              "Channels of Resolution : 32, 64 and 128",
              " Max points Per Second :  5.2M",
              " Max Frame Rate : 20 Hz",
              "Operating  Tempuerature :-40°C ~ +60°C",
              "MTTF : ≥ 250,000 hrs",
              "Power: 14–20W (28W peak at startup)",
              "IMU: 3-axis accelerometer, 3-axis gyroscope",
              "Weight: 470 g",
              "Ingress Protection : IP68 & IP69K",
            ],
          },

          {
            id: "ouster-os0-lidar-sensor",
            name: "OUSTER OS0",
            description:
              "An ultra-wide field-of-view sensor designed for short-range, high-precision perception in robotics, warehouse automation, and industrial applications.",
            metaTitle: "Ouster OS0 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Ouster OS0 ultra-wide FoV lidar sensor: 100 m short-range 3D lidar for robotics, AMRs and warehouses. Ask price from Core Bolt India today.  ",
            metaKeywords:
              " Ouster OS0, Ouster OS0 LiDAR, Ouster OS0 LiDAR Sensor, Ouster OS0 Price, Ouster OS0-128, Ouster OS0-32, Ouster 3D LiDAR, High Resolution LiDAR, Industrial LiDAR for Robotics",
            overview:
              "OUSTER OS0 (Ask Price). The Ouster OS0 is a high-resolution 3D LiDAR sensor designed for robotics, industrial automation, autonomous systems, warehouse automation, and intelligent transportation applications. Featuring an ultra-wide vertical field of view and advanced digital LiDAR technology, the OS0 delivers accurate environmental perception and reliable real-time sensing for complex operating environments. Built for applications requiring precise spatial awareness, the Ouster OS0 generates detailed 3D point cloud data that supports object detection, obstacle avoidance, localization, mapping, and autonomous navigation. Its high-performance sensing capabilities enable intelligent systems to operate safely and efficiently in dynamic environments where accuracy and reliability are critical. The Ouster OS0 is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), industrial robots, smart infrastructure systems, warehouse automation platforms, and autonomous machines. Its advanced perception capabilities support SLAM, collision avoidance, path planning, environmental monitoring, and real-time decision-making applications. From robotics and industrial automation to autonomous navigation and smart mobility solutions, the Ouster OS0 delivers the performance, reliability, and sensing accuracy required for modern intelligent systems. Its advanced 3D perception technology enables improved operational efficiency, enhanced safety, and greater situational awareness across a wide range of applications. Buy the Ouster OS0 ultra-wide FoV lidar sensor: 100 m short-range 3D lidar for robotics, AMRs and warehouses. Ask price from Core Bolt India today.  ",
            overviewTitle:
              "Ouster OS0 3D LiDAR for Robotics, SLAM & Industrial Automation",
            image:
              "https://assets.core-bolt.com/website-assets/ouster-os0-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/OS0-1.png",
              "https://assets.core-bolt.com/website-assets/OS0-sketch.png",
              "https://assets.core-bolt.com/website-assets/OS0-info.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/ouster-scam-video.mp4",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: null,
            features: [
              " Vertical Field of View: 90°",
              "Range at 10% : 35m",
              " Max Range : 100m ",
              "Channels of Resolution : 32, 64 and 128",
              "Operating Temperature : -40°C~ +60°C",
              "MTTF : ≥ 250,000 hrs",
              "Max Frame Rate : 20Hz",
              "Power: 14–20W(28W peak at startup)",
              "IMU: 3-axis accelerometer, 3-axis gyroscope",
              "Weight: 430g",
              "Ingress Protection : IP68 & IP69K",
            ],
          },
          {
            id: "ouster-os1-lidar-sensor",
            name: "OUSTER OS1",
            description:
              "A mid-range sensor balancing resolution and range, making it a versatile choice for security, smart infrastructure, and autonomous vehicles.",
            metaTitle: "Ouster OS1 3D LiDAR Sensor for Navigation",
            metaDescription:
              "Buy the Ouster OS1 mid-range lidar sensor: 45deg FoV, 32/64/128 channels for AVs and smart infrastructure. Ask price from Core Bolt India today.",
            metaKeywords:
              " Ouster OS1, Ouster OS1 LiDAR, Ouster OS1 LiDAR Sensor, Ouster OS1 Price, Ouster OS1-128, Ouster OS1-64, Ouster OS1-32, Ouster 3D LiDAR Sensor",
            overview:
              "OUSTER OS1 (Ask Price). The Ouster OS1 is a high-resolution 3D LiDAR sensor designed for robotics, industrial automation, autonomous vehicles, warehouse automation, and intelligent transportation applications. Combining long-range sensing capabilities with advanced digital LiDAR technology, it delivers accurate environmental perception and reliable point cloud generation for intelligent systems. Built for demanding automation and robotic environments, the Ouster OS1 LiDAR enables real-time object detection, localization, mapping, and navigation. Its high-density 3D point cloud data provides enhanced situational awareness, helping autonomous systems operate safely and efficiently in complex operating conditions. The Ouster OS1 is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), robotic platforms, autonomous navigation systems, warehouse automation, and industrial mobility applications. Its advanced sensing capabilities support SLAM, obstacle detection, collision avoidance, path planning, and real-time environmental monitoring. With reliable performance, accurate spatial perception, and flexible integration capabilities, the Ouster OS1 helps improve operational efficiency, safety, and intelligent decision-making across a wide range of robotics, automation, and autonomous system applications. Buy the Ouster OS1 mid-range lidar sensor: 45deg FoV, 32/64/128 channels for AVs and smart infrastructure. Ask price from Core Bolt India today.",
            overviewTitle:
              "Ouster OS1 3D LiDAR for Robotics, SLAM & Autonomous Navigation",
            image:
              "https://assets.core-bolt.com/website-assets/ouster-os1-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/OS1-1.png",
              "https://assets.core-bolt.com/website-assets/OS1-sketch.png",
              "https://assets.core-bolt.com/website-assets/OS1-info.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/datasheet-rev7p1-os1.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: null,
            features: [
              "Vertical Field of View : 45°",
              "Channels of Resolution : 32, 64 and 128",
              "Max points per second : 5.2M",
              "Max Frame Rate : 20 Hz",
              "Operating Temperature : -40°C ~ +60°C",
              "MTTF : ≥ 250,000 hrs",
              "Power: 14–20W(28W peak at startup)",
              "IMU: 3-axis accelerometer, 3-axis gyroscope",
              "Weight: 430g",
              "Ingress Protection : IP68 & IP69K",
            ],
          },
           
          {
            id: "ouster-os2-lidar-sensor",
            name: "OUSTER OS2",
            description:
              "A long-range sensor delivering high-resolution perception for large-scale infrastructure monitoring, security, and autonomous mobility.",
            metaTitle: "Ouster OS2 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Ouster OS2 long-range lidar sensor: high-res 3D lidar for infrastructure, security and mobility. Ask price from Core Bolt India today.",
            metaKeywords:
              "Ouster OS2, Ouster OS2 LiDAR, Ouster OS2 LiDAR Sensor, Ouster OS2 Price, Ouster OS2-128, Ouster 3D LiDAR, Long Range LiDAR Sensor",
            overview:
              "OUSTER OS2 (Ask Price). The Ouster OS2 is a long-range 3D LiDAR sensor designed for robotics, industrial automation, autonomous vehicles, intelligent transportation, and large-scale outdoor automation applications. Its advanced digital LiDAR technology delivers accurate environmental perception, high-resolution point cloud generation, and reliable sensing performance over extended distances. Built for applications requiring long-range object detection, localization, mapping, SLAM, and autonomous navigation, the Ouster OS2 LiDAR provides dependable environmental awareness in complex and dynamic operating environments. Its high-density 3D point cloud data enables intelligent systems to make accurate real-time decisions while improving operational safety and efficiency. The Ouster OS2 is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), autonomous platforms, smart infrastructure systems, industrial mobility solutions, and intelligent transportation projects. Its advanced sensing capabilities support obstacle detection, collision avoidance, path planning, and real-time environmental monitoring. With long-range sensing performance, accurate spatial perception, and reliable operation, the Ouster OS2 helps accelerate the development of intelligent automation systems while enhancing productivity, safety, and situational awareness across a wide range of industries. Buy the Ouster OS2 long-range lidar sensor: high-res 3D lidar for infrastructure, security and mobility. Ask price from Core Bolt India today.",
            overviewTitle:
              "Ouster OS2 Long-Range 3D LiDAR for Robotics & Autonomous Systems",
            image:
              "https://assets.core-bolt.com/website-assets/ouster-os2-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/3OS2.webp",
              "https://assets.core-bolt.com/website-assets/6OS2.webp",
              "https://assets.core-bolt.com/website-assets/5OS2.png",
              "https://assets.core-bolt.com/website-assets/2OSO2.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/datasheet-rev7-v2p5-os2.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: null,
            features: [
              "Vertical Field of View:22.5°",
              "Channels of Resolution: 32, 64 and 128",
              "Max points Per Second : 2.62M",
              "Max Precision : +/- 2 cm ",
              "Max Frame Rate:20 Hz",
              "Max Range:400m",
              "MTTF : ≥ 250,000 hrs",
              "Power: 18–24W (28W peak at startup, 30W peak at extreme conditions)",
              "IMU: 3-axis accelerometer, 3-axis gyroscope",
              "Weight: 1100g",
              "Ingress Protection : IP68 & IP69K",
            ],
          },
          {
            id: "velodyne-vlp-16-puck-lidar-sensor",
            name: "VLP-16 Puck",
            description:
              "Velodyne Lidar’s Puck is a small and compact lidar that is performance and power optimized for usage across a variety of applications ranging from automotive, mapping, robotics, security, smart cities and more.",
            metaTitle: "Velodyne VLP-16 Puck 3D LiDAR Sensor for drone mapping",
            metaDescription:
              "The Velodyne VLP-16 Puck 3D LiDAR suits robotics, drones & navigation — real-time point clouds for SLAM, mapping & detection. Pricing from CoreBolt.",
            metaKeywords:
              "Velodyne VLP-16 Puck, Velodyne VLP-16 LiDAR, Velodyne VLP-16 Puck LiDAR Sensor, Velodyne VLP-16 Puck Price, Velodyne 3D LiDAR Sensor, Multi-Beam LiDAR",
            overview:
              "The Velodyne VLP-16 Puck is a compact 3D LiDAR sensor designed for robotics, industrial automation, autonomous vehicles, drones, mapping, and intelligent transportation applications. Its lightweight design and advanced sensing capabilities provide accurate environmental perception, real-time object detection, localization, mapping, and navigation for intelligent systems. Built for applications requiring SLAM, obstacle detection, collision avoidance, and autonomous navigation, the Velodyne VLP-16 LiDAR generates reliable 3D point cloud data that helps robotic and autonomous systems operate safely and efficiently in dynamic environments. The Velodyne VLP-16 Puck is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), UAVs, robotic platforms, mapping systems, and intelligent automation projects. Its advanced perception capabilities support real-time environmental awareness, path planning, and autonomous decision-making. With compact form factor, reliable sensing performance, and accurate spatial perception, the Velodyne VLP-16 Puck enables improved operational efficiency, safety, and situational awareness across a wide range of robotics and automation applications. ",
            overviewTitle:
              "Velodyne VLP-16 Puck Long-Range 3D LiDAR for Robotics & Autonomous Systems",
            image:
              "https://assets.core-bolt.com/website-assets/velodyne-vlp-16-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/VLP-16MAIN-IMAGE.png",
              "https://assets.core-bolt.com/website-assets/vlp-16Puck.png",
              "https://assets.core-bolt.com/website-assets/VLP-16-Puck-(2).png",
              "https://assets.core-bolt.com/website-assets/VLP-16-Puck-(3).png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/63-9229_Rev-K_Puck-_Datasheet_Web.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: 396799.0,

            features: [
              "Channels : 16",
              "Measurement Range: 100 m",
              "Range Accuracy: Up to ±3 cm (Typical)",
              "Field of View (Vertical): +15.0° to -15.0° (30°)",
              "Angular Resolution (Vertical): 2.0°",
              "Field of View (Horizontal): 360°",
              "Angular Resolution (Horizontal): 0.1° to 0.4°",
              "Data Points Generated: ~300,000 points per second (Single Return Mode), ~600,000 points per second (Dual Return Mode)",
              "Rotation Rate: 5 Hz – 20 Hz",
              "Operating Temperature: -10°C to +60°C",
              " Weight: ~830 g (without Cabling and Interface Box)",
              "Power Consumption: ~8 W",
              "Operating Voltage: 9 V – 18 V",
              " Environmental Protection: IP67",
            ],
          },
          {
            id: "velodyne-vlp-16-puck-lite-lidar-sensor",
            name: "VLP-16 Puck Lite",
            description:
              "Velodyne Lidar’s Puck LITE is our lightest sensor - specially designed for applications that require a lower weight. Aside from the weight, the Puck LITE has identical performance to the Puck.",
            metaTitle: " Velodyne VLP-16 Puck Lite LiDAR Sensor | Core-Bolt",
            metaDescription:
              " Velodyne VLP-16 Puck Lite LiDAR sensor for drones, robotics and autonomous navigation — lightweight 3D sensing for SLAM and obstacle detection.",
            metaKeywords:
              "Velodyne VLP-16 Puck Lite, Velodyne VLP-16 Puck Lite LiDAR Sensor, VLP-16 Puck Lite Price, Velodyne 3D LiDAR Sensor, Multi-Beam LiDAR",
            overview:
              "The Velodyne VLP-16 Puck Lite is a compact and lightweight 3D LiDAR sensor designed for robotics, industrial automation, drones, autonomous vehicles, and mapping applications. Its advanced multi-beam LiDAR technology delivers accurate environmental perception, real-time object detection, localization, and navigation capabilities for intelligent systems. Built for applications requiring SLAM, obstacle detection, collision avoidance, and autonomous navigation, the VLP-16 Puck Lite generates reliable 3D point cloud data that helps robotic and autonomous platforms operate safely and efficiently in dynamic environments. The Velodyne VLP-16 Puck Lite is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), UAVs, robotic platforms, mapping systems, and intelligent automation projects. Its lightweight design and dependable sensing performance make it ideal for applications requiring accurate spatial awareness and real-time environmental monitoring. With compact form factor, reliable performance, and advanced 3D LiDAR capabilities, the VLP-16 Puck Lite enables improved operational efficiency, safety, and situational awareness across a wide range of robotics and automation applications.",
            overviewTitle:
              " Velodyne VLP-16 Puck Lite 3D LiDAR for Robotics, Drones & Intelligent Automation",
            image:
              "https://assets.core-bolt.com/website-assets/velodyne-vlp-16-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/VLP-16MAIN-IMAGE.png",
              "https://assets.core-bolt.com/website-assets/VLP-16-01.avif",
              "https://assets.core-bolt.com/website-assets/VLP-16PuckLite.png",
              "https://assets.core-bolt.com/website-assets/VLP-16-PuckLite-(2).png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/63-9286_Rev-K_Puck-LITE_Datasheet_Web.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: 424999.0,

            features: [
              "Channels : 16",
              "Measurement Range: 100m",
              "Range Accuracy: Up to ±3 cm (Typical)",
              "Field of View (Vertical): +15.0° to -15.0° (30°)",
              "Angular Resolution (Vertical): 2.0°",
              "Field of View (Horizontal): 360°",
              "Angular Resolution (Horizontal/Azimuth): 0.1°-0.4°",
              "Rotation Rate: 5 Hz – 20 Hz",
              "Operating Temperature: -10°C to +60°C",
              " Weight: ~590g (without Cabling and Interface Box)",
              "Power Consumption: ~8 W",
              "Operating Voltage: 9 – 18V",
              " Environmental Protection: IP67",
              "Data Points Generated: ~300,000 points per second (Single Return Mode), ~600,000 points per second (Dual Return Mode)",
            ],
          },
          {
            id: "velodyne-vlp-16-puck-hi-res-lidar-sensor",
            name: "VLP-16 Puck Hi-Res",
            description:
              "Velodyne Lidar’s Puck Hi-Res is a higher resolution version of the popular Puck and is used in applications that require increased resolution in the point cloud. The Puck Hi-Res has similar performance to the Puck with the key difference being a higher vertical resolution of 1.33°, with an accompanying 20° vertical field of view. The higher resolution enables detection of objects at longer distances at comparable frame sizes. As a result, the Puck Hi-Res provides more detailed views for applications such as autonomous vehicles, surveillance and 3D mapping/imaging.",
            metaTitle: " Velodyne VLP-16 Puck Hi-Res 3D LiDAR Sensor for 3D mapping",
            metaDescription:
              "The Velodyne VLP-16 Puck Hi-Res 3D LiDAR gives finer resolution for robotics, drones & mapping — accurate SLAM & detection. Get a quote from CoreBolt.",
            metaKeywords:
              "Velodyne VLP-16 Puck Hi-Res, Velodyne VLP-16 Puck Hi-Res LiDAR Sensor, VLP-16 Puck Hi-Res Price, Velodyne 3D LiDAR Sensor, High Resolution LiDAR, LiDAR for Robotics",
            overview:
              "The Velodyne VLP-16 Puck Hi-Res is a high-resolution 3D LiDAR sensor designed for robotics, industrial automation, autonomous vehicles, mapping, and intelligent transportation applications. Its advanced sensing technology provides accurate environmental perception, real-time object detection, localization, and navigation capabilities for intelligent systems. Built for applications requiring SLAM, obstacle detection, collision avoidance, and autonomous navigation, the VLP-16 Puck Hi-Res generates detailed 3D point cloud data that enhances situational awareness and supports reliable operation in dynamic environments. The Velodyne VLP-16 Puck Hi-Res is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), robotic platforms, mapping systems, and intelligent automation projects. Its high-resolution sensing capabilities help improve object recognition, environmental monitoring, and autonomous decision-making. With reliable performance, enhanced spatial perception, and advanced 3D LiDAR capabilities, the VLP-16 Puck Hi-Res enables improved operational efficiency, safety, and navigation accuracy across a wide range of robotics and automation applications.",
            overviewTitle:
              "Velodyne VLP-16 Puck Hi-Res 3D LiDAR for Robotics & Intelligent Automation",
            image:
              "https://assets.core-bolt.com/website-assets/velodyne-vlp-16-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/VLP-16MAIN-IMAGE.png",
              "https://assets.core-bolt.com/website-assets/VLP-16-01.avif",
              "https://assets.core-bolt.com/website-assets/VLP-16-Puck-Hi-Res.png",
              "https://assets.core-bolt.com/website-assets/VLP-16-Puck-Hi-Res-(3).png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/63-9318_Rev-H_PuckHi-Res_Datasheet_Print.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: 549899.0,
            features: [
              "Channels : 16",
              " Measurement Range: 100m",
              "Range Accuracy: Up to ±3 cm (Typical)",
              "Field of View (Vertical): +10.0° to -10.0° (20°)",
              "Angular Resolution (Vertical): 1.33°",
              "Field of View (Horizontal): 360°",
              "Angular Resolution (Horizontal/Azimuth): 0.1°-0.4°",
              "Rotation Rate: 5 Hz – 20 Hz",
              "Operating Temperature: 0°C to +60°C",
              " Weight: ~750 g (without Cabling and Interface Box)",
              "Power Consumption: ~8 W",
              "Operating Voltage: 9 – 18 V",
              " Environmental Protection: IP67",
              "Data Points Generated: ~300,000 points per second (Single Return Mode), ~600,000 points per second (Dual Return Mode)",
            ],
          },
          {
            id: "vlp-32-ultra-puck-lidar-sensor",
            name: "VLP-32 Ultra Puck",
            description:
              "Velodyne Lidar’s Ultra Puck is a best-in-class 360-degree horizontal field-of-view (FoV) sensor that combines long range performance with outstanding resolution and point density in a compact form factor. It is the first and most widely used, 200 m sensor in the autonomous systems market. It also has the highest vertical FoV, which supports a wide variety of road and traffic scenarios. It’s denser channel distribution at the horizon enables higher resolution at longer ranges.",
            metaTitle: "Velodyne VLP-32 Ultra Puck 3D LiDAR Sensor for 3D mapping",
            metaDescription:
              "Velodyne VLP-32 LiDAR sensors for 3D mapping, autonomy, and robotics. Explore LiDAR prices, models, and advanced mapping solutions.",
            metaKeywords:
              "VELODYNE VLP-32 Ultra Puck, velodyne vlp-32 Ultra Puck lidar stock, velodyne vlp-32 Ultra Puck lidar price,3d lidar sensor",
            image:
              "https://assets.core-bolt.com/website-assets/velodyne-vlp-32-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-1-Main-Image.png",
              "https://assets.core-bolt.com/website-assets/VLP-32UltraPuck.png",
              "https://assets.core-bolt.com/website-assets/8VLP-32.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/63-9378_Rev-F_Ultra-Puck_Datasheet_Web.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: 589600.0,
            features: [
              "Channels : 32",
              " Measurement Range: 200m ",
              "Range Accuracy: Up to ±3 cm (Typical)",
              " Horizontal Field of View: 360°",
              "Vertical Field of View: 40° (-25° to +15°)",
              " Minimum Angular Resolution (Vertical): 0.33° (non-linear distribution)",
              "Angular Resolution (Horizontal/Azimuth): 0.1° to 0.4°",
              "Frame Rate: 5 Hz to 20 Hz",
              "Operating Temperature:  -20°C to +60°C",
              " Weight:  ~ 925g (without cabling and interface box)",
              "Power Consumption:10W",
              "Operating Voltage: 10.5 – 18 V",
              " Environmental Protection: IP67",
              "Data Points Generated: ~600,000 points per second (Single Return Mode) ,~1,200,000 points per second (Dual Return Mode)",
            ],
          },
          {
            id: "vls-128-ultra-prime-lidar-sensor",
            name: "VLS-128 Ultra Prime",
            description:
              "With the Alpha Prime, Velodyne Lidar delivers the optimal long-range sensor for autonomous mobility. The Alpha Prime’s world-class combination of range, image clarity and field of view detects roadway objects with reliability and precision.",
            metaTitle: "Velodyne VLS-128 Ultra Prime 3D LiDAR Sensor for 3D mapping",
            metaDescription:
              "Velodyne VLS-128 LiDAR sensors for 3D mapping, autonomy, and robotics. Explore VLS-128 LiDAR prices, models, and advanced mapping solutions.",
            metaKeywords:
              "VELODYNE VLP-128 Ultra Prime, velodyne vlp-128 Ultra Prime lidar stock, velodyne vlp-Ultra Prime lidar price,3d lidar sensor",
            image:
              "https://assets.core-bolt.com/website-assets/velodyne-vls-128-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1VLS-128.png",
              "https://assets.core-bolt.com/website-assets/VLS-128UltraPrime.png",
              "https://assets.core-bolt.com/website-assets/4VLS-128.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/63-9679_Rev-B_DATASHEET_ALPHA-PRIME_web.pdf",
            category: "lidar",
            subcategory: "ouster-velodyne",
            price: null,
            features: [
              "Channels : 128",
              " Measurement Range:upto 300m",
              "Range Accuracy:±3 cm (Typical)",
              " Horizontal Field of View: 360°",
              "Vertical Field of View: 40° (-25° to +15°)",
              "Angular Resolution(Horizontal): 0.1° to 0.4°",
              "Frame Rate: 5 Hz to 20 Hz",
              "Operating Temperature:  -20°C to 60°C",
              " Weight : ~ 3.5 kg (without cabling)",
              "Power Consumption:23W",
              "Operating Voltage: 9 – 28 V",
              " Environmental Protection: IP67",
              "Data Points Generated: 2.3M points per second (Single Return Mode) , 4.6M points per second (Dual Return Mode)",
            ],
          },
        ],
      },
      {
        id: "hesai",
        name: "Hesai",
        description:
          "Hesai Technology leads in LiDAR sensor innovation, providing high-performance solutions for automotive, robotics and industrial applications.",
        image:
          "https://assets.core-bolt.com/website-assets/hesai-lidar-sensor-hero-image.jpg",

        metaTitle:
          " Hesai 3D LiDAR Sensor for ADAS and autonomous driving",
        metaDescription:
          "Explore Hesai automotive & industrial 3D LiDAR for autonomous vehicles, robotics & ADAS — mapping, localization & perception. Pricing at CoreBolt.",
        metaKeywords:
          " Hesai LiDAR Technology for Autonomous Vehicles, Hesai LiDAR India, Hesai Pandar Price in India, Automotive LiDAR Sensor India, Hesai XT32 LiDAR, Hesai AT128 LiDAR, Hesai Technology,  hesai lidar price, ETX , AT 360, AT 1440, AT-128, ATX, FTX, JT-16, JT-128, XT32M ",
        overview:
          "CoreBolt provides advanced Hesai LiDAR solutions designed for autonomous vehicles, robotics, industrial automation, intelligent transportation systems, and smart infrastructure applications. Powered by industry-leading Hesai LiDAR technology, these high-performance sensing solutions deliver accurate environmental perception, real-time object detection, mapping, localization, and autonomous navigation capabilities for next-generation intelligent systems. We offer high-performance advanced Hesai LiDAR such as the hesai ETX lidar , hesai AT 360 lidar, heasi AT 1440 lidar, hesai AT-128 lidar, hesai ATX lidar, hesai FTX lidar, hesai JT-16 lidar, hesai JT-128 lidar, hesai XT32M lidar, supporting a wide range of autonomous and industrial applications. These automotive-grade LiDAR sensors generate high-resolution 3D point cloud data, enabling reliable operation in complex environments where precision, safety, and situational awareness are critical. Whether deploying autonomous vehicles, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), robotics platforms, smart transportation systems, or industrial automation solutions, Hesai LiDAR technologies provide long-range detection, high-resolution sensing, and robust performance. Designed to support real-time perception, obstacle detection, SLAM, mapping, and localization, Hesai LiDAR solutions help accelerate the development and deployment of intelligent autonomous systems across diverse industries.",
        overviewTitle:
          " Hesai LiDAR Technology for Autonomous Vehicles, Robotics & Industrial Automation",
        products: [
          {
            id: "hesai-etx-automotive-lidar-sensor",
            name: "HESAI ETX",
            description:
              "Equipped with Hesai's proprietary photon vector technology, ETX extends ranging capabilities by 30% all while maintaining Class 1 eye safety compliance and reducing size and power consumption.",
            metaTitle:
              "Hesai ETX Long-Range LiDAR for Autonomous Driving",
            metaDescription:
              "Buy the Hesai ETX automotive lidar sensor: photon vector tech extends range 30% with Class 1 eye safety. Ask price from Core Bolt India today. ",
            metaKeywords:
              "Hesai ETX, Hesai ETX LiDAR, Hesai ETX LiDAR Sensor, Hesai ETX Price, Hesai ETX Specifications, Automotive LiDAR, Long Range LiDAR",
            overview:
              " HESAI ETX (Ask Price). The ETX Automotive LiDAR Sensor is a high-precision 3D sensing solution designed for autonomous vehicles, ADAS systems, and smart mobility applications. With its long-range detection and high-resolution point cloud data, the ETX Automotive LiDAR Sensor enables accurate identification of vehicles, pedestrians, obstacles, and road boundaries in real time.\n\nEngineered for reliability, the ETX Automotive LiDAR Sensor performs consistently in diverse lighting, weather, and traffic conditions, making it ideal for urban streets, highways, and industrial environments. Its compact and durable design allows seamless integration into passenger cars, commercial fleets, and autonomous platforms.\n\nTrusted by OEMs, system integrators, and developers, the ETX Automotive LiDAR Sensor supports critical applications such as collision avoidance, lane assistance, adaptive cruise control, and autonomous navigation. By delivering precise, high-density environmental perception, the ETX Automotive LiDAR Sensor enhances vehicle intelligence, safety, and situational awareness, making it an essential technology for next-generation smart mobility solutions. Buy the Hesai ETX automotive lidar sensor: photon vector tech extends range 30% with Class 1 eye safety. Ask price from Core Bolt India today. ",
            overviewTitle:
              "Hesai ETX 3D LiDAR for Autonomous Vehicles & Intelligent Transportation",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-etx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/ETX-0.png",
              "https://assets.core-bolt.com/website-assets/ETX-5.png",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "hesai",
            price: null,
            features: [
              "FOV: 120° × 20°",
              "Ranging Capability: 40 m @ 10% Reflectivity",
              "Point Rate: 5,600,000 pts/s [Single Return]",
              "Dimensions :W 137 × D 120 × H 36 mm",
              "Weight: Approx.600 g",
              "Angular Resolution: 0.05° (H) × 0.05° (V)",
              "Power: 11 W typical",
              "Operating Temperature: -40°C ~ +85°C",
              "Protection: IP6K7 & IP6K9K",
            ],
          },
          {
            id: "hesai-at-360-lidar-sensor",
            name: "HESAI AT360",
            description:
              "The AT360 utilizes cutting-edge high-efficiency light sensing and ultra-high parallel processing technologies, delivering a lidar channel count that is 10 times higher than comparable products on the market.",
            metaTitle:
              "Hesai AT360 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the Hesai AT360 lidar sensor: ultra-high channel count 360deg 3D lidar for autonomous driving. Ask price from Core Bolt India today. ",
            metaKeywords:
              "Hesai AT360, Hesai AT360 LiDAR, Hesai AT360 LiDAR Sensor, Hesai AT360 Price, Hesai AT360 Specifications, Automotive Grade LiDAR, ADAS LiDAR, Long Range LiDAR, LiDAR for Autonomous Vehicles",
            overview:
              "HESAI AT 360 (Ask Price). The Hesai AT360 LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent transportation systems, and next-generation mobility applications. Its high-resolution sensing technology delivers accurate environmental perception, real-time object detection, and reliable point cloud generation for intelligent vehicle systems. Built for applications requiring long-range object detection, 3D perception, obstacle recognition, lane-level awareness, and autonomous navigation, the Hesai AT360 provides dependable sensing performance in complex driving environments. Its advanced LiDAR capabilities help improve situational awareness, navigation accuracy, and vehicle safety. The Hesai AT360 LiDAR is well suited for autonomous vehicles, intelligent transportation projects, smart mobility platforms, and advanced driver assistance systems. Its high-resolution sensing performance supports collision avoidance, environmental monitoring, path planning, and real-time decision-making. With reliable operation, precise spatial awareness, and advanced automotive sensing capabilities, the Hesai AT360 enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Hesai AT360 lidar sensor: ultra-high channel count 360deg 3D lidar for autonomous driving. Ask price from Core Bolt India today. ",
            overviewTitle:
              "Hesai AT360 3D LiDAR for ADAS & Autonomous Vehicle Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-at360-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/AT360-011.png",
              "https://assets.core-bolt.com/website-assets/AT360-01.png",
              "https://assets.core-bolt.com/website-assets/AT-360-2.png",
              "https://assets.core-bolt.com/website-assets/AT360-3.jpg",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "hesai",
            price: null,
            features: [
              "FOV: 120° x 18°",
              "Ranging Capability: 300m",
              "Point Rate :2,850,000 [Single Return]",
              "Angular Resolution:0.06° (H) x 0.05° (V)",
              "Protection: IP6k7 and IP6k9k",
              "CERTIFICATIONS: Class 1 Eye Safety, ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-at-1440-lidar-sensor",
            name: "HESAI AT1440",
            description:
              "The HESAI AT1440 utilizes cutting-edge high-efficiency light sensing and ultra-high parallel processing technologies, delivering a lidar channel count that is 10 times higher than comparable products on the market.",
            metaTitle: "Hesai AT1440 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the Hesai AT1440 lidar sensor: ultra-high resolution automotive lidar with 10x channel count. Ask price from Core Bolt India today. ",
            metaKeywords:
              "Hesai AT1440, Hesai AT1440 LiDAR, Hesai AT1440 LiDAR Sensor, 1440 Channel LiDAR, Ultra High Resolution LiDAR, Automotive Grade LiDAR, ADAS LiDAR Sensor, Autonomous Driving LiDAR",
            overview:
              " HESAI AT 1440 (Ask Price). The Hesai AT1440 LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent transportation systems, and next-generation mobility applications. Featuring 1440-channel LiDAR technology and ultra-high-resolution sensing capabilities, it delivers exceptional environmental perception, accurate object detection, and detailed point cloud generation for intelligent vehicle platforms. Built for applications requiring long-range object detection, 3D perception, obstacle recognition, lane-level awareness, and autonomous navigation, the Hesai AT1440 provides reliable sensing performance in complex driving environments. Its advanced LiDAR architecture helps improve situational awareness, navigation accuracy, and overall vehicle safety. The Hesai AT1440 LiDAR is well suited for autonomous vehicles, intelligent transportation projects, smart mobility platforms, and advanced driver assistance systems. Its ultra-high-resolution sensing capabilities support collision avoidance, environmental monitoring, path planning, and real-time decision-making. With precise spatial awareness, advanced automotive sensing technology, and reliable long-range performance, the Hesai AT1440 enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Hesai AT1440 lidar sensor: ultra-high resolution automotive lidar with 10x channel count. Ask price from Core Bolt India today. ",
            overviewTitle:
              "Hesai AT1440 Ultra-High-Resolution 3D LiDAR for Autonomous Vehicle Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-at1440-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/AT1440-00.png",
              "https://assets.core-bolt.com/website-assets/AT1440-11.png",
              "https://assets.core-bolt.com/website-assets/AT1440-2.jpg",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "hesai",
            price: null,
            features: [
              "FOV: 120° x 18°",
              "Ranging Capability: 300m",
              "Point Rate : 34,000,000[Single Return]",
              "Angular Resolution: 0.05° (H) x 0.0125° (V)",
              "Protection: IP6k7 and IP6k9k",
              "CERTIFICATIONS: Class 1 Eye Safety, ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-at128-automotive-lidar-sensor",
            name: " HESAI AT-128",
            description:
              "The Hesai AT-128 LiDAR is an auto-grade 120° high-resolution long-range LiDAR designed for autonomous driving. It delivers superior accuracy, wide coverage, and reliable performance for safe and intelligent mobility.",
            metaTitle:
              "Hesai AT128 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the Hesai AT-128 lidar sensor: auto-grade 120deg long-range 3D lidar for driving and ADAS. Ask price from Core Bolt India today.",
            metaKeywords:
              " Hesai AT128, Hesai AT128 LiDAR, Hesai AT128 LiDAR Sensor, 128 Channel LiDAR, Automotive Grade LiDAR, ADAS LiDAR Sensor, Long Range LiDAR, LiDAR for Autonomous Vehicles",
            overview:
              "HESAI AT-128 (₹2,91,986). The Hesai AT128 LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent transportation systems, and next-generation mobility applications. Featuring 128-channel LiDAR technology, it delivers accurate environmental perception, reliable object detection, and high-resolution point cloud generation for intelligent vehicle platforms. Built for applications requiring long-range object detection, 3D perception, obstacle recognition, lane-level awareness, and autonomous navigation, the Hesai AT128 provides dependable sensing performance in complex driving environments. Its advanced LiDAR capabilities help improve situational awareness, navigation accuracy, and overall vehicle safety. The Hesai AT128 LiDAR is well suited for autonomous vehicles, intelligent transportation projects, smart mobility platforms, and advanced driver assistance systems. Its high-resolution sensing performance supports collision avoidance, environmental monitoring, path planning, and real-time decision-making. With precise spatial awareness, reliable long-range sensing, and advanced automotive LiDAR technology, the Hesai AT128 enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Hesai AT-128 lidar sensor: auto-grade 120deg long-range 3D lidar for driving and ADAS. Ask price from Core Bolt India today.",
            overviewTitle:
              "Hesai AT128 3D LiDAR for ADAS & Autonomous Vehicle Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-at128-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/AT1281.png",
              "https://assets.core-bolt.com/website-assets/AT-128-1m.jpg",
              "https://assets.core-bolt.com/website-assets/AT-128-2.gif",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/AT128P_User_Manual_A02-en-251110.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 291986.0,
            features: [
              "FOV: 120° × 25.4°",
              "WEIGHT :940",
              "Dimensions:W 136 x D 114 x H 49 mm",
              "Ranging Capability:210 m @10% Reflectivity",
              "Point Rate : 1,536,000 [Single Return]",
              "Angular Resolution: 0.1° (H) x 0.2° (V)",
              "Power Consumption: 13.5 W",
              "Protection: IP6k7 and IP6k9k",
              "CERTIFICATIONS: Class 1 Eye Safety, ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-atx-lidar-sensor",
            name: "HESAI ATX",
            description:
              "Hesai ATX LiDAR sensor for ADAS, autonomous driving and intelligent mobility — long-range 3D perception with high-resolution point cloud generation.",
            metaTitle: "Hesai ETX 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the Hesai ATX lidar sensor: long-range 3D perception with high-res point cloud for ADAS. Ask price from Core Bolt India today",
            metaKeywords:
              "Hesai ATX, Hesai ATX LiDAR, Hesai ATX LiDAR Sensor, Hesai ATX Price, Hesai ATX Specifications, Automotive Grade LiDAR, ADAS LiDAR, Long Range LiDAR, High Resolution LiDAR",
            overview:
              "HESAI ATX (Ask Price). The Hesai ATX LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent transportation systems, and next-generation mobility applications. Its high-resolution sensing technology delivers accurate environmental perception, reliable object detection, and real-time point cloud generation for intelligent vehicle platforms. Built for applications requiring long-range object detection, 3D perception, obstacle recognition, environmental awareness, and autonomous navigation, the Hesai ATX provides dependable sensing performance in complex driving environments. Its advanced LiDAR capabilities help improve situational awareness, navigation accuracy, and vehicle safety. The Hesai ATX LiDAR is well suited for autonomous vehicles, intelligent transportation projects, smart mobility platforms, and advanced driver assistance systems. Its high-performance sensing capabilities support collision avoidance, environmental monitoring, path planning, and real-time decision-making. With precise spatial awareness, reliable sensing performance, and advanced automotive LiDAR technology, the Hesai ATX enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Hesai ATX lidar sensor: long-range 3D perception with high-res point cloud for ADAS. Ask price from Core Bolt India today",
            overviewTitle:
              " Hesai ATX 3D LiDAR for ADAS & Autonomous Vehicle Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-atx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/ATX-00.png",
              "https://assets.core-bolt.com/website-assets/ATX(10).png",
              "https://assets.core-bolt.com/website-assets/ATX(7).png",
              "https://assets.core-bolt.com/website-assets/ATX-4.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/ATX_User_Manual_A07-en-251210.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: null,
            features: [
              "FOV : 120° x 20°",
              "Channels :256 (Highest Supported Channels)",
              "Ranging Capability: 230 m @10% Reflectivity",
              "Point Rate :MAX 3,840,000 [Single Return]",
              "Angular Resolution:0.08° (H) x 0.05° (V) Finest",
              "Power Consumption: 8 W",
              "Dimensions:W 100 x D 100 x H 30 mm [Min Surface Window 25 mm]",
              "Weight : 360 g",
              "Protection: IP6k7 and IP6k9k",
              "CERTIFICATIONS: Class 1 Eye Safety, ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-ftx-lidar-sensor",
            name: "HESAI FTX",
            description:
              "Redefining Short-Range Blind Spot Perception Compact Size, High Performance With significant enhancements in the transceiver modules, FTX delivers industry-leading resolution in an ultra-compact form, redefining short-range blind spot coverag",
            metaTitle:
              "Hesai FTX Forward-Facing LiDAR for ADAS",
            metaDescription:
              "Buy the Hesai FTX lidar sensor: ultra-compact blind spot lidar with leading short-range detail. Ask price from Core Bolt India today. ",
            metaKeywords:
              " Hesai FTX, Hesai FTX LiDAR, Hesai FTX LiDAR Sensor, Hesai FTX Price, Hesai FTX Specifications, Automotive Grade LiDAR, Forward Facing LiDAR, ADAS LiDAR Sensor",
            overview:
              "HESAI FTX (Ask Price). The Hesai FTX LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent transportation systems, and next-generation mobility applications. Its high-resolution sensing technology delivers accurate environmental perception, reliable object detection, and real-time point cloud generation for intelligent vehicle platforms. Built for applications requiring long-range object detection, 3D perception, obstacle recognition, environmental awareness, and autonomous navigation, the Hesai FTX provides dependable sensing performance in complex driving environments. Its advanced LiDAR capabilities help improve situational awareness, navigation accuracy, and vehicle safety. The Hesai FTX LiDAR is well suited for autonomous vehicles, intelligent transportation projects, smart mobility platforms, and advanced driver assistance systems. Its high-performance sensing capabilities support collision avoidance, environmental monitoring, path planning, and real-time decision-making. With precise spatial awareness, reliable sensing performance, and advanced automotive LiDAR technology, the Hesai FTX enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Hesai FTX lidar sensor: ultra-compact blind spot lidar with leading short-range detail. Ask price from Core Bolt India today. ",
            overviewTitle:
              " Hesai FTX 3D LiDAR for ADAS & Autonomous Vehicle Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-ftx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/FTX-00.png",
              "https://assets.core-bolt.com/website-assets/FTX-1main.jpg",
              "https://assets.core-bolt.com/website-assets/FTX-2.gif",
            ],
            fileUrl: null,
            category: "lidar",
            price: null,
            subcategory: "hesai",
            features: [
              "FOV: upto  180° × 140°",
              "Ranging Capability : 30 m @ 10% Reflectivity",
              "Point Rate:492,000 pts/s [Single Return]",
              "Dimensions :L 74 × D 50 × H 30 mm(exposed window size)",
              "Weight: Approx  200 g",
              "Pixel Resolution : 256 (H) x 192 (V)",
              "Power:<6 W",
              "Protection:IP6K7 & IP6K9K",
              "CERTIFICATIONS: Class 1 Eye Safety, ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-jt-16-lidar-sensor",
            name: "HESAI JT-16",
            description:
              "Miniature Size, Versatile Functionality JT16 is a mini 3D lidar, designed for robotics and industrial applications. It has an ultra-compact size that is 70% smaller in volume than similar products, enabling flexible and seamless installation. With a 360° x 40° field of view, the JT16 elevates perception from 2D to 3D, empowering a broader range of robotics and industrial applications.",
            metaTitle:
              "Hesai JT16 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Hesai JT16 mini lidar sensor at Rs 1,17,114. 360deg x 40deg FoV 3D lidar, 70% smaller, for robotics. Order online from Core Bolt India today.",
            metaKeywords:
              " Hesai JT16, Hesai JT16 LiDAR, Hesai JT16 LiDAR Sensor, Hesai JT16 Price, Hesai JT16 Specifications, 16 Channel LiDAR, Industrial LiDAR for Robotics, Autonomous Navigation LiDAR",
            overview:
              "HESAI JT-16 (₹1,17,114). CoreBolt provides the Hesai JT16 LiDAR, a compact and high-performance 3D LiDAR sensor designed for robotics, autonomous mobile robots (AMRs), automated guided vehicles (AGVs), industrial automation, mapping, and intelligent navigation applications. Built for reliable environmental perception, the JT16 delivers accurate real-time point cloud data, enabling efficient object detection, localization, obstacle avoidance, and autonomous operation in dynamic environments. The Hesai JT16 features a 16-channel LiDAR architecture that generates detailed 3D environmental data for navigation, SLAM, mapping, and robotic perception systems. Its lightweight design, stable performance, and high-precision sensing capabilities make it suitable for mobile robotics platforms, warehouse automation systems, smart manufacturing environments, and research applications requiring dependable spatial awareness. Whether deployed in autonomous robots, logistics automation, industrial vehicles, or intelligent transportation systems, the Hesai JT16 supports real-time mapping, route planning, collision avoidance, and environmental monitoring. Designed for seamless integration with robotics software frameworks, AI edge computing platforms, and autonomous systems, the JT16 helps accelerate the development and deployment of advanced robotic and automation solutions. From robotics and warehouse automation to SLAM-based navigation and industrial sensing applications, the Hesai JT16 LiDAR delivers the accuracy, reliability, and performance required for next-generation intelligent systems.The Hesai ATX LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent transportation systems, and next-generation mobility applications. Its high-resolution sensing technology delivers accurate environmental perception, reliable object detection, and real-time point cloud generation for intelligent vehicle platforms. Built for applications requiring long-range object detection, 3D perception, obstacle recognition, environmental awareness, and autonomous navigation, the Hesai ATX provides dependable sensing performance in complex driving environments. Its advanced LiDAR capabilities help improve situational awareness, navigation accuracy, and vehicle safety. The Hesai ATX LiDAR is well suited for autonomous vehicles, intelligent transportation projects, smart mobility platforms, and advanced driver assistance systems. Its high-performance sensing capabilities support collision avoidance, environmental monitoring, path planning, and real-time decision-making. With precise spatial awareness, reliable sensing performance, and advanced automotive LiDAR technology, the Hesai ATX enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Hesai JT16 mini lidar sensor at Rs 1,17,144. 360deg x 40deg FoV 3D lidar, 70% smaller, for robotics. Order online from Core Bolt India today.",
            overviewTitle:
              "Hesai JT16 3D LiDAR Sensor for Robotics & Automation",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-jt16-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/JT16-00.png",
              "https://assets.core-bolt.com/website-assets/JT-16-5.jpg",
              "https://assets.core-bolt.com/website-assets/JT-16-3.png",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/JT16.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 117114.0,
            features: [
              "FOV: 360° × 40°",
              "Ranging Capability: 30 m @10% reflectivity[100 m Max] ",
              "Dimensions: Φ55 × H64 mm (Diameter × Height)",
              "Weight: <200 g",
              "Angular Resolution: 0.6° (H) × 2.67° (V)",
              "Power: 4.3 W",
              "Scanning frequency:5 Hz; 10 Hz",
              "Protection: IP6K7 & IP6K9K",
              "Built Inside : IMU",
              "CERTIFICATIONS: Class 1 Eye Safety",
            ],
          },
          {
            id: "hesai-jt128-lidar-sensor",
            name: "HESAI JT-128",
            description:
              "Small Size, Boundless Possibilities, JT128 is a mini hyper-hemispherical 3D lidar specifically designed for robotics and industrial applications. It features 360° x 189° ultra-wide field of view.",
            overview:
              "HESAI JT-128 (₹1,67,797). The Hesai JT128 LiDAR is a high-performance 128-channel 3D LiDAR sensor designed for robotics, industrial automation, autonomous systems, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, and high-resolution point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, autonomous navigation, obstacle detection, localization, mapping, and environmental awareness, the Hesai JT128 provides reliable sensing performance and enhanced situational awareness. Its high-resolution LiDAR capabilities help improve navigation accuracy, operational efficiency, and decision-making. The Hesai JT128 LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, and industrial mobility applications. Its advanced perception capabilities support collision avoidance, path planning, environmental monitoring, and real-time navigation. With precise spatial awareness, reliable sensing performance, and advanced 3D LiDAR technology, the Hesai JT128 enables intelligent automation systems to operate safely and efficiently across a wide range of robotics and industrial applications. Buy the Hesai JT128 lidar sensor at Rs 1,67,797. Mini hyper-hemispherical 3D lidar, 360deg x 189deg FoV. Order online from Core Bolt India today. ",
            metaTitle: "Hesai JT128 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Hesai JT128 lidar sensor at Rs 1,67,797. Mini hyper-hemispherical 3D lidar, 360deg x 189deg FoV. Order online from Core Bolt India today. ",
            metaKeywords:
              " Hesai JT128, Hesai JT128 LiDAR, Hesai JT128 LiDAR Sensor, Hesai JT128 Price, Hesai JT128 Specifications, 128 Channel LiDAR, Industrial LiDAR for Robotics, SLAM LiDAR Sensor",
            overviewTitle:
              " Hesai JT128 LiDAR Sensor for Robotics, Automation & Autonomous Systems ",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-jt128-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/JT128-00.png",
              "https://assets.core-bolt.com/website-assets/JT-128-4.png",
              "https://assets.core-bolt.com/website-assets/JT-128-3.gif",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/JT128_User_Manual_J01-en-250920.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 167797.0,
            features: [
              "FOV: 360° × 189°",
              "Point Rate : 1,152,000 pts/s [Single Return] ",
              "Ranging Capability: 40 m @10% reflectivity[60 m Max] ",
              "Dimensions: Φ62.5 × H73 mm (Diameter × Height)",
              "Weight: <250g",
              "Angular Resolution: 0.4° (H) × 0.74° (V)",
              "Noise : <30 dB",
              "Channels : 128",
              "Protection: IPX7",
              "CERTIFICATIONS: Class 1 Eye Safety",
            ],
          },
          {
            id: "hesai-xt16-lidar-sensor",
            name: "HESAI XT16",
            description:
              "Minimum Range of ZERO Objects can be effectively detected even if directly touching the sensor’s enclosure; blind range of zero.",
            metaTitle:
              "Hesai XT16 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Hesai XT16 lidar sensor at Rs 4,26,119. Zero minimum range 360deg 3D lidar for mapping and robotics. Order online from Core Bolt India today.",
            metaKeywords:
              "hesai XT16 lidars, hesai xt16 lidar price, hesai xt16 lidar specifications, hesai xt16 lidar review",
            overview:
              "HESAI XT16 (₹4,26,119). The Hesai XT16 LiDAR is a high-performance 16-channel 3D LiDAR sensor designed for robotics, industrial automation, autonomous navigation, and mapping applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, mapping, and high-quality point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, and autonomous navigation, the Hesai XT16 provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve navigation accuracy, operational efficiency, and intelligent decision-making. The Hesai XT16 LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, industrial mobility solutions, and mapping applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, and intelligent automation. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Hesai XT16 enables intelligent systems to operate safely and efficiently across a wide range of robotics and industrial automation applications. Buy the Hesai XT16 lidar sensor at Rs 4,26,119. Zero minimum range 360deg 3D lidar for mapping and robotics. Order online from Core Bolt India today.",
            overviewTitle:
              "Hesai XT16 LiDAR Sensor for Robotics, Mapping & Autonomous Navigation",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-xt16-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/XT16-00.png",
              "https://assets.core-bolt.com/website-assets/XT16-5.png",
              "https://assets.core-bolt.com/website-assets/XT16-4.gif",
              "https://assets.core-bolt.com/website-assets/XT16-3.gif",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/PandarXT-16_User_Manual_.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 426119.0,
            features: [
              " Ranging precision :0.5 cm 1σ",
              " Ranging accuracy : ±1 cm ",
              " Point Rate : 320,000 [Single Return] ",
              " FOV : 360° x 30°",
              " Angular Resolution : 0.18° (H) x 2° (V)",
              " Dimensions : Φ 76 x H 103.2 mm ",
              " Weight : 800 g ",
              "Protection: IP6K7 ",
              "CERTIFICATIONS: Class 1 Eye Safety",
            ],
          },
          {
            id: "hesai-xt32-lidar-sensor",
            name: "HESAI XT32",
            description:
              "XT32 continuously outputs point cloud with valid detections even when the object directly touches the lidar.",
            metaTitle:
              "Hesai XT32 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Hesai XT32 lidar sensor at Rs 5,37,034. 32-channel 360deg lidar with zero blind range for automation. Order online from Core Bolt India today.",
            metaKeywords:
              " Hesai XT32, Hesai XT32 LiDAR, Hesai XT32 LiDAR Sensor, Hesai XT32 Price, Hesai XT32 Specifications, 32 Channel LiDAR, LiDAR for Robotics, LiDAR for AMR & AGV",
            overview:
              "HESAI XT32 (₹5,37,034). The Hesai XT32 LiDAR is a high-performance 32-channel 3D LiDAR sensor designed for robotics, industrial automation, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, mapping, and high-quality point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, and autonomous navigation, the Hesai XT32 provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve navigation accuracy, operational efficiency, and intelligent decision-making. The Hesai XT32 LiDAR is well suited for robotic platforms, warehouse automation systems, industrial mobility solutions, logistics automation, and smart manufacturing applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, and intelligent automation. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Hesai XT32 enables intelligent systems to operate safely and efficiently across a wide range of robotics and industrial automation applications. Buy the Hesai XT32 lidar sensor at Rs 5,37,034. 32-channel 360deg lidar with zero blind range for automation. Order online from Core Bolt India today.",
            overviewTitle:
              " Hesai XT32 3D LiDAR for Robotics & Industrial Automation",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-xt32-lidar-sensor.png",

            images: [
              "https://assets.core-bolt.com/website-assets/XT16-00.png",
              "https://assets.core-bolt.com/website-assets/XT16-5.png",
              "https://assets.core-bolt.com/website-assets/XT16-4.gif",
              "https://assets.core-bolt.com/website-assets/XT16-3.gif",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/PandarXT32_User_Manual.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 537034.0,
            features: [
              "FOV: 360° ×  31°",
              "Ranging Capability: 0.5 ~ 300 m",
              "Point Rate: 640,000 pts/s (single return) ",
              "Dimensions : Φ 76 mm × H 103.2  mm",
              "Weight: Approx.800g",
              "Angular Resolution: 0.18° (H) × 1° (V)",
              "Protection: IP6K7",
              "CERTIFICATIONS: Class 1 Eye Safety",
            ],
          },
          {
            id: "hesai-xt32m-lidar-sensor",
            name: "HESAI XT32M",
            description:
              "The Hesai XT32M LiDAR is a high-precision 360° mid-range LiDAR delivering accurate 3D sensing and stable performance. Perfect for autonomous driving and robotics, it ensures reliable environmental perception and mapping.",
            metaTitle:
              "Hesai XT32M High-Res LiDAR for Robotics",
            metaDescription:
              "Buy the Hesai XT32M lidar sensor at Rs 9,33,153. High-precision 360deg mid-range 3D lidar for AVs and robots. Order online from Core Bolt India today. ",
            metaKeywords:
              " Hesai XT32M, Hesai XT32M LiDAR, Hesai XT32M LiDAR Sensor, Hesai XT32M Price, Hesai XT32M Specifications, 32 Channel LiDAR, High Resolution LiDAR, Industrial LiDAR for Robotics",
            overview:
              "HESAI XT32M (₹9,33,153). The Hesai XT32M LiDAR is a high-performance 32-channel 3D LiDAR sensor designed for robotics, industrial automation, autonomous systems, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, mapping, and high-resolution point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, autonomous navigation, and environmental awareness, the Hesai XT32M provides reliable sensing performance and enhanced situational awareness. Its high-resolution LiDAR capabilities help improve navigation accuracy, operational efficiency, and intelligent decision-making. The Hesai XT32M LiDAR is well suited for robotic platforms, warehouse automation systems, industrial mobility solutions, logistics automation, and smart manufacturing applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, and intelligent automation. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Hesai XT32M enables intelligent systems to operate safely and efficiently across a wide range of robotics and industrial automation applications. Buy the Hesai XT32M lidar sensor at Rs 9,33,153  High-precision 360deg mid-range 3D lidar for AVs and robots. Order online from Core Bolt India today. ",
            overviewTitle:
              "Hesai XT32M 3D LiDAR for Robotics & Industrial Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-xt32m-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/XT16-00.png",
              "https://assets.core-bolt.com/website-assets/XT16-5.png",
              "https://assets.core-bolt.com/website-assets/XT16-4.gif",
              "https://assets.core-bolt.com/website-assets/XT16-3.gif",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/XT32M.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 933153.0,
            features: [
              "FOV: 360° × 40.3°",
              "Range Precision:0.5 cm 1σ",
              "Accuracy : ±1 cm",
              "Point Rate : 640,000(single return)",
              "Dimensions : Φ 75 x H 93 mm",
              "Weight: Approx. 490 g",
              "Angular Resolution: 0.18° (H) × 1.3° (V)",
              "Protection: IP6K7 ",
              "CERTIFICATIONS: Class 1 Eye Safety",
            ],
          },
          {
            id: "hesai-ot128-lidar-sensor",
            name: "HESAI OT128",
            description:
              "The OT128 spinning lidar utilizes a simplified transceiver module design to significantly reduce the cost while still maintaining extremely high performance and reliability. The unique combination of high-performance 360-degree perception and affordability makes the OT128 the ideal lidar solution for scalable autonomous driving applications.",
            metaTitle:
              " Hesai OT128 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Hesai OT128 lidar sensor at Rs 2,010,602. 128-channel 360deg spinning lidar for autonomous perception. Order online from Core Bolt India today. ",
            metaKeywords:
              "Hesai OT128, Hesai OT128 LiDAR, Hesai OT128 LiDAR Sensor, Hesai OT128 Price, Hesai OT128 Specifications, 128 Channel LiDAR, Ultra High Resolution LiDAR, Industrial Mapping LiDAR",
            overview:
              "HESAI OT128 (₹2,010,602). The Hesai OT128 LiDAR is an advanced 128-channel 3D LiDAR sensor designed for robotics, industrial automation, mapping, autonomous systems, and intelligent mobility applications. Featuring ultra-high-resolution sensing technology, it delivers accurate environmental perception, real-time object detection, localization, mapping, and detailed point cloud generation for intelligent systems operating in complex environments. Built for applications requiring autonomous navigation, SLAM, obstacle detection, collision avoidance, and environmental awareness, the Hesai OT128 provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve navigation accuracy, mapping precision, and intelligent decision-making. The Hesai OT128 LiDAR is well suited for robotic platforms, mapping systems, warehouse automation, industrial mobility solutions, and smart manufacturing applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, and intelligent automation. With precise spatial awareness, ultra-high-resolution sensing, and advanced 3D LiDAR technology, the Hesai OT128 enables intelligent systems to operate safely and efficiently across a wide range of robotics, mapping, and industrial automation applications. Buy the Hesai OT128 lidar sensor at Rs 2,010,602  . 128-channel 360deg spinning lidar for autonomous perception. Order online from Core Bolt India today.",
            overviewTitle:
              "Hesai OT128 Ultra-High-Resolution 3D LiDAR for Robotics & Mapping",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-ot128-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/OT128-0.png",
              "https://assets.core-bolt.com/website-assets/OT-128-1main.jpg",
              "https://assets.core-bolt.com/website-assets/OT-128-3.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/OT128_User_Manual_O01-en-251110.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 2010602.0,
            features: [
              "FOV: 360° × 40°",
              "Ranging Capability : 200 m @10% Reflectivity[230 m Max].",
              "Point Rate : 3,456,000 [Single Return] , 6,912,000pts/s [Dual Return] ",
              "Angular Resolution : 0.1° (H) x 0.125° (V) ",
              " Power Consumption :29 W",
              "Dimensions : Φ 118 x H 132.3 mm",
              "Protection: IP6K7 & IP6K9K",
              "CERTIFICATIONS: Class 1 Eye Safety,ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-pandar128-lidar-sensor",
            name: "HESAI Pandar128",
            description:
              "The Hesai Pandar128 LiDAR is an auto-grade 128-channel, 360° long-range LiDAR offering high performance and precision. Ideal for autonomous driving, it ensures superior detection accuracy and reliable 3D perception.",
            metaTitle: "Hesai Pandar128 3D LiDAR Sensor for mapping and robotics",
            metaDescription:
              "Buy the Hesai Pandar128 lidar sensor: auto-grade 128-channel 360deg long-range driving lidar. Ask price from Core Bolt India today.",
            overview:
              "HESAI Pandar128 (Ask Price). The Hesai Pandar128 LiDAR is a high-performance 128-channel 3D LiDAR sensor designed for HD mapping, surveying, intelligent transportation, autonomous systems, and advanced mobility applications. Its high-resolution sensing technology delivers accurate environmental perception, real-time object detection, localization, mapping, and detailed point cloud generation for demanding applications. Built for applications requiring long-range object detection, high-precision mapping, surveying, environmental monitoring, and spatial data collection, the Hesai Pandar128 provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve mapping accuracy, data quality, and operational efficiency. The Hesai Pandar128 LiDAR is well suited for mobile mapping systems, surveying platforms, intelligent transportation projects, infrastructure inspection, and autonomous mobility applications. Its advanced perception capabilities support high-definition map creation, terrain modeling, corridor mapping, and real-time environmental analysis. With precise spatial awareness, long-range sensing performance, and advanced 3D LiDAR technology, the Hesai Pandar128 enables accurate data collection and intelligent decision-making across a wide range of mapping, surveying, and transportation applications. Buy the Hesai Pandar128 lidar sensor: auto-grade 128-channel 360deg long-range driving lidar. Ask price from Core Bolt India today.",
            overviewTitle:
              "Hesai Pandar128 LiDAR Sensor for HD Mapping, Surveying & Intelligent Mobility",
            metaKeywords:
              "Hesai Pandar128, Hesai Pandar128 LiDAR, Hesai Pandar128 LiDAR Sensor, Hesai Pandar128 Price, Hesai Pandar128 Specifications, 128 Channel LiDAR, Long Range LiDAR, LiDAR for HD Mapping & Surveying",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-pandar128-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/PANDAR128-00.png",
              "https://assets.core-bolt.com/website-assets/PANDAR-128-8.jpg",
              "https://assets.core-bolt.com/website-assets/PANDAR-128-9.jpg",
              "https://assets.core-bolt.com/website-assets/PANDAR-128-4.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Pandar128E3X_v4p5_User_Manual_128-en-251110.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: null,
            features: [
              "FOV: 360° × 40°",
              "Ranging Capability: 200 m @10% Reflectivity",
              "Point Rate: 3,456,000 [Single Return]6,912,000pts/s [Dual Return]",
              "Dimensions (Diameter × Height): Φ 116mm × 123.7 mm",
              "Angular Resolution: 0.1° (H) × 0.125° (V)",
              "Protection: IP6K7 & IP6K9K",
              "CERTIFICATIONS: Class 1 Eye Safety,ISO 26262 Compliant Development Process",
            ],
          },
          {
            id: "hesai-qt128-lidar-sensor",
            name: "HESAI QT128",
            description:
              "The QT128 spinning lidar utilizes a simplified transceiver module design to significantly reduce the cost while still maintaining extremely high performance and reliability. The unique combination of high-performance 360-degree perception and affordability makes the QT128 the ideal lidar solution for scalable autonomous driving applications.",
            metaTitle: "Hesai QT128 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              "Buy the Hesai QT128 lidar sensor at Rs 6,16,254. Short-range 360deg spinning lidar, strong cost-performance. Order online from Core Bolt India today.",
            metaKeywords: "hesai QT128 lidars, hesai qt128 price",
            overviewTitle: "Hesai QT128 3D LiDAR for Robotics, AMRs, Autonomous Systems & Industrial Automation. ",
            overview:
              "HESAI QT128 (₹6,16,254). The Hesai QT128 is a high-performance 3D LiDAR sensor designed for reliable environmental perception across robotics, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), autonomous systems, industrial automation, and intelligent mobility applications. Featuring a 128-channel architecture and wide field of view, the QT128 delivers detailed 3D point-cloud data that helps machines accurately detect, map, and understand their surroundings in real time. Engineered for applications requiring dense point-cloud coverage and dependable spatial awareness, it supports obstacle detection, object detection, localization, mapping, SLAM, collision avoidance, path planning, and autonomous navigation. Its compact design and advanced sensing capabilities make it suitable for integration into robotic platforms, autonomous vehicles, warehouse automation systems, mapping solutions, and other perception-driven applications. With high-resolution 3D sensing and reliable environmental coverage, the Hesai QT128 helps autonomous and intelligent systems achieve improved situational awareness, safer navigation, and dependable operation across demanding industrial and mobility environments. Buy the Hesai QT128 lidar sensor at Rs 6,16,254. Short-range 360deg spinning lidar, strong cost-performance. Order online from Core Bolt India today.",
            image:
              "https://assets.core-bolt.com/website-assets/hesai-qt128-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/QT128-0.png",
              "https://assets.core-bolt.com/website-assets/QT128-3.jpg",
              "https://assets.core-bolt.com/website-assets/QT128-1main.jpg",
              "https://assets.core-bolt.com/website-assets/QT128-2.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/QT128C2X_User_manual_.pdf",
            category: "lidar",
            subcategory: "hesai",
            price: 616254.0,
            features: [
              "FOV: 360° × 105°",
              "Ranging Capability:20 m @10% Reflectivity",
              "Point Rate: 1,152,000 [Single Return]",
              "Dimensions: Φ 87 × H 83.9mm",
              "Angular Resolution: 0.4° (H) x 0.4° (V)",
              "Protection: IP6K7 & IP6K9K",
              "CERTIFICATIONS: Class 1 Eye Safety,ISO 26262 Compliant Development Process",
            ],
          },
        ],
      },
      {
        id: "livox-3d-lidar-sensor",
        name: "Livox",
        description:
          "Livox focusses on providing scanning technology to help their customers to incorporate LiDAR sensors into their projects. Livox LiDAR sensors are being widely applied into industries such as autonomous driving, robots, 3D mapping, smart cities, safety and more.",
        image:
          "https://assets.core-bolt.com/website-assets/livox-lidar-sensor-hero-image.jpg",
       metaTitle:
              "Livox 3D LiDAR Sensor for robot navigation and mapping",
            metaDescription:
              " Explore Livox 3D LiDAR — mid-360S, AVIA, HAP, Mid-40, Mid-70 & Mid-100 — for robotics, drones, mapping & navigation. Get pricing & support from CoreBolt.",
           metaKeywords:
          "Livox 3D LiDAR Sensor, Livox LiDAR, Livox LiDAR price, Livox LiDAR India, Buy Livox LiDAR,  Livox sensor price, 3D LiDAR sensor, industrial lidar sensor , Livox mid-360S lidar, livox AVIA lidar, livox HAP lidar, livox Mid-40 lidar, livox Mid-70 lidar, livox Mid-100 lidar, livox TELE-15 lidar, Livox Mid-70 , Livox TELE-15",
        overview:
          "CoreBolt provides advanced Livox LiDAR solutions designed for robotics, industrial automation, autonomous vehicles, drones, intelligent transportation systems, and smart infrastructure applications. Powered by innovative Livox 3D LiDAR technology, these high-performance sensing solutions deliver accurate environmental perception, real-time object detection, mapping, localization, and navigation capabilities for next-generation autonomous systems. CoreBolt offer high-performance Livox LiDAR sensors such as the Livox mid-360S lidar, livox AVIA lidar, livox HAP lidar, livox Mid-40 lidar, livox Mid-70 lidar, livox Mid-100 lidar, livox TELE-15 lidar. These industrial-grade 3D LiDAR sensors generate high-density point cloud data with exceptional accuracy and reliability, enabling precise environmental awareness in complex and dynamic operating environments. Whether deploying Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, drones, autonomous vehicles, or smart manufacturing solutions, Livox LiDAR technologies provide reliable performance for demanding applications. Designed to support SLAM, obstacle detection, localization, 3D mapping, and autonomous navigation, Livox sensors help accelerate the development and deployment of intelligent robotic and automation systems while simplifying LiDAR integration with AI edge computing platforms.",
        overviewTitle:
          "Livox 3D LiDAR Sensors for Robotics, Automation & Autonomous Systems",
        products: [
          {
            id: "livox-mid-360-lidar-sensor",
            name: "LIVOX Mid-360S",
            description:
              "mid-360S is the latest generation of Livox LiDAR for low speed robotics. This new product inherits the cost-effectiveness of the Livox Mid series and delivers 3D perception in 360 degrees. Compact and lightweight, this LiDAR module is easy to install. The Mid-360S is optimized based on the navigation and obstacle avoidance requirements of mobile robots. This allows you to use the LiDAR with algorithms to deliver a wide range of functions such as SLAM and obstacle avoidance.",
            metaTitle:
              "Livox MID-360S 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the Livox Mid-360S lidar sensor at Rs 1,02,508. Compact 360deg x 59deg 3D lidar for robotics and AMRs. Order online from Core Bolt India today.",
            metaKeywords:
              "Livox Mid-360S, Livox Mid-360S, Livox Mid-360S LiDAR, Livox Mid-360S LiDAR Sensor, Livox Mid-360S Price, 360 Degree LiDAR Sensor, LiDAR for Robotics, LiDAR for Drones, Livox Mid-360S Datasheet",
            overviewTitle:
              " Livox Mid-360S 3D LiDAR for Robotics, Drones & Autonomous Systems",
            overview:
              "LIVOX MID-360S (₹1,02,508). The Livox Mid-360S is an advanced 360-degree 3D LiDAR sensor designed for robotics, drones, autonomous navigation, mapping, and intelligent automation applications. Its compact design and advanced sensing capabilities deliver accurate environmental perception, real-time object detection, localization, and high-density point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, 3D mapping, and autonomous navigation, the Livox Mid-360S LiDAR provides reliable sensing performance and enhanced situational awareness. Its wide field of view and high-resolution perception capabilities help improve navigation accuracy and operational efficiency. The Livox Mid-360S is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), drones, unmanned systems, warehouse automation, and smart mobility applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, reliable sensing performance, and advanced 3D LiDAR technology, the Livox Mid-360S enables intelligent systems to operate safely and efficiently across a wide range of robotics, drone, and automation applications. Buy the Livox Mid-360S lidar sensor at Rs 1,02,508. Compact 360deg x 59deg 3D lidar for robotics and AMRs. Order online from Core Bolt India today.",
            image:
              "https://assets.core-bolt.com/website-assets/livox-mid-360-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/MID-360-3.png",
              "https://assets.core-bolt.com/website-assets/MID-360-10.jpg",
              "https://assets.core-bolt.com/website-assets/MID-360-1.jpg",
              "https://assets.core-bolt.com/website-assets/MID-360-4.webp",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Livox_Mid-360_User_Manual_EN.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: 102508.0,
            features: [
              "FOV: 360° * 59°",
              "Detection Range: 40 m @10% reflectivity , 70 m @ 80% reflectivity. ",
              "@10% Reflectivity: 40m ",
              "Point Cloud Density:40-line",
              "L x W x H (mm):65*65*60mm ",
              "Weight: Approx. 265g ",
              "Power Supply Voltage Range :9-27V DC",
              "Operating Temperature: -20°C to +55°C",
              "IP Rating : IP67",
            ],
          },
        
          {
            id: "livox-mid-360l-lidar-sensor",
            name: "LIVOX MID-360L",
            description:
              "The Livox MID-360L is a compact 3D LiDAR sensor featuring 360° horizontal field-of-view coverage and a detection range of up to 45 metres at 10% target reflectivity under specified conditions. With a built-in IMU, IP67-rated protection, and real-time 3D point cloud output, it is designed for mobile robots, autonomous navigation, mapping, localization, and obstacle avoidance in industrial and outdoor environments.",
            metaTitle:
              "Livox MID-360L LiDAR Sensor | 360° 3D Perception",
            metaDescription:
              "Explore the Livox MID-360L LiDAR sensor with 360° horizontal coverage, compact design and reliable 3D perception for mobile robots and autonomous systems.",
            metaKeywords:
              "Livox MID-360L, MID-360L LiDAR, 3D LiDAR sensor, 360 degree LiDAR, compact LiDAR sensor, mobile robot LiDAR, autonomous robot perception, obstacle avoidance sensor, robotics LiDAR",
            overviewTitle:
              " Livox Mid-360L 3D LiDAR for Robotics, Drones & Autonomous Systems",
            overview:
              "The Livox MID-360L LiDAR sensor is a compact 3D sensing solution designed for robotics, autonomous systems, and industrial applications. It provides 360° horizontal field-of-view coverage to help machines perceive their surroundings and generate 3D environmental data. Its compact design makes it suitable for integration into mobile robots, autonomous mobile robots (AMRs), unmanned systems, and intelligent automation platforms. The MID-360L supports applications such as obstacle detection, navigation, mapping, and real-time environmental perception, helping developers build reliable perception systems for complex operating environments.",
            image:
              "https://assets.core-bolt.com/website-assets/livox-mid-360l-lidar-sensor.webp",
            images: [
              "https://assets.core-bolt.com/website-assets/livox-mid-360l-lidar-sensor.webp",
              "https://assets.core-bolt.com/website-assets/mid360l.gif",
              "https://assets.core-bolt.com/website-assets/mid360l-1.gif",
              "https://assets.core-bolt.com/website-assets/mid360l-2.gif",
              
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Livox_Mid-360L_User_Manual_en.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: null,
            features:
[
    "FOV: 360° × 44°",
    "Detection Range: 45 m @ 10% reflectivity (typical), 100 m cut-off range",
    "Minimum Detection Range: 0.1 m",
    "Point Cloud Rate: 100,000 points/s",
    "L × W × H (mm): 65 × 65 × 63 mm",
    "Weight: 245 g",
    "Power Supply Voltage Range: 12–27 V DC",
    "Operating Temperature: -20°C to +65°C",
    "IP Rating: IP67"
]
          },
          {
            id: "livox-avia-lidar-sensor",
            name: "LIVOX AVIA",
            description:
              "The Livox Avia combines compact and lightweight design with improved detection range and efficiency, featuring an FOV greater than 70°. Its triple-echo and dual-scanning modes are ideal for use cases such as mapping, powerline surveying, smart cities and other applications.",
            metaTitle:
              " ",
            metaDescription:
              "Buy the Livox Avia lidar sensor at Rs 2,00,139. Triple-echo dual-scan 70deg FoV lidar for mapping and surveys. Order online from Core Bolt India today.  ",
            metaKeywords:
              " Livox AVIA, Livox AVIA LiDAR, Livox AVIA LiDAR Sensor, Livox AVIA Price, Livox AVIA Specifications, High Resolution LiDAR, LiDAR for Robotics, Drone LiDAR Sensor",
            overviewTitle:
              "Livox AVIA 3D LiDAR for Robotics, Drones & Industrial Applications ",
            overview:
              " LIVOX AVIA (₹2,00,139). The Livox AVIA LiDAR is a high-performance 3D LiDAR sensor designed for robotics, drones, industrial automation, mapping, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, and high-density point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, 3D mapping, and autonomous navigation, the Livox AVIA provides reliable sensing performance and enhanced situational awareness. Its high-resolution LiDAR capabilities help improve navigation accuracy, environmental awareness, and operational efficiency. The Livox AVIA LiDAR is well suited for robotic platforms, UAVs, drone mapping systems, warehouse automation, infrastructure inspection, and smart mobility applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Livox AVIA enables intelligent systems to operate safely and efficiently across a wide range of robotics, drone, and industrial automation applications. Buy the Livox Avia lidar sensor at Rs 2,00,139 . Triple-echo dual-scan 70deg FoV lidar for mapping and surveys. Order online from Core Bolt India today.  ",

            image:
              "https://assets.core-bolt.com/website-assets/livox-avia-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/AVIA-1.png",
              "https://assets.core-bolt.com/website-assets/AVIA-3.webp",
              "https://assets.core-bolt.com/website-assets/AVIA-5.jpg",
              "https://assets.core-bolt.com/website-assets/AVIA-4.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/LivoxAvia_QuickStartGuide_V1.4.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: 200139.0,
            features: [
              "Lightweight and Compact: 498g",
              "Maximum Detection Range: 450m ",
              "FOV for Non-repetitive Scanning: 70.4° * 77.2°",
              "FOV for Repetitive Line Scanning: 70.4° * 4.5°",
              "Maximum number of returns : Triple-echo",
              "Point Rate: ≥ 240,000",
              "Range Precision: 2cm ",
              "IP Rating: IP67 ",
            ],
          },
          {
            id: "livox-hap-lidar-sensor",
            name: "LIVOX HAP",
            description:
              "Developed by Livox for over two years, Livox HAP is our first automotive-grade lidar designed for intelligent driving assistance systems. HAP meets upto 74 items of the automotive-grade reliability tests, and began serial production for OEMs such as Xpeng and FAW Jiefang since 2021 at Livox’s own brand-new automotive-grade manufacturing center, helping customers build industry-leading smart driving systems that deliver superior safety and comfort.",
            metaTitle: "Livox HAP 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the Livox HAP lidar sensor at Rs 2,03,442. Automotive-grade 120deg x 25deg forward lidar for ADAS. Order online from Core Bolt India today.",
            metaKeywords:
              "Livox HAP, Livox HAP LiDAR, HAP LiDAR, Livox HAP LiDAR Sensor, Livox HAP Price, Livox HAP Specifications, Automotive LiDAR Sensor, Autonomous Driving LiDAR, ADAS LiDAR Sensor, Vehicle Perception LiDAR, LiDAR for Intelligent Mobility, Automotive Grade LiDAR, Livox Automotive LiDAR",
            overviewTitle:
              "Livox HAP LiDAR Sensor for Autonomous Driving, ADAS & Intelligent Mobility ",
            overview:
              "LIVOX HAP (₹2,03,442). The Livox HAP LiDAR is an advanced automotive-grade 3D LiDAR sensor designed for ADAS, autonomous driving, intelligent mobility, and next-generation vehicle perception applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, and high-density point cloud generation for intelligent transportation systems. Built for applications requiring vehicle perception, obstacle detection, collision avoidance, 3D perception, and autonomous navigation, the Livox HAP provides reliable sensing performance and enhanced situational awareness. Its high-resolution LiDAR capabilities help improve driving safety, navigation accuracy, and intelligent decision-making. The Livox HAP LiDAR is well suited for autonomous vehicles, advanced driver assistance systems, smart mobility platforms, and intelligent transportation projects. Its advanced perception capabilities support real-time environmental monitoring, path planning, traffic awareness, and autonomous operation. With precise spatial awareness, dependable sensing performance, and advanced automotive LiDAR technology, the Livox HAP enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the Livox HAP lidar sensor at Rs 2,03,442 . Automotive-grade 120deg x 25deg forward lidar for ADAS. Order online from Core Bolt India today.",

            image:
              "https://assets.core-bolt.com/website-assets/livox-hap-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/HAP-11.jpg",
              "https://assets.core-bolt.com/website-assets/HAP-1.webp",
              "https://assets.core-bolt.com/website-assets/HAP-4.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/HAP.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: 203442.0,
            features: [
              "Detection range: 150m @10% ",
              "FOV: 120° x 25°  ",
              "Equivalent Point Cloud density  : 144 lines",
              "Angular Resolution: 0.18° x 0.23° ",
              "Point rate: 452,000 pts/s ",
              "FPS: 10 Hz ",
              "Weight: Approx 1120 g ",
              "Operating Temperature: -40°C ~ +85°C",
              "IP Rating : IP67",
            ],
          },
          {
            id: "livox-mid-40-lidar-sensor",
            name: "LIVOX MID-40",
            description:
              "The Livox Mid-40 LiDAR sensor is incredibly cost effective. It detects objects as far as 260 meters away [1] and uses an advanced non-repetitive scanning pattern to deliver highly accurate details in the FOV. A compact body enables users to easily embed units into existing designs for greater flexibility and performance. The Mid-40 has been mass-produced and is ready to ship immediately to facilitate uses in autonomous driving, robotics, mapping, security, and other areas from small batch testing to large-scale applications.",
            metaTitle:
              " Livox Mid-40 High-Precision LiDAR for Mapping",
            metaDescription:
              "Buy the Livox Mid-40 lidar sensor: cost-effective 260 m non-repetitive scanning lidar for robots. Ask price from Core Bolt India today. ",
            metaKeywords:
              "Livox Mid-40, Livox Mid-40 LiDAR, Livox Mid-40 LiDAR Sensor, Livox Mid-40 Price, Livox Mid-40 Specifications, Compact LiDAR Sensor, High Precision LiDAR",
            overviewTitle:
              "Livox HAP LiDAR Sensor for Autonomous Driving, ADAS & Intelligent Mobility ",
            overview:
              "LIVOX MID-40 (Ask Price). The Livox Mid-40 LiDAR is a compact and high-precision 3D LiDAR sensor designed for robotics, mapping, industrial automation, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, autonomous navigation, and environmental awareness, the Livox Mid-40 provides reliable sensing performance and enhanced situational awareness. Its high-precision LiDAR capabilities help improve navigation accuracy, mapping quality, and operational efficiency. The Livox Mid-40 LiDAR is well suited for robotic platforms, mapping systems, warehouse automation, industrial mobility solutions, and smart infrastructure projects. Its advanced perception capabilities support real-time environmental monitoring, path planning, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Livox Mid-40 enables intelligent systems to operate safely and efficiently across a wide range of robotics, mapping, and industrial automation applications. Buy the Livox Mid-40 lidar sensor: cost-effective 260 m non-repetitive scanning lidar for robots. Ask price from Core Bolt India today. ",
            image:
              "https://assets.core-bolt.com/website-assets/livox-mid-40-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/MID-40-1.jpg",
              "https://assets.core-bolt.com/website-assets/MID-40-4.jpg",
              "https://assets.core-bolt.com/website-assets/MID-40-3.jpg",
              "https://assets.core-bolt.com/website-assets/MID-40-2.png",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/mid40.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: null,
            features: [
              "FOV: 38.4°Circular",
              "Detection Range : 90 m @10% reflectivity ,130 m @ 20% reflectivity ,260 m @ 80% reflectivity",
              "Dimensions :88×69×76 mm",
              "Weight: Approx. 760 g ",
              "Point Rate: 100,000pts/s ",
              "Angular Accuracy: < 0.1°",
              "Power: 10 W",
              "Operating Temperature: -20˚C to 65˚C",
              "IP Rating: IP67",
            ],
          },
          {
            id: "livox-mid-100-lidar-sensor",
            name: "LIVOX MID-100",
            description:
              "The Livox Mid-100 is a high-performance LiDAR sensor that can be used for multiple applications including autonomous driving, robot navigation, dynamic path planning, and high-precision mapping. Livox Mid-100’s unique non-repetitive scanning technology ensures a high-density point cloud, and precisely detects every detail inside its field of view (FOV). Users can check the real- time point cloud using Livox Viewer, and a software development kit (SDK) is provided to help develop customizable applications using the data acquired from the point cloud. Livox Mid-100’s high reliability ensures that it can work properly even in adverse weather conditions.",
            metaTitle:
               "Livox MID-100 3D LiDAR Sensor for 3D mapping and navigation",
            metaDescription:
              "Buy the Livox Mid-100 lidar sensor: wide-FoV high-density point cloud lidar for driving and maps. Ask price from Core Bolt India today.",
            metaKeywords:
              "Livox Mid-100, Livox Mid-100 LiDAR, Livox Mid-100 LiDAR Sensor, Livox Mid-100 Price, Livox Mid-100 Specifications, Long Range LiDAR, 3D LiDAR Sensor",
            overviewTitle:
              " Livox Mid-100 3D LiDAR for Robotics & Long-Range Mapping Applications",
            overview:
              "LIVOX MID-100 (Ask Price). The Livox Mid-100 LiDAR is a high-performance 3D LiDAR sensor designed for robotics, mapping, industrial automation, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring long-range object detection, SLAM, obstacle detection, collision avoidance, and autonomous navigation, the Livox Mid-100 provides reliable sensing performance and enhanced situational awareness. Its long-range perception capabilities help improve navigation accuracy, mapping quality, and operational efficiency. The Livox Mid-100 LiDAR is well suited for robotic platforms, mapping systems, autonomous machines, warehouse automation, and smart infrastructure projects. Its advanced perception capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Livox Mid-100 enables intelligent systems to operate safely and efficiently across a wide range of robotics, mapping, and automation applications. Buy the Livox Mid-100 lidar sensor: wide-FoV high-density point cloud lidar for driving and maps. Ask price from Core Bolt India today.",
            image:
              "https://assets.core-bolt.com/website-assets/livox-mid-100-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/MID-100-1.webp",
              "https://assets.core-bolt.com/website-assets/MID-100-2.webp",
              "https://assets.core-bolt.com/website-assets/MID-100-2.jpg",
              "https://assets.core-bolt.com/website-assets/MID-100-3.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/mid1002.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: null,
            features: [
              "FOV: 98.4° circular(Horizontal), 38.4°  (Veritical)",
              "Detection Range  :90 m @ 10% reflectivity ,130 m @ 20% reflectivity, 260 m @ 80% reflectivity",
              "Dimensions :142×70×230 mm (Mid-100)",
              "Weight: Approx. 2200 g",
              "Angular Accuracy: < 0.1°",
              "Power: 30 W ",
              "Operating Temperature: -20˚C to 65˚C",
              "IP Rating: IP67",
            ],
          },
          {
            id: "livox-mid-70-lidar-sensor",
            name: "LIVOX MID-70",
            description:
              "The Mid-70 is another component adding to the overall market appeal for Livox with tailored use applications such as low-speed autonomous driving and mobile robotics. By significantly expanding the vertical viewing angle, reducing blind spots and increasing close-range precision, the Mid-70 offers a thorough and comprehensive point cloud data quality to ensure safer autonomy.",
            metaTitle:
              "Livox MID-70 3D LiDAR Sensor for 3D mapping and navigation",
            metaDescription:
              "Buy the Livox Mid-70 lidar sensor at Rs 1,26,270. Wide vertical FoV lidar with low blind spots for robotics. Order online from Core Bolt India today. ",
            metaKeywords:
              "Livox Mid-70, Livox Mid-70 LiDAR, Livox Mid-70 LiDAR Sensor, Livox Mid-70 Price, Livox Mid-70 Specifications, Long Range LiDAR, 3D LiDAR Sensor",
            overviewTitle:
              "Livox Mid-70 3D LiDAR for Robotics & Long-Range Applications",
            overview:
              "LIVOX MID-70 (₹1,26,270). The Livox Mid-70 LiDAR is a high-performance 3D LiDAR sensor designed for robotics, mapping, industrial automation, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring long-range object detection, SLAM, obstacle detection, collision avoidance, and autonomous navigation, the Livox Mid-70 provides reliable sensing performance and enhanced situational awareness. Its long-range perception capabilities help improve navigation accuracy, mapping quality, and operational efficiency. The Livox Mid-70 LiDAR is well suited for robotic platforms, mapping systems, autonomous machines, warehouse automation, drone-based mapping, and smart infrastructure projects. Its advanced perception capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the Livox Mid-70 enables intelligent systems to operate safely and efficiently across a wide range of robotics, mapping, and automation applications. Buy the Livox Mid-70 lidar sensor at Rs 1,26,270 . Wide vertical FoV lidar with low blind spots for robotics. Order online from Core Bolt India today. ",

            image:
              "https://assets.core-bolt.com/website-assets/livox-mid-70-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/MID-70-main-1.png",
              "https://assets.core-bolt.com/website-assets/MID-70-1.png",
              "https://assets.core-bolt.com/website-assets/MID-70-2.webp",
              "https://assets.core-bolt.com/website-assets/MID-70-4.webp",
              "https://assets.core-bolt.com/website-assets/MID-70-3.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/mid70.pdf",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: 126270.0,
            features: [
              "FOV circular: 70.4° ",
              "Detection Range: 90 m @ 10% reflectivity  ,130 m @ 20% reflectivity ,260 m @ 80% reflectivity.",
              "Point Rate :100,000 points/s (first or strongest return)200,000 points/s (dual return)",
              "Power: 8 W (average)",
              "Operating Temperature: -4°F to 149°F (-20℃ to 65℃)",
              "IP Rating: IP67",
              " Dimestions : 97×64×62.7mm",
              "Weight:88g",
            ],
          },
          {
            id: "livox-tele-15-lidar-sensor",
            name: "LIVOX TELE-15",
            description:
              "The Livox TELE-15 LiDAR is built for long-distance detection, offering high precision, durability, and a compact design. Ideal for high-speed vehicles, it enables early obstacle detection for safer and smarter navigation.",
            metaTitle:
              "Livox TELE-15 LiDAR | Specs, Manual & Price - CORE BOLT™",
            metaDescription:
              "Buy the Livox Tele-15 lidar sensor at Rs 1,72,626. Long-range high-precision lidar for early obstacle detection. Buy now from Core Bolt India. ",
            metaKeywords:
              "livox TELE-15 lidars, livox tele 15 lidar price, livox tele 15 lidar user manual",
            overviewTitle:
            "Livox TELE-15 3D LiDAR for Long-Range Detection, Autonomous Systems & Intelligent Mobility ",
            overview:
            "LIVOX TELE-15 (₹1,72,626). The Livox TELE-15 is a high-performance 3D LiDAR sensor designed for long-range environmental perception across autonomous systems, intelligent mobility, robotics, mapping, and advanced navigation applications. With a detection range of up to 500 meters and a focused field of view, the TELE-15 delivers detailed 3D point-cloud data that helps autonomous machines detect and understand objects at extended distances. Engineered for applications where early obstacle detection and dependable spatial awareness are essential, it supports object detection, localization, mapping, collision avoidance, path planning, and autonomous navigation. Its long-range sensing capability makes it particularly suitable for high-speed autonomous vehicles, intelligent transportation systems, robotic platforms, mapping solutions, and other perception-driven applications requiring reliable detection of distant objects. With high-precision 3D sensing, IP67 protection, and reliable operation across demanding environmental conditions, the Livox TELE-15 helps intelligent systems achieve improved situational awareness, earlier obstacle detection, safer navigation, and dependable performance in long-range perception applications. Buy the Livox Tele-15 lidar sensor at Rs 1,72,626 . Long-range high-precision lidar for early obstacle detection. Buy now from Core Bolt India. ",
              image:
              "https://assets.core-bolt.com/website-assets/livox-tele-15-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/TELE-15-1-main-1.jpg",
              "https://assets.core-bolt.com/website-assets/TELE-15-2.jpg",
              "https://assets.core-bolt.com/website-assets/TELE-15-3.jpg",
              "https://assets.core-bolt.com/website-assets/TELE-15-5.webp",
              "https://assets.core-bolt.com/website-assets/TELE-15-4.jpg",
              "https://assets.core-bolt.com/website-assets/TELE-15-6.png",
            ],

            fileUrl:
              "https://assets.core-bolt.com/website-assets/LivoxTele-15.pdf ",
            category: "lidar",
            subcategory: "livox-3d-lidar-sensor",
            price: 172626.0,
            features: [
              "FOV: 14.5° × 16.2°",
              "Detection Range : 500 m ",
              "Point Rate : (240,000 points/s Single Return) （480,000 points/s Dual Return)",
              "L × W × H (mm): 112 × 94.2 × 122 with self-dissipation module ",
              "Weight : 1.8kg (with self-dissipation module), 1.7kg(without self-dissipation module)",
              "Power: 12 W typical",
              "Operating Temperature: -40˚C to +85˚C",
              "IP Rating: IP67",
            ],
          },
        ],
      },
      {
        id: "robosense",
        name: "RoboSense",
        description:
          "RoboSense LiDAR offers advanced 3D sensing technology for precise mapping, navigation, and autonomous mobility. Designed for robots, vehicles, and smart transportation, RoboSense LiDAR ensures high-accuracy perception and real-time environmental awareness for safer and smarter automation.",
        image:
          "https://assets.core-bolt.com/website-assets/robosense-lidar-sensor-hero-image.jpg",
        metaTitle:
          "RoboSense Smart LiDAR for Robotics & Automation | CoreBolt ",
        metaDescription:
          "Explore RoboSense LiDAR solutions including E1R, E1, Airy-96, Airy-192, Bpearl, and Helios 16 lidars for robotics, autonomous vehicles, industrial automation, 3D perception, mapping, and navigation applications. ",
        metaKeywords:
          " ROBOSENSE, RoboSense Smart LiDAR, RoboSense 3D Perception, RoboSense Autonomous Sensing, RoboSense Vehicle LiDAR, RoboSense Intelligent LiDAR, RoboSense LiDAR, RoboSense sensor, RoboSense LiDAR price,  E1R Lidra, E1 Lidar,  Airy-96 Lidar, Airy-192 Lidar, Bpearl Lidar, Heliso 16 Lidar",
        overview:
          "CoreBolt provides advanced RoboSense LiDAR solutions designed for autonomous vehicles, robotics, industrial automation, intelligent transportation systems, and smart infrastructure applications. Powered by innovative RoboSense Smart LiDAR technology, these high-performance sensing solutions enable accurate environmental perception, real-time object detection, 3D mapping, localization, and autonomous navigation for next-generation intelligent systems. CoreBolt offer RoboSense LiDAR technologies including the E1R LiDAR, E1 LiDAR, Airy-96 LiDAR, Airy-192 LiDAR, Bpearl LiDAR, and Helios 16 LiDAR for demanding industrial and autonomous applications. These intelligent 3D perception systems generate high-resolution point cloud data, delivering reliable performance in environments where precision, safety, and situational awareness are critical. Whether deploying Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), autonomous vehicles, warehouse automation systems, industrial robots, or smart city infrastructure, RoboSense LiDAR technologies provide robust sensing capabilities for advanced automation projects. Designed to support autonomous sensing, obstacle detection, SLAM, localization, and real-time mapping, RoboSense solutions help accelerate the development and deployment of intelligent automation systems while simplifying integration with AI edge computing platforms. ",
        overviewTitle:
          "RoboSense Smart LiDAR for Autonomous Systems, Robotics & Intelligent Automation",
        products: [
          {
            id: "robosense-e1r-lidar-sensor",
            name: "ROBOSENSE E1R",
            description:
              "E1R RoboSense LiDAR is a new-generation solid-state digital LiDAR with a 120°×90° ultra-wide FOV. Designed on the automotive-grade E platform, it delivers high performance, compact design, and reliable real-time object detection for advanced robot obstacle avoidance, mapping, and navigation Tasks.",
            metaTitle: "RoboSense E1R 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the RoboSense E1R lidar sensor at Rs 1,43,381. Solid-state 120deg x 90deg 3D lidar for robot navigation. Order online from Core Bolt India today. ",
            metaKeywords:
              "RoboSense E1R, RoboSense E1R LiDAR, RoboSense E1R LiDAR Sensor, RoboSense E1R Price, RoboSense E1R Specifications, Solid-State LiDAR, Robotics LiDAR Sensor, LiDAR for Warehouse Automation",
            overview:
              "ROBOSENSE E1R (₹1,43,381). The RoboSense E1R LiDAR is an advanced solid-state 3D LiDAR sensor designed for robotics, warehouse automation, robot navigation, and intelligent mobility applications. Its digital LiDAR architecture delivers accurate environmental perception, real-time object detection, localization, and high-quality point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, and autonomous navigation, the RoboSense E1R provides reliable sensing performance and enhanced situational awareness. Its compact design and advanced perception capabilities help improve navigation accuracy, operational efficiency, and intelligent decision-making. The RoboSense E1R LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, and smart logistics applications. Its advanced sensing capabilities support real-time environmental monitoring, path planning, and intelligent automation. With precise spatial awareness, dependable sensing performance, and advanced solid-state LiDAR technology, the RoboSense E1R enables intelligent systems to operate safely and efficiently across a wide range of robotics and warehouse automation applications. Buy the RoboSense E1R lidar sensor at Rs 1,43,381. Solid-state 120deg x 90deg 3D lidar for robot navigation. Order online from Core Bolt India today. ",
            overviewTitle:
              "RoboSense E1R Solid-State LiDAR for Robotics & Warehouse Automation",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-e1r-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-E1R-1.webp",
              "https://assets.core-bolt.com/website-assets/E1R-4.png",
              "https://assets.core-bolt.com/website-assets/E1R-3.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/E1R_Brochure.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 143381.0,
            features: [
              "Wide FOV : 120°×90°",
              "Long range : 75m (30m@10%)",
              "High-quality point cloud : 260,000 pts/s",
              "Flat window : 7×35×75 (mm)",
              "Digital architecture : SPAD-SoC",
              "2D Electronic scanning : 2D VCSEL",
            ],
          },
          {
            id: "robosense-e1-lidar-sensor",
            name: "ROBOSENSE E1",
            description:
              "E1 is designed for factory-installed mass production. It adopts RoboSense fully autonomous and controllable chip system, with extreme architecture and compact size. E1 has an ultra-wide FOV of 120x 90 .At the same time, it also provides an ultra-high refresh rate upto 30Hz, and a stronger ranging capability of 30m@10%, which is accurately adapt to the needs of full-scene blind-filling perception. By matching with the M series, the optimal LiDAR combination can fully cover various blind scenarios and meet the safety perception requirements of intelligent driving from ADAS to L4 in all scenarios.",
            metaTitle:
              "RoboSense E1 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the RoboSense E1 lidar sensor: solid-state blind spot lidar with 30Hz refresh for robots. Ask price from Core Bolt India today.",
            metaKeywords:
              "RoboSense E1, RoboSense E1 LiDAR, RoboSense E1 LiDAR Sensor, RoboSense E1 Price, RoboSense E1 Specifications, Solid-State Flash LiDAR, Automotive LiDAR Sensor, Blind Spot LiDAR, ADAS LiDAR, roboSense e1 lidar, e1 lidar price",
            overview:
              "ROBOSENSE E1 (Ask Price). The RoboSense E1 LiDAR is an advanced solid-state 3D LiDAR sensor designed for ADAS, autonomous driving, vehicle perception, and intelligent mobility applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, and high-quality point cloud generation for next-generation vehicle systems. Built for applications requiring blind spot detection, obstacle detection, collision avoidance, vehicle perception, and autonomous navigation, the RoboSense E1 provides reliable sensing performance and enhanced situational awareness. Its flash LiDAR architecture helps improve driving safety, navigation accuracy, and intelligent decision-making. The RoboSense E1 LiDAR is well suited for autonomous vehicles, advanced driver assistance systems, intelligent transportation projects, and smart mobility platforms. Its advanced sensing capabilities support real-time environmental monitoring, traffic awareness, path planning, and autonomous operation. With precise spatial awareness, dependable sensing performance, and advanced solid-state LiDAR technology, the RoboSense E1 enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the RoboSense E1 lidar sensor: solid-state blind spot lidar with 30Hz refresh for robots. Ask price from Core Bolt India today.",
            overviewTitle:
              " RoboSense E1 Solid-State LiDAR for ADAS & Vehicle Perception",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-e1-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-E1-1main.jpg",
              "https://assets.core-bolt.com/website-assets/E1-3.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/E1_Brochure.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "Horizontal FoV: 120°",
              "Vertical FoV: 90°",
              "Ultra-high frame rate: 10~30Hz",
              "Stronger range detection capability: 30m @10%",
              "Range accuracy : 5cm",
              "operating Temperature: -40°C ~ +85°C",
            ],
          },
          {
            id: "robosense-airy-96-beam-lidar-sensor",
            name: "ROBOSENSE Airy-96",
            description:
              "Airy is the first digital hemispherical LiDAR on the R platform, featuring a chip-based transceiver solution and a high-sensitivity digital detection scheme. Compact in size, comparable to a ping-pong ball, it delivers an ultra-wide hemispherical FOV with 360° horizontal and 90° vertical coverage, encompassing a 60-meter radius range. With 1.72 million points per second and 1cm@1σ range precision, Airy provides real-time detection of object size, contour, and distance. Its well-structured, algorithm-friendly point clouds enable exceptional performance in obstacle avoidance, mapping, and navigation tasks.",
            metaTitle: "RoboSense Airy-96 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the RoboSense Airy-96 lidar sensor at Rs 1,48,932. Palm-sized hemispherical 360deg x 90deg digital lidar. Order online from Core Bolt India today",
            metaKeywords:
              " RoboSense Airy-96, RoboSense Airy-96 LiDAR, Airy-96 LiDAR Sensor, 96 Beam LiDAR, Hemispherical LiDAR, 360 Degree LiDAR Sensor, Robotics LiDAR, SLAM LiDAR",
            overview:
              "ROBOSENSE Airy-96 (₹1,48,932). The RoboSense Airy-96 LiDAR is an advanced 96-beam 3D LiDAR sensor designed for robotics, autonomous navigation, mapping, and intelligent automation applications. Featuring a hemispherical perception design and high-density sensing capabilities, it delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, 360-degree environmental awareness, and autonomous navigation, the RoboSense Airy-96 provides reliable sensing performance and enhanced situational awareness. Its advanced perception capabilities help improve navigation accuracy, mapping quality, and operational efficiency. The RoboSense Airy-96 LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, and smart mobility applications. Its advanced sensing capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense Airy-96 enables intelligent systems to operate safely and efficiently across a wide range of robotics and autonomous navigation applications. Buy the RoboSense Airy-96 lidar sensor at Rs 1,48,932. Palm-sized hemispherical 360deg x 90deg digital lidar. Order online from Core Bolt India today",
            overviewTitle:
              "RoboSense Airy-96 3D LiDAR for Robotics & Autonomous Navigation",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-airy-96-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/Airy-96-1.jpg",
              "https://assets.core-bolt.com/website-assets/Airy-96-3.png",
              "https://assets.core-bolt.com/website-assets/Airy-96-4.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/Airy96.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 148932.0,
            features: [
              "Perfect hemispherical FOV: 360°×90° ",
              "High Beams: 96 beams ",
              "Point Per Secound: 860,000pts/s (Single return)",
              "Longer range: 30m@10%",
              "High precision: 1cm@1σ",
              "Integrated: IMU",
              "Mini size: φ60×H63 (mm)",
            ],
          },
          {
            id: "robosense-airy-192-lidar-sensor",
            name: "ROBOSENSE Airy-192",
            description:
              "Airy is the first digital hemispherical LiDAR on the R platform, featuring a chip-based transceiver solution and a high-sensitivity digital detection scheme. Compact in size, comparable to a ping-pong ball, it delivers an ultra-wide hemispherical FOV with 360° horizontal and 90° vertical coverage, encompassing a 60-meter radius range. With 1.72 million points per second and ±1cm detection accuracy, Airy provides real-time detection of object size, contour, and distance. Its well-structured, algorithm-friendly point clouds enable exceptional performance in obstacle avoidance, mapping, and navigation tasks.",
            metaTitle:
              "RoboSense Airy-192 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the RoboSense Airy-192 lidar sensor: 192-beam hemispherical digital lidar, 360deg x 90deg FoV. Ask price from Core Bolt India today.",
            metaKeywords:
              " RoboSense Airy-192, RoboSense Airy-192 LiDAR, Airy-192 LiDAR Sensor, 192 Beam LiDAR, Hemispherical LiDAR, 360 Degree LiDAR Sensor, Robotics LiDAR, SLAM LiDAR",
            overview:
              "ROBOSENSE Airy-192 (Ask Price). The RoboSense Airy-192 LiDAR is an advanced 192-beam 3D LiDAR sensor designed for robotics, autonomous navigation, mapping, and intelligent automation applications. Featuring a hemispherical perception design and high-density sensing capabilities, it delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in complex environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, 360-degree environmental awareness, and autonomous navigation, the RoboSense Airy-192 provides reliable sensing performance and enhanced situational awareness. Its advanced digital LiDAR architecture helps improve navigation accuracy, mapping quality, and operational efficiency. The RoboSense Airy-192 LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, and intelligent mobility applications. Its advanced sensing capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense Airy-192 enables intelligent systems to operate safely and efficiently across a wide range of robotics and autonomous navigation applications. Buy the RoboSense Airy-192 lidar sensor: 192-beam hemispherical digital lidar, 360deg x 90deg FoV. Ask price from Core Bolt India today.",
            overviewTitle:
              " RoboSense Airy-192 LiDAR Sensor for Robotics, Mapping & Intelligent Automation",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-airy-192-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-Airy-192-4.jpg",
              "https://assets.core-bolt.com/website-assets/1-Airy-192-1main.jpg",
              "https://assets.core-bolt.com/website-assets/Airy-192-5.jpg",
              "https://assets.core-bolt.com/website-assets/Airy-192-2.png",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/Airy192.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "FOV(H×V): 360°×90° ",
              "High Beams: 192 beams ",
              "Point Per Secound: 1,720,000 pts/s",
              "Number of Channels:96 Channels",
              "Range: 30m@10%",
              "High precision: 1cm@1σ",
              "Integrated: IMU",
              "Mini size: φ60×H63 (mm)",
              "Operating Temperature: -40°C ~+60°C",
              "Weight: <240g",
              "Ingress protection: IP67, IP6K9K",
            ],
          },
              {
            id: "robosense-airy-lite-lidar-sensor",
            name: "ROBOSENSE Airy-Lite",
            description:
              "The RoboSense Airy Lite is a compact 24-beam 3D LiDAR sensor featuring 360° horizontal and 45° vertical field of view with a detection range of up to 60 metres. Designed for mobile robots, autonomous navigation, mapping, and obstacle avoidance, it delivers reliable 3D environmental perception in space-constrained robotic applications.",
            metaTitle:
              "RoboSense Airy Lite 3D LiDAR Sensor | 360° Perception",
            metaDescription:
              "Discover the RoboSense Airy Lite 3D LiDAR sensor with 360° × 45° coverage, 60 m range and compact design for mobile robots, navigation and obstacle avoidance.",
            metaKeywords:
              "RoboSense Airy Lite, Airy Lite LiDAR, 3D LiDAR sensor, 360 degree LiDAR, compact LiDAR sensor, robotics LiDAR, mobile robot perception, obstacle avoidance LiDAR, autonomous robot navigation, 3D perception sensor",
            overview:
              "The RoboSense Airy Lite is a compact 3D LiDAR sensor designed for commercial, industrial, and consumer robotics applications. It provides 360° horizontal and 45° vertical field-of-view coverage, enabling robots to perceive their surroundings and detect obstacles across a wide area.Featuring 24-beam 3D sensing, a maximum detection range of up to 60 metres, and a near-field blind zone of less than 0.1 metres, the Airy Lite supports environmental perception in space-constrained robotic platforms. Its compact design, integrated IMU, and digital sensing architecture make it suitable for applications requiring real-time 3D point cloud data.The RoboSense Airy Lite can be used in autonomous mobile robots (AMRs), industrial robots, commercial cleaning robots, robotic lawn mowers, and intelligent automation systems. It supports key robotics functions such as mapping, localization, navigation, and obstacle avoidance, helping developers integrate 3D perception into mobile and autonomous machines.",
            overviewTitle:
              " RoboSense Airy lite LiDAR Sensor for Robotics, Mapping & Intelligent Automation",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-airy-lite-lidar-sensor.webp",
            images: [
            "https://assets.core-bolt.com/website-assets/airylite (4).webp",
            "https://assets.core-bolt.com/website-assets/airylite (2).webp",
            "https://assets.core-bolt.com/website-assets/airylite (3).webp",
            "https://assets.core-bolt.com/website-assets/airy-lite-cb.gif",
            ],
            fileUrl: "null",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            
             features: [
               "Version: Serial Port Ver./ ETH Ver.",
               "Laser Wavelength: 940 nm",
               "Laser Safety: Class 1 eye safety",
               "Range: 7–18 Channels: 40 m @10%/ 1–6 & 19–24 Channels: 30 m @10%/ Maximum Range: 60 m",
               "Precision: 1 cm (1σ)",
               "Blind Spot: <0.1 m",
               "Horizontal FOV: 360°",
               "Vertical FOV: 45° (-11.5° to +33.5°)",
               "Angular Resolution: 0.6° (H) × 1.96° (V)",
               "Point Rate (Single Return Mode): ~144,000 pts/s",
               "Point Rate (Dual Return Mode): ~288,000 pts/s",
               "Frame Rate: 10 Hz",
               "Dimensions: 69 × 64 × 62 mm (without lead-out)/ 72.5 × 64.2 × 65 mm (including aviation plug)",
               "Weight: 210 ± 10 g/ 235 ± 10 g",
               "Power Consumption: 4.5 W/ 6 W",
               "Interface: RS-485/ 100BASE-TX",
                       ],
      },
          {
            id: "robosense-bpearl-lidar-sensor",
            name: "ROBOSENSE Bpearl",
            description:
              "RS-Bpearl, the close-range LiDAR developed by RoboSense, is the world leading LiDAR for monitoring blind spot. It is particular utilized in and perception of environment for autonomous driving",
            metaTitle:
              "RoboSense Bpearl 3D LiDAR Sensor Solutions for ADAS",
            metaDescription:
              "Buy the RoboSense Bpearl lidar sensor: hemispherical wide-FoV blind spot lidar for AVs and AMRs. Ask price from Core Bolt India today.",
            metaKeywords:
              "RoboSense Bpearl, RoboSense Bpearl LiDAR, RoboSense Bpearl LiDAR Sensor, RoboSense Bpearl Price, RoboSense Bpearl Specifications, Blind Spot LiDAR, Solid-State LiDAR, Automotive Grade LiDAR",
            overview:
              "ROBOSENSE Bpearl (Ask Price). The RoboSense Bpearl LiDAR is an advanced solid-state 3D LiDAR sensor designed for ADAS, vehicle perception, automotive safety, and intelligent mobility applications. Its automotive-grade sensing technology delivers accurate environmental perception, real-time object detection, and high-quality point cloud generation for next-generation vehicle systems. Built for applications requiring blind spot detection, obstacle detection, collision avoidance, and enhanced vehicle awareness, the RoboSense Bpearl provides reliable sensing performance and improved situational awareness. Its compact solid-state LiDAR architecture helps improve driving safety, navigation accuracy, and intelligent decision-making. The RoboSense Bpearl LiDAR is well suited for autonomous vehicles, advanced driver assistance systems, intelligent transportation projects, and smart mobility platforms. Its advanced sensing capabilities support real-time environmental monitoring, traffic awareness, vehicle perception, and autonomous operation. With precise spatial awareness, dependable sensing performance, and advanced automotive-grade LiDAR technology, the RoboSense Bpearl enables safer driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the RoboSense Bpearl lidar sensor: hemispherical wide-FoV blind spot lidar for AVs and AMRs. Ask price from Core Bolt India today.",
            overviewTitle:
              "RoboSense Bpearl Solid-State LiDAR for Blind Spot Detection & ADAS",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-bpearl-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-Bpearl-1main.jpg",
              "https://assets.core-bolt.com/website-assets/Bpearl-4.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Robosense_Bpearl.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "Field of View (FOV):	360° (horizontal) × 90° (vertical) ​",
              "Laser Channels:	32 beams ​",
              "Range :from 0.1m to 30m (reflectivity 10%) ​",
              "Accuracy :	±3 cm (typical valu)​",
              "Power Consumption:	13 W (typical) ​",
              "Dimensions :Diameter 100 mm × Height 111 mm ​",
              "Weight:0.92 kg(without cable) ​",
              "Operating Temperature:	-30 ℃~+60 ℃​",
              "Ingress Protection:	IP67 ​",
            ],
          },
          {
            id: "robosense-fairy-lidar-sensor",
            name: "ROBOSENSE Fairy",
            description:
              "Fairy is the first high-precision mid-range digital LiDAR. Powered by RoboSense's innovative chip-based transceiver solution and digital architecture, Fairy features a compact and lightweight design. It boasts industry-leading 0.5cm ultra-high precision, upto 96-beam, and a high-density point cloud of 1.37 million points per second, while offering a wide 360°×32° FOV and a detection range of 150m. With structured point clouds optimized for algorithms, Fairy enables real-time detection of object size, shape, and distance, facilitating 3D mapping, obstacle avoidance, and autonomous navigation for robots with outstanding accuracy.",
            metaTitle:
              "",
            metaDescription:
              "Buy the RoboSense Fairy lidar sensor at Rs 1,78,678. High-precision mid-range digital lidar, 0.5cm accuracy. Order online from Core Bolt India today. ",
            metaKeywords:
              " RoboSense Fairy, RoboSense Fairy LiDAR, RoboSense Fairy LiDAR Sensor, RoboSense Fairy Price, RoboSense Fairy Specifications, 96 Beam LiDAR, 360 Degree LiDAR Sensor, Robotics LiDAR Sensor",
            overview:
              "ROBOSENSE Fairy (₹1,78,678). The RoboSense Fairy LiDAR is an advanced digital 3D LiDAR sensor designed for robotics, autonomous navigation, mapping, and intelligent automation applications. Available in 96-beam and 48-beam configurations, it delivers accurate environmental perception, real-time object detection, localization, and high-precision point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, 360-degree environmental awareness, and autonomous navigation, the RoboSense Fairy provides reliable sensing performance and enhanced situational awareness. Its advanced digital LiDAR architecture helps improve navigation accuracy, mapping quality, and operational efficiency. The RoboSense Fairy LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, and smart mobility applications. Its advanced sensing capabilities support real-time environmental monitoring, path planning, mapping, and intelligent decision-making. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense Fairy enables intelligent systems to operate safely and efficiently across a wide range of robotics and autonomous navigation applications. Buy the RoboSense Fairy lidar sensor at Rs 1,78,678 . High-precision mid-range digital lidar, 0.5cm accuracy. Order online from Core Bolt India today. ",
            overviewTitle:
              " RoboSense Fairy LiDAR sensor for robotics, SLAM and autonomous navigation — 360° perception and high-precision 3D point cloud generation.",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-fairy-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/Fairy-1main.png",
              "https://assets.core-bolt.com/website-assets/Fairy-5.png",
              "https://assets.core-bolt.com/website-assets/Fairy-2.gif",
              "https://assets.core-bolt.com/website-assets/Fairy-3.gif",
              "https://assets.core-bolt.com/website-assets/Fairy-4.gif",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/fairy.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 178678.0,
            features: [
              "FOV (H×)V): 360°×32° ",
              "High Beams: 96/48 beams ",
              "point per secound : 1,370,000 pts/s",
              "Longest ranging: 150m",
              "Ultra-High precision: 0.5cm (1σ)",
              "Integrated: IMU",
              "Light & Agile: <350g",
              "Compact size: φ75×H70 (mm)",
            ],
          },
          {
            id: "robosense-helios-16-lidar-sensor",
            name: "ROBOSENSE Helios 16",
            description:
              " Heliso Series Products , the new generation of customized LiDAR platform, including 32-beam and 16-beam LiDAR ,are customized for scene applications such as robots, intelligent vehicles and V2X establishments. Helios series adopted a new modular architecture design",
            metaTitle: "RoboSense Helios 16 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the RoboSense Helios 16 lidar sensor at Rs1,97,119 . Modular 16-beam 3D lidar for robots, vehicles and V2X. Order online from Core Bolt India today. ",
            metaKeywords:
              "RoboSense Helios 16, RoboSense Helios 16 LiDAR, RoboSense Helios 16 LiDAR Sensor, 16 Channel LiDAR, Industrial LiDAR for Robotics, Mobile Robot LiDAR, Obstacle Detection LiDAR",
            overview:
              "ROBOSENSE Helios 16 (₹1,97,119). The RoboSense Helios 16 LiDAR is a high-performance 16-channel 3D LiDAR sensor designed for robotics, mobile robots, industrial automation, and autonomous navigation applications. Its advanced sensing technology delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring obstacle detection, SLAM, collision avoidance, mapping, and autonomous navigation, the RoboSense Helios 16 provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve navigation accuracy, operational efficiency, and intelligent decision-making. The RoboSense Helios 16 LiDAR is well suited for Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, industrial robots, and smart mobility applications. Its advanced perception capabilities support real-time environmental monitoring, path planning, localization, and autonomous operation. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense Helios 16 enables intelligent systems to operate safely and efficiently across a wide range of robotics and industrial automation applications. Buy the RoboSense Helios 16 lidar sensor at Rs 1,97,119. Modular 16-beam 3D lidar for robots, vehicles and V2X. Order online from Core Bolt India today. ",
            overviewTitle:
              "RoboSense Helios 16 3D LiDAR for Robotics & Mobile Robot Navigation",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-helios-16-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/Helios-16-1main.jpg",
              "https://assets.core-bolt.com/website-assets/Helios-16-3.avif",
              "https://assets.core-bolt.com/website-assets/Helios-16-4.webp",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Helios-16P.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 197119.0,
            features: [
              "Model : H16",
              "Helios 16: 30° Vertical FoV, 16-Beam Even distribution°",
              "Data Rate:288,000pts/s (Single Return Mode); 576,000pts/s (Dual Return Mode)",
              "FOV(Horizontal) : 360°",
              "FOV(Vertical) : +15° to -15°(30°  in total)",
              "Ranging Accuracy:(Typical) ±2cm",
              "Dimension: φ97.5 mm * H100 mm",
              "Power Consumption: 11W",
              "Operating temp: -30°C ~ +60°C",
              "Strong Temperature⁴: -40°C ~ +85°C",
              "Sensor Protection: IP67",
            ],
          },
          {
            id: "robosense-helios-32-h32f70-lidar-sensor",
            name: "ROBOSENSE Helios 32 (H32F70)",
            description:
              "Heliso Series Products , the new generation  of customized LiDAR platform, including 32-beam and 16-beam LiDAR ,are customized for scene applications such as robots, intelligent vehicles and V2X establishments. Helios series adopted a new modular architecture design.",
            metaTitle:
              "RoboSense Helios 32 H32F70 3D LiDAR Sensor for 3D mapping",
            metaDescription:
              "Buy the RoboSense Helios 32 H32F70 lidar sensor at Rs 3,35,424. Modular 32-beam 3D lidar for robots and V2X sites. Order from Core Bolt India. ",
            metaKeywords:
              "RoboSense Helios lidar, roboSense helios lidar price, roboSense helios 32, roboSense airy lidar, roboSense rs lidar 16 price, roboSense lidar price, roboSense helios price",
           overview:
           "ROBOSENSE Helios 32 H32F70 (₹3,35,424). The RoboSense Helios-32 H32F70 is a high-performance 3D LiDAR sensor designed for reliable environmental perception across robotics, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), industrial automation, autonomous navigation, and intelligent mobility applications. Featuring a 32-channel architecture and wide field of view, the Helios-32 H32F70 delivers detailed 3D point-cloud data that helps machines accurately detect, map, and understand their surroundings in real time. Engineered for applications requiring dependable spatial awareness and consistent environmental sensing, it supports obstacle detection, object detection, localization, mapping, SLAM, collision avoidance, path planning, and autonomous navigation. Its sensing capabilities make it suitable for integration into mobile robots, autonomous platforms, warehouse automation systems, industrial vehicles, mapping solutions, and other perception-driven applications. With precise 3D sensing, robust construction, and reliable environmental perception, the RoboSense Helios-32 H32F70 helps autonomous and intelligent systems achieve improved situational awareness, safer navigation, and dependable operation across demanding industrial and robotic environments. Buy the RoboSense Helios 32 H32F70 lidar sensor at Rs 3,35,424. Modular 32-beam 3D lidar for robots and V2X sites. Order from Core Bolt India.",
           overviewTitle:
           "RoboSense Helios-32 H32F70 3D LiDAR for Robotics, AMRs & Industrial Automation ",
              image:
              "https://assets.core-bolt.com/website-assets/robosense-helios-32-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/Helios32(H32F70)-1main.webp",
              "https://assets.core-bolt.com/website-assets/Helios32(H32F70)-4.avif",
              "https://assets.core-bolt.com/website-assets/Helios32(H32F70)-5.jpg",
              "https://assets.core-bolt.com/website-assets/Helios32(H32F70)-7.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/Helios32.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 335424.0,
            features: [
              "Model :H32F70 ",
              "Helios 32: 70° Vertical FoV, 55°of FoV below horizon to elimilate blind zone",
              "Laser Beams: 32",
              "Point Per Secound: 576,000 pts/s(Single Return Mode), 1,152,000 pts/s (dual return Mode)",
              "Range: 150 m (90 m @ 10% NIST)",
              "Dimension: φ100 mm * H100 mm",
              "Power Consumption: 12W",
              "Operating temp: -30°C ~ +60°C",
              "Ingress Protection: IP67",
            ],
          },
          {
            id: "robosense-helios-32-h32F26-lidar-sensor",
            name: "ROBOSENSE Helios 32 (H32F26)",
            description:
              " Heliso Series Products , the new generation of customized LiDAR platform, including 32-beam and 16-beam LiDAR are customized for scene applications such as robots, intelligent vehicles and V2X establishments. Helios series adopted a new modular architecture design.",
            metaTitle:
              "RoboSense Helios LiDAR | Specs & Price in India - Core-Bolt",
            metaDescription:
              "Buy the RoboSense Helios 32 H32F26 lidar sensor at Rs 2,98,932. Modular 32-beam 3D lidar for smart vehicles and V2X. Order from Core Bolt India. ",
            metaKeywords:
              "RoboSense Helios lidar, roboSense helios lidar price, roboSense helios 32, roboSense airy lidar, roboSense rs lidar 16 price, roboSense lidar price, roboSense helios price",
            overview:
            "ROBOSENSE Helios 32 H32F26 (₹2,98,932). The RoboSense Helios 32 H32F26 is a high-performance 3D LiDAR sensor designed for reliable environmental perception across robotics, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), intelligent vehicles, industrial automation, and autonomous navigation applications. Featuring 32 laser beams and a 26° vertical field of view, the Helios 32 H32F26 delivers dense 3D point-cloud data that helps machines accurately detect, map, and understand their surroundings in real time. With a sensing range of up to 150 meters and a point rate reaching 1,152,000 points per second in dual-return mode, it supports obstacle detection, localization, mapping, SLAM, collision avoidance, path planning, and autonomous navigation. Its compact modular design makes it suitable for integration into mobile robots, autonomous platforms, industrial vehicles, warehouse automation systems, V2X applications, and other perception-driven systems. With precise 3D sensing, IP67 protection, low power consumption, and reliable operation across demanding environmental conditions, the RoboSense Helios 32 H32F26 helps autonomous and intelligent systems achieve improved situational awareness, safer navigation, and dependable performance in industrial and robotic environments. Buy the RoboSense Helios 32 H32F26 lidar sensor at Rs 2,98,932. Modular 32-beam 3D lidar for smart vehicles and V2X. Order from Core Bolt India.",
            overviewTitle:
            "RoboSense Helios 32 H32F26 3D LiDAR for Robotics, AMRs & Intelligent Automation ",
              image:
              "https://assets.core-bolt.com/website-assets/robosense-helios-32-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/Helios-32-(H32F26)-1main.webp",
              "https://assets.core-bolt.com/website-assets/Helios-32-(H32F26)-5.avif",
              "https://assets.core-bolt.com/website-assets/Helios-32-(H32F26)-3.jpg",
              "https://assets.core-bolt.com/website-assets/Helios-32-(H32F26)-2.avif",
              "https://assets.core-bolt.com/website-assets/Helios-32-(H32F26)-4.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/Helios32.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 298932.0,
            features: [
              "Model:H32F26 ",
              "Helios 32: 26° Vertical FoV, gets denser in the middle part, upto 0.5° vertical angular resolution」",
              "Laser Beams: 32",
              "Point Per Secound: 576,000 pts/s(Single Return Mode) 1,152,000 (dual return Mode)",
              "Range: 150 m (90 m @ 10% NIST)",
              "Dimension: φ100 mm * H100 mm",
              "Power Consumption³: 12W",
              "Operating temp: -40°C ~ +60°C",
              "Ingress Protection: IP67/IP67",
            ],
          },
          {
            id: "robosense-em4-lidar-sensor",
            name: "ROBOSENSE EM4",
            description:
              "EM4 is the first long-range digital LiDAR on the EM platform, marking the beginning of the thousand-beam era in automotive LiDAR technology. Incorporating RoboSense’s new digital architecture, crosstalk elimination, all-condition optical signal processing, and lossless data compression technologies, EM4 delivers groundbreaking performance with upto 1080 beams, a maximum detection range of 600m, and a point rate of 25.92 million points per second.",
            metaTitle:
              "RoboSense EM4 3D LiDAR Sensor Solutions for ADAS in India",
            metaDescription:
              "Buy the RoboSense EM4 lidar sensor: thousand-beam long-range automotive lidar for L3/L4 autonomy. Ask price from Core Bolt India today. ",
            metaKeywords:
              "RoboSense EM4, RoboSense EM4 LiDAR, RoboSense EM4 LiDAR Sensor, RoboSense EM4 Price, Buy RoboSense EM4, RoboSense EM4 India, Automotive LiDAR Sensor",
            overview:
              "ROBOSENSE EM4 (Ask Price). The RoboSense EM4 LiDAR is an advanced automotive LiDAR sensor designed for ADAS, autonomous driving, vehicle perception, and intelligent mobility applications. Its high-performance sensing technology delivers accurate environmental perception, real-time object detection, and reliable spatial awareness for next-generation transportation systems. Built for applications requiring obstacle detection, collision avoidance, vehicle perception, and enhanced driving safety, the RoboSense EM4 provides dependable sensing performance and improved situational awareness. Its advanced LiDAR capabilities help support intelligent decision-making and safer vehicle operation in complex environments. The RoboSense EM4 LiDAR is well suited for autonomous vehicles, advanced driver assistance systems, smart transportation projects, and intelligent mobility platforms. Its sensing capabilities support environmental monitoring, traffic awareness, path planning, and real-time perception for modern automotive applications. With precise environmental sensing, reliable performance, and advanced automotive perception technology, the RoboSense EM4 helps enable safer driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the RoboSense EM4 lidar sensor: thousand-beam long-range automotive lidar for L3/L4 autonomy. Ask price from Core Bolt India today. ",
            overviewTitle:
              "RoboSense EM4 Automotive LiDAR for ADAS & Vehicle Perception",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-em4-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-EM4-1main.png",
              "https://assets.core-bolt.com/website-assets/EM4-4.png",
              "https://assets.core-bolt.com/website-assets/EM4-3.png",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/EM4.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "FOV: 120°×27°",
              " Max number of beams: 1080-beams",
              "Point per seconds: 25.92 Million pts/s",
              "Longest range: 600m ",
              " FOV : 120°× 27°",
              "Digital architecture: SPAD-SoC",
              "Data Compression Ratio:  60%",
            ],
          },
          {
            id: "robosense-emx-lidar-sensor",
            name: "ROBOSENSE EMX",
            description:
              "EMX is built on RoboSense’s advanced digital automotive-grade front LiDAR platform—the EM Platform. It delivers real 192-beam and 2.88 million pts/s of high-definition point clouds, with a maximum frame rate of 20Hz, a detection range of upto 300 meters, and a wide horizontal FOV of 140°.",
            metaTitle: "RoboSense EMX 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the RoboSense EMX lidar sensor for autonomous driving: real 192-beam, 300 m range, 140deg FoV. Ask price and expert support from Core Bolt India.",
            metaKeywords:
              " RoboSense EMX, RoboSense EMX LiDAR, RoboSense EMX LiDAR Sensor, RoboSense EMX Price, Buy RoboSense EMX, RoboSense EMX India, RoboSense EMX Specifications, Automotive LiDAR Sensor, Long Range LiDAR",
            overview:
              "ROBOSENSE EMX (Ask Price). The RoboSense EMX LiDAR is an advanced 3D LiDAR sensor designed for autonomous driving, ADAS, vehicle perception, and intelligent mobility applications. Its high-performance sensing technology delivers accurate environmental perception, real-time object detection, and detailed point cloud generation for next-generation transportation systems. Built for applications requiring long-range object detection, vehicle perception, obstacle detection, collision avoidance, and autonomous navigation, the RoboSense EMX provides reliable sensing performance and enhanced situational awareness. Its advanced digital LiDAR architecture helps improve driving safety, navigation accuracy, and intelligent decision-making. The RoboSense EMX LiDAR is well suited for autonomous vehicles, advanced driver assistance systems, intelligent transportation projects, and smart mobility platforms. Its sensing capabilities support real-time environmental monitoring, traffic awareness, path planning, and autonomous operation in complex environments. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense EMX enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the RoboSense EMX lidar sensor for autonomous driving: real 192-beam, 300 m range, 140deg FoV. Ask price and expert support from Core Bolt India." ,
            overviewTitle:
              " RoboSense EMX High-Resolution LiDAR for Robotics & Autonomous Applications",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-emx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-EMX-1main.jpg",
              "https://assets.core-bolt.com/website-assets/EMX-3.jpg",
              "https://assets.core-bolt.com/website-assets/EMX-4.png",
              "https://assets.core-bolt.com/website-assets/EMX-5.gif",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/EMX.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "High-beam:192-beam",
              "Ultra-high frame rate:20Hz ",
              "Ultra-high point rate: 2.88 Million pts/s ",
              "Intelligent: Gaze Function",
              "Global Angular Resolution (H × V): 0.08°×0.10° ",
              "Digital architecture:SPAD+VCSEL ",
              "Longest ranging: 300m ",
              "Compact Design (L × W × H): 120×80×30 (mm) ",
            ],
          },
          {
            id: "robosense-mx-lidar-sensor",
            name: "ROBOSENSE MX",
            description:
              "MX is the new generation of automotive-grade mid-range LiDAR from the RoboSense M platform, which combine featuring outstanding ultimate cost-effectiveness, leading performance, and compactness. MX is equipped with RoboSense's in-house SoC chip M-Core, utilizing the 2D scanning chip from the M platform while upgrading the transceiver system, marking the pinnacle of LiDAR chip technology.",
            metaTitle: "RoboSense MX 3D LiDAR Sensor for ADAS and autonomous driving",
            metaDescription:
              "Buy the RoboSense MX lidar sensor: automotive-grade mid-range lidar with in-house M-Core SoC. Ask price from Core Bolt India today. ",
            metaKeywords: "RoboSense MX lidar, roboSense mx lidar price",
            overview:
              "ROBOSENSE MX (Ask Price). The RoboSense MX LiDAR is an advanced 3D LiDAR sensor designed for robotics, ADAS, autonomous driving, and intelligent mobility applications. Its high-resolution sensing technology delivers accurate environmental perception, real-time object detection, and detailed point cloud generation for intelligent systems operating in complex environments. Built for applications requiring long-range object detection, obstacle detection, collision avoidance, SLAM, and autonomous navigation, the RoboSense MX provides reliable sensing performance and enhanced situational awareness. Its advanced digital and solid-state LiDAR architecture helps improve navigation accuracy, environmental awareness, and intelligent decision-making. The RoboSense MX LiDAR is well suited for robotic platforms, autonomous vehicles, advanced driver assistance systems, intelligent transportation projects, and smart mobility applications. Its advanced sensing capabilities support real-time environmental monitoring, path planning, mapping, and autonomous operation. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense MX enables intelligent systems to operate safely and efficiently across a wide range of robotics, automotive, and autonomous applications. Buy the RoboSense MX lidar sensor: automotive-grade mid-range lidar with in-house M-Core SoC. Ask price from Core Bolt India today. ",
            overviewTitle:
              "RoboSense MX 3D LiDAR for Vehicle Perception & Autonomous Mobility",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-mx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-MX-1main.png",
              "https://assets.core-bolt.com/website-assets/MX-3.png",
              "https://assets.core-bolt.com/website-assets/MX-2.gif",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/mx.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "FOV(H×V): 120°×25°",
              "Beams: 126 (ROI equivalent 251-beam)",
              "Detection range: 200 m",
              "Power Consumption : ≤10 W",
              "Operating temp: -40°C ~ +85°C",
            ],
          },
          {
            id: "robosense-m2-lidar-sensor",
            name: "ROBOSENSE M2",
            description:
              "M2 is the third mid-range LiDAR of the M platform.M2 achieves a significant improvement in range and angular resolution. Its maximum range reaches 250 meters and angular resolution in ROI reaches average 0.1° x average 0.1°.",
            metaTitle: "RoboSense M2 3D LiDAR Sensor for 3D mapping and navigation",
            metaDescription:
              "Buy the RoboSense M2 lidar sensor: ultra-HD mid-range lidar, 250 m range, 0.1deg ROI detail. Ask price from Core Bolt India today.",
            metaKeywords:
              "RoboSense M2, RoboSense M2 LiDAR, RoboSense M2 LiDAR Sensor, RoboSense M2 Price, Buy RoboSense M2, RoboSense M2 India, RoboSense M2 Specifications",
            overview:
              " ROBOSENSE M2 (Ask Price). The RoboSense M2 LiDAR is an advanced 3D LiDAR sensor designed for robotics, mapping, autonomous navigation, and intelligent automation applications. Its high-performance sensing technology delivers accurate environmental perception, real-time object detection, localization, and detailed point cloud generation for intelligent systems operating in dynamic environments. Built for applications requiring SLAM, obstacle detection, collision avoidance, environmental perception, and autonomous navigation, the RoboSense M2 provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve navigation accuracy, mapping quality, and intelligent decision-making. The RoboSense M2 LiDAR is well suited for robotic platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), warehouse automation systems, mapping applications, and smart mobility projects. Its sensing capabilities support real-time environmental monitoring, path planning, mapping, and intelligent automation. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense M2 enables intelligent systems to operate safely and efficiently across a wide range of robotics, mapping, and automation applications. Buy the RoboSense M2 lidar sensor: ultra-HD mid-range lidar, 250 m range, 0.1deg ROI detail. Ask price from Core Bolt India today.",
            overviewTitle:
              " RoboSense M2 LiDAR Sensor for Robotics, Mapping & Intelligent Automation ",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-m2-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/M2-3.webp",
              "https://assets.core-bolt.com/website-assets/M2-1main.jpg",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/M2.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: null,
            features: [
              "Range:250m (200m@10%)",
              "Angular resolution(HxV): Avg.0.1° x Avg.0.2° (ROI - Avg.0.1° x Avg.0.1°)",
              "Points Rate (single return):1,575,000 pts/s",
              "Dimension(DxWxH):111x110x45 (mm)",
              "Weight (without cable):690g±20g",
            ],
          },
          {
            id: "robosense-m1-plus-lidar-sensor",
            name: "ROBOSENSE M1 Plus",
            description:
              "The M series deliver highly reliable 3D environment perception performance to ensure the safety of ADAS and AD systems.The M series has passed more than 36,000 hours of high-temperature durability tests, 24,000hours of high-temperature and high-humidity tests and other test verifications. M Series achieved a n annual output of one million units a t the RoboSense's smart manufacturing cluster.",
            metaTitle: " RoboSense M1 Plus 3D LiDAR Sensor Solutions for ADAS",
            metaDescription:
              "Buy the RoboSense M1 Plus lidar sensor at Rs 3,12,788. Automotive-grade MEMS solid-state 200 m lidar for ADAS. Order online from Core Bolt India today. ",
            metaKeywords:
              "RoboSense M1 Plus, RoboSense M1 Plus LiDAR, RoboSense M1 Plus LiDAR Sensor, RoboSense M1 Plus Price, Buy RoboSense M1 Plus, RoboSense M1 Plus India, RoboSense M1 Plus Specifications",
            overview:
              "ROBOSENSE M1 Plus (₹3,12,788). The RoboSense M1 Plus LiDAR is an advanced 3D LiDAR sensor designed for autonomous driving, ADAS, vehicle perception, and intelligent mobility applications. Its high-performance sensing technology delivers accurate environmental perception, real-time object detection, and detailed point cloud generation for next-generation transportation systems. Built for applications requiring vehicle perception, obstacle detection, collision avoidance, environmental awareness, and autonomous navigation, the RoboSense M1 Plus provides reliable sensing performance and enhanced situational awareness. Its advanced LiDAR capabilities help improve driving safety, navigation accuracy, and intelligent decision-making. The RoboSense M1 Plus LiDAR is well suited for autonomous vehicles, advanced driver assistance systems, intelligent transportation projects, and smart mobility platforms. Its sensing capabilities support real-time environmental monitoring, traffic awareness, path planning, and autonomous operation in complex driving environments. With precise spatial awareness, dependable sensing performance, and advanced 3D LiDAR technology, the RoboSense M1 Plus enables safer autonomous driving, enhanced ADAS functionality, and improved transportation intelligence across a wide range of mobility applications. Buy the RoboSense M1 Plus lidar sensor at Rs 3,12,788 . Automotive-grade MEMS solid-state 200 m lidar for ADAS. Order online from Core Bolt India today. ",
            overviewTitle:
              "RoboSense M1 Plus 3D LiDAR for ADAS & Vehicle Perception",
            image:
              "https://assets.core-bolt.com/website-assets/robosense-m1-plus-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/M1-Plus-1main.jpg",
              "https://assets.core-bolt.com/website-assets/M1-Plus-4.jpg",
              "https://assets.core-bolt.com/website-assets/M1-Plus-5.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/RoboSense_M1&M1-Plus.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 312788.0,
            features: [
              "Range:200m (180m@10%)",
              "Angular resolution(HxV): Avg.0.2° x Avg.0.2° (ROI - Avg.0.2° x Avg.0.1°)",
              "Points Rate (single return):787,500 pts/s",
              "Dimension(DxWxH):111x110x45 (mm)",
              "Weight (without cable):690g±20g",
            ],
          },
          {
            id: "robosense-ruby-plus-lidar-sensor",
            name: "ROBOSENSE Ruby Plus",
            description:
              "Ruby Plus series (RP128) is a new 128-beam mechanical LiDAR specifically designed for L4+ autonomous driving. Compared with RS-Ruby Series, it has reduced volume by 50%, weight by 52% and power consumption by 33% for a greatly improved performance.",
            metaTitle:
              "RoboSense Ruby Plus 3D LiDAR Sensor Solutions for 3D mapping",
            metaDescription:
              "Buy the RoboSense Ruby Plus lidar sensor at Rs 15,01,415. 128-beam mechanical 360deg lidar for L4+ driving fleets. Order from Core Bolt India.",
            metaKeywords:
              "RoboSense Ruby Plus lidar, roboSense ruby plus lidar price",
            overview:
              "ROBOSENSE Ruby Plus (₹15,01,415). The RoboSense Ruby Plus is a high-performance 3D LiDAR sensor designed for advanced environmental perception across autonomous driving, robotics, intelligent transportation, industrial automation, and autonomous navigation applications. Engineered to deliver dense and accurate 3D point-cloud data, the Ruby Plus enables intelligent systems to detect, identify, and understand surrounding objects and environments in real time. Its high-resolution sensing capabilities support long-range obstacle detection, object recognition, localization, mapping, collision avoidance, path planning, and autonomous navigation, making it well suited for applications that require dependable spatial awareness and detailed environmental perception. The RoboSense Ruby Plus can be integrated into autonomous vehicles, robotic platforms, intelligent transportation systems, mapping solutions, and other perception-driven systems where accurate and consistent 3D sensing is essential. With precise environmental sensing, robust performance, and reliable operation in demanding conditions, the RoboSense Ruby Plus helps autonomous and intelligent systems achieve improved situational awareness, safer navigation, and dependable perception performance across complex mobility and automation environments. Buy the RoboSense Ruby Plus lidar sensor at Rs 15,01,415. 128-beam mechanical 360deg lidar for L4+ driving fleets. Order from Core Bolt India.", 
            image:
              "https://assets.core-bolt.com/website-assets/robosense-ruby-plus-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/1-Ruby-Plus-1main.jpg",
              "https://assets.core-bolt.com/website-assets/Ruby-Plus-4.jpeg",
              "https://assets.core-bolt.com/website-assets/Ruby-Plus-3.png",
              "https://assets.core-bolt.com/website-assets/Ruby-Plus-5.gif",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Robosense_Ruby-Plus.pdf",
            category: "lidar",
            subcategory: "robosense",
            price: 1501415.0,
            features: [
              "Number of Channels :128 Channels",
              " FOV: 360°×40°",
              "Horizontal  Resolution :0.2° / 0.4°(Balanced Mode) 0.1° / 0.2(High-PerformanceMode)",
              "Vertical  Resolution : 0.1°(104 Channels)",
              "Ultra-high resolution: 0.1°×0.1° at 10 Hz",
              "Number of Output Points: ~2,304,000 pts/s (single Return Mode) / ~4,608,000 pts/s (dual Return Mode)",
              "Range:250m(240m@10% NIST) ",
              "Dimensions: 125 mm × H128 mm",
              "Power Consumption: 27 W - 32 W",
              "Temperature: -40°C ~ +60°C (operating), -40°C ~ +85°C (storage)",
              "Ingress Protection: IP67, IP6K9K",
              "Weight(without cable) : 1920g±50g",
            ],
          },
        ],
      },
      {
        id: "autol-lidar-sensors",
        name: "AutoL",
        image:
          "https://assets.core-bolt.com/website-assets/ouster-velodyne-lidar-sensors-hero-image.jpg",

        description:
          "High-performance Korean LiDAR sensors engineered for autonomous driving, robotics, industrial automation, intelligent mobility, and advanced perception applications.",
        metaTitle: "AutoL 3D LiDAR Sensor for robot navigation and mapping",
        overview:"AutoL offers a comprehensive portfolio of high-performance imaging LiDAR sensors designed to deliver accurate, real-time 3D environmental perception across a wide range of applications. The product lineup includes long-range, high-resolution, and wide field-of-view LiDAR solutions that support autonomous driving, robotics, industrial automation, intelligent transportation systems, smart infrastructure, and security applications. Engineered with automotive-grade reliability, AutoL LiDAR sensors provide exceptional detection accuracy, dense point cloud generation, and stable operation in demanding environments. With advanced features such as multi-channel imaging technology, long-distance detection, dual-return capability, high-speed Ethernet communication, and seamless integration with modern perception platforms, AutoL sensors enable precise object detection, localization, mapping, and obstacle avoidance. Designed to perform reliably in harsh weather and extreme operating conditions, the AutoL LiDAR portfolio combines robust durability, compact designs, and flexible deployment options, making it an ideal choice for next-generation autonomous and intelligent sensing applications.",
        overviewTitle:"AutoL LiDAR Sensors for Robotics, Autonomous Driving & Industrial Automation",
        
        products: [
          {
            id: "g32-lidar-sensor",
            name: "AutoL G32",
            description:
              "G32 High -  resolution long range LiDAR for autmotive grade. G32 is  a high - performance LiDAR sensor capable of detecting over 250 meters(daytime) ahead",
            metaTitle: "AutoL G32 32-Channel Long-Range Imaging LiDAR | CoreBolt",
            metaDescription:
              "Buy the AutoL G32 lidar sensor: automotive-grade high-resolution lidar detecting over 250 m ahead. Ask price from Core Bolt India today.",
            metaKeywords:
  "G32, AutoL, LiDARs, G32, High, LiDAR, 250, CORE BOLT",
              overview:"AUTOL G32 (Ask Price). The AutoL G32 is a high-performance 32-channel imaging LiDAR engineered to deliver reliable long-range 3D perception for autonomous vehicles, intelligent transportation systems, robotics, and smart infrastructure. Designed with automotive-grade durability, the sensor provides a maximum detection range of up to 250 meters while maintaining excellent measurement accuracy and consistent performance in demanding outdoor environments. Its 120° horizontal field of view and optimized 10° vertical field of view enable accurate forward-looking perception, allowing autonomous platforms to detect vehicles, pedestrians, road obstacles, and surrounding objects with confidence. Featuring high-resolution point cloud generation and support for up to three return echoes, the G32 enhances object recognition in complex environments where multiple surfaces or partial obstructions are present. The sensor integrates seamlessly with advanced perception systems through Automotive Ethernet and supports industry-standard communication protocols for efficient deployment across autonomous and industrial platforms. Built to withstand harsh operating conditions, the G32 operates reliably in temperatures ranging from -40°C to 85°C and features an IP69K-rated enclosure for protection against dust, water, and demanding environmental conditions. With its combination of long-range detection, precise environmental mapping, automotive-grade reliability, and flexible integration capabilities, the AutoL G32 provides an ideal perception solution for autonomous driving, smart city infrastructure, intelligent transportation, security monitoring, and next-generation industrial automation applications. Buy the AutoL G32 lidar sensor: automotive-grade high-resolution lidar detecting over 250 m ahead. Ask price from Core Bolt India today.",
              overviewTitle:"AutoL G32 32-Channel Long-Range Imaging LiDAR for Autonomous Driving & Robotics",
            image:
              "https://assets.core-bolt.com/website-assets/1-G32.png",
            
            fileUrl:
              "https://assets.core-bolt.com/website-assets/G32-Datasheet_AutoL-260612.pdf",
            category: "lidar",
            subcategory: "autol-lidar-sensors",
            price: null,
            features: [
              "Number of Channels : 32",
              "Range at: 250m",
              "Horizontal Field of View : 120°",
              "Horizontal angular resolution : 0.1°",
              "Vertical Field of View : 10°",
              "Vertical angular resolution : 0.3°",
              "Frame rate :10, 20, 25 Hz",
              "Reception technology : SiPM",
              "Size : 119 mm x 95 mm x 77 mm",
              "Weight : 730g",
              "Power consumption : 12V, 1A",
              "Enviromental protection : IP67",
              "Operating temperature : -40°C to +85°C",
              "Storage temperature : -40°C to +105°C",
              "Wavelength : 905 nm",
              "Laser Classification : Class 1 Eye Safe IEC60825-1:2014",
              "3D Lidar Data Point (raw data):3 echo",
              "Interface : 1000BAse-T1 (1000 Mbps)",
            ],
          },

          {
            id: "g192-lidar-sensor",
            name: "AUTOL G192",
            description:
              "Engineered with precision, AutoL's latest sensor technology encompasses an impressive array of 192 channels, delivering unparalleled high-resolution performance. Automotive-grade high-resolution long-range LiDAR (detection range over 300 meters), ideal for autonomous driving, robots, and perimeter surveillance. Designed to integrate seamlessly with vehicles operating at advanced levels of autonomy. G192 is ideally mounted on the vehicle roof, ensuring optimal functionality.",
            metaTitle: "AutoL G192 192-Channel Long-Range LiDAR | CoreBolt",
            metaDescription:
              "Buy the AutoL G192 lidar sensor: 192-channel automotive lidar, 300 m+ range, for autonomous driving, robots and perimeter security. Core Bolt India.",
            metaKeywords:
  "G192, AutoL, LiDARs, Engineered, AutoL, 192, Automotive, LiDAR, 300, CORE BOLT",
              overview :"AUTOL G192 (Ask Price). The AutoL G192 is a high-performance 192-channel long-range imaging LiDAR engineered to deliver precise 3D environmental perception for autonomous driving, intelligent transportation systems, robotics, and smart infrastructure. Designed with automotive-grade reliability, the sensor provides an impressive detection range of up to 300 meters while maintaining exceptional accuracy and stable performance in demanding outdoor environments. Its 120° horizontal field of view and 25° vertical field of view enable comprehensive scene coverage, allowing vehicles and intelligent systems to detect and classify objects with confidence. Featuring dual-return capability, the G192 captures detailed point cloud data even in complex environments where multiple objects or partially obstructed targets are present. The sensor supports automotive Ethernet communication, ensuring seamless integration with advanced perception platforms, autonomous vehicles, and industrial automation systems. Built to withstand harsh operating conditions, the G192 offers IP67 and IP69K protection, a wide operating temperature range, and compliance with automotive environmental standards for reliable long-term operation. With high point cloud density, fast data transmission, and support for ROS2 development, the AutoL G192 enables developers and system integrators to build accurate, reliable, and scalable perception solutions for next-generation mobility, robotics, security, and smart city applications.",
               overviewTitle:"AutoL G192 192-Channel Long-Range Imaging LiDAR for Autonomous Driving & Robotics ",
            image:
              "https://assets.core-bolt.com/website-assets/g192-lidar-sensor.jpeg",
          
            fileUrl:
              "https://assets.core-bolt.com/website-assets/G192-Datasheet_AutoL-260612.pdf",
            category: "lidar",
            subcategory: "autol-lidar-sensors",
            price: null,
            features: ["Number of Channels : 192",
"Range at : 300m",
"Horizontal Field of View : 120°",
"Horizontal angular resolution : 0.1°",
"Vertical Field of View : 25°",
"Vertical angular resolution : 0.1°",
"Frame rate : 10, 20 Hz",
"Reception technology : SPAD",
"Size : 182 mm x 45 mm x 116 mm",
"Weight : 900g",
"Power consumption : 12V, 1A",
"Environmental protection : IP67",
"Operating temperature : -40°C to +85°C",
"Storage temperature : -40°C to +105°C",
"Wavelength : 905 nm",
"Laser Classification : Class 1 Eye Safe IEC60825-1:2014",
"3D Lidar Data Point (raw data) : 3 echo",
"Interface : 1000Base-T1 (1000 Mbps)",
],
          },
          {
            id: "s56-lidar-sensor",
            name: "AUTOL S56",
            description:
              "S56 is a fixed LiDAR with no moving parts, reducing physical wear and tear. It is applicable across various industries, including smart cities, robotics, perimeter surveillance, and smart factories.",
            metaTitle: "AutoL S56 56-Channel Imaging LiDAR Sensor | CoreBolt",
            metaDescription:
              "Buy the AutoL S56 lidar sensor (MOQ 100 pcs): fixed no-moving-parts lidar for smart cities, robotics and smart factories. Ask price from Core Bolt.",
            metaKeywords:
  "S56, AutoL, LiDARs, S56, LiDAR, CORE BOLT",
              overview:"AUTOL S56 (Ask Price, MOQ 100 pcs). The AutoL S56 is a high-performance 56-channel solid-state imaging LiDAR engineered to deliver reliable and accurate 3D perception for robotics, autonomous vehicles, industrial automation, smart city infrastructure, and intelligent security applications. Designed without moving mechanical components, the S56 offers enhanced durability, reduced maintenance requirements, and long-term operational stability in demanding environments. Its compact form factor combines with a wide 120° horizontal field of view and 35° vertical field of view to provide comprehensive environmental coverage, enabling accurate object detection, localization, obstacle avoidance, and navigation. With a detection range of up to 100 meters and high-resolution point cloud generation, the S56 captures detailed environmental data that supports advanced perception algorithms and real-time decision-making. The sensor delivers exceptional measurement accuracy while maintaining stable performance under varying lighting and weather conditions, making it suitable for both indoor and outdoor deployments. Featuring Gigabit Ethernet connectivity, TCP and HTTP APIs, precise time synchronization, and ROS support, the AutoL S56 integrates seamlessly with autonomous systems and industrial control platforms. Its automotive-grade design, wide operating temperature range, and low power consumption ensure dependable operation in harsh environments where reliability is critical. Whether deployed in autonomous mobile robots, smart factories, perimeter surveillance, or intelligent transportation systems, the AutoL S56 provides consistent, high-quality 3D sensing that enables safer, smarter, and more efficient automation solutions. Buy the AutoL S56 lidar sensor (MOQ 100 pcs): fixed no-moving-parts lidar for smart cities, robotics and smart factories. Ask price from Core Bolt.",
              overviewTitle:"AutoL S56 56-Channel Imaging LiDAR for Robotics, Automation & Smart Infrastructure",
            image:
              "https://assets.core-bolt.com/website-assets/s56-lidar-sensor.jpeg",
          
            fileUrl:
             "https://assets.core-bolt.com/website-assets/S56-Datasheet_AutoL-260612.pdf",
            category: "lidar",
            subcategory: "autol-lidar-sensors",
            price: null,
            features: ["Number of Channels : 56",
"Range at : 100m",
"Horizontal Field of View : 120°",
"Horizontal angular resolution : 0.625°",
"Vertical Field of View : 35°",
"Vertical angular resolution : 0.625°",
"Frame rate : 10, 20 Hz",
"Size : 100 mm x 70 mm x 70 mm",
"Weight : 800g",
"Power consumption : 12V, 1A",
"Operating temperature : -40°C to +85°C",
"Storage temperature : -40°C to +105°C",
"Wavelength : 940 nm VCSEL",
"Laser Classification : Class 1 Eye Safe IEC60825-1:2014",
"3D Lidar Data Point (raw data) : 3 echo",
"Interface : 1000Base-T (1 Gbps)",],
          },
           
          {
            id: "s192-lidar-sensor",
            name: "AUTOL S192",
            description:
              "S192 is a fixed LiDAR with an ultra-wide 90° vertical field of view (FoV), designed without moving parts for continuous operation and high reliability against vibration and impact. It is suitable for various industries, including smart cities, robotics, perimeter surveillance, and smart factories.A long-range sensor delivering high-resolution perception for large-scale infrastructure monitoring, security, and autonomous mobility.",
            metaTitle: "AutoL S192 192-Channel Wide FoV Imaging LiDAR | CoreBolt",
            metaDescription:
              "Buy the AutoL S192 lidar sensor: fixed 90deg ultra-wide vertical FoV lidar for smart cities, robotics and security. Ask price from Core Bolt India. ",
            metaKeywords:
  "S192, AutoL, LiDARs, S192, LiDAR, FoV, CORE BOLT",
            overviewTitle: "AutoL S192 192-Channel Wide FoV Imaging LiDAR",
            overview:
              " AUTOL S192 (Ask Price) .The AutoL S192 is a next-generation 192-channel wide field-of-view imaging LiDAR designed to deliver high-resolution 3D perception for robotics, autonomous vehicles, industrial automation, intelligent transportation, and smart infrastructure. Engineered with a compact solid-state architecture, the S192 provides exceptional reliability without moving mechanical components, ensuring stable performance even in high-vibration and harsh operating environments. Its expansive 120° horizontal and 90° vertical field of view enables comprehensive environmental coverage, allowing autonomous systems to accurately detect, classify, and track objects across a broad sensing area. With a detection range of up to 100 meters, precise ranging accuracy, and dense point cloud generation, the S192 delivers detailed environmental data that enhances localization, obstacle detection, mapping, and navigation performance. The sensor supports dual-return operation, Gigabit Ethernet communication, and standard UDP and HTTP APIs, making integration with autonomous platforms, robotics, and industrial systems fast and efficient. Designed to operate reliably in temperatures ranging from -40°C to 85°C, the S192 features IP67 and IP69K protection for dependable performance in demanding outdoor environments. Support for ROS2, precision time synchronization, and high-speed data transmission further simplifies deployment in advanced perception systems. Combining a wide field of view, high-resolution imaging, automotive-grade durability, and flexible integration capabilities, the AutoL S192 provides an ideal LiDAR solution for applications that require accurate real-time environmental perception, improved operational safety, and reliable long-term performance. Buy the AutoL S192 lidar sensor: fixed 90deg ultra-wide vertical FoV lidar for smart cities, robotics and security. Ask price from Core Bolt India. ",
            image:
              "https://assets.core-bolt.com/website-assets/S192_1920.png",
            
            fileUrl:
            "https://assets.core-bolt.com/website-assets/S192-Datasheet_AutoL-260612.pdf",
            category: "lidar",
            subcategory: "autol-lidar-sensors",
            price: null,
            features: ["Number of Channels : 192",
"Range at : 50m",
"Horizontal Field of View : 120°",
"Horizontal angular resolution : 0.47°",
"Vertical Field of View : 90°",
"Vertical angular resolution : 0.47°",
"Frame rate : 10, 20 fps",
"Size : 100 mm x 80 mm x 50 mm",
"Weight : 800g",
"Power consumption : 12V, 1A",
"Operating temperature : -40°C to +85°C",
"Storage temperature : -40°C to +105°C",
"Wavelength : 940 nm VCSEL",
"Laser Classification : Class 1 Eye Safe IEC60825-1:2014",
"3D Lidar Data Point (raw data) : 3 echo",
"Interface : 1000Base-T (1 Gbps)",],
          },
        ],
      },
      /*{
        id: "sick",
        name: "Sick",
        description:
          "Automation in manufacturing and logistics – sensor solutions from SICK are the key to digitalizing industry.",
        image:
          "https://assets.core-bolt.com/website-assets/sick-lidar-sensor-hero-image.jpg",
        metaTitle:
          "SICK LiDAR & Laser Scanner Solutions | Industrial Automation, Robotics & Navigation ",
        metaDescription:
          "Explore SICK LiDAR and laser scanner solutions for robotics, industrial automation, AMRs, AGVs, warehouse automation, safety monitoring, object detection, mapping, and autonomous navigation applications. ",
        metaKeywords:
          "sick, sick lidar, SICK LiDAR,  SICK laser scanner, SICK sensor, SICK LiDAR India, SICK LiDAR price, SICK LiDAR manual",
        overview:
          "CoreBolt provides advanced SICK LiDAR and laser scanner solutions designed for industrial automation, robotics, warehouse automation, autonomous mobile robots (AMRs), automated guided vehicles (AGVs), intelligent transportation systems, and smart infrastructure applications. Powered by proven SICK sensing technology, these solutions enable accurate environmental perception, obstacle detection, localization, mapping, and navigation in demanding industrial environments. CoreBolt offer SICK LiDAR technologies and SICK laser scanner solutions for applications requiring reliable detection, safety monitoring, navigation, and automation. SICK sensors deliver high-precision measurement and real-time environmental awareness, helping organizations improve operational efficiency, safety, and autonomous system performance across industrial and commercial deployments. Whether deploying mobile robots, autonomous navigation systems, warehouse automation platforms, smart manufacturing solutions, or industrial safety applications, SICK LiDAR solutions provide dependable performance in complex operating conditions. Designed to support real-time object detection, collision avoidance, localization, and intelligent automation, SICK technologies help accelerate the deployment of advanced robotic and industrial automation systems while simplifying integration with AI edge computing platforms. ",
        overviewTitle:
          "SICK LiDAR & Laser Scanner Solutions for Industrial Automation, Robotics & Autonomous Navigation",
        products: [
          {
            id: "picoscan100-lidar-sensor",
            name: "picoScan100",
            description:
              " 2D LiDAR sensor – high-performance and cost-effective in compact housing With a large scanning range, fine angular resolution and high sensitivity, the 2D picoScan100 LiDAR sensors are setting new standards.",
            metaTitle: "SICK PICOSCAN100 Core LiDAR | Price & Specifications",
            metaDescription:
              "Discover SICK PICOSCAN100 Core LiDAR with high-precision sensing. Check features, manual, and latest price for industrial automation.",
            metaKeywords:
              "sick picoscan100 core lidar, sick picoscan 100 crore lidar price, sick picoscan 100 crore lidar manual",
            image:
              "https://assets.core-bolt.com/website-assets/sick-picoscan100-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/picoScan100-3.avif",
              "https://assets.core-bolt.com/website-assets/picoScan100-4.avif",
              "https://assets.core-bolt.com/website-assets/picoScan100-5.avif",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Scanning range: 75 m (90% remission)",
              "angular resolution: 0.5° to 0.05°",
              "Scan rate: 15 Hz to 50 Hz",
              " Drivers: ROS, C++ and Python",
            ],
          },
          {
            id: "tim-lidar-sensor",
            name: "TiM",
            description:
              "Compact 2D LiDAR sensor – cost-effective and high performing.The TiM 2D LiDAR sensors offer a high performance for field evaluation and measurement data output in a compact housing.The TiM detects the entire scanning range without gaps thereby ensuring a consistently high measurement quality.  ",
            metaTitle: "SICK Tim LiDAR | Price & Features",
            metaDescription:
              "Explore SICK Tim LiDAR for precision scanning and automation. Check specs, manual, and latest price online.",
            metaKeywords:
              "sick tim lidar, sick tim lidar price, sick tim lidar manual",
            image:
              "https://assets.core-bolt.com/website-assets/sick-tim-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/TiM-1.avif",
              "https://assets.core-bolt.com/website-assets/TiM-2.avif",
              "https://assets.core-bolt.com/website-assets/TiM-3.avif",
              "https://assets.core-bolt.com/website-assets/TiM-4.avif",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Sensing range: upto 25 m",
              "Working range: upto 270°",
              "Angular resolution :1° to 0.33°",
              "High ambient light immunity :upto 80,000 lx",
              "Enclosure rating :upto IP67",
            ],
          },
          {
            id: "multiscan100-lidar-sensor",
            name: "multiScan100",
            description:
              "The multiScan100 3D LiDAR sensor generates a large 3D point cloud in which people and objects can be detected. The point cloud makes the multiScan100 suitable for wide-area environment perception and therefore also for large machines.  ",
            metaTitle: "MultiScan100-S LiDAR | Price & Specifications",
            metaDescription:
              "Discover SICK MultiScan 100-SLiDAR with advanced scanning accuracy. View specs, manual, and the latest price online.",
            metaKeywords:
              "sick multiScan100-S lidar, sick multiScan100-S lidar price, sick multiScan100-S lidar manual",
            image:
              "https://assets.core-bolt.com/website-assets/sick-multiscan100-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/multiScan100-1.avif",
              "https://assets.core-bolt.com/website-assets/multiScan100-2.avif",
              "https://assets.core-bolt.com/website-assets/multiScan100-3.avif",
              "https://assets.core-bolt.com/website-assets/multiScan100-4.webp",
              "https://assets.core-bolt.com/website-assets/multiScan100-5.jpg",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "scan layers:16",
              " vertical aperture angle: upto 65°",
              "Horizontal aperture angle : up of 360°",
              "High-resolution : 0° scan layer or uniform horizontal and vertical resolution",
            ],
          },
          {
            id: "rms2000-lidar-sensor",
            name: "RMS2000",
            description:
              "2D radar sensor for reliable object detection in especially harsh weather conditions - The RMS2000 radar sensor detects objects very reliably, even under especially harsh ambient and weather conditions, e.g., in strong rain or snowfall, thick fog, or high dust loads.",
            metaTitle: "SICK RMS2000 LiDAR | Price, Manual & Specs",
            metaDescription:
              "Explore SICKRMS2000 LiDAR for reliable 2D detection. Check price, specifications, and user manual online.",
            metaKeywords:
              "sick rms2000 lidar, sick rms2000 lidar price, sick rms2000 manual, rms2000 sick",

            image:
              "https://assets.core-bolt.com/website-assets/sick-rms2000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/RMS2000-01.webp",
              "https://assets.core-bolt.com/website-assets/RMS2000-05.webp",
              "https://assets.core-bolt.com/website-assets/RMS2000-03.webp",
              "https://assets.core-bolt.com/website-assets/RMS2000-02.webp",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Radar technology:Modern FMCW",
              "Enclosure ratings: IP67 and IP69",
              "Base frequency : 61 GHz ",
              "bandwidth : 500 MHz",
            ],
          },
          {
            id: "lms4000-lidar-sensor",
            name: "LMS4000",
            description:
              "Very fast 2D LiDAR sensor for precise and demanding measuring tasks - The LMS4000 2D LiDAR sensor is particularly well-suited for use in intralogistics, material handling and in all areas in which goods must be quickly and systematically analyzed and moved.",
            metaTitle: "SICK LMS4000LiDAR | Price & Specifications",
            metaDescription:
              "Discover the SICK LMS4000 LiDAR for precision scanning. Check the latest price, features, and performance details online.",
            metaKeywords: "sick lms151-10100 lidar, sick LMS4000 lidar price",
            image:
              "https://assets.core-bolt.com/website-assets/sick-lms4000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LMS4000-01.avif",
              "https://assets.core-bolt.com/website-assets/LMS4000-03.jpg",
              "https://assets.core-bolt.com/website-assets/LMS4000-04.avif",
              "https://assets.core-bolt.com/website-assets/LMS4000-05.avif",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "High speed measurement : 600 Hz and fast data transmission with Gigabit Ethernet",
              "Connections:Industry-grade M12 ",
            ],
          },
          {
            id: "lms5xx-lidar-sensor",
            name: "LMS5xx",
            description:
              "High-performance 2D LiDAR sensor for accurate detection of far away objects - The LMS5xx 2D LiDAR sensor is the successor of the successful LMS2xx family. With numerous innovative functions, the LMS5xx increases the productivity of existing applications and opens up entirely new application possibilities. ",
            metaTitle: "SICK LMS5xx LiDAR | Price & User Manual",
            metaDescription:
              "Explore the SICK LMS5xx LiDAR with advanced scanning technology. Check price, specifications, and download the user manual.",
            metaKeywords:
              "sick lms5xx lidar, sick lms5xx lidar user manual, sick lms5xx lidar price",
            image:
              "https://assets.core-bolt.com/website-assets/sick-lms5xx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LMS5xx-01.avif",
              "https://assets.core-bolt.com/website-assets/LMS5xx-03.jpg",
              "https://assets.core-bolt.com/website-assets/LMS5xx-05.jpg",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Powerful: Efficient 2D LiDAR sensor for measuring ranges upto 130 m",
              "Compact housing upto enclosure rating : IP67 and integrated heating for outdoor devices",
            ],
          },

          {
            id: "rms1000-lidar-sensor",
            name: "RMS1000",
            description:
              "1D radar sensor for reliable object detection in especially harsh weather conditions - The RMS1000 radar sensor is designed to detect obstacles, even in the most adverse ambient conditions. Even in heavy rain or snowfall, dense fog and in very dusty environments, it detects objects reliably.",
            metaTitle: "SICK RMS1000 LiDAR | Specs & User Manual",
            metaDescription:
              "Discover SICK RMS1000 LiDAR with reliable detection accuracy. View detailed specs and access the official user manual online.",
            metaKeywords: "sick rms1000 , sick RMS1000  LiDAR  user manual",
            image:
              "https://assets.core-bolt.com/website-assets/sick-rms1000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/RMS1000-01.avif",
              "https://assets.core-bolt.com/website-assets/RMS1000-05.avif",
              "https://assets.core-bolt.com/website-assets/RMS1000-06.avif",
              "https://assets.core-bolt.com/website-assets/RMS1000-03.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "State-of-the-art : FMCW radar technology",
              "Digital : I/Os and additional data interfaces",
            ],
          },

          {
            id: "nav2xx-lidar-sensor",
            name: "NAV2xx",
            description:
              "Sophisticated 2D LiDAR sensor for navigation of automated guided vehicle systems.The NAV2xx 2D LiDAR sensors also work with precision and reliability in small and medium-sized vehicles. Thanks to its integrated heating, excellent vibration resistance, and enclosure rating upto IP 67, the NAV2xx even satisfies requirements for use outdoors or in cold storage",
            metaTitle: "SICK NAV2xx LiDAR | Specs & User Manual",
            metaDescription:
              "Discover SICK NAV2xx LiDAR with reliable detection accuracy. View detailed specs and access the official user manual online.",
            metaKeywords: "sick nav2xx , sick nav2xx  LiDAR  user manual",
            image:
              "https://assets.core-bolt.com/website-assets/sick-nav2xx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/NAV2xx-01.avif",
              "https://assets.core-bolt.com/website-assets/NAV2xx-02.avif",
              "https://assets.core-bolt.com/website-assets/NAV2xx-03.avif",
              "https://assets.core-bolt.com/website-assets/NAV2xx-05.avif",
              "https://assets.core-bolt.com/website-assets/NAV2xx-06.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Large working range : Reflector (30 m), 10% Remission (18 m), Spatial contours (50 m)",
              "High resistance to temperature:  IP 65 / IP 67,",
            ],
          },
          {
            id: "ld-mrs-lidar-sensor",
            name: "LD-MRS",
            description:
              "Suitable for use in harsh environments – 3D LiDAR sensor with multilayer technology. The LD-MRS multi-layer scanner is an efficient sensor solution for automation. It is immune to snow, rain and dust and is therefore particularly well-suited for rough outdoor industrial applications in stationary and mobile operation, such as in ports and surface mining, for measuring and for monitoring tasks as well as in industrial vehicles",
            metaTitle: "SICK LD-MRSLiDAR | Compact & Reliable Sensor",
            metaDescription:
              "Discover the SICK LD-MRS LiDAR for accurate object detection, compact design, and high reliability in automation and robotics.",
            metaKeywords:
              "sick ld-mrs lidar, sick ld-mrs lidar sensor, sick lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-mrs-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LD-MRS-02.avif",
              "https://assets.core-bolt.com/website-assets/LD-MRS-05.jpg",
              "https://assets.core-bolt.com/website-assets/LD-MRS-03.jpg",
              "https://assets.core-bolt.com/website-assets/LD-MRS-04.png",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Weatherproof : IP69K enclosure rating",
              "Lightweight, compact design: Approx. 0.77 kg / 1 kg",
              "Wide temperature range: –40 °C to +70 °C",
              "Low power consumption: 8 watts",
            ],
          },
          {
            id: "mrs6000-lidar-sensor",
            name: "MRS6000",
            description:
              "3D LiDAR sensor with multilayer technology and large vertical aperture angle. The MRS6000 3D LiDAR sensor uses a high scanning point density and an aperture angle of 120° to reliably detect its environment across 24 layers. ",
            metaTitle: "SICK MRS6000 LiDAR | High-Precision 3D Sensor",
            metaDescription:
              "Explore the SICK MRS6000 LiDAR for advanced 3D sensing, precise mapping, and reliable performance in industrial and autonomous applications.",
            metaKeywords:
              "sick mrs6000 lidar, sick mrs6000 lidar manual, sick mrs6000 lidar price, sick lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-mrs6000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/MRS6000-01.avif",
              "https://assets.core-bolt.com/website-assets/MRS6000-04.avif",
              "https://assets.core-bolt.com/website-assets/MRS6000-05.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Reliability :  Multi-echo technology",
              "Convenient and customer-friendly : Web server interface for configuration",
            ],
          },
          {
            id: "lms1000-lidar-sensor",
            name: "LMS1000",
            description:
              "Fast 2D LiDAR sensor saves time during object detection The LMS1000 is SICK’s quickest 2D LiDAR sensor at 150 Hz. Even when the weather is bad, the high speed and exceptional performance ensure that the scanner collects large data quantities and detects even very quick objects.",
            metaTitle: "SICK LMS1000 LiDAR | Advanced 3D Mapping Sensor",
            metaDescription:
              "Discover the SICK LMS1000 LiDAR for high-accuracy 3D scanning, mapping, and navigation with industrial grade performance and reliability.",
            metaKeywords:
              "sick lms1000 lidar, sick lms1000 lidar user manual, sick lms1000 lidar price, sick lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-lms1000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LMS1000-01.avif",
              "https://assets.core-bolt.com/website-assets/LMS1000-05.avif",
              "https://assets.core-bolt.com/website-assets/LMS1000-06.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "High weather resistance and reliability:  HDDM+ with multi-echo technology",
            ],
          },
          {
            id: "lmc1xx-lidar-sensor",
            name: "LMC1xx",
            description:
              "2D LiDAR sensor with VdS certificate – protects against intrusion and robbery.The LMC1xx product family has been developed for class “C” intrusion and hold-up systems (German/Austrian security certificate) which are compliant with VdS and VSÖ. LMC (laser measurement certified) consists of a 2D LiDAR sensor, mounting kit, and special firmware",
            metaTitle: "SICK LMC1xx LiDAR | Precision 3D Detection Sensor",
            metaDescription:
              "Explore the SICK LMC1xx LiDAR for precise 3D sensing, mapping, and navigation. Check price, specs, and manual for industrial use.",
            metaKeywords:
              "sick lmc1xx lidar, sick lmc1xx lidar price, sick lmc1xx lidar manual, sick lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-lmc1xx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LMC1xx-01.avif",
              "https://assets.core-bolt.com/website-assets/LMC1xx-02.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Flexible connection : DC 9 V upto 30 V",
              "High detection range : 20 m both horizontal and vertical",
            ],
          },
          {
            id: "s100-lidar-sensor",
            name: "S100",
            description:
              "Simple 2D LiDAR sensor for object detection Damaged goods and defective machines or plant can inhibit or stop processes, thus leading to expensive downtimes. An efficient and cost-effective remedy is now available: the new S100 2D LiDAR sensor, which has been developed specifically for fields of application in which personal protective equipment is not required. The S100 detects faults, monitors distances, and prevents possible collisions",
            metaTitle: "SICK S100 LiDAR | High-Performance 3D Sensor",
            metaDescription:
              "Get the SICK S100 LiDAR for precise 3D detection and mapping. Check price, specs, and features for advanced industrial applications.",
            metaKeywords:
              "sick s100 lidar, sick s100 lidar price, sick lidar, 3d lidar sensor",
            image:
              "https://assets.core-bolt.com/website-assets/sick-s100-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/S100-03.avif",
              "https://assets.core-bolt.com/website-assets/S100-04.webp",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "sensor :Small, lightweight and economical measurement sensor",
            ],
          },
          {
            id: "nav3xx-lidar-sensor",
            name: "NAV3xx",
            description:
              "High performance 2D LiDAR sensor for navigation of automated guided vehicles.The 2D LiDAR sensors in the NAV product family provide the highest level of performance for the navigation of automated guided vehicles (AGVs). ",
            metaTitle: "SICK NAV3xx LiDAR | Reliable Long-Range Sensor",
            metaDescription:
              "Explore the SICK NAV3xx LiDAR for accurate long-range detection and performance in harsh environments. Ideal for industrial automation.",
            metaKeywords:
              "sick nav3xx lidar, sick lidar, long-range lidar sensor, industrial lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-nav3xx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/NAV3xx-02.avif",
              "https://assets.core-bolt.com/website-assets/NAV3xx-03.avif",
              "https://assets.core-bolt.com/website-assets/NAV3xx-04.avif",
              "https://assets.core-bolt.com/website-assets/NAV3xx-05.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "Long scanning range: upto 70 m on reflectors (upto 35 m on black targets)",
              "Angular resolution : upto 0.1 degrees",
            ],
          },
          {
            id: "lrs4000-lidar-sensor",
            name: "LRS4000",
            description:
              "Rugged 2D LiDAR sensor for precise detection of small, far away objects.The LMS4000 2D LiDAR sensor is particularly well-suited for use in intralogistics, material handling and in all areas in which goods must be quickly and systematically analyzed and moved. SICK offers the ideal solution for measuring, evaluating and processing objects in terms of position, shape, volume or surface quality.",
            metaTitle: "SICK LRS4000-LITE LiDAR | Compact & Precise Sensor",
            metaDescription:
              "Discover the SICK LRS4000 LiDAR for reliable distance measurement and object detection. Perfect for industrial automation systems.",
            metaKeywords:
              "sick lrs40000 lidar, sick lidar, industrial lidar sensor, compact lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-lrs4000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LRS4000-01.avif",
              "https://assets.core-bolt.com/website-assets/LRS4000-02.avif",
              "https://assets.core-bolt.com/website-assets/LRS4000-03.avif",
              "https://assets.core-bolt.com/website-assets/LRS4000-04.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              " Measuring range : 300 m and min. 120 m at 10% remission",
              "High angular resolution : upto 0.02",
              "Frequency resolution ratio : upto 0.04° at 25 Hz",
            ],
          },
          {
            id: "lms1xx-lidar-sensor",
            name: "LMS1xx",
            description:
              "Precise, reliable, compact 2D LiDAR sensor for indoor and outdoor applications.The LMS1xx 2D LiDAR sensors form part of the extensive portfolio of 2D laser scanner from SICK, and offer an efficient and cost-effective alternative to other solutions for both indoor and outdoor use",
            metaTitle: "LMS1xx LiDAR | High-Performance Sensor",
            metaDescription:
              "Get the SICK LMS1xx LiDAR for precise distance measurement and robust 2D detection in industrial automation and safety applications.",
            metaKeywords:
              "sick lms1xx lidar, sick lidar, industrial lidar sensor, 2d lidar, sick automation lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-lms1xx-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LMS1xx-01.avif",
              "https://assets.core-bolt.com/website-assets/LMS1xx-02.avif",
            ],
            fileUrl: null,
            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "compact housing with enclosure rating : upto IP 67, ",
              " temperature range :–40 °C to +60 °C",
            ],
          },
          {
            id: "mrs1000-lidar-sensor",
            name: "MRS1000",
            description:
              "Outdoor is our fourth dimension With the MRS1000 multi-layer scanner, SICK has developed a 3D LiDAR sensor which accurately and reliably detects and measures objects in good time and in multiple dimensions.",
            metaTitle: "SICK MRS1000 LiDAR | Reliable 2D Sensing",
            metaDescription:
              "Discover the SICK MRS1000 LiDAR for accurate 2D detection and industrial automation with dependable performance and long-range sensing.",
            metaKeywords:
              "sick mrs1000 lidar, sick lidar, 2d lidar sensor, industrial lidar, sick automation lidar",
            image:
              "https://assets.core-bolt.com/website-assets/sick-mrs1000-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/MRS1000-01.avif",
              "https://assets.core-bolt.com/website-assets/MRS1000-02.avif",
              "https://assets.core-bolt.com/website-assets/MRS1000-04.avif",
              "https://assets.core-bolt.com/website-assets/MRS1000-05.avif",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: ["Four spread layers : 275° aperture angle"],
          },
          {
            id: "ld-oem-lidar-sensor",
            name: "LD-OEM",
            description:
              "2D LiDAR sensor with a large scanning range.The LD-OEM 2D LiDAR sensor has been designed for use in harsh ambient conditions, such as those found in the steel and port automation industries.",
            metaTitle: "SICK LD-OEM LiDAR | High-Performance Sensor",
            metaDescription:
              "Get the SICK LD-OEM LiDAR for precise long-range detection. Explore specs, price, and manual for advanced industrial sensing.",
            metaKeywords:
              "sick ld-oem lidar, sick ld-oem lidar price, sick ld-oem lidar manual, sick lidar sensor",
            image:
              "https://assets.core-bolt.com/website-assets/sick-ld-oem-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/LD-OEM-01.webp",
              "https://assets.core-bolt.com/website-assets/LD-OEM-03.png",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "technology: Eye-safe laser technology",
              "High angular resolution : upto 0.125 degrees",
            ],
          },
          {
            id: "ld-lrs-lidar-sensor",
            name: "LD-LRS",
            description:
              "2D LiDAR sensor with a large scanning range makes outdoor applications possible The superior technology of the LD-LRS 2D LiDAR sensor with scanning ranges of upto 250 m automates ship loading operations when using quay cranes, greatly reducing the time spent in the loading port. The high-performance laser optics system performs non-contact scanning of the container stack and precisely detects all obstacles impeding the movement.",
            metaTitle: "SICK LiDAR LRS| LD-LRS 3D Detection Sensor",
            metaDescription:
              "Explore the SICK LiDAR LRS and LD-LRS for precise 3D detection and navigation. Ideal for automation, robotics, and safety systems.",
            metaKeywords:
              "sick lidar lrs sick ld-lrs lidar, 3d detection sensor, sick lidar, industrial lidar sensor",
            image:
              "https://assets.core-bolt.com/website-assets/sick-ld-lrs-lidar-sensor.png",
            images: [
              "https://assets.core-bolt.com/website-assets/SICK-LD-LRS-02.avif",
              "https://assets.core-bolt.com/website-assets/SICK-LD-LRS-03.jpg",
              "https://assets.core-bolt.com/website-assets/SICK-LD-LRS-04.jpeg",
            ],
            fileUrl: null,

            category: "lidar",
            subcategory: "sick",
            price: null,
            features: [
              "High angular resolution :upto 0.0625 degrees",
              "Synchronous monitoring : upto six different fields",
            ],
          },
        ],
      },*/
        
    ],
  },
  {
    id: "radar",
    name: "Radars",
    // Placeholder image (the LiDAR hero) until a radar image is added.
    image: "https://assets.core-bolt.com/website-assets/Continental_ARS_548_RDI_1.webp",
    description:
      "77 GHz long-range radar sensors from Continental for object detection, collision avoidance, distance and velocity measurement, and industrial area monitoring.",
    metaTitle: "Radar Sensors | Continental 77 GHz Long-Range Radar",
    metaDescription:
      "Continental ARS 408-21 and ARS 548 RDI 77 GHz long-range radar sensors for object detection, collision avoidance and industrial monitoring. Pricing from CoreBolt.",
    metaKeywords:
      "radar sensor, 77 GHz radar, long range radar, Continental radar, Continental ARS 408-21, Continental ARS 548 RDI, 4D radar sensor, industrial radar sensor, collision avoidance radar, object detection radar",
    overviewTitle:
      "Continental 77 GHz Long-Range Radar Sensors for Object Detection and Collision Avoidance",
    overview:
      "CoreBolt supplies Continental 77 GHz long-range radar sensors for vehicles, mobile machinery, autonomous systems and industrial area monitoring. The ARS 408-21 measures distance and relative velocity of objects up to 250 m over a high-speed CAN interface, while the ARS 548 RDI adds elevation measurement for 3D/4D object detection up to 301 m with a BroadR-Reach Ethernet interface. Both sensors work in rain, fog, dust and darkness, and their rugged, high-pressure-washable housings suit demanding outdoor and industrial environments.",
    products: [
      {
        id: "continental-ars-408-21-long-range-radar",
        name: "Continental ARS 408-21",
        description:
          "Continental ARS 408-21 is a compact 77 GHz long-range radar sensor designed for vehicle collision avoidance, object detection, distance and velocity measurement, and industrial area monitoring.",

        metaTitle: "Continental ARS 408-21 Long Range Radar Sensor",

        metaDescription:
          "Explore the Continental ARS 408-21 77 GHz long-range radar for collision avoidance, object detection, velocity measurement and industrial monitoring.",

        metaKeywords:
          "Continental ARS 408-21, ARS 408-21 radar, Continental ARS 408-21 radar sensor, ARS 408-21 price, buy ARS 408-21, 77 GHz radar sensor, long range radar sensor, industrial radar sensor, collision avoidance radar, vehicle radar sensor, object detection radar",

        overview:
          "The Continental ARS 408-21 is a compact 77 GHz long-range radar sensor designed for reliable distance and relative velocity measurement, object detection, and collision avoidance. Based on Frequency Modulated Continuous Wave (FMCW) technology, the sensor measures the distance and velocity of natural, non-reflector targets in a single measurement cycle. It also provides angular information to support object detection and environmental awareness in industrial and vehicle-related applications. The ARS 408-21 supports long-range measurements up to 250 m, with additional near-range coverage across wider azimuth angles. Its real-time scanning capability and digital beamforming architecture enable the detection and classification of objects in challenging environments. Typical applications include collision avoidance for vehicles and autonomous systems, long-range headway control, hazardous-area monitoring, object classification, and detection in areas with limited visibility. The sensor features a rugged housing, self-monitoring functionality, and a high-speed CAN interface operating at 500 kbit/s. With configurable identification settings and collision avoidance regions, the ARS 408-21 can be adapted to specific application requirements. Its compact dimensions, broad operating temperature range, and resistance to dust, water exposure, and high-pressure cleaning make it suitable for demanding industrial environments and mobile machinery applications.",

        overviewTitle:
          "Continental ARS 408-21 77 GHz Long-Range Radar for Object Detection and Collision Avoidance",

        image: "https://assets.core-bolt.com/website-assets/Continental-ARS-408-21.webp",
        images: [
          "https://assets.core-bolt.com/website-assets/Continental_ARS_408-21_1.webp",
          "https://assets.core-bolt.com/website-assets/Continental_ARS_408-21_2.webp",
          "https://assets.core-bolt.com/website-assets/Continental_ARS_408-21_3.webp",
          "https://assets.core-bolt.com/website-assets/Continental_ARS_408-21_4.webp",
        ],

        fileUrl: "https://assets.core-bolt.com/website-assets/ARS-408-21.pdf",

        category: "radar",

        price: null,

        features: [
          "Radar Frequency: 76–77 GHz",
          "Maximum Standard Distance Range: 250 m",
          "Near-Range Coverage: 0.20–70 m / 100 m at 0° to ±45°",
          "Near-Range Coverage at Wider Angles: 0.20–20 m at ±60°",
          "Distance Resolution: Up to 1.79 m far range; 0.39 m near range",
          "Distance Accuracy: ±0.40 m far range; ±0.10 m near range",
          "Azimuth Field of View: ±9° far range; ±60° near range",
          "Elevation Field of View: 14° far range; 20° near range",
          "Velocity Measurement Range: -400 to +200 km/h",
          "Velocity Resolution: 0.37 km/h far range; 0.43 km/h near range",
          "Velocity Accuracy: ±0.1 km/h",
          "Measurement Cycle Time: Approximately 72 ms",
          "Antenna Configuration: 4 TX / 2 × 6 RX; 24 channels",
          "Measurement Technology: FMCW with digital beamforming",
          "Power Supply: 8–32 V DC",
          "Typical Power Consumption: 6.6 W",
          "Maximum Peak Power Consumption: 12 W",
          "Operating Temperature: -40°C to +85°C",
          "Storage Temperature: -40°C to +90°C",
          "Interface: 1 × high-speed CAN, 500 kbit/s",
          "Protection Rating: IP6K9K and IP6K7",
          "Dimensions: 138 × 91 × 31 mm",
          "Weight: Approximately 320 g",
          "Self-Monitoring: Fail-safe sensor monitoring",
          "Configurable Settings: Up to 8 IDs and 8 collision avoidance regions",
          "Optional Extended Range: Up to 1200 m with a special software version for high-RCS targets and a clear field of view"
        ]
      },

      {
        id: "continental-ars-548-rdi-long-range-radar",
        name: "Continental ARS 548 RDI",
        description:
          "Continental ARS 548 RDI is a 77 GHz 3D/4D long-range radar sensor that measures distance, speed, azimuth and elevation for advanced object detection and environmental monitoring.",

        metaTitle: "Continental ARS 548 RDI 3D/4D Long Range Radar",

        metaDescription:
          "Discover the Continental ARS 548 RDI 77 GHz 3D/4D radar for long-range object detection, distance, speed and angle measurement with Ethernet output.",

        metaKeywords:
          "Continental ARS 548 RDI, ARS 548 RDI radar, Continental ARS 548 RDI sensor, ARS 548 RDI price, buy ARS 548 RDI, 3D radar sensor, 4D radar sensor, 77 GHz radar, long range radar sensor, Ethernet radar sensor, object detection radar, industrial radar, elevation measurement radar",

        overview:
          "The Continental ARS 548 RDI is a 77 GHz 3D/4D long-range radar sensor designed to measure object distance, relative speed, azimuth angle, and elevation angle within a single measurement cycle. Using pulse compression with stepped frequency modulation, the sensor provides improved range resolution throughout its field of view. It supports a standard distance measurement range of up to 301 m, with extended-range configurations possible for suitable applications. The ARS 548 RDI provides target information through its Radar Detection Interface (RDI), supporting detailed environmental perception and object detection. Its high-resolution angular measurements help distinguish objects and determine their positions in the surrounding environment. Typical applications include collision warning, long-range area monitoring, object classification, height measurement, and detection in demanding operating environments. The sensor uses digital beamforming with 192 virtual antennas and provides a BroadR-Reach Ethernet interface operating at 100 Mbit/s. Its rugged construction, wide operating temperature range, and resistance to dust and high-pressure water cleaning support deployment in demanding environments. The ARS 548 RDI also supports configurable mounting orientation and an extended measurement range, making it suitable for advanced sensing systems requiring detailed object-level radar data. Its combination of distance, velocity, azimuth, and elevation measurements provides useful environmental information for intelligent monitoring and autonomous system applications.",

        overviewTitle:
          "Continental ARS 548 RDI 3D/4D Radar Sensor for Long-Range Object Detection and Monitoring",

        image: "https://assets.core-bolt.com/website-assets/Continental-ARS-548-RDI.webp",
        images: [
          "https://assets.core-bolt.com/website-assets/Continental_ARS_548_RDI_1.webp",
          "https://assets.core-bolt.com/website-assets/Continental_ARS_548_RDI_2.webp",
          "https://assets.core-bolt.com/website-assets/Continental_ARS_548_RDI_3.webp"
        ],

        fileUrl: "https://assets.core-bolt.com/website-assets/Datasheet_ARS548RDI.pdf",
 
        category: "radar",

        price: null,

        features: [
          "Radar Frequency: 76–77 GHz",
          "Standard Distance Range: 0.2–301 m",
          "Extended Distance Range: Up to approximately 1514 m, depending on configuration",
          "Distance Resolution: 0.22 m",
          "Distance Accuracy: ±0.15 m, depending on ego speed",
          "Azimuth Field of View: ±60° internal processing; ±50° RDI output",
          "Elevation Field of View: ±4° to ±14°, depending on distance",
          "Azimuth Beam Width: 1.2° to 1.68°",
          "Elevation Beam Width: 2.3°",
          "Azimuth Angle Accuracy: ±0.1° to ±0.5°, depending on angle",
          "Elevation Angle Accuracy: ±0.1°",
          "Velocity Measurement Range: -400 to +200 km/h",
          "Velocity Resolution: 0.35 km/h",
          "Velocity Accuracy: ±0.1 km/h",
          "Measurement Cycle Time: Approximately 50 ms for complete field-of-view coverage",
          "Antenna Architecture: 192 virtual antennas with digital beamforming",
          "Antenna Configuration: 16 RX and 12 TX",
          "Power Supply: 8.5–17 V DC",
          "Typical Power Consumption: 18 W",
          "Maximum Power Consumption: Approximately 23 W",
          "Peak Current: Approximately 3.0 A",
          "Operating Temperature: -40°C to +85°C",
          "Storage Temperature: -40°C to +105°C",
          "Interface: 1 × BroadR-Reach Ethernet, 100 Mbit/s",
          "Protection Rating: IPx6K/9K water protection and IP6Kx dust protection",
          "Dimensions: 137 × 90 × 39 mm; 65.5 mm with connector",
          "Weight: Approximately 526 g, excluding cables",
          "Measurement Technology: Pulse compression with stepped frequency modulation",
          "Measured Parameters: Distance, relative speed, azimuth angle and elevation angle",
          "Mounting: Rear mounting bolts or a custom-designed bracket",
          "Configuration Options: Mounting position, orientation and extended measurement range"
        ]
      }
    ],
  },
  {
    id: "edge-computers",
    name: "Edge Computers",
    description:
      "CoreBolt Edge Computers deliver scalable edge computing performance for AI, machine vision, robotics, automation, and Industrial IoT applications. Powered by NVIDIA Jetson and Intel® architectures, our platforms enable real-time processing and reliable operation in demanding environments.",
    metaTitle:
      "AI Edge Computer Manufacturer in India | NVIDIA Jetson Edge Computing Solutions",
    metaDescription:
      "Explore Core Bolt Edge Computers for AI, machine vision, robotics, automation, and Industrial IoT applications. Powered by NVIDIA Jetson and Intel® architectures, our edge computing platforms deliver reliable performance, real-time processing, and scalable deployment for intelligent edge environments.",
    metaKeywords:
      "Edge AI computing manufacturer in India, Edge AI computing industrial supplier, Edge AI computing solution dealer, Edge AI computing manufacturer in India, Edge AI computing manufacturer, ai in edge computing, ai edge computing, edge computing a, iAI Edge Computer, Edge AI Computer, AI Edge Computing, Industrial AI Computer, NVIDIA Jetson AGX Orin, NVIDIA Jetson Edge Computing, Embedded AI Computer, GPU Edge Computer, Edge AI Device, AI Inference Computer, Computer Vision Edge AI, AI Edge Computer for Robotics, Industrial Edge Computing, Edge AI Platform, Machine Vision Computer, Smart Factory Edge AI, Industrial Automation AI, NVIDIA Jetson Orin NX,  NVIDIA Jetson Orin Nano, Edge Computing for Robotics, Industrial AI Edge Solutions ",
    overview:
      "Core Bolt Edge Computers deliver scalable computing platforms for AI, automation, machine vision, Industrial IoT, robotics, and intelligent edge applications. Combining NVIDIA Jetson AI platforms and Intel®-based industrial computing architectures, our solutions enable real-time data processing, edge intelligence, and reliable operation across diverse deployment environments.The Core Bolt Edge Computing portfolio includes AI edge computers, industrial edge computers, rugged embedded systems, and application-specific computing platforms designed for robotics, machine vision, industrial automation, transportation, smart infrastructure, and intelligent monitoring applications. With flexible expansion options, industrial-grade reliability, and support for demanding workloads, Core Bolt Edge Computers help organizations deploy advanced computing capabilities closer to where data is generated.Designed for long-term deployment and seamless integration, our edge computing solutions support AI inference, industrial control, real-time analytics, machine monitoring, and autonomous decision-making across modern industrial and intelligent edge environments.",
    overviewTitle:
      "Edge Computers - AI & Industrial Edge Computing Solutions ",
    image:
      "https://assets.core-bolt.com/website-assets/Edge-Computers-hero-image.jpg",
    subcategories: [
      {
        id: "hyperedge-series",
        name: "HyperEdge Series",
        brand: "NVIDIA",
        description:
          "HyperEdge is a comprehensive portfolio of AI edge computing solutions designed to bring real-time intelligence closer to where data is generated. Powered by NVIDIA Jetson technologies, the portfolio includes AI edge computers, rugged embedded platforms, developer kits, and system-on-modules engineered for robotics, machine vision, automation, transportation, and autonomous systems.",
        metaTitle:
          "Edge Artificial Intelligence Computers for Autonomous Machines in india",
        metaDescription: "",
        metaKeywords: "",
        overview:
          "CoreBolt HyperEdge Series delivers high-performance AI edge computing solutions powered by NVIDIA Jetson technologies for robotics, machine vision, autonomous systems, intelligent transportation, and advanced edge AI applications. Designed for real-time AI inference, computer vision, deep learning, and intelligent decision-making, HyperEdge platforms enable organizations to deploy powerful AI capabilities closer to where data is generated.From compact AI edge computers and rugged embedded platforms to NVIDIA Jetson System-on-Modules (SOMs) and developer kits, the HyperEdge portfolio provides scalable solutions for prototyping, development, and production deployment. With industrial-grade reliability, flexible expansion options, and support for demanding edge environments, HyperEdge solutions accelerate innovation across robotics, automation, smart infrastructure, surveillance, transportation, and next-generation autonomous systems.",
        overviewTitle:
          "AI Edge Computing Solutions for Robotics, Machine Vision & Autonomous Systems",
        products: [
          {
            id: "hyperedge-m100s-ai-edge-computer",
            name: "HyperEdge M100S",
            description:
              "HyperEdge M100S is a compact AI edge computer powered by NVIDIA Jetson Orin Nano and Orin NX modules, delivering up to 157 TOPS of AI performance for intelligent edge computing applications. Designed for machine vision, robotics, video analytics, smart manufacturing, and autonomous systems, it enables real-time AI inference and advanced data processing at the edge. Optimized for space-constrained deployments, its compact footprint and scalable architecture make it an ideal platform for organizations seeking reliable and cost-effective edge AI solutions.",
            metaTitle:
              " HyperEdge M100S AI Edge Computer with Jetson Orin | Core Bolt",
            metaDescription:
              " HyperEdge M100S AI edge computer with NVIDIA Jetson Orin for industrial AI, machine vision and robotics — powerful real-time edge inference.",
            metaKeywords:
              "HyperEdge M100S, HyperEdge M100S AI Edge Computer, HyperEdge M100S Price, Buy HyperEdge M100S, Industrial Edge AI Computer, NVIDIA Jetson Orin Computer, Jetson AGX Orin, Jetson Orin NX, Jetson Orin Nano, HyperEdge  M100S, HyperEdge M100S series nvidia, hyperedge  m100s ",
            overview:
              "The HyperEdge M100S is a high-performance AI Edge Computer designed for industrial AI, machine vision, robotics, autonomous systems, and advanced edge computing applications. Powered by the NVIDIA Jetson Orin platform, including Jetson Orin NX, and Jetson Orin Nano modules, it delivers powerful AI inference, accelerated computing, and real-time data processing capabilities at the edge. Built for demanding applications requiring computer vision, deep learning, AI analytics, object detection, video processing, and intelligent automation, the HyperEdge M100S provides reliable performance and scalable AI computing capabilities. Its industrial-grade architecture enables deployment in smart factories, intelligent transportation systems, robotics platforms, autonomous machines, and edge AI environments. The HyperEdge M100S AI Edge Computer is well suited for machine vision systems, industrial automation, smart surveillance, autonomous mobile robots (AMRs), automated guided vehicles (AGVs), and AI-powered inspection applications. Its advanced edge computing capabilities support real-time decision-making, predictive analytics, and intelligent system control. With powerful AI processing, flexible NVIDIA Jetson integration, and industrial-grade reliability, the HyperEdge M100S enables organizations to accelerate AI deployment and unlock the full potential of intelligent edge computing applications.",
            overviewTitle:
              "HyperEdge M100S AI Edge Computer for Industrial AI & Edge Computing",
            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-m100s-edge-computer.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/hyperedge-m100s-edge-ai-computer-in11.jpg",
              "https://assets.core-bolt.com/website-assets/hyperedge-m100s-edge-ai-computer-in-front11.jpg",
              "https://assets.core-bolt.com/website-assets/hyperedge-m100s-edge-ai-computer-in-side11.jpg",
               "https://assets.core-bolt.com/website-assets/hyperedge-m100s-edge-ai-computer-in-back11.jpg"
            ],

            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Smart Surveillance",
              "Robotics & Drones",
              "Smart Manufacturing ",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Orin NX SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
                {
                  name: "Orin Nano SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge M100S is engineered for compact AI computing and real-time edge intelligence in space-constrained deployments.",
              items: [
                {
                  title: "VIDEO ANALYTICS",
                  image:
                    "https://assets.core-bolt.com/website-assets/18corebolt.jpg",
                },
                {
                  title: "AUTONOMOUS MOBILE ROBOTS ",
                  image:
                    "https://assets.core-bolt.com/website-assets/19corebolt.jpg",
                },
                {
                  title: "SMART MANUFACTURING",
                  image:
                    "https://assets.core-bolt.com/website-assets/20corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/21corebolt.jpg",
                },
                {
                  title: "MACHINE VISION",
                  image:
                    "https://assets.core-bolt.com/website-assets/22corebolt.jpg",
                },
                {
                  title: "ROBOTICS & DRONES",
                  image: "https://assets.core-bolt.com/website-assets/23.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTER MODULE— NVIDIA JETSON ORIN NX",
                columns: [
                  "PARAMETER",
                  "ORIN NX 8GB VARIANT",
                  "ORIN NX 16GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "70 TOPS (Super Mode:117 TOPS) ",
                      "100 TOPS (Super Mode:157 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    value:
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "6-core Arm® Cortex® A78AE v8.2 64bit (1.5MB L2 + 4MB L3)",
                      "8 core Arm® Cortex® A78AE v8.2 64bit (2MB L2 + 4MB L3)",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "8GB 128-bit LPDDR5 102.4 GB/s ",
                      "16GB 128-bit LPDDR5 102.4 GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1x 4K60 | 3x 4K30 | 6x 1080p60 | 12x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value:
                      "1x 8K30 | 2x 4K60 | 4x 4K30 | 9x 1080p60 | 18x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "COMPUTER MODULE — NVIDIA JETSON ORIN NANO",
                columns: [
                  "PARAMETER",
                  "ORIN NANO 4GB VARIANT",
                  "ORIN NANO 8GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "20 TOPS (Super Mode: 34 TOPS)",
                      "40 TOPS (Super Mode: 67 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "512-core NVIDIA Ampere architecture GPU with 16 Tensor Cores",
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    ],
                  },
                  {
                    parameter: "CPU",
                    value:
                      "6-core Arm® Cortex®-A78AE v8.2 64-bit (1.5MB L2 + 4MB L3)",
                    colspan: 2,
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "4GB 64bit LPDDR5 34GB/s",
                      "8GB 128bit LPDDR5 68GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1080p30 supported via CPU cores",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value: "1× 4K60 | 2× 4K30 | 5× 1080p60 | 11× 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Support external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value: "1 × RJ45 Gigabit Ethernet",
                  },
                  {
                    parameter: "USB",
                    value: "4 × USB 3.2 Type-A",
                  },
                  {
                    parameter: "Serial Ports",
                    value: "1 × UART",
                  },
                  {
                    parameter: "GPIO",
                    value:
                      "40-Pin (UART, SPI, 12S, 12C, PWM, GPIO), 12-Pin control signal Interface",
                  },
                  {
                    parameter: "USB OTG",
                    value: "1× USB OTG 3.2 (Type-C)",
                  },
                  {
                    parameter: "RTC",
                    value: "1× Real-Time Clock",
                  },
                  {
                    parameter: "Video Output",
                    value: "1× HDMI",
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "9–19 VDC",
                  },
                  {
                    parameter: "Power Interface",
                    value: "DC Barrel  Connector",
                  },
                ],
              },
              {
                title: "MECHANICAL ",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "131mm × 100mm × 52 mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminum Alloy",
                  },
                ],
              },
              {
                title: "ENVIRONMENTAL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value:
                      "-20°C to +60°C  -- Super Mode: -20°C to +55°C (Orin NX), -20°C to +60°C (Orin Nano)",
                  },
                  {
                    parameter: "Cooling",
                    value: "Active Fan Cooling",
                  },
                  {
                    parameter: "Humidity",
                    value: "5% to 95% Non-Condensing",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdge M100S",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount assembly with screws",
                  },
                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "MeanWell GST 90W AC-DC Power Adapter (12VDC/ 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4 GHz - 5 GHz, 5 dBi Omni Wi-Fi Antenna with SMA connector ",
                  },
                  {
                    parameter: "Storage",
                    value:
                      " Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, 4TB capacities",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "NVIDIA Jetson Orin Nano 4GB",
                    value: "HEM100SONO4G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin Nano 8GB ",
                    value: "HEM100SONO8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 8GB ",
                    value: "HEM100SONX8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 16GB ",
                    value: "HEM100SONX16G",
                  },
                ],
              },
            ],
          },
          {
            id: "hyperedge-m300f-edge-computer",
            name: "HyperEdge M300F",
            description:
              "HyperEdge M300F is a rugged industrial AI edge computer powered by NVIDIA Jetson Orin Nano and Orin NX modules, delivering up to 157 TOPS of AI performance for advanced edge computing applications. Designed for industrial automation, autonomous mobile robots, machine vision, intelligent inspection, and smart transportation, it enables real-time AI inference and data-driven decision-making at the edge. With extensive industrial connectivity and flexible integration capabilities, it provides a reliable platform for deploying AI-powered systems in demanding industrial environments.",
            metaTitle: "HyperEdge M300F AI Edge Computer for Automation",
            metaDescription:
              " HyperEdge M300F AI edge computer for industrial automation, machine vision and robotics — advanced edge AI computing for smart manufacturing.",
            metaKeywords:
              "HyperEdge M300F, HyperEdge M300F AI Edge Computer, HyperEdge M300F Price, Buy HyperEdge M300F, Industrial AI Computer, NVIDIA Jetson Edge Computer, AI Computer for Machine Vision, AI Computer for Automation, Edge AI Computer India",
            overview:
              "The HyperEdge M300F is a high-performance AI Edge Computer designed for industrial automation, machine vision, robotics, smart manufacturing, and intelligent edge computing applications. Its advanced AI computing architecture delivers powerful data processing, real-time analytics, and accelerated AI inference for demanding industrial environments. Built for applications requiring computer vision, object detection, AI analytics, quality inspection, predictive maintenance, and intelligent automation, the HyperEdge M300F provides reliable performance and scalable edge AI capabilities. It enables organizations to process and analyze data locally, reducing latency while improving operational efficiency and decision-making. The HyperEdge M300F AI Edge Computer is well suited for factory automation, robotic systems, smart surveillance, autonomous mobile robots (AMRs), automated guided vehicles (AGVs), and AI-powered industrial inspection applications. Its powerful computing capabilities support real-time monitoring, machine learning workloads, and intelligent process optimization. With industrial-grade reliability, advanced AI processing performance, and flexible deployment capabilities, the HyperEdge M300F helps accelerate digital transformation and enables next-generation intelligent automation across a wide range of industrial and edge AI applications. ",
            overviewTitle:
              "HyperEdge M300F Industrial AI Edge Computer for Machine Vision & Robotics",

            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-m300f-edge-computer1.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/hyperedge-m300f-edge-ai-computer-in11.jpg",
              "https://assets.core-bolt.com/website-assets/hyperedge-m300f-edge-ai-computer-in-front11.jpg",
               "https://assets.core-bolt.com/website-assets/hyperedge-m300f-edge-ai-computer-in-back11.jpg",
            ],
            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Smart Surveillance",
              "Robotics & Drones",
              "Smart Manufacturing ",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Orin NX SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
                {
                  name: "Orin Nano SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge M300F is engineered for high-performance AI inference and industrial edge computing in demanding environments.",
              items: [
                {
                  title: "VIDEO ANALYTICS",
                  image:
                    "https://assets.core-bolt.com/website-assets/18corebolt.jpg",
                },
                {
                  title: "AUTONOMOUS MOBILE ROBOTS ",
                  image:
                    "https://assets.core-bolt.com/website-assets/24corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/25corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL INSPECTION",
                  image:
                    "https://assets.core-bolt.com/website-assets/26corebolt.jpg",
                },
                {
                  title: "MACHINE VISION",
                  image:
                    "https://assets.core-bolt.com/website-assets/22corebolt.jpg",
                },
                {
                  title: "SMART TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/27corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTER MODULE— NVIDIA JETSON ORIN NX",
                columns: [
                  "PARAMETER",
                  "ORIN NX 8GB VARIANT ",
                  "ORIN NX 16GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "70 TOPS (Super Mode:117 TOPS)",
                      "100 TOPS (Super Mode:157 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    value:
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "6 core Arm® Cortex® A78AE v8.2 64bit (1.5MB L2 + 4MB L3)",
                      "8 core Arm® Cortex® A78AE v8.2 64bit (2MB L2 + 4MB L3)",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "8GB 128-bit LPDDR5 102.4 GB/s ",
                      "16GB 128-bit LPDDR5 102.4 GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1x 4K60 | 3x 4K30 | 6x 1080p60 | 12x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value:
                      "1x 8K30 | 2x 4K60 | 4x 4K30 | 9x 1080p60 | 18x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "COMPUTER — NVIDIA JETSON  ORIN NANO",
                columns: [
                  "PARAMETER",
                  "ORIN Nano 4GB VARIANT ",
                  "ORIN Nano 8GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "20 TOPS (Super Mode:34 TOPS)",
                      "40 TOPS (Super Mode:67 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "512-core NVIDIA Ampere architecture GPU with 16 Tensor Cores",
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    ],
                  },
                  {
                    parameter: "CPU",
                    value:
                      "6-core Arm® Cortex®-A78AE v8.2 64-bit (1.5MB L2 + 4MB L3)",
                    colspan: 2,
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "4GB 64bit LPDDR5 34GB/s",
                      "8GB 128bit LPDDR5 68GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1080p30 supported via CPU cores",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value: "1 ×4K60 | 2× 4K30 5× 1080p60 | 11× 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value:
                      "2 x RJ45 Gigabit Ethernet port with independent IP, Support PoE (optional)",
                  },
                  {
                    parameter: "USB",
                    value: "2x USB 3.2 Type-A, 1x Type-C Debug",
                  },
                  {
                    parameter: "Serial Ports",
                    value: "1x RS-232(DB9), 1x RS-485(DB9), 1× CAN-FD (DB9)",
                  },
                  {
                    parameter: "GPIO",
                    value: "4x GPIO(3.3V@1mA) (DB9)",
                  },
                  {
                    parameter: "USB OTG",
                    value: "1x Type-C OTG",
                  },
                  {
                    parameter: "RTC",
                    value: "1× Real-Time Clock",
                  },
                  {
                    parameter: "Video Output",
                    value: "1× HDMI",
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with internal SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "DC Barrel Connector, 9–24 VDC",
                  },
                  {
                    parameter: "Buttons",
                    value:
                      "3× buttons — Power(PWR), Recovery (REC) and Reset (RST)",
                  },
                  {
                    parameter: "Indicators",
                    value: "2× LED indicators — Run and Power status",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "161mm × 100mm × 50mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminum Alloy",
                  },
                ],
              },
              {
                title: "Environmental",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value:
                      "-20°C to +70°C--Super Mode: -20°C to +60°C (Orin NX) -20°C to +70°C (Orin Nano)",
                  },
                  {
                    parameter: "Cooling",
                    value: "Active Fan Cooling",
                  },
                  {
                    parameter: "Humidity",
                    value: "5%–95% Non-Condensing",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdgee M300F",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount assembly with screws",
                  },
                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "MeanWell GST 90W AC-DC Power Adaptor (12VDC/7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global-Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4 GHz - 5 GHz, 5 dBi Omni Wi-Fi Antenna with SMA connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600–6000 MHz, 5 dBi Omni 4G Antenna with SMA connector ",
                  },
                  {
                    parameter: "Storage",
                    value:
                      "Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, and 4TB capacities",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION ",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "NVIDIA Jetson Orin Nano 4GB",
                    value: "HEM300FONO4G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin Nano 8GB",
                    value: "HEM300FONO8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 8GB",
                    value: "HEM300FONX8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 16GB",
                    value: "HEM300FONX16G",
                  },
                ],
              },
            ],
          },
          {
            id: "hyperedge-u300-ai-edge-computer",
            name: "HyperEdge U300",
            description:
              "HyperEdge U300 is a compact AI edge computer powered by NVIDIA Jetson Orin Nano and Orin NX modules, delivering up to 157 TOPS of AI performance for intelligent edge applications. Designed for robotics, UAVs, video analytics, intelligent inspection, smart buildings, and remote monitoring systems, it enables real-time AI inference and autonomous decision-making. Built for field-deployed and distributed AI environments, it offers the flexibility required for remote intelligent systems operating beyond traditional industrial settings",
            metaTitle: " HyperEdge U300 AI Edge Computer for Machine Vision",
            metaDescription:
              " HyperEdge U300 AI edge computer with NVIDIA Jetson Orin for machine vision, robotics and industrial automation — compact, powerful edge AI computing.",
            metaKeywords:
              " HyperEdge U300, HyperEdge U300 AI Edge Computer, HyperEdge U300 Price, Buy HyperEdge U300, HyperEdge U300 Specifications, Industrial AI Computer, Machine Vision Computer, NVIDIA Jetson Orin Computer",
            overview:
              "The HyperEdge U300 is a high-performance AI Edge Computer designed for industrial automation, machine vision, robotics, and intelligent edge computing applications. Powered by  Jetson Orin NX, and Jetson Orin Nano, it delivers powerful AI inference, accelerated computing, and real-time data processing for demanding edge AI workloads. Built for applications requiring computer vision, object detection, deep learning, video analytics, and intelligent automation, the HyperEdge U300 provides reliable performance and scalable AI computing capabilities. Its advanced edge processing architecture enables low-latency decision-making and efficient deployment in industrial environments. The HyperEdge U300 AI Edge Computer is well suited for robotic systems, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), smart manufacturing, industrial inspection, intelligent surveillance, and autonomous machine applications. Its powerful AI capabilities support real-time monitoring, predictive analytics, and intelligent process automation. With industrial-grade reliability, flexible NVIDIA Jetson integration, and advanced AI processing performance, the HyperEdge U300 helps organizations accelerate digital transformation and deploy next-generation intelligent edge computing solutions across a wide range of industries.",
            overviewTitle:
              "HyperEdge U300 Industrial AI Edge Computer for Machine Vision & Robotics ",
            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-u300-edge-ai-computer(1).jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/OrinNXHyperEdgeMicro-01.png",
              "https://assets.core-bolt.com/website-assets/OrinNXHyperEdgeMicro-02.png",
              "https://assets.core-bolt.com/website-assets/OrinNXHyperEdgeMicro-03.png",
            ],
            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Smart Surveillance",
              "Robotics & Drones",
              "Smart Manufacturing ",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Orin NX SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
                {
                  name: "Orin Nano SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge U300 is engineered for compact AI inference, deployment flexibility, and intelligent edge applications.",
              items: [
                {
                  title: "VIDEO ANALYTICS",
                  image:
                    "https://assets.core-bolt.com/website-assets/31corebolt.jpg",
                },
                {
                  title: "AUTONOMOUS ROBOTS ",
                  image:
                    "https://assets.core-bolt.com/website-assets/32corebolt.jpg",
                },
                {
                  title: "UAV & DRONES",
                  image:
                    "https://assets.core-bolt.com/website-assets/33corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL INSPECTION",
                  image:
                    "https://assets.core-bolt.com/website-assets/34corebolt.jpg",
                },
                {
                  title: "SMART BUILDINGS",
                  image:
                    "https://assets.core-bolt.com/website-assets/35corebolt.jpg",
                },
                {
                  title: "LOW-ALTITUDE DEFENSE",
                  image:
                    "https://assets.core-bolt.com/website-assets/36corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTER MODULE— NVIDIA JETSON ORIN NX",
                columns: [
                  "PARAMETER",
                  "ORIN NX 8GB VARIANT ",
                  "ORIN NX 16GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "70 TOPS (Super Mode:117 TOPS)",
                      "100 TOPS (Super Mode:157 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    value:
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "6 core Arm® Cortex® A78AE v8.2 64bit (1.5MB L2 + 4MB L3)",
                      "8 core Arm® Cortex® A78AE v8.2 64bit (2MB L2 + 4MB L3",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "8GB 128-bit LPDDR5 102.4 GB/s ",
                      "16GB 128-bit LPDDR5 102.4 GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1x 4K60 | 3x 4K30 | 6x 1080p60 | 12x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value:
                      "1x 8K30 | 2x 4K60 | 4x 4K30 | 9x 1080p60 | 18x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "COMPUTER MODULE — NVIDIA JETSON ORIN NANO",
                columns: [
                  "PARAMETER",
                  "ORIN Nano 4GB VARIANT ",
                  "ORIN Nano 8GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "20 TOPS (Super Mode:34 TOPS)",
                      "40 TOPS (Super Mode:67 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "512-core NVIDIA Ampere architecture GPU with 16 Tensor Cores",
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    ],
                  },
                  {
                    parameter: "CPU",
                    value:
                      "6-core Arm® Cortex®-A78AE v8.2 64-bit (1.5MB L2 + 4MB L3)",
                    colspan: 2,
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "4GB 64bit LPDDR5 34GB/s",
                      "8GB 128bit LPDDR5 68GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1080p30 supported via CPU cores",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value: "1× 4K60 | 2× 4K30 | 5× 1080p60 | 11× 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value: "1 x RJ45 Gigabit Ethernet port",
                  },
                  {
                    parameter: "USB",
                    value: "2x USB 3.0 Type-A",
                  },
                  {
                    parameter: "Serial Ports",
                    value: "1x RS-232, 1× CAN",
                  },

                  {
                    parameter: "USB OTG",
                    value: "1x Micro USB OTG",
                  },
                  {
                    parameter: "Video Output",
                    value: "1× HDMI",
                  },
                  {
                    parameter: "RTC",
                    value: "1× Real-Time Clock",
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with internal SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi /Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2242 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "DC Barrel Connector, 12–24 VDC",
                  },
                  {
                    parameter: "Buttons",
                    value:
                      "3× buttons — Power(PWR), Recovery (REC) and Reset (RST)",
                  },
                  {
                    parameter: "Indicators",
                    value: "1× LED indicators — Power status",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "109.2mm×62.5 mm×46.3 mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminum Alloy",
                  },
                ],
              },
              {
                title: "Environmental",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value:
                      "-20°C to +60°C - Super Mode: -20°C to +40°C (Orin NX) -20°C to +60°C (Orin Nano)",
                  },
                  {
                    parameter: "Cooling",
                    value: "Active Fan Cooling",
                  },
                  {
                    parameter: "Humidity",
                    value: "5%–95% Non-Condensing",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdgee U300",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount assembly with screws",
                  },
                  {
                    parameter: "JST Cable Connector",
                    value:
                      "4-Pin A1245 GH Type 1.25mm Connector with 10cm Wire",
                  },
                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "MeanWell GST 90W AC-DC Power Adaptor (12VDC/7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 global-band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5 GHz, 5 dBi Omni Wi-Fi Antenna with SMA connector",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600–6000 MHz, 5 dBi Omni 4G Antenna with SMA connector",
                  },
                  {
                    parameter: "Storage",
                    value:
                      "Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, and 4TB capacities",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "NVIDIA Jetson Orin Nano 4GB ",
                    value: "HEU300ONO4G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin Nano 8GB ",
                    value: "HEU300ONO8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 8GB",
                    value: "HEU300ONX8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 16GB",
                    value: "HEU300ONX16G",
                  },
                ],
              },
            ],
          },
          {
            id: "hyperedge-m500-ai-edge-computer",
            name: "HyperEdge M500",
            description:
              "HyperEdge M500 is a high-performance AI edge computer powered by NVIDIA Jetson AGX Orin, delivering up to 275 TOPS of AI computing performance for demanding edge intelligence applications. Designed for machine vision, industrial automation, autonomous mobile robots, smart infrastructure, and video analytics, it enables real-time AI inference and advanced decision-making at the edge. Its exceptional AI processing capability and scalable architecture make it an ideal platform for organizations deploying complex, data-intensive AI workloads.",
            metaTitle: "HyperEdge M500 AI Edge Computer for Robotics & AI",
            metaDescription:
              "HyperEdge M500 AI edge computer with NVIDIA Jetson Orin for machine vision, robotics and industrial AI inference — high-performance edge computing.",
            metaKeywords:
              " HyperEdge M500, HyperEdge M500 AI Edge Computer, HyperEdge M500 Price, Buy HyperEdge M500, HyperEdge M500 Specifications, Industrial AI Computer, Machine Vision Computer, NVIDIA Jetson Orin Computer, HyperEdge M500 India",
            overview:
              "The HyperEdge M500 is a high-performance AI Edge Computer designed for industrial automation, machine vision, robotics, and intelligent edge computing applications. Powered by NVIDIA Jetson Orin it delivers powerful AI inference, accelerated computing, and real-time data processing for demanding AI workloads. Built for applications requiring computer vision, object detection, deep learning, video analytics, and intelligent automation, the HyperEdge M500 provides reliable performance and scalable edge AI capabilities. Its advanced processing architecture enables low-latency decision-making and efficient deployment in industrial and autonomous environments. The HyperEdge M500 AI Edge Computer is well suited for robotic systems, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), smart manufacturing, industrial inspection, intelligent surveillance, and autonomous machine applications. Its powerful computing capabilities support real-time monitoring, predictive analytics, and AI-driven process optimization. With industrial-grade reliability, flexible NVIDIA Jetson integration, and advanced AI processing performance, the HyperEdge M500 enables organizations to accelerate AI deployment and unlock the full potential of intelligent edge computing across a wide range of industries.",
            overviewTitle:
              " HyperEdge M500 Industrial AI Edge Computer with NVIDIA Jetson Orin",
            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-m500-edge-computer.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgeMini-01.png",
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgeMini-02.png",
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgeMini-03.png",
            ],
            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Smart Surveillance",
              "Robotics & Drones",
              "Smart Manufacturing ",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "AGX Orin SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-MAIN1.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge M500 is engineered for advanced AI acceleration and real-time edge intelligence for autonomous systems.",
              items: [
                {
                  title: "VIDEO ANALYTICS ",
                  image:
                    "https://assets.core-bolt.com/website-assets/31corebolt.jpg",
                },
                {
                  title: " AUTONOMOUS MOBILE ROBOTS",
                  image:
                    "https://assets.core-bolt.com/website-assets/19corebolt.jpg",
                },
                {
                  title: "SMART INFRASTRUCTIRE",
                  image:
                    "https://assets.core-bolt.com/website-assets/28corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION ",
                  image:
                    "https://assets.core-bolt.com/website-assets/5corebolt.jpg",
                },
                {
                  title: "MACHINE VISION",
                  image:
                    "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
                },
                {
                  title: "SEAPORT AUTOMATION ",
                  image:
                    "https://assets.core-bolt.com/website-assets/29corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTER MODULE  — NVIDIA JETSON AGX ORIN ",
                columns: [
                  "PARAMETER",
                  "AGX ORIN 32GB VARIANT ",
                  "AGX ORIN 64GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: ["200 TOPS ", "275 TOPS"],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "1792-core NVIDIA Ampere GPU with 56 Tensor Cores",
                      "2048-core NVIDIA Ampere GPU with 64 Tensor Cores",
                    ],

                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "8-core Arm Cortex-A78AE v8.2 64-bit (2 MB L2 + 4 MB L3)",
                      "12-core Arm Cortex-A78AE v8.2 64-bit (3 MB L2 + 6 MB L3)",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "32GB 256-bit LPDDR5 204.8 GB/s",
                      "64GB 256-bit LPDDR5 204.8 GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    values: [
                      "1× 4K60 | 3× 4K30 | 6× 1080p60 | 12× 1080p30",
                      "2× 4K60 | 4× 4K30 | 8× 1080p60 | 16× 1080p30",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    values: [
                      "1× 8K30 | 2× 4K60 | 4× 4K30 | 9× 1080p60 | 18× 1080p30",
                      "1× 8K30 | 3× 4K60 | 7× 4K30 | 11× 1080p60 | 22× 1080p30",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "64GB eMMC 5.1 on SOM",
                    colspan: 2,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value:
                      "1× RJ45 Gigabit Ethernet + 1× RJ45 10 Gigabit Ethernet, independent IP configuration",
                  },
                  {
                    parameter: "USB",
                    value: "2x USB 3.0 Type-A (5V/2A)",
                  },
                  {
                    parameter: "Serial Ports",
                    value: "1× RS-232, 1× RS-485, 2× CAN",
                  },
                  {
                    parameter: "GPIO",
                    value: "2× GPIO (IN/OUT), 3.3V@1mA",
                  },

                  {
                    parameter: "USB OTG",
                    value: "1× USB OTG 2.0 (Type-C)",
                  },
                  {
                    parameter: "Video",
                    value: "1× HDMI",
                  },
                  {
                    parameter: "RTC",
                    value: "1× Real-Time Clock",
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with  SIM socket",
                  },
                  {
                    parameter: "M.2 Key B",
                    value:
                      "1× M.2 3052 Key B socket for 5G cellular module, with SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi /Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "1× 6-pin pluggable terminal block, 12–24 VDC",
                  },
                  {
                    parameter: "Buttons",
                    value: "2× buttons — Recovery (REC) and Reset (RST)",
                  },
                  {
                    parameter: "Indicators",
                    value: "2× LED indicators — Run and Power status",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "133mm×131mm×51mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminum Alloy",
                  },
                ],
              },
              {
                title: " Environmental",
                columns: ["PARAMETER", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value: "-20°C to +60°C  ",
                  },
                  {
                    parameter: "Cooling",
                    value: "Active Fan Cooling",
                  },
                  {
                    parameter: "Humidity",
                    value: "5%–95% Non-Condensing",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdgee M500",
                  },
                  {
                    parameter: "Mounting",
                    value: "Wall Mount assembly with screws",
                  },
                  {
                    parameter: "Power Adapter Cable",
                    value:
                      "Molex 2×3 Mini-Fit Sigma 0.25M Power Adapter Cable ",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/7-ST-3,5 Phoenix Terminal Connector ",
                  },
                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "MeanWell GST 90W AC-DC Power Adaptor (12 VDC/7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "5G LTE Module",
                    value:
                      "Quectel RM520N-GL 5G Sub-6G GHz Global Band M.2 Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4 GHz - 5 GHz, 5 dBi Omni Wi-Fi Antenna with SMA connector ",
                  },
                  {
                    parameter: "4G/5G Antenna",
                    value:
                      "600–6000 MHz, 5 dBi Omni 4G/5G Antenna with SMA connector ",
                  },
                  {
                    parameter: "Storage",
                    value:
                      "Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, and 4TB capacities",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "NVIDIA Jetson AGX Orin 32GB",
                    value: "HEM500AGXO32G",
                  },
                  {
                    parameter: "NVIDIA Jetson AGX Orin 64GB",
                    value: "HEM500AGXO64G",
                  },
                ],
              },
            ],
          },
          {
            id: "hyperedge-700r-ai-edge-computer",
            name: "HyperEdge 700R",
            description:
              "The HyperEdge 700R Series is a rugged, high-performance AI edge computing platform powered by NVIDIA® Jetson™ modules for robotics, industrial automation, and intelligent vision applications. Available in both 700R and 700RGT variants, the series offers rich I/O, high-speed connectivity, and industrial-grade reliability, with the 700RGT supporting up to 8× GMSL2 camera interfaces for advanced multi-camera AI applications. Its vehicle-ready architecture enables real-time perception and intelligent decision-making in demanding environments.",
            metaTitle: " HyperEdge 700R AI Edge Computer for Robotics & AI",
            metaDescription:
              "HyperEdge 700R AI edge computer with NVIDIA Jetson Orin for robotics, machine vision and industrial AI — rugged, high-performance edge computing.",
            metaKeywords:
              " HyperEdge 700R, HyperEdge 700R AI Edge Computer, HyperEdge 700R Price, Buy HyperEdge 700R, HyperEdge 700R Specifications, Industrial AI Computer, Machine Vision Computer, NVIDIA Jetson Orin Computer, HyperEdge 700R India",
            overview:
              "The HyperEdge 700R Series is a high-performance AI Edge Computer platform designed for industrial automation, machine vision, robotics, and intelligent edge computing applications. Powered by NVIDIA  Jetson Orin platforms, including Jetson AGX Orin, Jetson Orin NX, and Jetson Orin Nano, the series delivers powerful AI inference, accelerated computing, and real-time data processing for demanding edge AI workloads. The HyperEdge 700R Series includes both the standard HyperEdge 700R and the HyperEdge 700RGT variants, with the 700RGT supporting up to 8× GMSL2 camera interfaces for advanced multi-camera vision applications. Built for computer vision, object detection, deep learning, video analytics, and intelligent automation, the series provides reliable performance and scalable AI computing capabilities for complex edge deployments. Designed for robotic systems, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), smart manufacturing, industrial inspection, intelligent surveillance, and autonomous machines, the HyperEdge 700R Series enables real-time perception, predictive analytics, quality control, and intelligent process automation. With industrial-grade reliability, flexible NVIDIA Jetson integration, and advanced AI processing capabilities, the HyperEdge 700R Series accelerates digital transformation and supports the deployment of next-generation AI-powered edge solutions across a wide range of industries.",
            overviewTitle:
              "HyperEdge 700R AI Edge Computer for Industrial AI & Intelligent Automation",
            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-700r-edge-computer.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgePro-01.png",
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgePro-02.png",
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgePro-03.png",
            ],
            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Intelligent Transportation",
              "Autonomaous Mobile Robots",
              "Machine Vision & Inspenction ",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Orin NX SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
                {
                  name: "Orin Nano SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
                {
                  name: "AGX Orin SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-MAIN1.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge 700R is engineered for rugged AI computing in harsh industrial, mobile, and outdoor environments.",
              items: [
                {
                  title: "Industrial Vehicles",
                  image: "https://assets.core-bolt.com/website-assets/102.jpeg",
                },
                {
                  title: "Autonomous Mobile Robots ",
                  image:
                    "https://assets.core-bolt.com/website-assets/24corebolt.jpg",
                },
                {
                  title: " Industrial Automation ",
                  image:
                    "https://assets.core-bolt.com/website-assets/25corebolt.jpg",
                },
                {
                  title: "Intelligent Inpection ",
                  image:
                    "https://assets.core-bolt.com/website-assets/26corebolt.jpg",
                },
                {
                  title: "Port Autonomous Vehicles",
                  image:
                    "https://assets.core-bolt.com/website-assets/14corebolt.jpg",
                },
                {
                  title: "AGRICULTURE Robotics ",
                  image:
                    "https://assets.core-bolt.com/website-assets/30corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTER MODULE — NVIDIA JETSON AGX ORIN ",
                columns: [
                  "PARAMETER",
                  "AGX ORIN 32 GB VARIANT ",
                  "AGX ORIN 64 GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: ["200 TOPS ", "275 TOPS"],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "1792-core NVIDIA Ampere GPU with 56 Tensor Cores",
                      "2048-core NVIDIA Ampere GPU with 64 Tensor Cores",
                    ],

                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "8-core Arm Cortex-A78AE v8.2 64-bit (2 MB L2 + 4 MB L3)",
                      "12-core Arm Cortex-A78AE v8.2 64-bit (3 MB L2 + 6 MB L3)",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "32 GB 256-bit LPDDR5 204.8 GB/s",
                      "64 GB 256-bit LPDDR5 204.8 GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    values: [
                      "1× 4K60 | 3× 4K30 | 6× 1080p60 | 12× 1080p30",
                      "2× 4K60 | 4× 4K30 | 8× 1080p60 | 16× 1080p30",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    values: [
                      "1× 8K30 | 2× 4K60 | 4× 4K30 | 9× 1080p60 | 18× 1080p30",
                      "1× 8K30 | 3× 4K60 | 7× 4K30 | 11× 1080p60 | 22× 1080p30",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "64 GB eMMC 5.1 on SOM",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "COMPUTER MODULE — NVIDIA JETSON ORIN NX",
                columns: [
                  "PARAMETER",
                  "ORIN NX 8GB VARIANT ",
                  "ORIN NX 16GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "70 TOPS (Super Mode:117 TOPS) ",
                      "100 TOPS (Super Mode:157 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    value:
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",

                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "6 core Arm® Cortex® A78AE v8.2 64bit (1.5MB L2 + 4MB L3)",
                      "8 core Arm® Cortex® A78AE v8.2 64bit (2MB L2 + 4MB L3)",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "8GB 128-bit LPDDR5 102.4 GB/s ",
                      "16GB 128-bit LPDDR5 102.4 GB/s ",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1x 4K60 | 3x 4K30 | 6x 1080p60 | 12x 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value:
                      "1× 8K30 | 2× 4K60 | 4× 4K30 | 9× 1080p60 | 18× 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "COMPUTER MODULE — NVIDIA JETSON ORIN NANO",
                columns: [
                  "PARAMETER",
                  "ORIN NANO 4GB VARIANT ",
                  "ORIN NANO 8GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "20 TOPS (Super Mode:34 TOPS)",
                      "40 TOPS (Super Mode:67 TOPS)",
                    ],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "512-core NVIDIA Ampere architecture GPU with 16 Tensor Cores",
                      "1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores",
                    ],

                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    value:
                      "6-core Arm® Cortex®-A78AE v8.2 64-bit (1.5MB L2 + 4MB L3)",
                    colspan: 2,
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "4 GB 64bit LPDDR5 34GB/s",
                      "8 GB 128bit LPDDR5 68GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1080p 30 supported via CPU cores",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value: "1× 4K60 | 2× 4K30 | 5× 1080p60 | 11× 1080p30",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: [
                  "INTERFACE",
                  "JETSON ORIN /ORIN NX",
                  "JETSON AGX ORIN",
                ],
                rows: [
                  {
                    parameter: "Ethernet",
                    values: [
                      "1x M12 Gigabit Ethernet port(Independent IP), 4x M12 Gigabit Ethernet port(Shared IP) supports PoE (Optional)",
                      "1x M12 10 Gigabit Ethernet port (supports PTP timing), 4x M12 Gigabit Ethernet port, independent IP, supports PoE (Optional) ",
                    ],
                  },
                  {
                    parameter: "USB",
                    values: [
                      "2x USB 3.0 Type-A, 1x Type-C Debug",
                      "1x USB 3.2 Type-A, 1x USB 3.2 Type-A Aviation Plug Inteface, 1x Type-C Debug",
                    ],
                  },
                  {
                    parameter: "Serial Ports",
                    values: [
                      "1x RS-232, 2x RS-485, 1× CAN-FD, 1× SPI-CAN-FD",
                      "2× RS-232, 1× RS-485 (software-switchable to 2× RS-232), 2× CAN, 2× SPI-CAN",
                    ],
                  },
                  {
                    parameter: "GPIO",
                    values: [
                      "2x GPI + 2x GPO (3.3V@1mA) with isolation, 2x GPI + 2x GPO (12V@1mA) with isolation",
                      "2x GPI + 2x GPO (3.3V@1mA) with isolation",
                    ],
                  },

                  {
                    parameter: "USB OTG",
                    value: "1x Type-C OTG",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Output",
                    value: "1× HDMI",
                    colspan: 2,
                  },
                  {
                    parameter: "Audio Output",
                    values: ["/", "1x AUDIO OUT (3.5mm port)"],
                    colspan: 2,
                  },
                  {
                    parameter: "RTC",
                    value: "1× Real-Time Clock",
                    colspan: 2,
                  },
                  {
                    parameter: "Synchronous System",
                    value:
                      "Support NTP, PPS input/output, PWM output (optional)",
                    colspan: 2,
                  },
                  {
                    parameter: "GMSL Camera INTERFACE",
                    value: "8x GMSL2 (700RGT Variant only)",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with SIM socket",
                  },
                  {
                    parameter: "M.2 Key B",
                    value:
                      "1× M.2 3052 Key B socket for 5G cellular module, with  SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: [
                  "PARAMETER ",
                  "JETSON ORIN NANO/ NX",
                  "JETSON AGX ORIN",
                ],
                rows: [
                  {
                    parameter: "Power Input",
                    values: [
                      "Wide 9–36 VDC input with ACC ignition control",
                      "Wide 10–36 VDC input with ACC ignition control",
                    ],
                  },
                  {
                    parameter: "Buttons/Indicators",
                    values: [
                      "Recovery/ Reset two buttons, four indicator lights",
                      "Recovery/ Reset two buttons, three indicator lights",
                    ],
                  },
                  {
                    parameter: "Power Interface",
                    value: "M16 - 6Pin navigational aid Interface",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "MECHANICAL ",
                columns: [
                  "MECHANICAL ",
                  "JETSON ORIN NANO /NX",
                  "JETSON AGX ORIN",
                ],
                rows: [
                  {
                    parameter: "Dimensions",
                    values: [
                      "295mm × 207.1mm × 76.5mm ",
                      "275mm × 177.3mm × 76.5mm",
                    ],
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall Mount Brackets",
                    colspan: 2,
                  },
                  {
                    parameter: "Enclosure ",
                    value:
                      "Rugged IP65-rated aluminum-alloy enclosure with active cooling and shock-resistant design",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "ENVIRONMENTAL",
                columns: [
                  "ENVIRONMENTAL ",
                  "JETSON ORIN NANO /NX",
                  "JETSON AGX Orin",
                ],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    values: [
                      "Orin NX : -20°C to 70°C, Orin Nano : -20°C to 55°C",
                      "-20°C to 60°C",
                    ],
                  },
                  {
                    parameter: "Mounting",
                    value: "Active fan cooling",
                    colspan: 2,
                  },
                  {
                    parameter: "Enclosure ",
                    value: "5 % – 95 % non-condensing",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdge 700R",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 120W AC-DC Power Adaptor (20V, 6A) ",
                  },
                  {
                    parameter: "Power Cord",
                    value:
                      "EU1-MC13 1.8M Universal Power 2cord ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "DC 5.5*2.5mm barrel 0.25M 2 in 1 Splitter Power Cable  / M16 6pin to DC 5.5*2.5mm 0.5M Power Cable ",
                  },
                  {
                    parameter: "Cables & Connectors",
                    value:
                      "M12 8-Pin Code X 2M Network Cable  / M12 12-Pin Code A 0.5M Data Cable  / FAKRA-Z, 1-to-4 F-F Splitter Cable, 0.5M  / FAKRA-Z, 1-to-4 F-M Splitter Cable, 0.5M ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "5G LTE Module",
                    value:
                      "Quectel RM520N-GL 5G Sub-6G GHz Global Band M.2 Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "3 in 1 Dual Band Wi-Fi/ GNSS Mushroom Antenna with Fakra Connector",
                  },
                  {
                    parameter: "4G/5G Antenna",
                    value:
                      "700-960 MHz & 1710-5000 MHz 4G/ 5G  Mushroom Antenna with Fakra Connector ",
                  },
                  {
                    parameter: "Storage",
                    value:
                      "Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, and 4TB capacities",
                  },
                ],
              },
              {
                title: "Ordering Information FOR HyperEdge 700R",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "NVIDIA Jetson Orin Nano 4GB",
                    value: "HE700RONO4G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin Nano 8GB ",
                    value: "HE700RONO8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 8GB ",
                    value: "HE700RONX8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 16GB",
                    value: "HE700RONX16G",
                  },
                  {
                    parameter: "NVIDIA Jetson AGX Orin 32GB",
                    value: "HE700RAGXO32G",
                  },
                  {
                    parameter: "NVIDIA Jetson AGX Orin 64GB ",
                    value: "HE700RAGXO64G",
                  },
                ],
              },
              {
                title: "Ordering Information FOR HyperEdge 700RGT",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "NVIDIA Jetson Orin Nano 4GB",
                    value: "HE700RGTONO4G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin Nano 8GB ",
                    value: "HE700RGTONO8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 8GB ",
                    value: "HE700RGTONX8G",
                  },
                  {
                    parameter: "NVIDIA Jetson Orin NX 16GB",
                    value: "HE700RGTONX16G",
                  },
                  {
                    parameter: "NVIDIA Jetson AGX Orin 32GB",
                    value: "HE700RGTAGXO32G",
                  },
                  {
                    parameter: "NVIDIA Jetson AGX Orin 64GB ",
                    value: "HE700RGTAGXO64G",
                  },
                ],
              },
            ],
          },
          {
            id: "hyperedge-900dr-ai-edge-computer",
            name: "HyperEdge 900DR",
            description:
              "HyperEdge 900DR is a high-performance AI edge computer that combines TI TDA4VM real-time processing with NVIDIA Jetson AGX Orin AI acceleration, delivering up to 283 TOPS of computing performance for autonomous and intelligent systems. Designed for autonomous vehicles, intelligent transportation, construction machinery, agriculture robotics, and port automation, it enables advanced perception, sensor fusion, and real-time decision-making. Its heterogeneous computing architecture uniquely combines deterministic control with powerful AI processing for next-generation autonomous applications.",
            metaTitle:
              "HyperEdge 900DR | AI Edge Computer for Autonomous Systems | CoreBolt",
            metaDescription:
              "Explore the HyperEdge 900DR Edge AI system featuring TI’s TDA4 processor for intelligent automation, vision, and high-performance computing.",
            metaKeywords:
              "HyperEdge 900DR, HyperEdge 900DR AI Edge Computer, HyperEdge 900DR Price, Buy HyperEdge 900DR, Industrial Edge AI Computer, Industrial IoT Computer, NVIDIA Jetson Orin Computer, AI Computer for Robotics, AI Computer for Machine Vision, Smart Factory AI Computer",

            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-900dr-edge-computer-hero-image.jpeg",
            images: [
              "https://assets.core-bolt.com/website-assets/hyperedge-900dr-edge-computer11.jpg",
              "https://assets.core-bolt.com/website-assets/AGXOrinHyperEdgeProAT-2.png",
            ],

            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Autonomous Vehicles",
              "Intelligent Transportation",
              "Agricultural Robotics",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "TDA4VM",
                  image:
                    "https://assets.core-bolt.com/website-assets/TDA4VM.png",
                },
                {
                  name: "AGX Orin SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-MAIN1.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge 900DR is engineered for heterogeneous AI computing, autonomous systems, and real-time intelligent control",
              items: [
                {
                  title: "UNMANNED GROUND VEHICLES",
                  image:
                    "https://assets.core-bolt.com/website-assets/12corebolt.jpg",
                },
                {
                  title: "CONSTRUCTION MACHINERY",
                  image:
                    "https://assets.core-bolt.com/website-assets/13corebolt.jpg",
                },
                {
                  title: "AUTONOMOUS PORT VEHICLES",
                  image:
                    "https://assets.core-bolt.com/website-assets/14corebolt.jpg",
                },
                {
                  title: "V2X EQUIPMENT",
                  image:
                    "https://assets.core-bolt.com/website-assets/15corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/16corebolt.jpg",
                },
                {
                  title: "AGRICULTURE ROBOTICS",
                  image:
                    "https://assets.core-bolt.com/website-assets/17corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTE MODULE — TDA4VM + NVIDIA JETSON AGX ORIN ",
                columns: [
                  "PARAMETER",
                  "TDA4VM + AGX ORIN 32 GB VARIANT",
                  "TDA4VM + AGX ORIN 64 GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "8 TOPS (TDA4) + 200 TOPS",
                      "8 TOPS (TDA4) + 275 TOPS",
                    ],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "GE8430 (TDA4) + 1792-core NVIDIA Ampere GPU with 56 Tensor Cores",
                      "GE8430 (TDA4) + 2048-core NVIDIA Ampere GPU with 64 Tensor Cores",
                    ],

                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "2-core A72+ 6-core R5 (TDA4) + 8-core Arm Cortex-A78AE v8.2 64-bit (2 MB L2 + 4 MB L3)",
                      "2-core A72+ 6-core R5 (TDA4) + 12-core Arm Cortex-A78AE v8.2 64-bit (3 MB L2 + 6 MB L3)",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "32 GB 256-bit LPDDR5 204.8 GB/s ",
                      "64 GB 256-bit LPDDR5 204.8 GB/s",
                    ],
                  },
                  {
                    parameter: "DSP",
                    value: "2-core C66x (1.35GHz) (TDA4) + C7x (1GHz)",
                  },
                  {
                    parameter: "Video Encode",
                    values: [
                      "{1× 4K60, 3× 4K30, 6× 1080p60, 12× 1080p30} H.265, {AV1} H.264",
                      "{2× 4K60, 4× 4K30, 8× 1080p60, 16× 1080p30} H.265, {AV1} H.264",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    values: [
                      "{1× 8K30, 2× 4K60, 4× 4K30, 9× 1080p60, 18× 1080p30} H.265, {AV1,VP} H.264",
                      "{1× 8K30, 3× 4K60, 7× 4K30, 11× 1080p60, 22× 1080p30} H.265, {AV1,VP9} H.264",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "CAN Module",
                    value: "16 (supporting CAN-FD) (TDA4)",
                    colspan: 2,
                  },
                  {
                    parameter: "DL Accelerator",
                    value: "2× NVDIA v2.0",
                    colspan: 2,
                  },
                  {
                    parameter: "eMMC",
                    value: "64 GB eMMC 5.1 on SOM",
                    colspan: 2,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value: "3x Gigabit Industrial Ethernet port",
                  },
                  {
                    parameter: "USB",
                    value: "1x USB 2.0 Type-A, 1x USB 3.0 Type-A",
                  },

                  {
                    parameter: "Camera INTERFACE ",
                    value:
                      "2× GMSL2 4in1 Camera Connectors (capable of connecting cameras with 8 channels of GMSL2/GMSL1 protocol)",
                    colspan: 2,
                  },
                  {
                    parameter: "Network",
                    value: "4× Vehicle Ethernet (900DRV Variant Only)",
                    colspan: 2,
                  },
                  {
                    parameter: "Sync I/O_A",
                    value:
                      "6× CAN/CAN-FD interface / 4× RS-232interface  / 4× Analog Input / 4× Digital Input / 4× Digital Output / 4× High Side Output (24V, 1.3A)",
                    colspan: 2,
                  },
                  {
                    parameter: "Sync I/O_B",
                    value:
                      "2× CAN/CAN-FD interface  / 2× RS-232 interface  (debugging) / 1× RS-422 interface  (optional) / 1× Digital Output(12V) / 2× Bidirectional GPIO interface (12V) / 1× ACC Ignition Signal Detection / 2× Voltage Output (12V/5V, maximum 0.8A)",
                    colspan: 2,
                  },
                  {
                    parameter: "TF ",
                    value: "TF Card Slot (debugging)",
                    colspan: 2,
                  },
                  {
                    parameter: "Video Output ",
                    value: "1× HDMI",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with  SIM socket",
                  },
                  {
                    parameter: "M.2 Key B",
                    value:
                      "1× M.2 3052 Key B socket for 5G cellular module, with SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: ["PARAMETER", "SPECIFICATIONS"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "9–36 VDC",
                  },
                  {
                    parameter: "Power Interface",
                    value: "DC Barrel Connector interface",
                  },
                ],
              },
              {
                title: "MECHANICAL ",
                columns: ["MECHANICAL ", "SPECIFICATIONS"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "250.5mm × 200.2mm × 58.3mm (including interface)",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall Mount Brackets",
                    colspan: 2,
                  },
                  {
                    parameter: "Enclosure ",
                    value: "Rugged Aluminium Alloy with IP5X Protection Grade",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "ENVIRONMENTAL",
                columns: ["ENVIRONMENTAL ", "SPECIFICATIONS"],
                rows: [
                  {
                    parameter: "Operating Temp",
                    value: "-40°C to 85°C",
                  },
                  {
                    parameter: "Mounting",
                    value: "Active Air Cooling with Integrated Heat Sink",
                    colspan: 2,
                  },
                  {
                    parameter: "Storage Humidity",
                    value: "5% to 95%",
                  },
                  {
                    parameter: "Operating Humidity",
                    value: "10% to 90%",
                  },
                  {
                    parameter: "Air pressure ",
                    value: "86 kPa to 106 kPa",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdge 900DR",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 120W AC-DC Power Adaptor (20V, 6A) ",
                  },
                  {
                    parameter: "Power Cord",
                    value:
                      "EU1-MC13 1.8M Universal Power cord ",
                  },

                  {
                    parameter: "Cables & Connectors",
                    value:
                      "Molex 48-Pin 1M Interconnect Harness for TDA4   / Molex 32-Pin 0.5M Interconnect Harness for AGX Orin  / FAKRA-Z, 1-to-4 F-F Splitter Cable, 0.5M  / FAKRA-Z, 1-to-4 F-M Splitter Cable, 0.5M  / Amphenol 2*2 Plug 0.5m IN-Vehicle Ethernet Cable",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "5G LTE Module",
                    value:
                      "Quectel RM520N-GL 5G Sub-6G GHz Global-Band M.2 Module ",
                  },
                  {
                    parameter: "Wi-Fi & 4G Antenna",
                    value:
                      "2 in 1 Dual Band Wi-Fi & 4G Antenna with Fakra Connector",
                  },
                  {
                    parameter: "Wi-Fi & 5G Antenna",
                    value:
                      "5 in 1 Dual Band Wi-Fi & 5G Antenna with Fakra Connector ",
                  },
                  {
                    parameter: "Storage",
                    value:
                      "Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, and 4TB capacities",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION ",
                columns: ["VARIANT", "SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "HyperEdge 900DR",
                    values: [
                      "TDA4VM + NVIDIA Jetson AGX Orin 32GB",
                      "HE900DRAGXO32G",
                    ],
                  },
                  {
                    parameter: "HyperEdge 900DR",
                    values: [
                      "TDA4VM + NVIDIA Jetson AGX Orin 64GB",
                      "HE900DRAGXO64G",
                    ],
                  },
                  {
                    parameter: "HyperEdge 900DRV",
                    values: [
                      "TDA4VM + NVIDIA Jetson AGX Orin 32GB",
                      "HE900DRVAGXO32G",
                    ],
                  },
                  {
                    parameter: "HyperEdge 900DRV",
                    values: [
                      "TDA4VM + NVIDIA Jetson AGX Orin 64GB",
                      "HE900DRVAGXO64G",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "hyperedge-900sr-ai-edge-computer",
            name: "HyperEdge 900SR",
            description:
              "The HyperEdge 900SR is a compact AI edge computing platform powered by NVIDIA®️ Jetson Orin™️ Nano and Orin™️ NX modules, delivering scalable AI performance from 34 to 157 TOPS. Built for industrial AI applications, it supports intelligent vision, robotics, autonomous machines, and smart transportation with real-time edge processing. Featuring NVIDIA Ampere architecture, up to 1024 CUDA® cores, Tensor Cores, LPDDR5 memory, and optional NVDLA v2 acceleration, it enables high-speed AI inference. The system offers dual Gigabit Ethernet, USB 3.2, USB Type-C, HDMI, serial, CAN, GPIO, PPS, and up to eight GMSL camera inputs, with optional Wi-Fi and 4G/5G connectivity.",
            metaTitle:
              "HyperEdge 900SR | AI Edge Computer for Autonomous Systems | CoreBolt",
            metaDescription:
              "Explore the HyperEdge 900SR Edge AI system featuring TI’s TDA4 processor for intelligent automation, vision, and high-performance computing.",
            metaKeywords:
              "HyperEdge 900SR, HyperEdge 900SR AI Edge Computer, HyperEdge 900SR Price, Buy HyperEdge 900SR, Industrial Edge AI Computer, Industrial IoT Computer, NVIDIA Jetson Orin Computer, AI Computer for Robotics, AI Computer for Machine Vision, Smart Factory AI Computer",
              overview:"The HyperEdge 900SR is a compact, high-performance AI edge computing platform powered by the NVIDIA®️ Jetson Orin™️ Nano and Jetson Orin™️ NX series modules. Designed for next-generation edge AI applications, the system delivers scalable AI performance ranging from 34 TOPS to 157 TOPS, making it ideal for intelligent vision systems, robotics, industrial automation, autonomous machines, and smart transportation applications. Combining advanced AI acceleration with a rugged industrial design, the HyperEdge 900SR enables real-time data processing and intelligent decision-making at the edge.Built on NVIDIA's latest Ampere GPU architecture, the HyperEdge 900SR supports multiple Jetson configurations, including Jetson Orin Nano 4GB/8GB and Jetson Orin NX 8GB/16GB modules. Featuring up to 1024 CUDA®️ cores, 32 Tensor Cores, and high-bandwidth LPDDR5 memory, the platform provides exceptional AI inference capabilities for deep learning, computer vision, object detection, and advanced analytics workloads. Selected configurations additionally integrate NVIDIA NVDLA v2 (Deep Learning Accelerator), delivering dedicated hardware acceleration for AI inference while optimizing overall system efficiency and reducing CPU and GPU utilization.The HyperEdge 900SR offers a comprehensive range of industrial interfaces for seamless integration with sensors, cameras, and peripheral devices. The platform features dual Gigabit Ethernet ports, USB 3.2 and USB Type - C interfaces, HDMI display output, RS-232, RS-422/RS-485 serial communication, CAN/CAN-FD interfaces, GPIO inputs, and PPS synchronization interfaces. In addition, up to eight GMSL camera inputs enable advanced multi-camera deployments for machine vision, autonomous systems, and intelligent perception applications. Optional dual-band Wi-Fi and 4G/5G cellular connectivity further enhance deployment flexibility in remote and mobile environments. ",
              overviewTitle:
              "High-Performance AI Edge Computing for Autonomous and Industrial Applications",
            image:
              "https://assets.core-bolt.com/website-assets/hyperedge-900sr-edge-computer.png",
            images: [
              "https://assets.core-bolt.com/website-assets/edge-ai-computer-hyper-edge-900sr.jpeg",
              "https://assets.core-bolt.com/website-assets/hyperedge-900SR-edge-ai-computer-up-view.jpg",
            ],

            fileUrl: null,
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: null,
            certifications: [
              "Autonomous Vehicles",
              "Intelligent Transportation",
              "Agricultural Robotics",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Orin NX SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
                {
                  name: "Orin Nano SOM",
                  image:
                    "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperEdge 900DR is engineered for heterogeneous AI computing, autonomous systems, and real-time intelligent control",
              items: [
                {
                  title: "UNMANNED GROUND VEHICLES",
                  image:
                    "https://assets.core-bolt.com/website-assets/12corebolt.jpg",
                },
                {
                  title: "CONSTRUCTION MACHINERY",
                  image:
                    "https://assets.core-bolt.com/website-assets/13corebolt.jpg",
                },
                {
                  title: "AUTONOMOUS PORT VEHICLES",
                  image:
                    "https://assets.core-bolt.com/website-assets/14corebolt.jpg",
                },
                {
                  title: "AUTONOMOUS MOBILE ROBOTS ",
                  image:
                    "https://assets.core-bolt.com/website-assets/19corebolt.jpg",
                },
                {
                  title: "MATERIAL HANDLING ROBOTS",
                  image:
                    "https://assets.core-bolt.com/website-assets/16corebolt.jpg",
                },
                {
                  title: "AGRICULTURE ROBOTICS",
                  image:
                    "https://assets.core-bolt.com/website-assets/17corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTE MODULE — NVIDIA JETSON  ORIN NX",
                columns: [
                  "PARAMETER",
                  "ORIN NX 8GB VARIANT",
                  "ORIN NX 16GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "117 TOPS",
                      "157 TOPS",
                    ],
                  },
                    {
                    parameter: "GPU",
                    value: "1024-core NVIDIA Ampere GPU with 32 Tensor Cores ",
                  },
                  {
                    parameter: "CPU",
                    values: [
                      "6-core Arm® Cortex® A78AE v8.2 64bit (up to 2 GHz)",
                      "8-core Arm® Cortex® A78AE v8.2 64bit (up to 2 GHz)",
                    ],
                     colspan: 2,
                  },
                    {
                    parameter: "NPU",
                   values: [
                      "1x NVDLA",
                      "2x NVDLA",
                    ],
                     colspan: 2,                               },
                  {
                    parameter: "Memory",
                    values: [
                      "8GB 128-bit LPDDR5 102.4 GB/s",
                      "16GB 128-bit LPDDR5 102.4 GB/s",
                    ],
                  },
                  {
                    parameter: "Video Encode",
                    value: "1x4K60 | 3x4K30 | 6x1080p60 | 12x1080p30",
                  },
                 
                  {
                    parameter: "Video Decode",
                 value: "1x8K30 | 2x4K60 | 4x4K30 | 9x1080p60 | 18x1080p30",
                    colspan: 2,
                  },
                 
                  {
                    parameter: "eMMC",
                    value: "Supports external NVMe",
                    colspan: 2,
                  },
                ],
              },

              {
                title: "COMPUTE MODULE — NVIDIA JETSON ORIN NANO",
                columns: [
                  "PARAMETER",
                  "ORIN NANO 4GB VARIANT",
                  "ORIN NANO 8GB VARIANT",
                ],
                rows: [
                  {
                    parameter: "AI Performance",
                    values: [
                      "34 TOPS",
                      "67 TOPS",
                    ],
                  },
                  {
                    parameter: "GPU",
                    values: [
                      "512-core NVIDIA Ampere GPU with 16 Tensor Cores",
                      "1024-core NVIDIA Ampere GPU with 32 Tensor Cores",
                    ],

                    colspan: 2,
                  },
                  {
                    parameter: "CPU",
                    value:
                    "6-core Arm® Cortex®-A78AE v8.2 64bit (up to 2 GHz)",
                    
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "4 GB 64bit LPDDR5 51GB/s",
                      "8 GB 128bit LPDDR5 102GB/s",
                    ],
                  },
                
                  {
                    parameter: "Video Encode",
                    value: 
                      "1080p 30 supported by 1-2 CPU cores",
                    
                    colspan: 2,
                  },
                  {
                    parameter: "Video Decode",
                    value:
                      "1×4K60 | 2×4K30 | 5×1080p60 | 11×1080p30",
                      
                   
                    colspan: 2,
                  },
                 
                  {
                    parameter: "eMMC",
                    value: "Support external NVMe",
                    colspan: 2,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value: "2× RJ45 Gigabit Ethernet Ports (10/100/1000Base-T) ",
                  },
                  {
                    parameter: "USB",
                    value: "4x USB 3.2 Type-A, 1x USB Type-C (Programming), 1x Micro USB (Debugging),   ",
                  },

                  {
                    parameter: "Camera INTERFACE ",
                    value:
                      "2× 4-in-1 GMSL1/GMSL2 camera connectors (supports up to 8 camera channels) ",
                    colspan: 2,
                  },
                 
                  {
                    parameter: "Sync I/O_A",
                    value:
                      "2× CAN/CAN-FD interface / 2× RS-232 interface / 1× RS-422/ RS-485 interface / 2× Digital Input / 2× High Side Output (1× 12V Output, 1× 5V Output)",
                    colspan: 2,
                  },
                
                  {
                    parameter: "Video Output ",
                    value: "1× HDMI 2.0 Type - A",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "EXPANSION & STORAGE",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with  SIM socket",
                  },
                  {
                    parameter: "M.2 Key B",
                    value:
                      "1× M.2 3052 Key B socket for 5G cellular module, with SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                ],
              },
              {
                title: "POWER & CONTROL",
                columns: ["PARAMETER", "SPECIFICATIONS"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "9–24 VDC",
                  },
                  {
                    parameter: "Power Interface",
                    value: "DC Barrel Connector interface",
                  },
                  {
                    parameter: "Indicators & Buttons",
                    value: "2× LED indicators and a Recovery Button",
                  },
                ],
              },
              {
                title: "MECHANICAL ",
                columns: ["MECHANICAL ", "SPECIFICATIONS"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "170 mm × 166 mm × 43.5 mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Mounting Brackets",
                    colspan: 2,
                  },
                  {
                    parameter: "Enclosure ",
                    value: "Rugged Aluminium Alloy with IP50 Protection Grade",
                    colspan: 2,
                  },
                  {
                    parameter: "Weight",
                    value: "1kg ± 0.2 kg",
                    colspan: 2,
                  },
                ],
              },
              {
                title: "ENVIRONMENTAL",
                columns: ["ENVIRONMENTAL ", "SPECIFICATIONS"],
                rows: [
                  {
                    parameter: "Operating Temp",
                    value: "-40°C to 85°C",
                  },
                  {
                    parameter: "Mounting",
                    value: "Air cooling  + natural heat dissipation (casing heat sink)",
                    colspan: 2,
                  },
                  {
                    parameter: "Storage Humidity",
                    value: "5% to 95%",
                  },
                  {
                    parameter: "Operating Humidity",
                    value: "10% to 90%",
                  },
                  {
                    parameter: "Atmospheric Pressure",
                    value: "86 kPa to 106 kPa",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperEdge 900SR",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A)",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 Universal Power Cable  ",
                  },

                  {
                    parameter: "Cables & Connectors",
                    value:
                      "Molex 32-Pin 1M Interconnect Harness   / FAKRA-Z, 1-to-4 F-F Splitter Cable   / FAKRA-Z, 1-to-4 F-M Splitter Cable  ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-band Wi-Fi 5, BT 5.0 ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "5G LTE Module",
                    value:
                      "Quectel RM520N-GL 5G Sub-6G GHz Global-Band M.2 Module ",
                  },
                  {
                    parameter: "Wi-Fi & 4G Antenna",
                    value:
                      "2 in 1 Dual Band Wi-Fi & 4G Antenna with Fakra Connector",
                  },
                  {
                    parameter: "Wi-Fi & 5G Antenna",
                    value:
                      "5 in 1 Dual Band Wi-Fi & 5G Antenna with Fakra Connector ",
                  },
                  {
                    parameter: "Storage",
                    value:
                      "Customizable with 128GB, 256GB, 512GB, 1TB, 2TB, and 4TB capacities",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION ",
                columns: ["VARIANT", "SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "HyperEdge 900SR",
                    values: [
                      "NVIDIA Jetson Orin Nano 4GB",
                      "HE900SRONO4G",
                    ],
                  },
                  {
                    parameter: "HyperEdge 900SR",
                    values: [
                      "NVIDIA Jetson Orin Nano 8GB",
                      "HE900SRONO8G",
                    ],
                  },
                  {
                    parameter: "HyperEdge 900SR",
                    values: [
                      "NVIDIA Jetson Orin NX 8GB",
                      "HE900SRONX8G",
                    ],
                  },
                  {
                    parameter: "HyperEdge 900SR",
                    values: [
                      "NVIDIA Jetson Orin NX 16GB",
                      "HE900SRONX16G",
                    ],
                  },
                ],
              },
            ],
          },

            {
            id: "jetson-agx-developer-kit-64gb",
            name: "Jetson AGX Orin Developer Kit 64GB",
            description:
              "The Jetson AGX Orin Developer Kit will contain everything needed for developers to get up and running quickly. The Jetson AGX Orin Developer Kit includes a Jetson AGX Orin module with heatsink, a reference carrier board, and a power supply. The Jetson AGX Orin Developer kit can be used to develop for all the Jetson Orin modules via emulation modes to emulate their performance. With upto 275 TOPS of AI performance and power configurable between 15 and 60 W, customers now have more than 8X the performance of Jetson AGX Xavier in the same compact form-factor for developing advanced robots and other autonomous machine products.",
            metaTitle:
              "Jetson AGX Orin Developer Kit – Specs & Price in India | CORE BOLT™",
            metaDescription:
            "Jetson AGX Orin 64GB Developer Kit price in India: Rs 3,53,406 excl GST. 275 TOPS edge AI platform for robotics. In stock at Core Bolt India - order now.",
            metaKeywords:
              "jetson agx orin developer kit, jetson agx orin developer kit price, jetson agx orin developer kit 64gb, jetson agx orin developer kit user guide",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-agx-orin-developer-kit.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-Developer-Kit-2.jpg",
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-Developer-Kit-3.png",
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-Developer-Kit-4.jpg",
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-Developer-Kit-main.jpg",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/AGXOriDeveloperKit.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 353405.0,
            features: [
              "Processor : NVIDIA Jetson AGX Orin 64GB",
              "AI computing Power : 275 TOPS",
              "GPU :64 Tensor Cores, 2048-core NVIDIA Ampere architecture GPU",
              "CPU :  12-core Arm Cortex-A78AE v8.2 64-bit CPU, 3MB L2 + 6MB L3",
              "Memory :  64GB 256-bit LPDDR5, 204.8GB/s",
              "Video coding :  2x 4K60 (H.265) | 4x 4K30 (H.265) | 8x 1080p60 (H.265) | 16x 1080p30 (H.265)",
              "Storage / Expansion :  64GB eMMC 5.1",
              "Video decoding :  1x 8K30 (H.265) | 3x 4K60 (H.265) | 7x 4K30 (H.265) | 11x 1080p60 (H.265) | 22x 1080p30 (H.265)",
              "Ethernet : 1x RJ45 Gigabit Ethernet port, 1x RJ45 Gigabit Ethernet port (independent IP) ",
              "Wireless network : M.2 Key E INTERFACE, 2.4GHz / 5GHz dual-band WiFi, 4G / 5G (optional)",
              "USB : 2x USB 3.0 Type-A",
              "Serial port : 1x RS232, 1x RS485",
              "CAN : 2x CAN",
              "GPIO : 2x GPIO (input/output), maximum driving current 1mA with optocoupler isolation",
              "Power input : 19–24V DC",
              "M.2 Port : 1x M.2 Key M (PCIe NVMe 2280 SSD) (optional) ",
              "Key : Reset / Restore ",
              "Indicator light : Power / Operation ",
              "Dimensions : 133mm × 131mm × 51mm",
              "Operating temperature :  -20℃ ~ 60℃",
            ],
          },
          {
            id: "jetson-agx-orin-som-32gb",
            name: "Jetson AGX Orin SOM 32GB",
            description:
              "NVIDIA Jetson AGX Orin series modules deliver upto 200 TOPS of AI performance with power configurable between 15W and 60W. This gives you more than 8X the performance of Jetson AGX Xavier™ in the same compact form-factor for robotics and  other autonomous machine use cases.",
            metaTitle:
              "Jetson AGX Orin SOM 32GB – Specs, Price & Components in india",
            metaDescription:
              "Jetson AGX Orin 32GB SOM price in India: Rs 2,26,799 excl GST. 200 TOPS embedded AI module for robotics and vision. Buy online at Core Bolt India today.",
            metaKeywords:
              "jetson agx orin som, jetson agx orin series supported components list, jetson agx orin series price",
              overview:"Jetson AGX Orin 32GB SOM price in India: Rs 2,26,799 excl GST. 200 TOPS embedded AI module for robotics and vision. Buy online at Core Bolt India today.",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-agx-orin-som.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-MAIN1.webp",
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-2.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/agxorinsom.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 226799.0,
            features: [
              "Processor :NVIDIA Jetson AGX Orin 32GB ",
              "AI Performance : 200 TOPS ",
              "GPU : 1792-core NVIDIA Ampere GPU with 56 Tensor cores ",
              "CPU : 8-core Arm Cortex-A78AE v8.2 64-bit CPU, 2MB L2 + 4MB L3 ",
              "Memory : 32GB 256-bit LPDDR5, 204.8GB/s ",
              "Storage : 64GB eMMC 5.1 ",
              "Video Encode : 1x 4K60 (H.265) | 3x 4K30 (H.265) | 6x 1080p60 (H.265) | 12x 1080p30 (H.265)",
              "Video Decode : 1x 8K30 (H.265) | 2x 4K60 (H.265) | 4x 4K30 (H.265) | 9x 1080p60 (H.265) | 18x 1080p30 (H.265)",
              "CSI Camera : Up to 6 cameras, 16-channel MIPI CSI-2 D-PHY, upto 40Gbps",
              "PCIe : Up to 2 x8 + 1 x4 + 2 x1, PCIe 4.0 (Root port and endpoint) ",
              "USB : 3x USB 3.2 (10Gbps), 4x USB 2.0 ",
              "Network : 1x GbE + 1x 10GbE ",
              "Display : 1x 8K60, DP 1.4a (+MST) / eDP 1.4 / HDMI 2.1 ",
              "Other I/O : 4x UART, 3x SPI, 4x I2S, 8x I2C, 2x CAN, PWM, DMIC, DSPK, GPIO",
              "Power consumption : 15W–40W",
            ],
          },
          {
            id: "jetson-agx-orin-som-64gb",
            name: "Jetson AGX Orin SOM 64GB",
            description:
              "NVIDIA Jetson AGX Orin series modules deliver upto 275 TOPS of AI performance with power configurable between 15W and 60W. This gives you more than 8X the performance of Jetson AGX Xavier™ in the same compact form-factor for robotics and  other autonomous machine use cases.",
            metaTitle:
              "Jetson AGX Orin SOM 64GB – Specs, Price & Components in india",
            metaDescription:
              "Jetson AGX Orin 64GB SOM price in India: Rs 3,31,203 excl GST. 275 TOPS embedded AI module for robotics and vision. Buy online at Core Bolt India today.",
            overview:
              "Jetson AGX Orin 64GB SOM price in India: Rs 3,31,203 excl GST. 275 TOPS embedded AI module for robotics and vision. Buy online at Core Bolt India today.",
            metaKeywords:
              "jetson agx orin som, jetson agx orin series supported components list, jetson agx orin series price",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-agx-orin-som.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-MAIN1.webp",
              "https://assets.core-bolt.com/website-assets/Jetson-AGX-Orin-SOM-2.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/agxorinsom.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 331203,
            features: [
              "Processor :NVIDIA Jetson AGX Orin 64GB",
              "AI Performance :  275 TOPS",
              "GPU : 2048-core NVIDIA Ampere GPU with 64 Tensor cores",
              "CPU : 8-core Arm Cortex-A78AE v8.2 64-bit CPU, 2MB L2 + 4MB L3 || 12-core Arm Cortex-A78AE v8.2 64-bit CPU, 6MB L2 + 4MB L3",
              "Memory :  64GB 256-bit LPDDR5, 204.8GB/s",
              "Storage :  64GB eMMC 5.1",
              "Video Encode :  2x 4K60 (H.265) | 4x 4K30 (H.265) | 8x 1080p60 (H.265) | 16x 1080p30 (H.265)",
              "Video Decode :  1x 8K30 (H.265) | 3x 4K60 (H.265) | 7x 4K30 (H.265) | 22x 1080p60 (H.265) | 38x 1080p30 (H.265)",
              "CSI Camera : Up to 6 cameras, 16-channel MIPI CSI-2 D-PHY, upto 40Gbps",
              "PCIe :Up to 2 x8 + 1 x4 + 2 x1, PCIe 4.0 (Root port and endpoint)",
              "USB :  3x USB 3.2 (10Gbps), 4x USB 2.0",
              "Network :  1x GbE + 1x 10GbE",
              "Display : 1x 8K60, DP 1.4a (+MST) / eDP 1.4 / HDMI 2.1",
              "Other I/O : 4x UART, 3x SPI, 4x I2S, 8x I2C, 2x CAN, PWM, DMIC, DSPK, GPIO",
              "Power consumption :  15W–60W",
            ],
          },
          {
            id: "jetson-orin-nx-som-8gb",
            name: "Jetson Orin NX SOM 8GB",
            description:
              "Jetson Orin NX modules deliver upto 70 TOPS of AI performance in the smallest Jetson form factor, with power configurable between 10W and 40W. This gives you upto 5X the performance of Jetson AGX Xavier and upto 7.5X the performance of Jetson Xavier NX. Jetson Orin NX is available in 16GB and 8GB versions.",
            metaTitle:
              "Jetson Orin NX SOM 8GB – Powerful AI Modules & Specs | CORE BOLT™",
            metaDescription:
              "Jetson Orin NX 8GB SOM price in India: Rs 79,084 excl GST. 70 TOPS low-power edge AI module for drones and robots. In stock at Core Bolt India - order now.",
            overview:
              "Jetson Orin NX 8GB SOM price in India: Rs 79,084 excl GST. 70 TOPS low-power edge AI module for drones and robots. In stock at Core Bolt India - order now.",
            metaKeywords:
              "Jetson Orin NX SOM, jetson orin nx som price, jetson orin nx som, jetson orin nx s modules",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-orin-nx-som.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
              "https://assets.core-bolt.com/website-assets/orin-nxSOM-02.webp",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/orin_nx_som.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 79084.0,
            features: [
              "Processor :NVIDIA Jetson Orin NX 8GB",
              "AI Performance : 70 TOPS",
              "GPU : 1024-core NVIDIA Ampere architecture GPU with 32 Tensor cores",
              "CPU : 6-core Arm Cortex-A78AE v8.2 64-bit CPU, 1.5MB L2 + 4MB L3",
              "Memory : 8GB 128-bit LPDDR5, 102.4GB/s",
              "Storage :External NVMe support",
              "Video Encode : 1x 4K60 (H.265) | 3x 4K30 (H.265) | 6x 1080p60 (H.265) | 12x 1080p30 (H.265)",
              "Video Decode : 1x 8K30 (H.265) | 2x 4K60 (H.265) | 4x 4K30 (H.265) | 9x 1080p60 (H.265) | 18x 1080p30 (H.265)",
              "CSI Camera : Up to 4 cameras (8 supported via virtual channels), 8-channel MIPI CSI-2 D-PHY 2.1, upto 20Gbps ",
              "PCIe : 1x4 + 3x1, PCIe 4.0 (Root port and endpoint) ",
              "USB : 3x USB 3.2 Gen2 (10Gbps), 3x USB 2.0 ",
              "Network : 1x GbE ",
              "Display : 1x 8K30 multi-mode, DP 1.4a (+MST) / eDP 1.4a / HDMI 2.1 ",
              "Other I/O : 3x UART, 2x SPI, 2x I2S, 4x I2C, 1x CAN, DMIC, DSPK, PWM, GPIO ",
              "Power consumption :  10W–20W",
            ],
          },
          {
            id: "jetson-orin-nx-som-16gb",
            name: "Jetson Orin NX SOM 16GB",
            description:
              "Jetson Orin NX modules deliver upto 100 TOPS of AI performance in the smallest Jetson form factor, with power configurable between 10W and 40W. This gives you upto 5X the performance of Jetson AGX Xavier and upto 7.5X the performance of Jetson Xavier NX. Jetson Orin NX is available in 16GB and 8GB versions.",
            metaTitle:
              "Jetson Orin NX SOM 16GB – Powerful AI Modules & Specs | CORE BOLT™",
            metaDescription:
              "Jetson Orin NX 16GB SOM price in India: Rs 1,15,694 excl GST. 100 TOPS edge AI module for robotics and vision. In stock at Core Bolt India - order now.",
            metaKeywords:
              "Jetson Orin NX SOM, jetson orin nx som price, jetson orin nx som, jetson orin nx s modules",
              overview:"Jetson Orin NX 16GB SOM price in India: Rs 1,15,694 excl GST. 100 TOPS edge AI module for robotics and vision. In stock at Core Bolt India - order now.",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-orin-nx-som.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/orin-nxSOM-01.webp",
              "https://assets.core-bolt.com/website-assets/orin-nxSOM-02.webp",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/orin_nx_som.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 115694.0,
            features: [
              "Processor :NVIDIA Jetson Orin NX 16GB",
              "AI Performance : 100 TOPS ",
              "GPU : 1024-core NVIDIA Ampere architecture GPU with 32 Tensor cores",
              "CPU : 8-core Arm Cortex-A78AE v8.2 64-bit CPU, 2MB L2 + 4MB L3 ",
              "Memory : 16GB 128-bit LPDDR5, 102.4GB/s ",
              "Storage : External NVMe support",
              "Video Encode : 1x 4K60 (H.265) | 3x 4K30 (H.265) | 6x 1080p60 (H.265) | 12x 1080p30 (H.265) ",
              "Video Decode : 1x 8K30 (H.265) | 2x 4K60 (H.265) | 4x 4K30 (H.265) | 9x 1080p60 (H.265) | 18x 1080p30 (H.265) ",
              "CSI Camera : Up to 4 cameras (8 supported via virtual channels), 8-channel MIPI CSI-2 D-PHY 2.1, upto 20Gbps ",
              "PCIe : 1x4 + 3x1, PCIe 4.0 (Root port and endpoint) ",
              "USB : 3x USB 3.2 Gen2 (10Gbps), 3x USB 2.0 ",
              "Network : 1x GbE ",
              "Display : 1x 8K30 multi-mode, DP 1.4a (+MST) / eDP 1.4a / HDMI 2.1 ",
              "Other I/O : 3x UART, 2x SPI, 2x I2S, 4x I2C, 1x CAN, DMIC, DSPK, PWM, GPIO ",
              "Power consumption : 10W–25W ",
            ],
          },
          {
            id: "jetson-orin-nano-developer-kit-8gb",
            name: "Orin Nano Developer Kit 8GB",
            description:
              "The NVIDIA Jetson Orin Nano Super Developer Kit is a compact, powerful computer that redefines generative AI for small edge devices. it provides an affordable and accessible platform for developers, students, and makers, backed by NVIDIA AI software and a broad AI ecosystem. Purchase it from our partners, or upgrade your existing Jetson Orin Nano™ Developer Kit with the latest software.",
            metaTitle:
              "Jetson Orin Nano Super Developer Kit | Jetson Nano price",
            metaDescription:
              "Get the Jetson Orin Nano Super Developer Kit in India. Explore specs, price, and performance of Nvidia Jetson Nano Dev Kits and Orin Nano 8GB Developer Kits.",
            metaKeywords:
              "Jetson Orin Nano Super Developer Kit, nvidia jetson nano dev kit, jetson orin nano super developer kit price in india, nvidia jetson orin nano 8gb developer kit, jetson nano price",
           
              image:
              "https://assets.core-bolt.com/website-assets/jetson-orin-nano-developer-kit.jpg",
            overview:"Jetson Orin Nano 8GB Developer Kit price in India: Rs 75,270 excl GST. 40 TOPS edge AI dev board for robotics and vision. In stock at Core Bolt India now.",
            images: [
              "https://assets.core-bolt.com/website-assets/Orin-Nano-Developer-Kit-8GB-01.png",
              "https://assets.core-bolt.com/website-assets/Orin-Nano-Developer-Kit-8GB-03.webp",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Orin_nano_Develperkit.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 75270.0,
            features: [
              "Processor :NVIDIA Jetson Orin Nano Development Kit  8GB",
              "AI Computing power :  40 TOPS ",
              "GPU : 1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores, 625 MHz",
              "CPU : 6-core Arm Cortex-A78AE v8.2 64-bit CPU, 1.5MB L2 + 4MB L3, 1.5 GHz ",
              "Memory : 8GB 128-bit LPDDR5, 68 GB/s",
              "Video coding : 1080p30, supported by 1–2 CPU cores ",
              "Video decoding : 1x 4K60 (H.265) | 2x 4K30 (H.265) | 5x 1080p60 (H.265) | 11x 1080p30 (H.265) ",
              "Ethernet : 1x RJ45 Gigabit Ethernet port ",
              "Wireless network : M.2 Key INTERFACE, 2.4GHz / 5GHz dual-band WiFi (optional) ",
              "USB : 4x USB 3.0 Type-A, 1x USB 2.0 Type-C ",
              "Video output : 1x HDMI 2.0 (compatible with HDMI 1.4) ",
              "Serial port : 1x UART, 1x Debug ",
              "M.2 : 1x M.2 Key M (PCIe NVMe 2280 SSD) ",
              "Power input : 9–19V DC",
              "Key :Power / Reset / Restore",
              "Operating temperature : -20℃ ~ 55℃",
              "Indicator light : Power",
              "Size :  103mm × 90mm × 34.6mm",
            ],
          },
          {
            id: "jetson-orin-nano-som-8gb",
            name: "Jetson Orin Nano SOM 8GB",
            description:
              "NVIDIA Jetson Orin NanoTM-series modules deliver upto 40 TOPS of Al performance in the smallest JetsonTM form-factor, with power options between 7W and 15W. This gives you upto 80X the performance of NVIDIA Jetson Nano and sets the new standard for entry-level edge Al.",
            metaTitle:
              "Jetson Orin Nano Series – Specs, Models & Price in india",
            metaDescription:
              "Jetson Orin Nano 8GB SOM price in India: Rs 47,940 excl GST. 40 TOPS compact edge AI module for robots and cameras. Buy online at Core Bolt India today.",
           overview:"Jetson Orin Nano 8GB SOM price in India: Rs 47,940 excl GST. 40 TOPS compact edge AI module for robots and cameras. Buy online at Core Bolt India today.",
            metaKeywords:
              "Jetson Orin Nano Series, jetson orin nano series price, jetson orin nano super, jetson orin nano 8gb, jetson orin nano 4gb",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-orin-nano-som.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/Jetson-Orin-Nano-SOM-01.webp",
              "https://assets.core-bolt.com/website-assets/Jetson-Orin-Nano-SOM-03.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Orin_nano_som.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 47940.0,
            features: [
              "Processor :NVIDIA Jetson Orin Nano 8GB ",
              "AI Performance : 40 TOPS",
              "GPU : 1024-core NVIDIA Ampere architecture GPU with 32 Tensor cores ",
              "CPU : 6-core Arm Cortex-A78AE v8.2 64-bit CPU, 1.5MB L2 + 4MB L3 ",
              "Memory : 8GB 128-bit LPDDR5, 68 GB/s ",
              "Storage : External NVMe support ",
              "Video Encode : 1080p30, supported by 1–2 CPU cores ",
              "Video Decode : 1x 4K60 (H.265) | 2x 4K30 (H.265) | 5x 1080p60 (H.265) | 11x 1080p30 (H.265) ",
              "CSI Camera : Up to 4 cameras (8 via virtual channels), 8-channel MIPI CSI-2, D-PHY 2.1 upto 20Gbps ",
              "PCIe : 1x4 + 3x1, PCIe 3.0 (Root port and endpoint) ",
              "USB : 3x USB 3.2 (10Gbps), 3x USB 2.0 ",
              "Network : 1x GbE",
              "Display : 1x 4K30 multi-mode, DP 1.2 (+MST) / eDP 1.4 / HDMI 1.4 ",
              "Other I/O : 3x UART, 2x SPI, 2x I2S, 4x I2C, 1x CAN, DMIC, DSPK, PWM, GPIO ",
              "Power consumption : 7W–15W ",
            ],
          },
          {
            id: "jetson-agx-thor-developer-kit-128gb",
            name: "Jetson Agx Thor Developer Kit 128GB",
            description:
              "The NVIDIA Jetson AGX Thor™ Developer Kit is the ultimate platform tailored for next-generation humanoid robotics, delivering upto 2070 FP4 TFLOPS AI perfromance with Blackwell GPU and 128 GB of high-speed memory—all in a compact 130W power envelope. Compared to Jetson AGX Orin™, it offers upto 7.5× more AI performance to run the latest generative AI models seamlessly, and 3.5× better energy efficiency, enabling real-time multimodal perception, decision-making, and control, all for accelerating the development of intelligent, responsive, and highly sophisticated robotic systems. ",
            metaTitle:
              "Jetson Agx Thor Developer Kit Jetson AGX Thor | MIIVII AI Edge Computer | CORE BOLT™",
            metaDescription:
              " Jetson AGX Thor 128GB Developer Kit price in India: Rs 5,52,219 excl GST. Blackwell GPU platform for physical AI robots. Buy online at Core Bolt India.",
            overview:"Jetson AGX Thor 128GB Developer Kit price in India: Rs 5,52,219 excl GST. Blackwell GPU platform for physical AI robots. Buy online at Core Bolt India.",
              metaKeywords:
              "Jetson Agx Thor Developer Kit,  Jetson Agx Thor Developer Kit,jetson agx thor developr kit pric ",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-agx-thor-developer-kit.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/Jetson-Agx-Thor-Developer-Kit-01.png",
              "https://assets.core-bolt.com/website-assets/Jetson-Agx-Thor-Developer-Kit-1.png",
              "https://assets.core-bolt.com/website-assets/Jetson-Agx-Thor-Developer-Kit-3.png",
            ],
            fileUrl:
              "https://assets.core-bolt.com/website-assets/Orin_nano_som.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 552219.0,
            features: [
              "AI Performance:	2070 TFLOPS (FP4—Sparse)",
              "GPU	:2560-core NVIDIA Blackwell architecture GPU with 96 fifth-gen Tensor Cores Multi-Instance GPU (MIG) with 10 TPCs",
              "GPU: Max Frequency	1.57 GHz",
              "CPU:	14-core Arm Neoverse-V3AE 64-bit CPU ,1 MB L2 cache per core ,16 MB shared system L3 cache",
              "CPU Max Frequency:	2.6 GHz",
              "Vision Accelerator:	128 GB 256-bit LPDDR5X 273 GB/s",
              "Storage:	1 TB NVMe M.2 Key M Slot",
              "Camera:	HSB camera via QSFP slot USB camera",
              "Video Encode:	6x 4Kp60 (H.265) ,12x 4Kp30 (H.265), 24x 1080p60 (H.265), 50x 1080p30 (H.265), 48x 1080p30 (H.264), 6x 4Kp60 (H.264)",
              "Video Decode:	4x 8Kp30 (H.265), 10x 4Kp60 (H.265), 22x 4Kp30 (H.265), 46x 1080p60 (H.265), 92x 1080p30 (H.265), 82x 1080p30 (H.264), 4x 4Kp60 (H.264)",
              "PCIe:	M.2 Key M slot with x4 PCIe Gen5 , M.2 Key E slot with x1 PCIe Gen5",
              "USB:	2x USB-A (3.2 Gen2) ,2x USB-C (3.1)",
              "Networking	:1x 5GBe RJ45 connector, 1x QSFP28 (4x 25 GbE)",
              "Display:	1x HDMI 2.0b, 1x DisplayPort 1.4a",
              "Power:	40W – 130W",
              "MECHANICAL:	243.19 mm x 112.40 mm x 56.88 mm",
            ],
          },
          {
            id: "jetson-t5000-SOM-128gb",
            name: "Jetson T5000 SOM 128GB",
            description:
              "NVIDIA Jetson Thor™ series modules give you the ultimate platform for physical AI and robotics, delivering upto 2070 FP4 TFLOPS of AI compute and 128 GB of memory with power configurable between 40 W and 130 W. They deliver over 7.5x higher AI compute than NVIDIA AGX Orin™, with 3.5x better energy efficiency.",
            metaTitle:
              "NVIDIA Jetson T5000 Module – Specs & Price Details in india",
            metaDescription:
              "Discover the NVIDIA Jetson T5000 Module with advanced AI performance. Explore specs, features, and pricing for the powerful Jetson T5000 edge computing module.",
            metaKeywords:
              "nvidia jetson t5000 module, price jetson t5000 module, Jetson T5000 Module, jetson t5000 module price, jetson t5000 module price in india",
            image:
              "https://assets.core-bolt.com/website-assets/jetson-t5000-som1.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/JetsonT5000SOM-01.png",
              "https://assets.core-bolt.com/website-assets/JetsonT5000SOM-02.png",
              "https://assets.core-bolt.com/website-assets/JetsonT5000SOM-03.png",
            ],
            fileUrl: "https://assets.core-bolt.com/website-assets/.pdf",
            category: "edge-computers",
            subcategory: "hyperedge-series",
            price: 298500.0,
            features: [
              "AI Performance:	2070 TFLOPS (FP4—Sparse)",
              "GPU	:2560-core NVIDIA Blackwell architecture GPU with 96 fifth-gen Tensor Cores Multi-Instance GPU (MIG) with 10 TPCs",
              "GPU: Max Frequency	1.57 GHz",
              "CPU:	14-core Arm Neoverse-V3AE 64-bit CPU ,1 MB L2 cache per core ,16 MB shared system L3 cache",
              "CPU Max Frequency:	2.6 GHz",
              "Vision Accelerator:	128 GB 256-bit LPDDR5X 273 GB/s",
              "Storage:	Supports NVMe through PCIe ,Supports SSD through USB3.2",
              "Camera:		Up to 20 cameras via HSB, Up to 6 cameras through 16x lanes MIPI CSI-2, Up to 32 cameras using Virtual Channels, C-PHY 2.1 (10.25 Gbps), D-PHY 2.1 (40 Gbps)",
              "Video Encode:	6x 4Kp60 (H.265) ,12x 4Kp30 (H.265), 24x 1080p60 (H.265), 50x 1080p30 (H.265), 48x 1080p30 (H.264), 6x 4Kp60 (H.264)",
              "Video Decode:	4x 8Kp30 (H.265), 10x 4Kp60 (H.265), 22x 4Kp30 (H.265), 46x 1080p60 (H.265), 92x 1080p30 (H.265), 82x 1080p30 (H.264), 4x 4Kp60 (H.264)",
              "PCIe:	Up to Gen5 (x8 lanes), Root port only—C1 (x1) and C3 (x2), Root Point or Endpoint—C2 (x1), C4 (x8), and C5 (x4)",
              "USB:	xHCI host controller with integrated PHY (upto), 3x USB 3.2, 4x USB 2.0",
              "Networking	:4x 25 GbE",
              "Display:	4x shared HDMI2.1, VESA DisplayPort 1.4a—HBR2, MST",
              "Power:	40W – 130W",
              "MECHANICAL:	100 mm x 87 mm",
            ],
          },
        ],
      },
      {
        id: "hypercore-series",
        name: "HyperCore Series",
        brand: "Intel",
        description:
          "The HyperCore Series is a family of industrial edge computers designed for reliable operation in demanding environments. Combining scalable computing performance, flexible expansion, and industrial-grade durability, HyperCore platforms support automation, machine vision, Industrial IoT, transportation, and smart manufacturing applications.",
        metaTitle: "Industrial Edge Computers for Automation in India",
        metaDescription: "",
        metaKeywords: "",
        overview:
          "CoreBolt HyperCore Series combines industrial-grade reliability with scalable edge computing performance for automation, Industrial IoT, machine control, transportation, and smart infrastructure applications. Designed for continuous operation in demanding environments, HyperCore industrial edge computers provide reliable processing, flexible expansion, and seamless integration with industrial equipment, sensors, and control systems.Available in compact, modular, ruggedized, and AI-ready configurations, the HyperCore portfolio supports a wide range of industrial computing requirements. With industrial connectivity, long-term deployment reliability, and application-specific customization capabilities, HyperCore edge computers enable organizations to improve operational efficiency, support intelligent automation, and accelerate digital transformation initiatives across modern industrial environments",
        overviewTitle:
          "Industrial Edge Computers for Automation, Industrial IoT & Smart Infrastructure",
        products: [
          {
            id: "hypercore-m300",
            name: "HyperCore M300",
            description:
              "HyperCore M300 is a compact industrial edge computer powered by Intel® Core™ and Intel® Celeron® processors, delivering reliable computing performance for industrial automation, machine control, Industrial IoT, and smart manufacturing applications. Designed for continuous operation in demanding environments, it enables seamless integration with industrial equipment, PLCs, sensors, and communication networks. Its compact footprint, flexible storage options, and industrial-grade reliability make it an ideal platform for edge gateway deployments, machine vision systems, and intelligent transportation applications.",
            metaTitle:
              "HyperCore M300 | Compact Industrial Edge Computer | CoreBolt",
            metaDescription:
              "Discover HyperCore 300  modules with high-performance AI capabilities. Check specs, features, and price for NVIDIA’s compact edge computing solutions.",
            metaKeywords:
              "HyperCore 300 , jetson orin nx series price, jetson orin nx series, jetson orin nx series modules",
            image:
              "https://assets.core-bolt.com/website-assets/hypercore-m300-industrial-edge-computer-corebolt.jpg",
            images: [
               "https://assets.core-bolt.com/website-assets/hypercore-m300-industrial-edge-computer-inhypercore-m300x-industrial-computer-corebolt.png",
              "https://assets.core-bolt.com/website-assets/hypercore-m300-industrial-computer-in-back.png",
            
               "https://assets.core-bolt.com/website-assets/hypercore-m300x-industrial-computer-in-front.png",

              
            ],

            fileUrl: null,
            category: "edge-computers",
            subcategory: "hypercore-series",
            price: null,
            certifications: [
              "Industrial Automation",
              "Smart  Manfacturing",
              "Intelligent Transportation",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Intel® Core™",
                  image:
                    "https://assets.core-bolt.com/website-assets/intel-core.avif",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperCore M300 is engineered for reliable industrial computing and seamless integration across edge environments.",
              items: [
                {
                  title: "INDUSTRIAL IOT GATEWAY ",
                  image:
                    "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
                },
                {
                  title: "WAREHOUSE AUTOMATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
                },
                {
                  title: "SMART MANUFACTURING",
                  image:
                    "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION ",
                  image:
                    "https://assets.core-bolt.com/website-assets/2corebolt.jpg",
                },
                {
                  title: "MACHINE VISION INSPECTION",
                  image:
                    "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "Compute Module — INTEL® CORE™ PLATFORM",
                columns: ["Parameter", "", "", "", ""],

                rows: [
                  {
                    parameter: "CPU",
                    values: [
                      "Intel® Core™ 7th Gen i3/i5/i7",
                      "Intel® Core™ 10th Gen i3/i5/i7",
                      "Intel® Core™ 12th Gen i3/i5/i7",
                      "Intel® Celeron J6412",
                    ],
                  },
                  {
                    parameter: "Memory",

                    values: [
                      "1× SO-DIMM memory slot, supports DDR3L/DDR3 SO-DIMM slot (Up to 32GB)",
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Dual-Channel, Up to 64GB)",
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Dual-Channel, Up to 64GB)",
                      "1× SO-DIMM memory slot, supports DDR4 SO-DIMM slot (Up to 32GB)",
                    ],
                    colspan: 4,
                  },

                  {
                    parameter: "Storage ",
                    values: [
                      "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                      "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                      "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                      "1× M.2 2280 Key-M slot(supports SATA SSDs)",
                    ],
                  },
                  {
                    parameter: "BIOS ",
                    value: "AMI UEFI BIOS",
                    colspan: 4,
                  },
                  {
                    parameter: "Display",
                    value:
                      "Integrated Intel® Graphics, Supports HDMI output with resolutions up to 3840×2160",
                    colspan: 4,
                  },
                  {
                    parameter: "Chipset",
                    value: "Intel® SOC",
                    colspan: 4,
                  },
                  {
                    parameter: "Operating System",
                    value: "Windows 10 | Windows 11 | Linux operating system",
                    colspan: 4,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value:
                      "2× RTL8111H Gigabit Ethernet Ports and Wake-on-LAN /PXE supported",
                  },
                  {
                    parameter: "USB",
                    value: "2× USB 2.0 ports, 4× USB 3.0 ports",
                  },
                  {
                    parameter: "Serial Ports",
                    value:
                      "6× COM ports (COM1/COM2 configurable as RS-232/RS-485; COM3–COM6 support RS-232)",
                  },
                  {
                    parameter: "GPIO ",
                    value:
                      "8× GPIO (Digital Input/Output) + External Power Switch Interface",
                  },
                  {
                    parameter: "CMOS",
                    value:
                      "1× CMOS Clear button (can clear BIOS settings and restore to factory default state)",
                  },

                  {
                    parameter: "Display ",
                    value: "1× HDMI",
                  },
                  {
                    parameter: "Audio",
                    value:
                      "1× Audio output/microphone voice input (Integrated)",
                  },
                  {
                    parameter: "Watchdog ",
                    value:
                      "255-level programmable seconds/minute, supports timeout interrupts or system reset",
                  },
                ],
              },
              {
                title: "Expansion & Storage",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi /Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe/SATA SSD",
                  },
                  {
                    parameter: "SO-DIMM",
                    value: "1× DDR3/DDR3L/DDR4 SO-DIMM RAM",
                  },
                ],
              },
              {
                title: "Power & Control",
                columns: ["parameter ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value:
                      "1x 2-PIN Phoenix terminal, supports 12VDC input, optional 9-36V wide voltage input.",
                  },
                  {
                    parameter: "Buttons",
                    value: "1x Push button switch with indicator light",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "251mm×142mm×62.65mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall-Mount Brackets",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminium Alloy",
                  },
                ],
              },
              {
                title: "Environmental",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value: "-10℃ to 60℃",
                  },
                  {
                    parameter: "Humidity",
                    value: "5 % – 95 % non-condensing",
                  },
                  {
                    parameter: "Storage Temp ",
                    value: "-20℃ to 75℃",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M300",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/7-ST-3,5 Phoenix Terminal ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable / DC Plug P1MF to Locking Phoenix-2 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value:
                      "NVMe/SATA 2280 M.2 SSD 128GB /256GB /512GB /1TB /2TB /4TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR3L/DDR3/DDR4 SO-DIMM RAM — 4GB/ 8GB/ 16GB/ 32GB",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION ",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "Intel Celeron J6412",
                    value: "HCM300J6412",
                  },
                  {
                    parameter: "Intel Core i3 7th Gen ",
                    value: "HCM300G7I3",
                  },
                  {
                    parameter: "Intel Core i5 7th Gen",
                    value: "HCM300G7I5",
                  },
                  {
                    parameter: "Intel Core i7 7th Gen ",
                    value: "HCM300G7I7",
                  },
                  {
                    parameter: "Intel Core i3 10th Gen ",
                    value: "HCM300G10I3",
                  },
                  {
                    parameter: "Intel Core i5 10th Gen",
                    value: "HCM300G10I5",
                  },
                  {
                    parameter: "Intel Core i7 10th Gen",
                    value: "HCM300G10I7",
                  },
                  {
                    parameter: "Intel Core i3 12th Gen ",
                    value: "HCM300G12I3",
                  },
                  {
                    parameter: "Intel Core i3 12th Gen ",
                    value: "HCM300G12I5",
                  },
                  {
                    parameter: "Intel Core i3 12th Gen ",
                    value: "HCM300G12I7",
                  },
                ],
              },
            ],
          },
          {
            id: "hypercore-M300X",
            name: "HyperCore M300X",
            description:
              "HyperCore M300X is a high-performance industrial edge computer powered by Intel® Core™ processors, designed for machine vision, industrial automation, Industrial IoT, and intelligent transportation applications. Featuring high-speed 2.5GbE networking and advanced connectivity options, it enables reliable data acquisition, real-time processing, and seamless communication across industrial systems. Its rugged fanless design, flexible expansion capabilities, and support for demanding edge workloads make it an ideal platform for industrial networking, edge gateways, and intelligent control systems.",
            metaTitle:
              "HyperCore M300X | High-Speed Industrial Edge Computer | CoreBolt",
            metaDescription:
              "Discover HyperCore 300  modules with high-performance AI capabilities. Check specs, features, and price for NVIDIA’s compact edge computing solutions.",
            metaKeywords:
              "HyperCore 300 , jetson orin nx series price, jetson orin nx series, jetson orin nx series modules",
            image:
              "https://assets.core-bolt.com/website-assets/hypercore-m300x-industrial-computer-corebolt.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/hypercore-m300x-industrial-computer-in-1.png",
               "https://assets.core-bolt.com/website-assets/hypercore-m300x-industrial-computer-in-front-1.png",
              "https://assets.core-bolt.com/website-assets/hypercore-m300x-industrial-computer-in-back-1.png",
            ],
            fileUrl: null,
            category: "edge-computers",
            subcategory: "hypercore-series",
            price: null,
            certifications: [
              "Industrial Automation",
              "Machine Vision",
              "Intelligent Transportation",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Intel Core®",
                  image:
                    "https://assets.core-bolt.com/website-assets/intel-core.avif ",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperCore M300X is engineered for high-speed connectivity and real-time industrial edge computing.",
              items: [
                {
                  title: "INDUSTRIAL IOT GATEWAY ",
                  image:
                    "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
                },
                {
                  title: "WAREHOUSE AUTOMATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
                },
                {
                  title: "SMART MANUFACTURING",
                  image:
                    "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION ",
                  image:
                    "https://assets.core-bolt.com/website-assets/2corebolt.jpg",
                },
                {
                  title: "MACHINE VISION INSPECTION",
                  image:
                    "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "COMPUTE MODULE — INTEL® CORE™ PLATFORM",
                columns: ["Parameter", "", ""],

                rows: [
                  {
                    parameter: "CPU",
                    values: [
                      "Intel® Core™ 7th Gen i3/i5/i7 ",
                      "Intel® Core™ 10th Gen i3/i5/i7",
                    ],
                  },
                  {
                    parameter: "BIOS ",
                    value: "AMI UEFI BIOS",
                    colspan: 2,
                  },
                  {
                    parameter: "Chipset",
                    value: "Intel® SOC",
                    colspan: 2,
                  },
                  {
                    parameter: "Graphic display",
                    values: [
                      "Intel® HD Graphics 620 ",
                      "10th Gen Intel® Hyper-GPU",
                    ],
                    colspan: 2,
                  },
                  {
                    parameter: "Storage ",
                    value:
                      "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  },
                  {
                    parameter: "Memory",

                    values: [
                      "1× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots, maximum support of 32 GB",
                      "2× SO-DIMM memory slots, supporting dual-channel DDR4 SO-DIMM memory slots, maximum support of 64 GB",
                    ],
                    colspan: 4,
                  },

                  {
                    parameter: "Operating System",
                    values: [
                      "Windows 10 | Linux operating system",
                      "Windows 10 | Windows 11 | Linux operating system",
                    ],
                    colspan: 2,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value:
                      "4× Intel® I225 Gigabit Ethernet ports, supporting up to 2.5GbE transmission specifications, and supporting Wake-on-LAN/PXE.",
                  },
                  {
                    parameter: "USB",
                    value:
                      "4× USB 2.0 ports, 4× USB 3.0 ports, 1× USB Type C (for data transmission)",
                  },
                  {
                    parameter: "Serial Ports",
                    value:
                      "6× DB9 (COM1-COM4 support RS-232/RS-485 switching, COM5-COM6 support RS-232)",
                  },
                  {
                    parameter: "GPIO ",
                    value: "1 x 8-channel GPIO socket (including terminals)",
                  },
                  {
                    parameter: "Video Output ",
                    value: "2× HDMI, 1× VGA",
                  },
                  {
                    parameter: "Audio",
                    value:
                      "1× Audio output/microphone voice input (integrated)",
                  },
                  {
                    parameter: "Watchdog ",
                    value:
                      "255-level programmable seconds/minute, supports timeout interrupts or system reset",
                  },
                ],
              },
              {
                title: "Expansion & Storage",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G cellular module, with SIM socket",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                  {
                    parameter: "SO-DIMM",
                    value: "1× DDR4 SO-DIMM RAM",
                  },
                ],
              },
              {
                title: "Power & Control",
                columns: ["parameter ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value:
                      "1x 2-PIN Phoenix terminal, supports 12V voltage input, optional 9-36V wide voltage input.",
                  },
                  {
                    parameter: "Buttons",
                    value: "1x Push button switch with indicator light",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "248.33mm×143.50mm×62.94mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall Mounting Bracket",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminium Alloy",
                  },
                ],
              },
              {
                title: "Environmental",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value: "-10℃ to 60℃",
                  },
                  {
                    parameter: "Humidity",
                    value: "5 % – 95 % non-condensing",
                  },
                  {
                    parameter: "Storage Temp ",
                    value: "-20℃ to 75℃",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M300X",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/7-ST-3,5 Phoenix Terminal ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable / DC Plug P1MF to Locking Phoenix-2 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value:
                      "NVMe/SATA 2280 M.2 SSD 128GB /256GB /512GB /1TB /2TB /4TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR4 SO-DIMM RAM 4GB /8GB /16GB /32GB",
                  },
                ],
              },
              {
                title: "ORDERING INFORMATION",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "Intel Core i3 7th Gen ",
                    value: "HCM300XG713",
                  },
                  {
                    parameter: "Intel Core i5 7th Gen ",
                    value: "HCM300XG7I5",
                  },
                  {
                    parameter: "Intel Core i7 7th Gen",
                    value: "HCM300XG7I7",
                  },
                  {
                    parameter: "Intel Core i3 10th Gen ",
                    value: "HCM300XG10I3",
                  },
                  {
                    parameter: "Intel Core i5 10th Gen  ",
                    value: "HCM300XG10I5",
                  },
                  {
                    parameter: "Intel Core i7 10th Gen ",
                    value: "HCM300XG10I7",
                  },
                ],
              },
            ],
          },
          {
            id: "hypercore-m500",
            name: "HyperCore M500",
            description:
              "HyperCore M500 is a high-performance industrial edge computer powered by Intel® Core™ and Intel® Celeron® processors, designed for industrial automation, machine vision, Industrial IoT, and intelligent transportation applications. Built for demanding industrial environments, it delivers reliable computing performance, rich industrial connectivity, and long-term operational stability. Its modular daughter-card expansion architecture allows users to customize interfaces and functionality, making it an ideal platform for application-specific deployments requiring flexibility, scalability, and seamless system integration.",
            metaTitle:
              "HyperCore M500 | Modular Industrial Edge Computer | CoreBolt",
            metaDescription:
  "HyperCore M500 is a high-performance industrial edge computer powered by Intel® Core™ and Intel® Celeron® processors, designed for industrial automation…",
            metaKeywords:
  "HyperCore M500, HyperCore Series, Edge Computers, HyperCore, M500, Intel, Core, Celeron, Industrial, CORE BOLT",
            image:
              "https://assets.core-bolt.com/website-assets/hypercore-500m-industrial-computer-corebolt.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/hypercore-500m-industrial-computer-in.png",
                "https://assets.core-bolt.com/website-assets/hypercore-500m-industrial-computer-in-front.png",
                  "https://assets.core-bolt.com/website-assets/hypercore-500m-industrial-computer-in-back.png",
              
            ],

            fileUrl: null,
            category: "edge-computers",
            subcategory: "hypercore-series",
            price: null,
            certifications: [
              "Industrial Automation",
              "Machine Vision",
              "Intelligent Transportation",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Intel Core",
                  image:
                    "https://assets.core-bolt.com/website-assets/intel-core.avif ",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Application ",
              description:
                "The HyperCore M500 is engineered for reliable performance, flexible expansion, and long-term industrial deployment.",
              items: [
                {
                  title: "INDUSTRIAL IOT GATEWAY ",
                  image:
                    "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
                },
                {
                  title: "WAREHOUSE AUTOMATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
                },
                {
                  title: "SMART MANUFACTURING",
                  image:
                    "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION ",
                  image:
                    "https://assets.core-bolt.com/website-assets/9corebolt.jpg",
                },
                {
                  title: "MACHINE VISION INSPECTION",
                  image:
                    "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "Compute Module — INTEL® CORE™ PLATFORM",
                columns: ["Parameter", "", "", "", ""],

                rows: [
                  {
                    parameter: "CPU",
                    values: [
                      "Intel® Celeron J6412",
                      "Intel® Core™ 7th Gen i3/i5/i7",
                      "Intel® Core™ 10th Gen i3/i5/i7",
                      "Intel® Core™ 12th Gen i3/i5/i7",
                    ],
                  },
                  {
                    parameter: "Memory",

                    values: [
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Up to 32GB)",
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Up to 32GB)",
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Up to 64GB)",
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Up to 64GB)",
                    ],
                    colspan: 4,
                  },
                  {
                    parameter: "Storage ",
                    values: [
                      "1× MSATA SSD Slot ",
                      "1× M.2 NVME SSD Slot",
                      "1× M.2 NVME SSD Slot",
                      "1× M.2 NVME SSD Slot",
                    ],
                  },
                  {
                    parameter: "Chipset",
                    value: "Intel® SOC",
                    colspan: 4,
                  },
                  {
                    parameter: "Display",
                    value:
                      "1x HDMI: Resolution up to 4096×2304@60Hz / 1x VGA: Resolution up to 1920×1200@60Hz / 1x HDMI Header: Resolution up to 4096×2304@60Hz (Optional)",
                    colspan: 4,
                  },

                  {
                    parameter: "Operating System",
                    value: "Windows and Linux",
                    colspan: 4,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value:
                      "2x Intel i210V LAN Chip (10 /100 /1000 Mbps, RJ-45 Type)",
                  },
                  {
                    parameter: "USB",
                    value:
                      "4x USB 3.0 (Type-A) / 4x USB 2.0 (Type-A) / 1x USB 2.0 (Type-A, Built in)",
                  },
                  {
                    parameter: "COM",
                    value:
                      "4x RS-232 /422 /485 (DB9 Type) / 2x RS-232 (DB9 Type)",
                  },
                  {
                    parameter: "GPIO ",
                    value:
                      "14 ports GPIO (7× GPI+7× GPO, Phoenix Terminal Type)",
                  },
                 
                  {
                    parameter: "Audio",
                    value: "1x Line-In + 1x Line-Out",
                  },
                  {
                    parameter: "Watchdog ",
                    value: "Support",
                  },
                ],
              },
              {
                title: "Expansion & Storage",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value:
                      "1x Mini PCI Express socket for 4G-LTE cellular module",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi /Bluetooth module",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe/SATA SSD",
                  },
                  {
                    parameter: "SO-DIMM",
                    value: "2× DDR4 SO-DIMM RAM",
                  },
                ],
              },
              {
                title: "Power & Control",
                columns: ["Parameter ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "DC 9-36V Power Input With Overvoltage Protection",
                  },
                  {
                    parameter: "Power Interface ",
                    value: "2 Pin Phoenix Terminal Type DC Plug",
                  },
                  {
                    parameter: "Buttons ",
                    value: "1x Push button switch",
                  },
                  {
                    parameter: "Indicators",
                    value: "2× LED indicators — Run and Power status",
                  },
                ],
              },
              {
                title: "DAUGHTER CARD INTERFACES",
                columns: ["INTERFACE ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "COM Port-2 ",
                    value: "2× RS-232/ 485 (DB9 type)",
                  },
                  {
                    parameter: "COM Port-6",
                    value: "4× RS-232/ 485+2× RS-232 (Phoenix terminal type)",
                  },
                  {
                    parameter: "Ethernet Port-2 ",
                    value: "2× Intel i211V LAN Chip (RJ-45 type)",
                  },
                  {
                    parameter: "Ethernet Port-4 ",
                    value:
                      "4× Intel i211V LAN Chip (RJ-45 type, PoE function or M12 type optional)",
                  },
                  {
                    parameter: "10G Ethernet Port-2",
                    value: "2× 10Gbps Ethernet Ports (SFP+ type)",
                  },
                  {
                    parameter: "USB Port-4",
                    value: "4× USB 3.0 (Type-A)",
                  },
                  {
                    parameter: "GPIO Port-14 ",
                    value:
                      "14× ports GPIO, 7× GPI+7× GPO, 3.3V (Phoenix terminal type)",
                  },
                  {
                    parameter: "DIDO Port-16",
                    value:
                      "16× ports DIDO, 8× DI+8× DO, 24V, Isolation (Phoenix terminal type), Comes with 4× RS-485 COM ports",
                  },
                  {
                    parameter: "Mini PCIE Slot-2 ",
                    value: "2× Mini PCIE slots, Support 4G and WIFI module",
                  },
                  {
                    parameter: "M.2 Slot-1 ",
                    value: "1× M.2 Key-B slot, Support 5G module",
                  },
                  {
                    parameter: "M.2 NVMe SSD Slot-1 ",
                    value: "1× M.2 NVMe SSD slot",
                  },
                  {
                    parameter: "SATA SSD Slot-1 ",
                    value: "1× SATA 3.0 SSD Slot, Support RAID 1",
                  },
                  {
                    parameter: "CAN Port-2",
                    value: "2× CAN interfaces (Phoenix terminal type)",
                  },
                  {
                    parameter: "UPS battery",
                    value: "1.2AH or 4.8AH or Super Capacitor Module",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "236mm×183mm×72mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall Mounting Brackets",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminium Alloy",
                  },
                ],
              },

              {
                title: "Environmental",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value: "-30℃ to 70℃, Support 24/7 Working",
                  },
                  {
                    parameter: "Cooling",
                    value: "Fanless Design, Conduction Heat Dissipation",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M500",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/ 8-ST-3,5 2× 8- Pin Phoenix Terminal Connector  / FMC 1,5/ 2-ST-3,5 2- Pin Phoenix Terminal Connector ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable  / DC Plug P1MF to Locking Phoenix-2 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value:
                      "NVMe/SATA 2280 M.2 SSD 128GB/ 256GB/ 512GB/ 1TB/ 2TB/ 4TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR4 SO-DIMM RAM 4GB/ 8GB/ 16GB/ 32GB",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES  FOR DAUGHTER CARD",
                    sectionHeader: true,
                  },
                  {
                    parameter: "COM Ports",
                    value:
                      "COM 2-Port Daughter Card / COM 4-Port Daughter Card ",
                  },
                  {
                    parameter: "Ethernet Ports",
                    value:
                      "Ethernet 2-Port Daughter Card  / Ethernet 4-Port RJ-45 Daughter Card  / Ethernet 4-Port PoE M12 Daughter Card  / 10G Ethernet 2-Port Daughter Card ",
                  },
                  {
                    parameter: "USB  Ports",
                    value: "USB 4-Port Daughter Card ",
                  },
                  {
                    parameter: "GPIO",
                    value:
                      "GPIO 14-Port Daughter Card ",
                  },

                  {
                    parameter: "DIDO",
                    value:
                      "DIDO 16-Port Daughter Card ",
                  },
                  {
                    parameter: "Mini PCIe",
                    value:
                      "Mini PCIe 2-Slot Daughter Card ",
                  },
                  {
                    parameter: "M.2 Expansion",
                    value: "M.2 1-Slot Daughter Card  ",
                  },
                  {
                    parameter: "Storage Expansion",
                    value:
                      "SATA 3.0 SSD 1-Slot Daughter Card  / M.2 NVMe SSD 1-Slot Daughter Card ",
                  },

                  {
                    parameter: "CAN",
                    value: "CAN 2-Port Daughter Card ",
                  },
                  {
                    parameter: "Power Backup",
                    value:
                      "1.2Ah UPS Battery Daughter Card  / 4.8Ah UPS Battery Daugther Card  / Super Capacitor UPS Battery Daugther Card ",
                  },
                ],
              },

              {
                title: "ORDERING INFORMATION ",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "Intel Celeron J6412 ",
                    value: "HCM500J6412",
                  },
                  {
                    parameter: "Intel Core i3 7th Gen ",
                    value: "HCM500G7I3",
                  },
                  {
                    parameter: "Intel Core i5 7th Gen ",
                    value: "HCM500G7I5",
                  },
                  {
                    parameter: "Intel Core i7 7th Gen ",
                    value: "HCM500G7I7",
                  },
                  {
                    parameter: "Intel Core i3 10th Gen",
                    value: "HCM500G10I3",
                  },
                  {
                    parameter: "Intel Core i5 10th Gen ",
                    value: "HCM500G10I5",
                  },
                  {
                    parameter: "Intel Core i7 10th Gen",
                    value: "HCM500G10I7",
                  },
                  {
                    parameter: "Intel Core i3 12th Gen",
                    value: "HCM500G12I3",
                  },
                  {
                    parameter: "Intel Core i5 12th Gen ",
                    value: "HCM500G12I5",
                  },
                  {
                    parameter: "Intel Core i7 12th Gen ",
                    value: "HCM500G12I7",
                  },
                ],
              },
            ],
          },
          {
            id: "hypercore-m500x",
            name: "HyperCore M500X",
            description:
              "HyperCore M500X is a high-performance industrial edge computer powered by Intel® Core™ processors, engineered for advanced automation, machine vision, factory inspection, and Industrial IoT applications. Designed for demanding edge workloads, it supports PCIe GPU and AI accelerator expansion for enhanced image processing, AI inference, and edge intelligence capabilities. Its dual daughter-card expansion architecture enables application-specific customization with additional networking, industrial communication, and I/O INTERFACES, making it an ideal platform for scalable, compute-intensive industrial and AI-powered deployments",
            metaTitle:
              "HyperCore M500X | AI-Ready Industrial Edge Computer | CoreBolt",
            metaDescription:
              "Discover the NVIDIA Jetson Z9000 Module with advanced AI performance. Explore specs, features, and pricing for the powerful Jetson Z9000 edge computing module.",
            metaKeywords:
              "nvidia jetson Z9000 module, price jetson Z9000 module, Jetson Z9000 Module, jetson Z8000 module price, jetson Z9000 module price in india",
            image:
              "https://assets.core-bolt.com/website-assets/hypercore-m500x-industrial-computer-corebolt.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/hypercore-m500x-industrial-computer-in.png",
              "https://assets.core-bolt.com/website-assets/hypercore-m500x-industrial-computer-in-front.png",
              "https://assets.core-bolt.com/website-assets/hypercore-m500x-industrial-computer-in-back.png",
            ],

            fileUrl: null,
            category: "edge-computers",
            subcategory: "hypercore-series",
            price: null,
            certifications: [
              "Industrial Automation",
              "Machine Vision",
              "Intelligent Transportation",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "intel Core®",
                  image:
                    "https://assets.core-bolt.com/website-assets/intel-core.avif ",
                },
                {
                  name: "NVIDIA",
                  image:
                    "https://assets.core-bolt.com/website-assets/NVIDIA.png",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperCore M500X is engineered for AI acceleration, advanced expansion, and highly customizable industrial computing.",
              items: [
                {
                  title: "INDUSTRIAL IOT GATEWAY ",
                  image:
                    "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
                },
                {
                  title: "WAREHOUSE AUTOMATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
                },
                {
                  title: "SMART MANUFACTURING",
                  image:
                    "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION ",
                  image:
                    "https://assets.core-bolt.com/website-assets/9corebolt.jpg",
                },
                {
                  title: "MACHINE VISION INSPECTION",
                  image:
                    "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "Compute Module — INTEL® CORE™ PLATFORM",
                columns: ["Parameter", "", "", ""],

                rows: [
                  {
                    parameter: "CPU",
                    values: [
                      "Intel® Core™ 12th Gen i3/i5/i7/i9",
                      "Intel® Core™ 13th Gen i3/i5/i7/i9",
                      "Intel® Core™ 14th Gen i3/i5/i7/i9",
                    ],
                  },
                   {
                    parameter: "GPU",
                    value: "Supports PCIe GPU and AI accelerator cards up to 75W, maximum card length 200mm",
                    colspan: 3,
                  },
                  {
                    parameter: "Memory",
                    value:
                      "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Up to 64GB)",
                    colspan: 3,
                  },
                  {
                    parameter: "Storage ",
                    value:
                      "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                    colspan: 3,
                  },
                  {
                    parameter: "Chipset",
                    value: "Intel® H670",
                    colspan: 3,
                  },
                  {
                    parameter: "GPU",
                    value: "Supports PCIe GPU and AI accelerator cards up to 75W, maximum card length 200mm",
                    colspan: 3,
                  },
                  {
                    parameter: "Display",
                    value:
                      "1× HDMI: Resolution up to 4096×2304@60Hz / 1× DP: Resolution up to 4096×2304@60Hz / 1× VGA: Resolution up to 1920×1200@60Hz",
                    colspan: 3,
                  },

                  {
                    parameter: "Operating System",
                    value: "Windows 10 | Windows 11 | Linux operating system",
                    colspan: 3,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Ethernet",
                    value:
                      "2x Intel i211V LAN Chip (10/ 100/ 1000 Mbps, RJ-45 Type)",
                  },
                  {
                    parameter: "USB",
                    value: "4x USB 3.1 (Type-A) / 3x USB 3.0 (Type-A)",
                  },
                  {
                    parameter: "COM",
                    value:
                      "4x RS-232 /422 /485 (DB9 Type) / 2x RS-232 (DB9 Type)",
                  },
                  {
                    parameter: "GPIO ",
                    value:
                      "14 ports GPIO (7× GPI+7× GPO, Phoenix Terminal Type)",
                  },

                  {
                    parameter: "Audio",
                    value: "1x Line-In + 1x Line-Out",
                  },
                  {
                    parameter: "Daughter Card ",
                    value:
                      "2× Daughter Card Slots，Support expansion I/O interfaces and funcational slots",
                  },
                  {
                    parameter: "Watchdog ",
                    value: "Support",
                  },
                  {
                    parameter: "LTP ",
                    value: "1x LTP(Optional)",
                  },
                ],
              },
              {
                title: "Expansion & Storage",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value: "1x Mini PCI Express socket for 4G cellular module",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/Bluetooth module",
                  },
                  {
                    parameter: "PCIe",
                    value: "1× PCIe 16x + 1×PCIe 1x",
                  },
                  {
                    parameter: "M.2 Key M",
                    value: "1× M.2 2280 Key M socket for NVMe SSD",
                  },
                  {
                    parameter: "SO-DIMM",
                    value: "1× DDR4 SO-DIMM RAM",
                  },
                ],
              },
              {
                title: "Power & Control",
                columns: ["Parameter ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value:
                      "DC 19-36V Power Input With Overvoltage Protection, Supports Auto-Start",
                  },
                  {
                    parameter: "Power INTERFACE ",
                    value: "4× Pin Phoenix Terminal Type DC Plug",
                  },
                  {
                    parameter: "Buttons ",
                    value: "1x Push button switch",
                  },
                  {
                    parameter: "Indicators",
                    value: "2× LED indicators — Run and Power status",
                  },
                ],
              },
              {
                title: "DAUGHTER CARD INTERFACES",
                columns: ["INTERFACE ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "COM Port-2 ",
                    value: "2× RS-232 /485 (DB9 type)",
                  },
                  {
                    parameter: "COM Port-6",
                    value: "4× RS-232 /485+2× RS-232 (Phoenix terminal type)",
                  },
                  {
                    parameter: "Ethernet Port-2 ",
                    value: "2× Intel i211V LAN Chip (RJ-45 type)",
                  },
                  {
                    parameter: "Ethernet Port-4 ",
                    value:
                      "4× Intel i211V LAN Chip (RJ-45 type, PoE function or M12 type optional)",
                  },
                  {
                    parameter: "10G Ethernet Port-2",
                    value: "2× 10Gbps Ethernet Ports (SFP+ type)",
                  },
                  {
                    parameter: "USB Port-4",
                    value: "4× USB 3.0 (Type-A)",
                  },
                  {
                    parameter: "GPIO Port-14 ",
                    value:
                      "14× ports GPIO, 7× GPI+7× GPO, 3.3V (Phoenix terminal type)",
                  },
                  {
                    parameter: "DIDO Port-16",
                    value:
                      "16× ports DIDO, 8× DI+8× DO, 24V, Isolation (Phoenix terminal type), Comes with 4× RS-485 COM ports",
                  },
                  {
                    parameter: "Mini PCIE Slot-2 ",
                    value: "2× Mini PCIE slots, Support 4G and WIFI module",
                  },
                  {
                    parameter: "M.2 Slot-1 ",
                    value: "1× M.2 Key-B slot, Support 5G module",
                  },
                  {
                    parameter: "M.2 NVMe SSD Slot-1 ",
                    value: "1× M.2 NVMe SSD slot",
                  },
                  {
                    parameter: "SATA SSD Slot-1 ",
                    value: "1× SATA 3.0 SSD Slot, Support RAID 1",
                  },
                  {
                    parameter: "CAN Port-2",
                    value: "2× CAN interfaces (Phoenix terminal type)",
                  },
                  {
                    parameter: "UPS battery",
                    value: "1.2AH or 4.8AH or Super Capacitor Module",
                  },
                ],
              },
              {
                title: "MECHANICAL",
                columns: ["Parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "236mm x 224mm x 118mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall Mounting Brackets",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminium Alloy",
                  },
                ],
              },

              {
                title: "Environmental",
                columns: ["Parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value: "-30℃ to 70℃, Support 24/7 Working",
                  },
                  {
                    parameter: "Cooling",
                    value: "Fan Design (Fanless design chassis,optional)",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M500X",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/ 8-ST-3,5 2× 8- Pin Phoenix Terminal Connector  / FMC 1,5/ 2-ST-3,5 2- Pin Phoenix Terminal Connector  ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 220W AC-DC Power Adaptor (24V, 9.17A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable / DC Plug R7BF to Locking Phoenix-4 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GH - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value: "NVMe 2280 M.2 SSD 128GB/ 256GB/ 512GB/ 1TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR4 SO-DIMM RAM 4GB/ 8GB/ 16GB/ 32GB",
                  },
                  {
                    parameter: "GPU",
                    value:
                      "NVIDIA RTX™ A2000 6GB  GDDR6  / NVIDIA RTX™ A2000 12GB  GDDR6 ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES  FOR DAUGHTER CARD",
                    sectionHeader: true,
                  },
                  {
                    parameter: "COM Ports",
                    value:
                      "COM 2-Port Daughter Card  / COM 4-Port Daughter Card ",
                  },
                  {
                    parameter: "Ethernet Ports",
                    value:
                      "Ethernet 2-Port Daughter Card  / Ethernet 4-Port RJ-45 Daughter Card  / Ethernet 4-Port PoE M12 Daughter Card  / 10G Ethernet 2-Port Daughter Card ",
                  },
                  {
                    parameter: "USB  Ports",
                    value: "USB 4-Port Daughter Card ",
                  },
                  {
                    parameter: "GPIO",
                    value:
                      "GPIO 14-Port Daughter Card ",
                  },

                  {
                    parameter: "DIDO",
                    value:
                      "DIDO 16-Port Daughter Card ",
                  },
                  {
                    parameter: "Mini PCIe",
                    value:
                      "Mini PCIe 2-Slot Daughter Card ",
                  },
                  {
                    parameter: "M.2 Expansion",
                    value: "M.2 1-Slot Daughter Card  ",
                  },
                  {
                    parameter: "Storage Expansion",
                    value:
                      "SATA 3.0 SSD 1-Slot Daughter Card  / M.2 NVMe SSD 1-Slot Daughter Card ",
                  },

                  {
                    parameter: "CAN",
                    value: "CAN 2-Port Daughter Card ",
                  },
                  {
                    parameter: "Power Backup",
                    value:
                      "1.2Ah UPS Battery Daughter Card  / 4.8Ah UPS Battery Daugther Card  / Super Capacitor UPS Battery Daugther Card ",
                  },
                ],
              },

              {
                title: "ORDERING INFORMATION For HyperCore M500X",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "Intel Core i3 12th Gen ",
                    value: "HCM500XG12I3",
                  },
                  {
                    parameter: "Intel Core i5 12th Gen",
                    value: "HCM500XG12I5",
                  },
                  {
                    parameter: "Intel Core i7 12th Gen",
                    value: "HCM500XG12I7",
                  },
                  {
                    parameter: "Intel Core i9 12th Gen ",
                    value: "HCM500XG12I9",
                  },
                  {
                    parameter: "Intel Core i3 13th Gen",
                    value: "HCM500XG13I3",
                  },
                  {
                    parameter: "Intel Core i5 13th Gen",
                    value: "HCM500XG13I5",
                  },
                  {
                    parameter: "Intel Core i7 13th Gen",
                    value: "HCM500XG13I7",
                  },
                  {
                    parameter: "Intel Core i9 13th Gen",
                    value: "HCM500XG13I9",
                  },
                  {
                    parameter: "Intel Core i3 14th Gen",
                    value: "HCM500XG14I3",
                  },
                  {
                    parameter: "Intel Core i5 14th Gen ",
                    value: "HCM500XG14I5",
                  },
                  {
                    parameter: "Intel Core i7 14th Gen",
                    value: "HCM500XG14I7",
                  },
                  {
                    parameter: "Intel Core i9 14th Gen ",
                    value: "HCM500XG14I9",
                  },
                ],
              },
            ],
          },
          {
            id: "hypercore-700r",
            name: "HyperCore 700R",
            description:
              "HyperCore 700R is a rugged industrial edge computer powered by Intel® Core™ processors, designed for reliable operation in harsh outdoor and mission-critical environments. Built with a fully sealed IP66-rated enclosure, it delivers dependable computing performance for intelligent transportation, energy and utilities, industrial automation, outdoor surveillance, and Industrial IoT applications. Its ruggedized architecture, industrial-grade connectors, and wide operating range make it an ideal platform for infrastructure deployments requiring long-term reliability in challenging environmental conditions.",
            metaTitle:
              "HyperCore 700R | IP66 Industrial Edge Computer | CoreBolt",
            metaDescription:
  "HyperCore 700R is a rugged industrial edge computer powered by Intel® Core™ processors, designed for reliable operation in harsh outdoor and…",
            metaKeywords:
  "HyperCore 700R, HyperCore Series, Edge Computers, HyperCore, 700R, Intel, Core, Built, IP66-rated, CORE BOLT",
            image:
              "https://assets.core-bolt.com/website-assets/hypercore-700r-industrial-edge-computer-corebolt.jpg",
            images: [
              "https://assets.core-bolt.com/website-assets/hypercore-700r-industrial-computer-in132.png",
              "https://assets.core-bolt.com/website-assets/hypercore-700r-industrial-computer-in-front.png",
              "https://assets.core-bolt.com/website-assets/hypercore-700r-industrial-computer-in-front-port-open.png",
            ],
            fileUrl: null,
            category: "edge-computers",
            subcategory: "hypercore-series",
            price: null,
            certifications: [
              "Industrial Automation",
              "Energy & Utilitie",
              "Intelligent Transportation",
            ],
            compatibleModulesSection: {
              label: "Compatible Modules",
              items: [
                {
                  name: "Intel Core®",
                  image:
                    "https://assets.core-bolt.com/website-assets/intel-core.avif ",
                },
              ],
            },
            applicationsSection: {
              heading: "Built For Demanding Applications",
              description:
                "The HyperCore 700R is engineered for reliable operation in harsh and mission-critical environments.",
              items: [
                {
                  title: "OUTDOOR SURVEILLANCE",
                  image:
                    "https://assets.core-bolt.com/website-assets/1corebolt.jpg",
                },
                {
                  title: "ENERGY & UTILITIES ",
                  image:
                    "https://assets.core-bolt.com/website-assets/2corebolt.jpg",
                },
                {
                  title: "SMART MANUFACTURING & MES",
                  image:
                    "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
                },
                {
                  title: "Oil & Gas Monitoring",
                  image:
                    "https://assets.core-bolt.com/website-assets/4corebolt.jpg",
                },
                {
                  title: "INDUSTRIAL AUTOMATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/5corebolt.jpg",
                },
                {
                  title: "INTELLIGENT TRANSPORTATION",
                  image:
                    "https://assets.core-bolt.com/website-assets/6corebolt.jpg",
                },
              ],
            },
            features: [],
            featureTables: [
              {
                title: "Compute Module — INTEL® CORE™ PLATFORM",
                columns: ["Parameter", "", ""],

                rows: [
                  {
                    parameter: "CPU",
                    values: [
                      "Intel® Core™ 7th Gen i5/i7 ",
                      "Intel® Core™ 10th Gen i5/i7",
                    ],
                  },
                  {
                    parameter: "Memory",
                    values: [
                      "1× SO-DIMM memory slot, supports DDR4 SO-DIMM slot (Up to 16GB)",
                      "1× SO-DIMM memory slot, supports DDR4 SO-DIMM slot (Up to 32GB)",
                    ],
                    colspan: 3,
                  },
                  {
                    parameter: "Storage ",
                    value: "1x mSATA SSD Slot",
                  },
                  {
                    parameter: "Chipset",
                    value: "Intel® SOC",
                    colspan: 2,
                  },

                  {
                    parameter: "Operating System",
                    value: "Windows 7 | Windows 10 | Linux operating system",
                    colspan: 2,
                  },
                ],
              },

              {
                title: "I/O INTERFACES",
                columns: ["INTERFACE", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Display",
                    value: "1× VGA: Resolution up to 1920×1200 @ 60Hz",
                    colspan: 2,
                  },
                  {
                    parameter: "Ethernet",
                    value:
                      "2× Intel i210V LAN Chip (10 /100 /1000 Mbps, LP-12 Type)",
                  },
                  {
                    parameter: "USB",
                    value: "4x USB 2.0 ports (LP-12)",
                  },
                  {
                    parameter: "COM",
                    value:
                      "2x RS-232 /422 /485 (LP-12 Type) / 4x RS-232 (LP-12 Type)",
                  },
                  {
                    parameter: "GPIO ",
                    value: "8 ports GPIO (4× GPI+4× GPO, LP-12 Type, optional)",
                  },

                  {
                    parameter: "Watchdog ",
                    value: "Support",
                  },
                ],
              },
              {
                title: "Expansion & Storage",
                columns: ["SLOT ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Mini PCIe",
                    value: "1x Mini PCI Express socket for 4G cellular module",
                  },
                  {
                    parameter: "M.2 Key E",
                    value:
                      "1× M.2 2230 Key E socket for Wi-Fi/Bluetooth module",
                  },

                  {
                    parameter: "mSATA",
                    value: "1× mSATA slot for SATA SSD",
                  },
                  {
                    parameter: "SO-DIMM",
                    value: "1× DDR4 SO-DIMM RAM",
                  },
                ],
              },
              {
                title: "Power & Control",
                columns: ["Parameter ", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Power Input",
                    value: "DC 9-36V Power Input With Overvoltage Protection",
                  },
                  {
                    parameter: "Power Interface",
                    value: "LP-12 Type DC Plug",
                  },
                  {
                    parameter: "Buttons ",
                    value: "1x Push button switch with indicator light",
                  },
                ],
              },

              {
                title: "MECHANICAL",
                columns: ["Parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Dimensions",
                    value: "260mm×152mm×43mm",
                  },
                  {
                    parameter: "Mounting",
                    value: "Integrated Wall Mount Brackets",
                  },
                  {
                    parameter: "Enclosure",
                    value: "Rugged Aluminium Alloy",
                  },
                ],
              },

              {
                title: "Environmental",
                columns: ["parameter", "SPECIFICATION"],
                rows: [
                  {
                    parameter: "Operating Temperature",
                    value: "-20℃ to 60℃",
                  },
                  {
                    parameter: "Protection",
                    value: "IP66-Rated Protection",
                  },
                  {
                    parameter: "Cooling",
                    value:
                      "Fanless Thermal Design with Passive Conduction Cooling",
                  },
                ],
              },
              {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore 700R",
                  },

                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable  / DC Plug P1MF to LP-12M 3 Pin aviation plug Converter ",
                  },
                  {
                    parameter: "Cables & Connectors",
                    value:
                      "LP-12 6-Pin male aviation plug to DB-9 male cable  / LP-12 7-Pin male aviation plug to 2× USB Type-A female cable  / LP-12 8-Pin male aviation plug to RJ-45 female cable  / LP-12 8-Pin male aviation plug to VGA male cable  / LP-12 8-Pin male aviation plug to XXX cable ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value: "mSATA SSD 128GB/ 256GB/ 512GB/ 1TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR4 SO-DIMM RAM 4GB/ 8GB/ 16GB/ 32GB",
                  },
                ],
              },

              {
                title: "ORDERING INFORMATION For HyperCore 700R",
                columns: ["SYSTEM CORE", "MODEL NUMBER"],
                rows: [
                  {
                    parameter: "Intel Core i5 7th Gen ",
                    value: "HC700RG7I5",
                  },
                  {
                    parameter: "Intel Core i7 7th Gen ",
                    value: "HC700RG7I7",
                  },
                  {
                    parameter: "Intel Core i5 10th Gen ",
                    value: "HC700RG10I5",
                  },
                  {
                    parameter: "Intel Core i7 10th Gen ",
                    value: "HC700RG10I7",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "industrial-panel-pc",
    name: "Industrial Panel Computer",
    metaTitle:
      "Industrial Panel Computer Manufacturer in India | Touch Panel PC & Industrial Touchscreen PCs Supplier | CORE BOLT™",
    metaDescription:
      " CoreBolt is a leading Industrial Panel Computer manufacturer in India offering industrial touch panel PCs, panel mount PCs, rugged fanless panel PCs, industrial touchscreen computers, and HMI panel PCs for factory automation, robotics, machine vision, and smart manufacturing applications. ",
    metaKeywords:
      "ndustrial Panel PC, Industrial Touch Panel PC, Touch Panel PC, Panel PC, Industrial Touchscreen PC, Industrial Panel Computer, Industrial Panel Computer Manufacturer, Industrial Panel Computer Manufacturer in India, Industrial Panel Computer Supplier, Panel PC Manufacturer, Industrial Panel Mount PC, Panel Mount PC, Industrial PC Monitor, Industrial Panel Monitor, Rugged Panel PC, Fanless Panel PC, Waterproof Panel PC, Industrial HMI Panel PC, All-in-One Industrial Panel Computer, Industrial Touchscreen Computer, Industrial Automation Panel PC, Industrial Panel Computer for Robotics, Industrial Panel Computer for Machine Vision, Industrial Panel Computer for Smart Manufacturing, Industrial Panel Computer for Factory Automation, CoreBolt Industrial Panel Computer, CoreBolt Panel PC, CoreBolt Industrial Touchscreen PC, CoreBolt Panel Mount PC, CoreBolt Industrial Computing Solutions ",
    overview:
      "CoreBolt Industrial Panel Computers combine high-performance industrial computing with responsive touchscreen interfaces for automation, robotics, machine vision, Industrial IoT, and smart manufacturing applications. Designed for reliable operation in demanding environments, these rugged industrial panel computers provide real-time visualization, machine control, process monitoring, and HMI functionality for modern industrial systems.Available in multiple display sizes and configurations, the HyperCore IPC Series supports seamless integration with industrial equipment, control systems, and edge computing infrastructure. With fanless operation, industrial-grade construction, flexible mounting options, and long-term reliability, CoreBolt Industrial Panel Computers are ideal for manufacturing facilities, warehouses, transportation systems, production lines, and Industry 4.0 deployments",
    overviewTitle:
      "Industrial Panel Computers for Automation, Robotics & Smart Manufacturing",
    image:
      "https://assets.core-bolt.com/website-assets/Industrial-Panel-PC-hero-image.jpg",
    description:
      "Industrial Panel Computers combine industrial-grade computing and intuitive touchscreen interfaces to enable real-time monitoring, machine control, HMI, and process visualization across automation, manufacturing, Industrial IoT, and smart factory environments. Designed for reliable 24/7 operation, they deliver the performance, durability, and responsiveness required for modern industrial applications.",
    products: [
      {
        id: "hypercore-ipc-s-series",
        name: "HyperCore IPC S Series",
        description:
          "HyperCore IPC S Series is a rugged Industrial Panel Computer powered by Intel® Core™ and Intel® Celeron® processors, designed for HMI, industrial automation, machine monitoring, and SCADA applications. Built for reliable operation in demanding environments, it combines responsive touchscreen interaction with industrial-grade computing performance for real-time control and visualization. With support for traditional industrial display formats and flexible installation options, the HyperCore IPC S Series is an ideal solution for modernizing legacy systems and deploying reliable operator interfaces across manufacturing and process automation environments.",
        metaTitle:
          "HyperCore IPC S Series  | High-Performance Intel Industrial Panel Computers",
        metaDescription:
  "HyperCore IPC S Series is a rugged Industrial Panel Computer powered by Intel® Core™ and Intel® Celeron® processors, designed for HMI, industrial…",
        metaKeywords:
          "HyperCore IPC S Series , Industrial Panel Computer, Industrial Touch Panel PC, Touch Panel PC, Panel PC, Industrial Touchscreen PC, Industrial Panel Computer, Industrial Panel Computer Manufacturer, Industrial Panel Computer Manufacturer in India, Industrial Panel Computer Supplier, Panel PC Manufacturer",
        image:
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-s-series.png",
        images: [
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-s-series-in.png",
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-s-series-in-front.png",
           "https://assets.core-bolt.com/website-assets/hypercore-ipc-s-series-in-back.png",            
        ],
        fileUrl: null,
        category: "industrial-panel-pc",
        price: null,
        certifications: [
          "High - Industrial Performance",
          "Rugged Design & Reliable ",
          "Smart Manufacturing ",
        ],
        compatibleModulesSection: {
          label: "Compatible Modules",
          items: [
            {
              name: "intel Core®",
              image:
                "https://assets.core-bolt.com/website-assets/intel-core.avif",
            },
          ],
        },
        applicationsSection: {
          heading: "Built for Demanding Applications",
          description:
            "The HyperCore IPC S is engineered for reliable HMI operation and industrial process visualization in demanding environments.",
          items: [
            {
              title: "SMART RETAIL & DIGITAL SIGNAGE ",
              image:
                "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
            },
            {
              title: "WAREHOUSE AUTOMATION",
              image:
                "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
            },
            {
              title: "SMART MANUFACTURING",
              image:
                "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
            },
            {
              title: "INDUSTRIAL AUTOMATION ",
              image:
                "https://assets.core-bolt.com/website-assets/2corebolt.jpg",
            },
            {
              title: "MACHINE VISION INSPECTION",
              image:
                "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
            },
            {
              title: "INTELLIGENT TRANSPORTATION",
              image:
                "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
            },
          ],
        },
        features: [],
        featureTables: [
          {
            title: "COMPUTE MODULE — INTEL® CORE™ PLATFORM",
            columns: ["PARAMETER", "", "", "", ""],

            rows: [
              {
                parameter: "CPU",
                values: [
                  "Intel® Core™ 7th Gen i3/i5/i7",
                  "Intel® Core™ 10th Gen i3/i5/i7",
                  "Intel® Core™ 12th Gen i3/i5/i7",
                  "Intel® Celeron J6412",
                ],
              },
              {
                parameter: "Memory",
                values: [
                  "1× SO-DIMM Memory slot, supports DDR3L/DDR3 SO-DIMM Memory slot (Up to 32GB)",
                  "2× SO-DIMM Memory slot, supports DDR3L/DDR3 SO-DIMM Memory slot (Dual-Channel Up to 64GB)",
                  "2× SO-DIMM Memory slot, supports DDR3L/DDR3 SO-DIMM Memory slot (Dual-Channel Up to 64GB)",
                  "1× SO-DIMM Memory slot, supports DDR4 SO-DIMM Memory slot (Up to 32GB)",
                ],
              },
              {
                parameter: "Storage",
                values: [
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports SATA SSD)",
                ],
              },
              {
                parameter: "Operating System",
                value: "Windows 10 | Windows 11 | Linux operating system",
                colspan: 4,
              },
              {
                parameter: "LCD Screen Type",
                value: "Industrial-grade LCD monitor (LED backlight)",
                colspan: 4,
              },
              {
                parameter: "Backlight Lifespan",
                value: "30,000 hours (min.)",
                colspan: 4,
              },
            ],
          },
          {
            title: "Touchscreen Specifications",
            columns: ["INTERFACE", "SPECIFICATION"],
            rows: [
              {
                parameter: "Touchscreen Type",
                value: "Projected capacitive touch, 10 Touch Points",
              },
              { parameter: "Control Method", value: "USB Interface" },
              { parameter: "Light Transmittance", value: "More than 80%" },
            ],
          },
          {
            title: "LCD Screen Specifications",
            columns: [
              "Model",
              "Screen Size",
              "Resolution",
              "Brightness",
              "Contrast Ratio",
              "Viewing Angle Type (CR≥10)",
              "Front Panel Dimensions (mm)",
              "Rear Panel Cutout (mm)",
            ],
            rows: [
              {
                parameter: "HyperCore IPC S104",
                values: [
                  '10.4"',
                  "1024 × 768",
                  "500 nits",
                  "1200:1",
                  "85/85/85/85",
                  "281 × 228",
                  "286 × 213",
                ],
              },
              {
                parameter: "HyperCore IPC S121",
                values: [
                  '12.1"',
                  "1024 × 768",
                  "350 nits",
                  "1200:1",
                  "89/89/89/89",
                  "314.90 × 253.70",
                  "301.90 × 240.70",
                ],
              },
              {
                parameter: "HyperCore IPC S150",
                values: [
                  '15.0"',
                  "1024 × 768",
                  "450 nits",
                  "1000:1",
                  "89/89/89/89",
                  "370 × 294",
                  "357 × 281",
                ],
              },
              {
                parameter: "HyperCore IPC S170",
                values: [
                  '17.0"',
                  "1280 × 1024",
                  "250 nits",
                  "1000:1",
                  "89/89/89/89",
                  "404 × 341",
                  "390 × 322",
                ],
              },
              {
                parameter: "HyperCore IPC S190",
                values: [
                  '19.0"',
                  "1280 × 1024",
                  "250 nits",
                  "1000:1",
                  "89/89/89/89",
                  "445 × 375",
                  "431 × 356",
                ],
              },
            ],
          },

          {
            title: "I/O INTERFACES",
            columns: ["INTERFACE", "SPECIFICATION"],
            rows: [
              {
                parameter: "Ethernet",
                value:
                  "2× RTL8111H Gigabit Ethernet Ports and Wake-on-LAN /PXE supported",
              },
              { parameter: "USB", value: "2× USB 2.0 ports, 4× USB 3.0 ports" },
              {
                parameter: "Serial Ports",
                value:
                  "6× COM (COM1/COM2 optional RS-232/RS-485; COM3–COM6 are RS-232)",
              },
              {
                parameter: "GPIO",
                value: "8× GPIO (providing digital input and output)",
              },
              {
                parameter: "CMOS",
                value:
                  "1× CMOS Clear button (can clear BIOS settings and restore to factory default state)",
              },
              { parameter: "Video Output", value: "1× HDMI" },
              {
                parameter: "Audio",
                value: "1× Audio/Video Combination Interface",
              },
              {
                parameter: "Watchdog",
                value:
                  "255-level programmable seconds/minute, supports timeout interrupts or system reset",
              },
              { parameter: "Speaker", value: "Up to 2× 8Ω 2W" },
            ],
          },
          {
            title: "Expansion & Storage",
            columns: ["Slot", "SPECIFICATION"],
            rows: [
              {
                parameter: "Mini PCIe",
                value:
                  "1× Mini PCI Express socket for 4G cellular module, with SIM socket",
              },
              {
                parameter: "M.2 Key E",
                value: "1× M.2 2230 Key E socket for Wi-Fi /Bluetooth module",
              },
              {
                parameter: "M.2 Key M",
                value: "1× M.2 2280 Key M socket for NVMe/SATA SSD",
              },
              { parameter: "SO-DIMM", value: "1× DDR3/DDR3L/DDR4 SO-DIMM RAM" },
            ],
          },
          {
            title: "POWER & CONTROL",
            columns: ["PARAMETER", "Specifications"],
            rows: [
              {
                parameter: "Power Input",
                value:
                  "1× 2-PIN Phoenix terminal, support 12V standard input, optional 9–36V wide voltage input",
              },
              {
                parameter: "Buttons",
                value: "1× Push button switch with indicator light",
              },
            ],
          },
          {
            title: "MECHANICAL ",
            columns: ["PARAMETER", "SPECIFICATION"],
            rows: [
              {
                parameter: "Mounting",
                value: "Integrated Wall Mounting Bracket",
              },
              { parameter: "Enclosure", value: "Rugged Aluminium Alloy" },
              {
                parameter: "Installation",
                value:
                  "Supports VESA installation /embedded panel installation",
              },
            ],
          },
          {
            title: "Environmental",
            columns: ["PARAMETER", "SPECIFICATION"],
            rows: [
              { parameter: "Operating Temperature", value: "-5°C to +60°C" },
              { parameter: "Humidity", value: "5% – 95% non-condensing" },
              { parameter: "Storage Temperature", value: "-20°C to +75°C" },
            ],
          },
          {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M300",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/7-ST-3,5 Phoenix Terminal ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable / DC Plug P1MF to Locking Phoenix-2 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value:
                      "NVMe/SATA 2280 M.2 SSD 128GB /256GB /512GB /1TB /2TB /4TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR3L/DDR3/DDR4 SO-DIMM RAM — 4GB/ 8GB/ 16GB/ 32GB",
                  },
                ],
              },

          {
            title: "ORDERING INFORMATION",
            columns: ["Variant", "SYSTEM CORE", "MODEL NUMBER"],
            rows: [
              // S104
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel Celeron J6412", "HCIPCS104J6412"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i3 7th Gen", "HCIPCS104G7I3"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i5 7th Gen", "HCIPCS104G7I5"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i7 7th Gen", "HCIPCS104G7I7"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i3 10th Gen", "HCIPCS104G10I3"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i5 10th Gen", "HCIPCS104G10I5"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i7 10th Gen", "HCIPCS104G10I7"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i3 12th Gen", "HCIPCS104G12I3"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i5 12th Gen", "HCIPCS104G12I5"],
              },
              {
                parameter: "HyperCore IPC S104",
                values: ["Intel® Core™ i7 12th Gen", "HCIPCS104G12I7"],
              },
              // S121
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel Celeron J6412", "HCIPCS121J6412"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i3 7th Gen", "HCIPCS121G7I3"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i5 7th Gen", "HCIPCS121G7I5"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i7 7th Gen", "HCIPCS121G7I7"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i3 10th Gen", "HCIPCS121G10I3"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i5 10th Gen", "HCIPCS121G10I5"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i7 10th Gen", "HCIPCS121G10I7"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i3 12th Gen", "HCIPCS121G12I3"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i5 12th Gen", "HCIPCS121G12I5"],
              },
              {
                parameter: "HyperCore IPC S121",
                values: ["Intel® Core™ i7 12th Gen", "HCIPCS121G12I7"],
              },
              // S150
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel Celeron J6412", "HCIPCS150J6412"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i3 7th Gen", "HCIPCS150G7I3"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i5 7th Gen", "HCIPCS150G7I5"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i7 7th Gen", "HCIPCS150G7I7"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i3 10th Gen", "HCIPCS150G10I3"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i5 10th Gen", "HCIPCS150G10I5"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i7 10th Gen", "HCIPCS150G10I7"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i3 12th Gen", "HCIPCS150G12I3"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i5 12th Gen", "HCIPCS150G12I5"],
              },
              {
                parameter: "HyperCore IPC S150",
                values: ["Intel® Core™ i7 12th Gen", "HCIPCS150G12I7"],
              },
              // S170
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel Celeron J6412", "HCIPCS170J6412"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i3 7th Gen", "HCIPCS170G7I3"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i5 7th Gen", "HCIPCS170G7I5"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i7 7th Gen", "HCIPCS170G7I7"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i3 10th Gen", "HCIPCS170G10I3"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i5 10th Gen", "HCIPCS170G10I5"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i7 10th Gen", "HCIPCS170G10I7"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i3 12th Gen", "HCIPCS170G12I3"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i5 12th Gen", "HCIPCS170G12I5"],
              },
              {
                parameter: "HyperCore IPC S170",
                values: ["Intel® Core™ i7 12th Gen", "HCIPCS170G12I7"],
              },
              // S190
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel Celeron J6412", "HCIPCS190J6412"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i3 7th Gen", "HCIPCS190G7I3"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i5 7th Gen", "HCIPCS190G7I5"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i7 7th Gen", "HCIPCS190G7I7"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i3 10th Gen", "HCIPCS190G10I3"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i5 10th Gen", "HCIPCS190G10I5"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i5 10th Gen", "HCIPCS190G10I7"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i3 12th Gen", "HCIPCS190G12I3"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i5 12th Gen", "HCIPCS190G12I5"],
              },
              {
                parameter: "HyperCore IPC S190",
                values: ["Intel® Core™ i7 12th Gen", "HCIPCS190G12I7"],
              },
            ],
          },
        ],
      },
      {
        id: "hypercore-ipc-g-series",
        name: "HyperCore IPC G Series",
        description:
          "HyperCore IPC G Series is a high-performance Industrial Panel Computer powered by Intel® Core™ and Intel® Celeron® processors, designed for smart manufacturing, production monitoring, machine vision, and industrial visualization applications. Featuring large-format Full HD touchscreen displays, it enables real-time process monitoring, operational analytics, and centralized equipment management. Its rugged fanless design and industrial reliability make it an ideal platform for control rooms, manufacturing dashboards, digital factory initiatives, and other applications requiring enhanced visualization and continuous operation.",
        metaTitle:
          "HyperCore IPC G Series  | High-Performance Intel Industrial Panel Computers",
        metaDescription:
          "Discover the  IPC EdgePanel P104 Industrial Panel Computer powered by Intel i7 for reliable, high-speed performance in industrial automation and embedded computing.",
        metaKeywords:
          " Industrial Panel Computer for Robotics, Industrial Panel Computer for Machine Vision, Industrial Panel Computer for Smart Manufacturing, Industrial Panel Computer for Factory Automation, CoreBolt Industrial Panel Computer, CoreBolt Panel PC, CoreBolt Industrial Touchscreen PC, CoreBolt Panel Mount PC, CoreBolt Industrial Computing Solutions",
        image:
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-g-series.png",
        images: [
        "https://assets.core-bolt.com/website-assets/hypercore-ipc-g-series-in.png",
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-g-series-in-front.png",
           "https://assets.core-bolt.com/website-assets/hypercore-ipc-g-series-in-back.png", 
        ],
        fileUrl: null,
        category: "industrial-panel-pc",
        price: null,
        certifications: [
          "High - Industrial Performance",
          "Rugged Design & Reliable ",
          "Smart Manufacturing ",
        ],
        compatibleModulesSection: {
          label: "Compatible Modules",
          items: [
            {
              name: "intel Core®",
              image:
                "https://assets.core-bolt.com/website-assets/intel-core.avif",
            },
          ],
        },
        applicationsSection: {
          heading: "Built for Demanding Applications",
          description:
            "The HyperCore IPC G is engineered for large-format visualization, centralized monitoring, and industrial control applications.",
          items: [
            {
              title: "SMART RETAIL & DIGITAL SIGNAGE ",
              image:
                "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
            },
            {
              title: "WAREHOUSE AUTOMATION",
              image:
                "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
            },
            {
              title: "SMART MANUFACTURING",
              image:
                "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
            },
            {
              title: "INDUSTRIAL AUTOMATION ",
              image:
                "https://assets.core-bolt.com/website-assets/2corebolt.jpg",
            },
            {
              title: "MACHINE VISION INSPECTION",
              image:
                "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
            },
            {
              title: "INTELLIGENT TRANSPORTATION",
              image:
                "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
            },
          ],
        },
        features: [],
        featureTables: [
          {
            title: "COMPUTE MODULE — INTEL® CORE™ PLATFORM",
            columns: ["PARAMETER", "", "", "", ""],
            rows: [
              {
                parameter: "CPU",
                values: [
                  "Intel® Core™ 7th Gen i3/i5/i7",
                  "Intel® Core™ 10th Gen i3/i5/i7",
                  "Intel® Core™ 12th Gen i3/i5/i7",
                  "Intel® Celeron J6412",
                ],
              },
              {
                parameter: "Memory",
                values: [
                  "1× SO-DIMM memory slot, supports DDR3L/DDR3 SO-DIMM  slot (Up to 32GB)",
                  "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM  slots (Dual-Channel, Up to 64GB)",
                  "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM  slots (Dual-Channel, Up to 64GB)",
                  "1× SO-DIMM memory slot, supports DDR4 SO-DIMM  slot (Up to 32GB)",
                ],
              },
              {
                parameter: "Storage",
                values: [
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports SATA SSDs)",
                ],
              },
              {
                parameter: "Operating System",
                value: "Windows 10 | Windows 11 | Linux operating system",
                colspan: 4,
              },
              {
                parameter: "LCD Screen Type",
                value: "Industrial-grade LCD monitor (LED back light)",
                colspan: 4,
              },
              {
                parameter: "Backlight Lifespan",
                value: "30,000 hours (min.)",
                colspan: 4,
              },
            ],
          },
          {
            title: "TOUCHSCREEN SPECIFICATION",
            columns: ["INTERFACE", "SPECIFICATION"],
            rows: [
              {
                parameter: "Touchscreen Type",
                value: "Projected capacitive touch, 10 Point Touch",
              },
              { parameter: "Control method", value: "USB Interface" },
              { parameter: "Light transmittance", value: "More than 80%" },
            ],
          },
          {
            title: "LCD SCREEN SPECIFICATION",
            columns: [
              "Model",
              "Screen Size",
              "Resolution",
              "Brightness",
              "Contrast Ratio",
              "Viewing Angle Typ.(CR≥10)",
              "Front Panel Dimensions (mm)",
              "Rare Panel Cutout (mm)",
            ],
            rows: [
              {
                parameter: "HyperCore IPC G133",
                values: [
                  '13.3"',
                  "1920×1080",
                  "300 nits",
                  "1200:1",
                  "85/85/85/85",
                  "346.40 × 224.40",
                  "324.50 × 198.50",
                ],
              },
              {
                parameter: "HyperCore IPC G156",
                values: [
                  '15.6"',
                  "1920×1080",
                  "250 nits",
                  "3000:1",
                  "89/89/89/89",
                  "400.40 × 254.40",
                  "374.50 × 224.50",
                ],
              },
              {
                parameter: "HyperCore IPC G185",
                values: [
                  '18.5"',
                  "1920×1080",
                  "250 nits",
                  "1000:1",
                  "89/89/89/89",
                  "462.40 × 286.40",
                  "441.30 × 261.30",
                ],
              },
              {
                parameter: "HyperCore IPC G215",
                values: [
                  '21.5"',
                  "1920×1080",
                  "250 nits",
                  "3000:1",
                  "89/89/89/89",
                  "526.90 × 322.40",
                  "506.80 × 298.30",
                ],
              },
              {
                parameter: "HyperCore IPC G236",
                values: [
                  '23.6"',
                  "1920×1080",
                  "250 nits",
                  "3000:1",
                  "89/89/89/89",
                  "578.90 × 353.90",
                  "557.60 × 328.60",
                ],
              },
              {
                parameter: "HyperCore IPC G270",
                values: [
                  '27.0"',
                  "1920×1080",
                  "250 nits",
                  "1000:1",
                  "89/89/89/89",
                  "663.90 × 402.90",
                  "641.60 × 376.60",
                ],
              },
            ],
          },
          {
            title: "I/O INTERFACES",
            columns: ["INTERFACE", "SPECIFICATION"],
            rows: [
              {
                parameter: "Ethernet",
                value:
                  "2× RTL8111H Gigabit Ethernet Ports and  Wake-on-LAN /PXE supported",
              },
              { parameter: "USB", value: "2× USB 2.0 ports, 4× USB 3.0 ports" },
              {
                parameter: "Serial Ports",
                value:
                  "6× COM (COM1/COM2 optional RS-232/RS-485, COM3 - COM6 are RS-232)",
              },
              {
                parameter: "GPIO",
                value: "8× GPIO (providing digital input and output)",
              },
              {
                parameter: "CMOS",
                value:
                  "1× CMOS Clear button (can clear BIOS settings and restore to factory default state)",
              },
              { parameter: "Video Output", value: "1× HDMI" },
              {
                parameter: "Audio",
                value: "1× Audio/Video Combination Interface",
              },
              {
                parameter: "Watchdog",
                value:
                  "255-level programmable seconds/minute, supports timeout interrupts or system reset",
              },
              { parameter: "Speaker", value: "Up to 2x 8Ω 2W" },
            ],
          },
          {
            title: "EXPANSION & STORAGE",
            columns: ["SLOT", "SPECIFICATION"],
            rows: [
              {
                parameter: "Mini PCIe",
                value:
                  "1× Mini PCI Express socket for 4G cellular module, with SIM socket",
              },
              {
                parameter: "M.2 Key E",
                value: "1× M.2 2230 Key E socket for Wi-Fi /Bluetooth module",
              },
              {
                parameter: "M.2 Key M",
                value: "1× M.2 2280 Key M socket for NVMe/SATA SSD ",
              },
              {
                parameter: "SO-DIMM",
                value: "1× DDR3/DDR3L/DDR4 SO-DIMM RAM ",
              },
            ],
          },
          {
            title: "POWER & CONTROL",
            columns: ["PARAMETER", "SPECIFICATION"],
            rows: [
              {
                parameter: "Power Input",
                value:
                  "1× 2-PIN Phoenix terminal, supports 12V voltage input, optional 9–36V wide voltage input.",
              },
              {
                parameter: "Buttons",
                value: "1× Push button switch with indicator light",
              },
            ],
          },
          {
            title: "MECHANICAL & Environmental",
            columns: ["PARAMETER", "SPECIFICATION"],
            rows: [
              {
                parameter: "Mounting",
                value: "Integrated Wall Mounting Bracket",
              },
              { parameter: "Enclosure", value: "Rugged Aluminium Alloy" },
              {
                parameter: "Install",
                value:
                  "Supports VESA installation /embedded panel installation",
              },
            ],
          },
          {
            title: "Environmental",
            columns: ["PARAMETER", "SPECIFICATION"],
            rows: [
              { parameter: "Operating Temperature", value: "-5°C to +60°C" },
              { parameter: "Humidity", value: "5% – 95% non-condensing" },
              { parameter: "Storage Temperature", value: "-20°C to +75°C" },
            ],
          },
        {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M300",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/7-ST-3,5 Phoenix Terminal ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable / DC Plug P1MF to Locking Phoenix-2 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value:
                      "NVMe/SATA 2280 M.2 SSD 128GB /256GB /512GB /1TB /2TB /4TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR3L/DDR3/DDR4 SO-DIMM RAM — 4GB/ 8GB/ 16GB/ 32GB",
                  },
                ],
              },
          {
            title: "ORDERING INFORMATION",
            columns: ["Variant", "SYSTEM CORE", "MODEL NUMBER"],
            rows: [
              // G133
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Celeron J6412", "HCIPCG133J6412"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i3 7th Gen", "HCIPCG133G7I3"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i5 7th Gen", "HCIPCG133G7I5"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i7 7th Gen", "HCIPCG133G7I7"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i3 10th Gen", "HCIPCG133G10I3"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i5 10th Gen", "HCIPCG133G10I5"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i7 10th Gen", "HCIPCG133G10I7"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i3 12th Gen", "HCIPCG133G12I3"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i5 12th Gen", "HCIPCG133G12I5"],
              },
              {
                parameter: "HyperCore IPC G133",
                values: ["Intel Core i7 12th Gen", "HCIPCG133G12I7"],
              },
              // G156
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Celeron J6412", "HCIPCG156J6412"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i3 7th Gen", "HCIPCG156G7I3"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i5 7th Gen", "HCIPCG156G7I5"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i7 7th Gen", "HCIPCG156G7I7"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i3 10th Gen", "HCIPCG156G10I3"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i5 10th Gen", "HCIPCG156G10I5"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i7 10th Gen", "HCIPCG156G10I7"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i3 12th Gen", "HCIPCG156G12I3"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i5 12th Gen", "HCIPCG156G12I5"],
              },
              {
                parameter: "HyperCore IPC G156",
                values: ["Intel Core i7 12th Gen", "HCIPCG156G12I7"],
              },
              // G185
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Celeron J6412", "HCIPCG185J6412"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i3 7th Gen", "HCIPCG185G7I3"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i5 7th Gen", "HCIPCG185G7I5"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i7 7th Gen", "HCIPCG185G7I7"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i3 10th Gen", "HCIPCG185G10I3"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i5 10th Gen", "HCIPCG185G10I5"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i7 10th Gen", "HCIPCG185G10I7"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i3 12th Gen", "HCIPCG185G12I3"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i5 12th Gen", "HCIPCG185G12I5"],
              },
              {
                parameter: "HyperCore IPC G185",
                values: ["Intel Core i7 12th Gen", "HCIPCG185G12I7"],
              },
              // G215
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Celeron J6412", "HCIPCG215J6412"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i3 7th Gen", "HCIPCG215G7I3"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i5 7th Gen", "HCIPCG215G7I5"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i7 7th Gen", "HCIPCG215G7I7"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i3 10th Gen", "HCIPCG215G10I3"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i5 10th Gen", "HCIPCG215G10I5"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i7 10th Gen", "HCIPCG215G10I7"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i3 12th Gen", "HCIPCG215G12I3"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i5 12th Gen", "HCIPCG215G12I5"],
              },
              {
                parameter: "HyperCore IPC G215",
                values: ["Intel Core i7 12th Gen", "HCIPCG215G12I7"],
              },
              // G236
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Celeron J6412", "HCIPCG236J6412"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i3 7th Gen", "HCIPCG236G7I3"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i5 7th Gen", "HCIPCG236G7I5"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i7 7th Gen", "HCIPCG236G7I7"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i3 10th Gen", "HCIPCG236G10I3"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i5 10th Gen", "HCIPCG236G10I5"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i7 10th Gen", "HCIPCG236G10I7"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i3 12th Gen", "HCIPCG236G12I3"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i5 12th Gen", "HCIPCG236G12I5"],
              },
              {
                parameter: "HyperCore IPC G236",
                values: ["Intel Core i7 12th Gen", "HCIPCG236G12I7"],
              },
              // G270
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Celeron J6412", "HCIPCG270J6412"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i3 7th Gen", "HCIPCG270G7I3"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i5 7th Gen", "HCIPCG270G7I5"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i7 7th Gen", "HCIPCG270G7I7"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i3 10th Gen", "HCIPCG270G10I3"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i5 10th Gen", "HCIPCG270G10I5"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i7 10th Gen", "HCIPCG270G10I7"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i3 12th Gen", "HCIPCG270G12I3"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i5 12th Gen", "HCIPCG270G12I5"],
              },
              {
                parameter: "HyperCore IPC G270",
                values: ["Intel Core i7 12th Gen", "HCIPCG270G12I7"],
              },
            ],
          },
        ],
      },
      {
        id: "hypercore-ipc-t-series",
        name: "HyperCore IPC T Series",
        description:
          "HyperCore IPC T Series is a versatile Industrial Panel Computer powered by Intel® Core™ and Intel® Celeron® processors, delivering reliable computing performance for industrial automation, machine vision, smart manufacturing, and Industrial IoT applications. Designed to support a wide range of display sizes and deployment requirements, it enables real-time monitoring, process visualization, and equipment control in industrial environments. Its flexible architecture, rugged construction, and broad application compatibility make it an ideal platform for organizations seeking a scalable and future-ready industrial HMI solution.",
        metaTitle:
          "HyperCore IPC T Series  | High-Performance Intel Industrial Panel Computers",
        metaDescription:
          "Discover the  IPC EdgePanel P121 Industrial Panel Computer powered by Intel i7 for reliable, high-speed performance in industrial automation and embedded computing.",
        metaKeywords:
          "Industrial Panel Computer for Robotics, Industrial Panel Computer for Machine Vision, Industrial Panel Computer for Smart Manufacturing, Industrial Panel Computer for Factory Automation, CoreBolt Industrial Panel Computer, CoreBolt Panel PC, CoreBolt Industrial Touchscreen PC, CoreBolt Panel Mount PC, CoreBolt Industrial Computing SolutionsIPC EdgePanel P121, pc-121 computer, Intel i7, IPC EdgePanel P121 Industrial Panel Computer, Industrial Panel Computer , reviews cb pc 150zd industrial pc",
        image:
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-t-series.png",
        images: [
         "https://assets.core-bolt.com/website-assets/hypercore-ipc-t-series-in.png",
          "https://assets.core-bolt.com/website-assets/hypercore-ipc-t-series-in-front.png",
           "https://assets.core-bolt.com/website-assets/hypercore-ipc-t-series-in-back.png", 
        ],
        fileUrl: null,
        category: "industrial-panel-pc",
        price: null,
        certifications: [
          "High - Industrial Performance",
          "Rugged Design & Reliable ",
          "Smart Manufacturing ",
        ],
        compatibleModulesSection: {
          label: "Compatible Modules",
          items: [
            {
              name: "intel Core®",
              image:
                "https://assets.core-bolt.com/website-assets/intel-core.avif",
            },
          ],
        },
        applicationsSection: {
          heading: "Built for Demanding Applications",
          description:
            "The HyperCore IPC T is engineered for versatile industrial computing and intuitive touchscreen interaction across automation syste",
          items: [
            {
              title: "SMART RETAIL & DIGITAL SIGNAGE ",
              image:
                "https://assets.core-bolt.com/website-assets/7corebolt.jpg",
            },
            {
              title: "WAREHOUSE AUTOMATION",
              image:
                "https://assets.core-bolt.com/website-assets/8corebolt.jpg",
            },
            {
              title: "SMART MANUFACTURING",
              image:
                "https://assets.core-bolt.com/website-assets/3corebolt.jpg",
            },
            {
              title: "INDUSTRIAL AUTOMATION ",
              image:
                "https://assets.core-bolt.com/website-assets/2corebolt.jpg",
            },
            {
              title: "MACHINE VISION INSPECTION",
              image:
                "https://assets.core-bolt.com/website-assets/10corebolt.jpg",
            },
            {
              title: "INTELLIGENT TRANSPORTATION",
              image:
                "https://assets.core-bolt.com/website-assets/11corebolt.jpg",
            },
          ],
        },
        features: [],
        featureTables: [
          {
            title: "COMPUTE MODULE — INTEL® CORE™ PLATFORM",
            columns: ["PARAMETER", "", "", "", ""],
            rows: [
              {
                parameter: "CPU",
                values: [
                  "Intel® Core™ 7th Gen i3/i5/i7",
                  "Intel® Core™ 10th Gen i3/i5/i7",
                  "Intel® Core™ 12th Gen i3/i5/i7",
                  "Intel® Celeron J6412",
                ],
              },
              {
                parameter: "Memory",
                values: [
                  "1× SO-DIMM memory slot, supports DDR3L/DDR3 SO-DIMM slot (Up to 32GB)",
                  "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Dual-Channel, Up to 64GB)",
                  "2× SO-DIMM memory slots, supporting DDR4 SO-DIMM slots (Dual-Channel, Up to 64GB)",
                  "1× SO-DIMM memory slot, supports  DDR4 SO-DIMM slot (Up to 32GB)",
                ],
              },
              {
                parameter: "Storage",
                values: [
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports NVMe SSD adaptive)",
                  "1× M.2 2280 Key-M slot (supports SATA SSDs)",
                ],
              },
              {
                parameter: "Operating System",
                value: "Windows 10 | Windows 11 | Linux operating system",
                colspan: 4,
              },
              {
                parameter: "LCD Screen Type",
                value: "Industrial-grade LCD monitor (LED back light)",
                colspan: 4,
              },
              {
                parameter: "Backlight Lifespan",
                value: "30,000 hours (min.)",
                colspan: 4,
              },
            ],
          },
          {
            title: "Touchscreen Specifications",
            columns: ["INTERFACE", "SPECIFICATION"],
            rows: [
              {
                parameter: "Touchscreen Type",
                value: "Projected capacitive touch, 10 Point Touch",
              },
              { parameter: "Control method", value: "USB interface" },
              { parameter: "Light transmittance", value: "More than 80%" },
            ],
          },
          {
            title: "LCD Screen Specifications",
            columns: [
              "Model",
              "Screen Size",
              "Resolution",
              "Brightness",
              "Contrast Ratio",
              "Viewing Angle Type.(CR≥10)",
              "Front Panel Dimensions (mm)",
              "Rare Panel Cutout (mm)",
            ],
            rows: [
              {
                parameter: "HyperCore IPC T101",
                values: [
                  '10.1"',
                  "1280×800",
                  "350 nits",
                  "800:1",
                  "85/85/85/85",
                  "259.30 × 178.30",
                  "172.70 × 253.70",
                ],
              },
              {
                parameter: "HyperCore IPC T104",
                values: [
                  '10.4"',
                  "1024×768",
                  "500 nits",
                  "1200:1",
                  "85/85/85/85",
                  "259.30 × 206.50",
                  "253.70 × 200.90",
                ],
              },
              {
                parameter: "HyperCore IPC T121",
                values: [
                  '12.1"',
                  "1024×768",
                  "350 nits",
                  "1200:1",
                  "89/89/89/89",
                  "296.30 × 233.30",
                  "290.70 × 227.70",
                ],
              },
              {
                parameter: "HyperCore IPC T133",
                values: [
                  '13.3"',
                  "1920×1080",
                  "300 nits",
                  "1200:1",
                  "85/85/85/85",
                  "330.30 × 206.30",
                  "324.70 × 200.70",
                ],
              },
              {
                parameter: "HyperCore IPC T150",
                values: [
                  '15.0"',
                  "1024×768",
                  "450 nits",
                  "1000:1",
                  "89/89/89/89",
                  "354.30 × 278.80",
                  "348.70 × 273.20",
                ],
              },
              {
                parameter: "HyperCore IPC T156",
                values: [
                  '15.6"',
                  "1920×1080",
                  "250 nits",
                  "3000:1",
                  "89/89/89/89",
                  "377.30 × 233.80",
                  "371.70 × 228.20",
                ],
              },
              {
                parameter: "HyperCore IPC T170",
                values: [
                  '17.0"',
                  "1280×1024",
                  "250 nits",
                  "1000:1",
                  "89/89/89/89",
                  "389.30 × 324.30",
                  "383.70 × 318.70",
                ],
              },
              {
                parameter: "HyperCore IPC T190",
                values: [
                  '19.0"',
                  "1280×1024",
                  "250 nits",
                  "1000:1",
                  "89/89/89/89",
                  "426.80 × 355.30",
                  "421.20 × 349.70",
                ],
              },
              {
                parameter: "HyperCore IPC T215",
                values: [
                  '21.5"',
                  "1920×1080",
                  "250 nits",
                  "3000:1",
                  "89/89/89/89",
                  "524.30 × 322.30",
                  "518.70 × 316.70",
                ],
              },
            ],
          },
          {
            title: "I/O INTERFACES",
            columns: ["INTERFACE", "SPECIFICATION"],
            rows: [
              {
                parameter: "Ethernet",
                value:
                  "2× RTL8111H Gigabit Ethernet Ports and Wake-on-LAN/ PXE supported",
              },
              { parameter: "USB", value: "2× USB 2.0 ports, 4× USB 3.0 ports" },
              {
                parameter: "Serial Ports",
                value:
                  "6× COM (COM1/COM2 optional RS-232/RS-485; COM3–COM6 are RS-232)",
              },
              {
                parameter: "GPIO",
                value: "8× GPIO (providing digital input and output)",
              },
              {
                parameter: "CMOS",
                value:
                  "1× CMOS Clear button (can clear BIOS settings and restore to factory default state)",
              },
              { parameter: "Video Output", value: "1× HDMI" },
              {
                parameter: "Audio",
                value: "1× Audio/Video Combination Interface",
              },
              {
                parameter: "Watchdog",
                value:
                  "255-level programmable seconds/minute, supports timeout interrupts or system reset",
              },
              { parameter: "Speaker", value: "upto 2× 8Ω 2W" },
            ],
          },
          {
            title: "Expansion & Storage",
            columns: ["Slot", "SPECIFICATION"],
            rows: [
              {
                parameter: "Mini PCIe",
                value:
                  "1× Mini PCI Express socket for 4G cellular module, with SIM socket",
              },
              {
                parameter: "M.2 Key E",
                value: "1× M.2 2230 Key E socket for Wi-Fi/ Bluetooth module",
              },
              {
                parameter: "M.2 Key M",
                value: "1× M.2 2280 Key M socket for NVMe/SATA SSD ",
              },
              {
                parameter: "SO-DIMM",
                value: "1× DDR3/DDR3L/DDR4 SO-DIMM RAM ",
              },
            ],
          },
          {
            title: "Power & Control",
            columns: ["Parameter", "Specification"],
            rows: [
              {
                parameter: "Power Input",
                value:
                  "1× 2-PIN Phoenix connector, supports 12V voltage input, optional 9-36V wide voltage input.",
              },
              {
                parameter: "Buttons",
                value:
                  "1× Power-on automatic start switch (manual toggle) with indicator light",
              },
            ],
          },
          {
            title: "MECHANICAL ",
            columns: ["Parameter", "SPECIFICATION"],
            rows: [
              {
                parameter: "Mounting",
                value: "Integrated Wall Mounting Bracket",
              },
              { parameter: "Enclosure", value: "Rugged Aluminium Alloy" },
              {
                parameter: "Install",
                value:
                  "Supports VESA installation/ embedded panel installation",
              },
            ],
          },
          {
            title: " Environmental",
            columns: ["Parameter", "SPECIFICATION"],
            rows: [
              { parameter: "Operating Temperature", value: "-5°C to 60°C" },
              { parameter: "Humidity", value: "5% – 95% non-condensing" },
              { parameter: "Storage Temperature", value: "-20°C to 75°C" },
            ],
          },
         {
                title: "PACKAGE CONTENTS & ACCESSORIES",
                columns: ["PACKING LIST"],
                rows: [
                  // { parameter: "PACKING LIST", sectionHeader: true },
                  {
                    parameter: "Main Unit",
                    value: "HyperCore M300",
                  },
                  {
                    parameter: "Terminal Connector",
                    value:
                      "DFMC 1,5/7-ST-3,5 Phoenix Terminal ",
                  },
                  {
                    parameter: "Mounting",
                    value: "Screws for Integrated Wall-Mount Brackets",
                  },

                  {
                    parameter: "STANDARD ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Power Adapter",
                    value:
                      "Meanwell GST 90W AC-DC Power Adaptor (12V, 7.5A) ",
                  },
                  {
                    parameter: "Power Cable",
                    value:
                      "EU1-MC13 1.8M Universal Power Cable / DC Plug P1MF to Locking Phoenix-2 Female converter ",
                  },
                  {
                    parameter: "OPTIONAL ACCESSORIES",
                    sectionHeader: true,
                    colspan: 12,
                    accent: true,
                  },
                  {
                    parameter: "Wi‑Fi Module",
                    value:
                      "Wireless AW-CB375NF NIC, Dual-Band Wi-Fi 5, BT 5.0  / Wireless AX210 NIC, Gigabit Tri-Band Wi-Fi 6E, BT 5.3  ",
                  },
                  {
                    parameter: "4G LTE Module",
                    value:
                      "Quectel EG25-G 4G LTE Cat 4 Global Band Mini PCIe Module ",
                  },
                  {
                    parameter: "Wi‑Fi Antenna",
                    value:
                      "2.4GHz - 5GHz 5dBi Omni Wi-Fi Antenna with SMA Connector ",
                  },
                  {
                    parameter: "4G Antenna",
                    value:
                      "600-6000MHz 5dBi Omni 4G Antenna with SMA Connector ",
                  },

                  {
                    parameter: "Storage",
                    value:
                      "NVMe/SATA 2280 M.2 SSD 128GB /256GB /512GB /1TB /2TB /4TB",
                  },
                  {
                    parameter: "Memory",
                    value: "DDR3L/DDR3/DDR4 SO-DIMM RAM — 4GB/ 8GB/ 16GB/ 32GB",
                  },
                ],
              },

          {
            title: "ORDERING INFORMATION",
            columns: ["Variant", "SYSTEM CORE", "MODEL NUMBER"],
            rows: [
              // T101
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Celeron J6412", "HCIPCT101J6412"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i3 7th Gen", "HCIPCT101G7I3"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i5 7th Gen", "HCIPCT101G7I5"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i7 7th Gen", "HCIPCT101G7I7"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i3 10th Gen", "HCIPCT101G10I3"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i5 10th Gen", "HCIPCT101G10I5"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i7 10th Gen", "HCIPCT101G10I7"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i3 12th Gen", "HCIPCT101G12I3"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i5 12th Gen", "HCIPCT101G12I5"],
              },
              {
                parameter: "HyperCore IPC T101",
                values: ["Intel Core i7 12th Gen", "HCIPCT101G12I7"],
              },
              // T104
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Celeron J6412", "HCIPCT104J6412"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i3 7th Gen", "HCIPCT104G7I3"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i5 7th Gen", "HCIPCT104G7I5"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i7 7th Gen", "HCIPCT104G7I7"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i3 10th Gen", "HCIPCT104G10I3"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i5 10th Gen", "HCIPCT104G10I5"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i7 10th Gen", "HCIPCT104G10I7"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i3 12th Gen", "HCIPCT104G12I3"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i5 12th Gen", "HCIPCT104G12I5"],
              },
              {
                parameter: "HyperCore IPC T104",
                values: ["Intel Core i7 12th Gen", "HCIPCT104G12I7"],
              },
              // T121
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Celeron J6412", "HCIPCT121J6412"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i3 7th Gen", "HCIPCT121G7I3"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i5 7th Gen", "HCIPCT121G7I5"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i7 7th Gen", "HCIPCT121G7I7"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i3 10th Gen", "HCIPCT121G10I3"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i5 10th Gen", "HCIPCT121G10I5"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i7 10th Gen", "HCIPCT121G10I7"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i3 12th Gen", "HCIPCT121G12I3"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i5 12th Gen", "HCIPCT121G12I5"],
              },
              {
                parameter: "HyperCore IPC T121",
                values: ["Intel Core i7 12th Gen", "HCIPCT121G12I7"],
              },
              // T133
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Celeron J6412", "HCIPCT133J6412"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i3 7th Gen", "HCIPCT133G7I3"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i5 7th Gen", "HCIPCT133G7I5"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i7 7th Gen", "HCIPCT133G7I7"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i3 10th Gen", "HCIPCT133G10I3"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i5 10th Gen", "HCIPCT133G10I5"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i7 10th Gen", "HCIPCT133G10I7"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i3 12th Gen", "HCIPCT133G12I3"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i5 12th Gen", "HCIPCT133G12I5"],
              },
              {
                parameter: "HyperCore IPC T133",
                values: ["Intel Core i7 12th Gen", "HCIPCT133G12I7"],
              },
              // T170
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Celeron J6412", "HCIPCT170J6412"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i3 7th Gen", "HCIPCT170G7I3"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i5 7th Gen", "HCIPCT170G7I5"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i7 7th Gen", "HCIPCT170G7I7"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i3 10th Gen", "HCIPCT170G10I3"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i5 10th Gen", "HCIPCT170G10I5"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i7 10th Gen", "HCIPCT170G10I7"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i3 12th Gen", "HCIPCT170G12I3"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i5 12th Gen", "HCIPCT170G12I5"],
              },
              {
                parameter: "HyperCore IPC T170",
                values: ["Intel Core i7 12th Gen", "HCIPCT170G12I7"],
              },
              // T190
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Celeron J6412", "HCIPCT190J6412"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i3 7th Gen", "HCIPCT190G7I3"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i5 7th Gen", "HCIPCT190G7I5"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i7 7th Gen", "HCIPCT190G7I7"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i3 10th Gen", "HCIPCT190G10I3"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i5 10th Gen", "HCIPCT190G10I5"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i7 10th Gen", "HCIPCT190G10I7"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i3 12th Gen", "HCIPCT190G12I3"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i5 12th Gen", "HCIPCT190G12I5"],
              },
              {
                parameter: "HyperCore IPC T190",
                values: ["Intel Core i7 12th Gen", "HCIPCT190G12I7"],
              },
              // T215
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Celeron J6412", "HCIPCT215J6412"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i3 7th Gen", "HCIPCT215G7I3"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i5 7th Gen", "HCIPCT215G7I5"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i7 7th Gen", "HCIPCT215G7I7"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i3 10th Gen", "HCIPCT215G10I3"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i5 10th Gen", "HCIPCT215G10I5"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i7 10th Gen", "HCIPCT215G10I7"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i3 12th Gen", "HCIPCT215G12I3"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i5 12th Gen", "HCIPCT215G12I5"],
              },
              {
                parameter: "HyperCore IPC T215",
                values: ["Intel Core i7 12th Gen", "HCIPCT215G12I7"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vision-systems-cameras",
    name: "Vision Systems & Cameras",
    description:"Advanced vision systems for automation, including industrial cameras, stereo depth cameras, GMSL cameras, and machine vision solutions for robotics, industrial automation, and AI applications. Designed for seamless integration with NVIDIA Jetson AI edge computers and Intel-based industrial computing platforms, these systems enable quality inspection, object detection, autonomous navigation, and intelligent automation.",
    metaTitle:
      " Vision System Cameras | Machine Vision, ZED, RealSense & Sensing Cameras",
    metaDescription:
      " Explore Vision System Cameras including ZED Cameras, Intel RealSense Cameras, and 3D Sensing Cameras for robotics, machine vision, AI, industrial automation, quality inspection, and autonomous navigation applications",
    metaKeywords:
      "Vision System Cameras, Industrial Vision Cameras, Machine Vision Cameras, AI Vision Cameras, Computer Vision Cameras, Industrial Camera Systems, Embedded Vision Cameras, Smart Vision Cameras, Industrial Imaging Cameras, Vision Inspection Cameras, 3D Vision Cameras, Depth Sensing Cameras, Stereo Vision Cameras, Industrial Sensing Cameras, AI Camera Systems, Machine Vision Systems, Industrial Vision Solutions, Vision Cameras for Robotics, Vision Cameras for Automation, Vision Cameras for AI Applications",
    overview:
      "CoreBolt provides advanced Vision System Cameras designed for robotics, machine vision, industrial automation, AI applications, and autonomous systems. Our vision solutions enable accurate image capture, depth perception, object detection, environmental awareness, and real-time decision-making for next-generation intelligent systems. CoreBolt offer a wide range of Industrial Vision Cameras, Machine Vision Cameras, 3D Sensing Cameras, ZED Cameras, and Intel RealSense Cameras to support applications requiring precision imaging, depth sensing, and computer vision capabilities. These advanced camera technologies help improve automation, inspection, navigation, and operational efficiency across diverse industries. Whether deploying robotics systems, autonomous mobile robots (AMRs), machine vision inspection solutions, smart manufacturing platforms, or AI-powered edge computing applications, Vision System Cameras provide reliable performance for demanding environments. Designed to support computer vision, SLAM, object recognition, depth measurement, and autonomous navigation, these camera solutions help accelerate the development and deployment of intelligent automation systems. From industrial quality inspection and machine vision applications to robotics, AI, and autonomous navigation, CoreBolt Vision System Cameras deliver the imaging performance, reliability, and integration flexibility required for modern industrial and intelligent systems.",
    overviewTitle:
      "Vision System Cameras for Robotics, Machine Vision & Industrial Automation  ",

    image:
      "https://assets.core-bolt.com/website-assets/gsml%20depth%20camera.png",
    subcategories: [
      {
        id: "sensing-cameras",
        name: "Sensing Cameras",
        metaTitle:
          "Sensing Cameras | GMSL, MIPI CSI-2, GigE & Machine Vision Cameras",
        metaDescription:
          "Explore advanced sensing cameras including GMSL, TI FPD-Link III, MIPI CSI-2, Starlight, Defogging, Low Latency, and GigE cameras for robotics, AI vision, machine vision, and industrial automation applications. ",
        metaKeywords:
          "Sensing Cameras, Industrial Sensing Cameras, Embedded Vision Cameras, Machine Vision Cameras, Computer Vision Cameras, Industrial Vision Cameras, GMSL Camera, GSML3 Camers, GMSL2 Camera, TI FPD-Link III Camera, FPD-Link III Camera, MIPI CSI-2 Camera, MIPI Camera Module, CSI-2 Camera, Starlight Camera, Low Light Camera, Automatic Defogging Camera, Defog Camera, Low Latency Camera, Real-Time Vision Camera, GigE Camera, GigE Vision Camera, Machine Vision GigE Camera, Industrial Imaging Camera, Vision Camera for Robotics, Vision Camera for AI Applications, CoreBolt Sensing Cameras, CoreBolt Vision Cameras, CoreBolt Embedded Vision Solutions, CoreBolt Machine Vision Systems",
        overview:
          "CoreBolt provides advanced Sensing Camera solutions designed for robotics, machine vision, industrial automation, AI applications, autonomous systems, and intelligent edge computing. These high-performance vision solutions enable accurate image capture, real-time object detection, environmental perception, and intelligent decision-making for next-generation automation systems. We offer a wide range of sensing camera technologies including GMSL Cameras, TI FPD-Link III Cameras, MIPI CSI-2 Cameras, Starlight Cameras, Automatic Defogging Cameras, Low Latency Cameras, and GigE Vision Cameras. Engineered for demanding industrial and embedded vision applications, these cameras deliver high-quality imaging, reliable data transmission, and seamless integration with AI edge computing platforms and embedded systems. Whether deploying robotics platforms, Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), machine vision inspection systems, smart manufacturing solutions, autonomous vehicles, or intelligent surveillance applications, sensing cameras provide the visual intelligence required for real-time analysis and automation. Advanced features such as low-light imaging, high-speed data transfer, long-distance connectivity, low-latency video streaming, and environmental adaptability help ensure reliable performance in complex operating conditions. Designed to support computer vision, object recognition, SLAM, quality inspection, autonomous navigation, and AI-powered analytics, CoreBolt Sensing Cameras help accelerate the development and deployment of intelligent automation systems. From industrial machine vision and robotics to edge AI and smart infrastructure applications, these camera solutions deliver the imaging performance, reliability, and flexibility required for modern industrial environments. ",
        overviewTitle:
          "Sensing Cameras for Robotics, AI Vision & Industrial Automation ",
        description:
          "Camera technologies serve as the critical foundation for modern vision-enabled systems across diverse industries. From autonomous vehicles requiring ultra-low latency processing to industrial automation demanding precise quality control, the selection of appropriate camera technology directly impacts system performance, reliability, and cost-effectiveness.",
        productGroups: [
          {
            id: "gmsl",
            name: "GMSL",

            description:
              "GMSL (Gigabit Multimedia Serial Link) is a high-speed automotive-grade interface technology developed by Maxim Integrated for reliable transmission of video, control, and data signals over long distances using coaxial or STP cables. Supporting high-bandwidth, low-latency communication with Power over Coax (PoC), GMSL enables advanced vision applications such as ADAS, surround view, stereo vision, and AI-driven embedded systems. With support for high-resolution multi-camera synchronization and real-time 4K video streaming, GMSL has become a preferred interface for modern intelligent imaging platforms.",
            productGroups: [
              {
                id: "gmsl",
                name: "GMSL",
                description:
                  "GMSL (Gigabit Multimedia Serial Link) is a high-speed serial communication technology developed by Maxim Integrated for transmitting video, audio, control, and power signals over coaxial or STP cables. Designed primarily for automotive and embedded vision applications, GMSL enables reliable long-distance data transmission with low latency and simplified cabling architecture.",
                products: [
                  {
                    id: "[2mp]-sg2-ar0231c-0202-gmsl",
                    name: "[2MP]-SG2-AR0231C-0202-GMSL",
                    description:
                      "SG2-AR0231C-0202-GMSL-Hxxx camera module is equipped with On-semi CMOS image sensor AR0231 and Maxim GMSL. It has an automotive-grade sensor with a welltuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure equipped with an M12 lens.",
                      metaTitle: "[2MP]-SG2-AR0231C-0202-GMSL – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG2-AR0231C-0202-GMSL-Hxxx camera module is equipped with On-semi CMOS image sensor AR0231 and Maxim GMSL. It has an automotive-grade sensor with a…",
                      metaKeywords:
                        "2MP SG2 AR0231C 0202 GMSL, Sensing Cameras, Vision Systems & Cameras, SG2-AR0231C-0202-GMSL-Hxxx, CMOS, AR0231, Maxim, GMSL, Image, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/sg2-ar0231c-gmsl-camera.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/123455777.jpg",
                      "https://assets.core-bolt.com/website-assets/SG2-AR0231C-0202-GMSL.1.png",
                      "https://assets.core-bolt.com/website-assets/SG2-AR0231C-0202-GMSL.2.png",
                    ],
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    fileUrl: null,
                    features: [
                      "Resolution : 1920(H) × 1080(V)",
                      "Frame Rate : 1920 × 1080 @ 22 fps",
                      "Sensor: ONSEMI 2.3MP AR0231 RGGB",
                      "ISP: AP0202",
                      "Output data: YUV422, 8-bit",
                      "Serializer: MAXIM MAX96705",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 × 30 × 22.5 mm",
                      "Field of View (HFOV): 30°/ 60°/ 100°/ 121°/ 196°",
                    ],
                  },
                  {
                    id: "[1MP]-SG1S-OX01F10C-G1G",
                    name: "[1MP]-SG1S-OX01F10C-G1G",
                    description:
                      "SG1S-OX01F10C-G1G-Hxxx camera module is equipped with OMNIVISION CMOS image sensor OX01F10 and Maxim GMSL. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure. ",
                      metaTitle: "[1MP]-SG1S-OX01F10C-G1G – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG1S-OX01F10C-G1G-Hxxx camera module is equipped with OMNIVISION CMOS image sensor OX01F10 and Maxim GMSL. It has an automotive-grade sensor with a…",
                      metaKeywords:
                        "1MP SG1S OX01F10C G1G, Sensing Cameras, Vision Systems & Cameras, SG1S-OX01F10C-G1G-Hxxx, OMNIVISION, CMOS, OX01F10, Maxim, GMSL, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/ox01f10c-g1g-camera.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/G1G.jpg",
                      "https://assets.core-bolt.com/website-assets/G1G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/G1G.2.jpg",
                    ],

                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1280(H) × 960(V) (Max)",
                      "Frame Rate: 1280*960@30 fps",
                      "Sensor:  OMNIVISION 1.3MP OX01F10 RGGB",
                      "ISP: Built-in ISP",
                      "Output data: YUV422, 8-bit",
                      "Serializer: MAXIM MAX96701",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 25 × 25 × 13.9 mm",
                      "Field of View (HFOV): 196°",
                    ],
                  },
                  {
                    id: "[1MP]-SG1-OX01F10C-GMSL",
                    name: "[1MP]-SG1-OX01F10C-GMSL",
                    description:
                      "SG1-OX01F10C-GMSL-Hxxx camera module is equipped with OMNIVISION CMOS image sensor OX01F10 and Maxim GMSL. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with aN M12 lens.",
                      metaTitle: "[1MP]-SG1-OX01F10C-GMSL – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG1-OX01F10C-GMSL-Hxxx camera module is equipped with OMNIVISION CMOS image sensor OX01F10 and Maxim GMSL. It has an automotive-grade sensor with a…",
                      metaKeywords:
                        "1MP SG1 OX01F10C GMSL, Sensing Cameras, Vision Systems & Cameras, SG1-OX01F10C-GMSL-Hxxx, OMNIVISION, CMOS, OX01F10, Maxim, GMSL, CORE BOLT",
                    fileUrl: "",
                    image:
                      "https://assets.core-bolt.com/website-assets/sg1-ox01f10c-gmsl-camera.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/123455777.jpg",
                      "https://assets.core-bolt.com/website-assets/SG2-AR0231C-0202-GMSL.1.png",
                      "https://assets.core-bolt.com/website-assets/SG2-AR0231C-0202-GMSL.2.png",
                    ],
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1280(H) × 720(V)",
                      "Frame Rate: 1280 × 720 @ 30 fps",
                      "Sensor: OMNIVISION 1.3MP OX01F10 RGGB",
                      "ISP: Built-in ISP",
                      "Output data: YUV422, 8-bit",
                      "Serializer:  MAXIM MAX96705",
                      "Sensor Type: Rolling Shutter",
                      "Operating Temperature: -40°C～+85°C",
                      "Dimensions: 30 × 30 × 22.5 mm",
                      "Field of View (HFOV): 30°/ 64°/ 100°/ 125°",
                    ],
                  },
                ],
              },
              {
                id: "gmsl2",
                name: "GMSL2",
                description:
                  "GMSL2 is the second-generation interface standard that enhances bandwidth, reliability, and electromagnetic interference (EMI) performance while maintaining backward compatibility with first-generation GMSL devices. Supporting higher-resolution cameras, improved synchronization, and Power over Coax (PoC), GMSL2 is widely used in ADAS, robotics, industrial automation, and multi-camera AI vision systems.",
                products: [
                  {
                    id: "[8MP] SG8-ISX028C-G2G",
                    name: "[8MP]-SG8-ISX028C-G2G",
                    description:
                      "SG8-ISX028C-G2G-Hxxx camera module is equipped with the SONY lSX028 automotive-grade CMOS image sensor and Maxim GSL2 serializer. It features a well tuned Image Signal Processor (lSP) that delivers exceptional image quality.Housed in an lP67-rated enclosure, the camera is equipped with an AA lens.",
                      metaTitle: "[8MP]-SG8-ISX028C-G2G – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8-ISX028C-G2G-Hxxx camera module is equipped with the SONY lSX028 automotive-grade CMOS image sensor and Maxim GSL2 serializer. It features a well tuned…",
                      metaKeywords:
                        "8MP SG8 ISX028C G2G, Sensing Cameras, Vision Systems & Cameras, SG8-ISX028C-G2G-Hxxx, SONY, lSX028, CMOS, Maxim, GSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-isx028c-g2g.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],

                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    fileUrl: null,
                    features: [
                      "Resolution : 3840(H) × 2160(V)",
                      "Frame Rate :  3840 × 2160 @ 30 fps",
                      "Sensor : SONY 8.39MP ISX028 RGGB",
                      "Output data :  YUV422",
                      "ISP :Built-in ISP",
                      "Serializer :  MAXIM MAX96717",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions : 30 × 30 × 22.57 mm",
                      "Field of View (HFOV) : 30°/ 60°/ 120°",
                    ],
                  },

                  {
                    id: "[8mp]-SG8-OX08DC-5300-G2G",
                    name: "[8MP]-SG8-OX08DC-5300-G2G",
                    description:
                      "SG8-OX08DC-5300-G2A-Hxxx camera module is equipped with OmniVision CMOS image sensor OX08D10 and Maxim GMSL2. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an AA lens  .",
                      metaTitle: "[8MP]-SG8-OX08DC-5300-G2G – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8-OX08DC-5300-G2A-Hxxx camera module is equipped with OmniVision CMOS image sensor OX08D10 and Maxim GMSL2. It has an automotive-grade sensor with a…",
                      metaKeywords:
                        "8MP SG8 OX08DC 5300 G2G, Sensing Cameras, Vision Systems & Cameras, SG8-OX08DC-5300-G2A-Hxxx, OmniVision, CMOS, OX08D10, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-ox08dc-5300-g2g.png",
                    images: [],
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    fileUrl: null,
                    features: [
                      "Resolution: 3840(H) × 2160(V)",
                      "Frame Rate : Upto 45 fps",
                      "Sensor:  OmniVision 8.3MP OX08D10 RGGB",
                      "ISP : GW5300",
                      "Output data :YUV422, 8-bit",
                      "Serializer:MAXIM MAX96717G",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 × 30 × 22.5 mm",
                      "FOV : HFOV  30°/ 60°/ 120°",
                    ],
                  },

                  {
                    id: "[8MP]-SG8-OX08DC-G2G",
                    name: "[8MP]-SG8-OX08DC-G2G",
                    description:
                      "SG8-OX08DC-G2G-Hxxx camera module is equipped with OmniVision CMOS image sensor OX08D10 and Maxim GMSL2(MAX96717G).It has an automotive-grade sensor , which comes with an IP67-rated enclosure is equipped with AA lens .",
                      metaTitle: "[8MP]-SG8-OX08DC-G2G – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8-OX08DC-G2G-Hxxx camera module is equipped with OmniVision CMOS image sensor OX08D10 and Maxim GMSL2(MAX96717G).It has an automotive-grade sensor …",
                      metaKeywords:
                        "8MP SG8 OX08DC G2G, Sensing Cameras, Vision Systems & Cameras, SG8-OX08DC-G2G-Hxxx, OmniVision, CMOS, OX08D10, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-ox08dc-g2g.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 3840(H) × 2160(V)",
                      "Frame Rate :Upto 45 fps",
                      "Sensor:  OmniVision 8.3MP OX08D10 RGGB",
                      "Output data: RAW 12",
                      "Serializer:  MAXIM MAX96717G",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 × 30 × 22.5 mm",
                      "Field of View (HFOV):30°/ 60°/ 120°",
                    ],
                  },

                  {
                    id: "[8MP]-SG8-IMX728C-G2G",
                    name: "[8MP]-SG8-IMX728C-G2G",
                    description:
                      "SG8-IMX728C-G2G-Hxxx camera module is equipped with SONY CMOS image sensor IMX728 and Maxim GMSL2（Max96717）. It has an automotive-grade sensor without ISP, which comes with an IP67-rated enclosure is equipped with an AA lens  ",
                      metaTitle: "[8MP]-SG8-IMX728C-G2G – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8-IMX728C-G2G-Hxxx camera module is equipped with SONY CMOS image sensor IMX728 and Maxim GMSL2（Max96717）. It has an automotive-grade sensor without…",
                      metaKeywords:
                        "8MP SG8 IMX728C G2G, Sensing Cameras, Vision Systems & Cameras, SG8-IMX728C-G2G-Hxxx, SONY, CMOS, IMX728, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-imx728c-g2g.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 3840(H) × 2160(V)",
                      "Frame Rate : Upto 30 fps",
                      "Sensor: SONY 8.39MP IMX728 RGGB",
                      "Output data : MIPI, RAW12",
                      "Serializer:  MAXIM MAX96717",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 × 30 × 22.5 mm",
                      "Field of View (HFOV): 30°/ 60°/ 120°",
                    ],
                  },
                  {
                    id: "[8MP]-SG8S-AR0820C-5300-G2A",
                    name: "[8MP]-SG8S-AR0820C-5300-G2A",
                    description:
                      "SG8S-AR0820C-5300-G2A-Hxxx camera module is equipped with ONSEMI Semiconductor CMOS image sensor AR0820 and Maxim GMSL2.It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality,which comes with an IP67-rated enclosure is equipped with an AA lens  ",
                      metaTitle: "[8MP]-SG8S-AR0820C-5300-G2A – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8S-AR0820C-5300-G2A-Hxxx camera module is equipped with ONSEMI Semiconductor CMOS image sensor AR0820 and Maxim GMSL2.It has an automotive-grade sensor…",
                      metaKeywords:
                        "8MP SG8S AR0820C 5300 G2A, Sensing Cameras, Vision Systems & Cameras, SG8S-AR0820C-5300-G2A-Hxxx, ONSEMI, Semiconductor, CMOS, AR0820, Maxim, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-imx728c-g2g.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution:3840(H) × 2160(V)",
                      "Frame Rate :3840 x 2160 @ 30 fps",
                      "Sensor:  Onsemi 8.3MP AR0820 RGGB",
                      "Output data : YUV422, 8-bit",
                      "ISP : GW5300",
                      "Serializer:  MAXIM MAX9295A",
                      "Sensor Type : Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 × 30 × 22.57 mm",
                      "Field of View (HFOV): 30°/ 60°/ 120°",
                    ],
                  },

                  {
                    id: "[5MP]-SG5-IMX490C-5300-GMSL2",
                    name: "[5MP]-SG5-IMX490C-5300-GMSL2",
                    description:
                      "SG5-IMX490C-5300-GMSL2-Hxxx camera module is equipped with SONY Semiconductor CMOS image sensor IMX490 and Maxim GMSL2 . It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an M12/M15/M16/AA lens.",
                      metaTitle: "[5MP]-SG5-IMX490C-5300-GMSL2 – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG5-IMX490C-5300-GMSL2-Hxxx camera module is equipped with SONY Semiconductor CMOS image sensor IMX490 and Maxim GMSL2 . It has an automotive-grade sensor…",
                      metaKeywords:
                        "5MP SG5 IMX490C 5300 GMSL2, Sensing Cameras, Vision Systems & Cameras, SG5-IMX490C-5300-GMSL2-Hxxx, SONY, Semiconductor, CMOS, IMX490, Maxim, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/5mp-sg5-imx490c-5300-gmsl2.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/sensing-[8mp]-SG8-OX08BC-5300-GMSL2.1.jpg",
                      "https://assets.core-bolt.com/website-assets/sensing-[8mp]-SG8-OX08BC-5300-GMSL2.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution:2880(H) x 1860(V)",
                      "Frame Rate :2880 × 1860 @ 30 fps",
                      "Sensor:SONY 5.44MP IMX490 RGGB",
                      "Output data : YUV422, 8-bit",
                      "ISP : GW5300",
                      "Serializer:  MAXIM MAX9295A",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 40 × 40 × 23 mm",
                      "Field of View (HFOV): 32°/ 64°/ 100°/ 130°",
                    ],
                  },

                  {
                    id: "[3MP]-Monocular-Camera-SHW3H",
                    name: "[3MP]-Monocular-Camera-SHW3H",
                    description:
                      "SHW3H Monocular Camera Module is specifically designed for embodied intelligence applications. It utilizes a 3MP high dynamic range (HDR) high-frame-rate sensor and can be deployed on locations such as the head or torso of humanoid robots. Optimized for robotic perception and recognition scenarios, it delivers high-quality images through professional calibration. The module features an all-glass AA wide-angle lens and achieves an overall IP67 protection rating.",
                      metaTitle: "[3MP]-Monocular-Camera-SHW3H – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SHW3H Monocular Camera Module is specifically designed for embodied intelligence applications. It utilizes a 3MP high dynamic range (HDR) high-frame-rate…",
                      metaKeywords:
                        "3MP Monocular Camera SHW3H, Sensing Cameras, Vision Systems & Cameras, SHW3H, Monocular, Camera, Module, 3MP, HDR, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/3mp-monocular-camera-shw3h.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/Sensing-[3MP]-Monocular-Camera-SHW3H.png",
                      "https://assets.core-bolt.com/website-assets/Sensing-[3MP]-Monocular-Camera-SHW3H.2.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1920(H) × 1536(V)",
                      "Frame Rate : 1920 × 1536 @ 60 fps",
                      "Output data :YUV422,8-bit",
                      "ISP: Built-in ISP",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 25  × 25 × 37.55 mm",
                      "Field of View (HFOV): 118°",
                    ],
                  },
                  {
                    id: "[3MP] Monocular Camera SHW3G",
                    name: "[3MP]-Monocular-Camera-SHW3G",
                    description:
                      "SHW3G Monocular Camera Module is specifically designed for embodied intelligence applications. It employs a 3MP Global Shutter sensor and can be installed on locations such as the head or torso of humanoid robots. Tailored for robotic perception and recognition scenarios, it delivers high-quality imaging optimized through professional calibration. The module features a compact 25x25mm size and is equipped with a wide-angle lens.",
                      metaTitle: "[3MP]-Monocular-Camera-SHW3G – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SHW3G Monocular Camera Module is specifically designed for embodied intelligence applications. It employs a 3MP Global Shutter sensor and can be installed…",
                      metaKeywords:
                        "3MP Monocular Camera SHW3G, Sensing Cameras, Vision Systems & Cameras, SHW3G, Monocular, Camera, Module, 3MP, Global, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/3mp-monocular-camera-shw3g.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/[3MP]-SG3S11AFxK.1.jpg",
                      "https://assets.core-bolt.com/website-assets/[3MP]-SG3S11AFxK.3.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 2064(H) × 1552(V)",
                      "Frame Rate :2064 × 1552 @ 30 fps (max 125  fps)",
                      "Sensor:   RGGB",
                      "Output data :RAW 12-bit/ 10-bit/ 8-bit",
                      "Sensor Type : Global Shutter",
                      "Operating Temperature :  -20°C～+70°C",
                      "Dimensions: 25 mm × 25 mm × 32.12 mm",
                      "Field of View (HFOV): 122°",
                    ],
                  },
                  {
                    id: "[3MP] Monocular Camera SHF3L",
                    name: "[3MP]-Monocular-Camera-SHF3L",
                    description:
                      "SHF3L Monocular Camera Module is specifically designed and developed for embodied intelligence applications. It utilizes a 3MP high dynamic range (HDR) sensor and can be deployed on humanoid robots at positions such as the head or torso. Tailored for scenarios like robotic sensing and recognition, it delivers high-quality image output optimized through professional image tuning. Equipped with an AA fisheye lens, the entire module achieves an IP67 protection rating.",
                      metaTitle: "[3MP]-Monocular-Camera-SHF3L – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SHF3L Monocular Camera Module is specifically designed and developed for embodied intelligence applications. It utilizes a 3MP high dynamic range (HDR)…",
                      metaKeywords:
                        "3MP Monocular Camera SHF3L, Sensing Cameras, Vision Systems & Cameras, SHF3L, Monocular, Camera, Module, 3MP, HDR, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/3mp-monocular-camera-shf3l.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/[3MP]-SG3S11AFxK.1.jpg",
                      "https://assets.core-bolt.com/website-assets/[3MP]-SG3S11AFxK.3.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution:1920(H) × 1536(V)",
                      "Frame Rate : 1920 × 1536 @ 30 fps",
                      "Sensor:  RGGB",
                      "ISP:Built-in ISP",
                      "Output data :YUV422,8-bit",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 25 mm × 25 mm × 32.12 mm",
                      "Field of View (HFOV): 196°",
                    ],
                  },

                  {
                    id: "[3MP] SG3S-ISX031C-GMSL2F",
                    name: "[3MP]-SG3S-ISX031C-GMSL2F",
                    description:
                      "SG3S-ISX031C-GMSL2F-Hxxx is equipped with SONY CMOS image sensor ISX031 and Maxim GMSL2 serializer MAX96717F. It has an automotive-grade sensor with a well tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an AA lens .",
                      metaTitle: "[3MP]-SG3S-ISX031C-GMSL2F – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG3S-ISX031C-GMSL2F-Hxxx is equipped with SONY CMOS image sensor ISX031 and Maxim GMSL2 serializer MAX96717F. It has an automotive-grade sensor with a…",
                      metaKeywords:
                        "3MP SG3S ISX031C GMSL2F, Sensing Cameras, Vision Systems & Cameras, SG3S-ISX031C-GMSL2F-Hxxx, SONY, CMOS, ISX031, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/3mp-sg3s-isx031c-gmsl2f.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG3S-ISX031C-F3A.1.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1920(H) × 1536(V)",
                      "Frame Rate :1920 × 1536 @ 30 fps",
                      "Sensor:  SONY 2.95MP ISX031 RGGB",
                      "Output data :YUV422, 8-bit",
                      "ISP :Built-in ISP",
                      "Serializer:  MAXIM MAX96717F",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 25 mm × 25 mm × 18.6 mm",
                      "Field of View (HFOV): 30°/ 60°/ 100°/ 118°/ 196°",
                    ],
                  },

                  {
                    id: "[3MP] SG3S-IMX623C-G2F",
                    name: "[3MP]-SG3S-IMX623C-G2F",
                    description:
                      "SG3S-IMX623C-G2F-Hxxx camera module is equipped with SONY CMOS image sensor IMX623 and Maxim GMSL2. It has an automotive-grade sensor , which comes with an IP67-rated enclosure is equipped with AA lens.",
                      metaTitle: "[3MP]-SG3S-IMX623C-G2F – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG3S-IMX623C-G2F-Hxxx camera module is equipped with SONY CMOS image sensor IMX623 and Maxim GMSL2. It has an automotive-grade sensor , which comes with…",
                      metaKeywords:
                        "3MP SG3S IMX623C G2F, Sensing Cameras, Vision Systems & Cameras, SG3S-IMX623C-G2F-Hxxx, SONY, CMOS, IMX623, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/3mp-sg3s-imx623c-g2f.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG3S-ISX031C-F3A.1.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution:1920(H) × 1536(V)",
                      "Frame Rate :Max 60 fps",
                      "Sensor:SONY 2.95MP IMX623 RGGB",
                      "Output data :MIPI/ RAW 12",
                      "Serializer:  MAXIM MAX96717F",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 25 mm × 25 mm × 18.6 mm",
                      "Field of View (HFOV): 59.7°/ 99°/ 196°",
                    ],
                  },
                  {
                    id: "[2MP] SG2-IMX390C-5200-G2A",
                    name: "[2MP]-SG2-IMX390C-5200-G2A",
                    description:
                      "SG2-IMX390C-5200-G2A-Hxxx camera is equipped with SONY CMOS image sensor IMX390 and Maxim GMSL2. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an AA lens.  ",
                      metaTitle: "[2MP]-SG2-IMX390C-5200-G2A – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG2-IMX390C-5200-G2A-Hxxx camera is equipped with SONY CMOS image sensor IMX390 and Maxim GMSL2. It has an automotive-grade sensor with a well-tuned Image…",
                      metaKeywords:
                        "2MP SG2 IMX390C 5200 G2A, Sensing Cameras, Vision Systems & Cameras, SG2-IMX390C-5200-G2A-Hxxx, SONY, CMOS, IMX390, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/2mp-sg2-imx390c-5200-g2a.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1920(H) × 1080(V)",
                      "Frame Rate: 1920 × 1080 @ 30 fps",
                      "Sensor:  SONY 2.12MP IMX390 RGGB",
                      "Output data :YUV422, 8-bit",
                      "Serializer:  MAXIM MAX9295A",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 mm × 30 mm × 22.5 mm",
                      "Field of View (HFOV): 30°/ 100°/ 118.4°/ 196°",
                    ],
                  },
                  {
                    id: "[2MP]SG2S-OX03CC-G2F",
                    name: "[2MP]-SG2S-OX03CC-G2F",
                    description:
                      "SG2S-OX03CC-G2F-Hxxx camera module is equipped with OMNIVISION CMOS image sensor OX03C10 and Maxim GMSL2 serializer MAX96717F.It has an automotive-grade sensor,which comes with an IP67-rated enclosure is equipped with AA lens .",
                      metaTitle: "[2MP]-SG2S-OX03CC-G2F – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG2S-OX03CC-G2F-Hxxx camera module is equipped with OMNIVISION CMOS image sensor OX03C10 and Maxim GMSL2 serializer MAX96717F.It has an automotive-grade…",
                      metaKeywords:
                        "2MP SG2S OX03CC G2F, Sensing Cameras, Vision Systems & Cameras, SG2S-OX03CC-G2F-Hxxx, OMNIVISION, CMOS, OX03C10, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/2mp-sg2-imx390c-5200-g2a.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG3S-ISX031C-F3A.1.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1920(H) × 1080(V)",
                      "Frame Rate: 1920 × 1080 @ 60 fps",
                      "Sensor: OMNIVISION OX03C10 RGGB",
                      "Output data : MIPI / RAW 12",
                      "Serializer:  MAXIM MAX96717F",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 25 mm × 25 mm × 18.6 mm",
                      "Field of View (HFOV): 59.7°/ 99°",
                    ],
                  },
                  {
                    id: "[2MP] SG2-AR0233C-5200-G2A",
                    name: "[2MP]-SG2-AR0233C-5200-G2A",
                    description:
                      "SG2-AR0233C-5200-G2A-Hxxx camera module is equipped with ONSEMI CMOS image sensor AR0233 and Maxim GMSL2.It has an automotive grade sensor with a welltuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an M12 lens .",
                      metaTitle: "[2MP]-SG2-AR0233C-5200-G2A – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG2-AR0233C-5200-G2A-Hxxx camera module is equipped with ONSEMI CMOS image sensor AR0233 and Maxim GMSL2.It has an automotive grade sensor with a…",
                      metaKeywords:
                        "2MP SG2 AR0233C 5200 G2A, Sensing Cameras, Vision Systems & Cameras, SG2-AR0233C-5200-G2A-Hxxx, ONSEMI, CMOS, AR0233, Maxim, GMSL2, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/2mp-sg2-ar0233c-5200-g2a.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1920(H) × 1080(V)",
                      "Frame Rate: 1920 × 1080 @ 30 fps",
                      "Sensor:  ONSEMI 2.6MP AR0233 RGGB",
                      "ISP :GW5200",
                      "Output data :YUV422, 8-bit",
                      "Serializer:  MAXIM MAX9295A",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 mm × 30 mm × 22.5 mm",
                      "Field of View (HFOV): 60°/ 100°/ 118.4°/ 196°",
                    ],
                  },
                ],
              },
              {
                id: "gmsl3",
                name: "GMSL3",
                description:
                  "GMSL3 is the latest high-bandwidth generation of Gigabit Multimedia Serial Link technology, supporting data rates up to 12 Gbps for ultra-high-resolution imaging and real-time sensor fusion applications. With support for uncompressed 4K video streaming, advanced multi-camera synchronization, and high-speed MIPI CSI-2 integration, GMSL3 is optimized for next-generation autonomous systems, intelligent transportation, and AI-powered edge computing platforms.",
                products: [
                  {
                    id: "[8MP] SG8S-AR0820C-5300-G3A",
                    name: "[8MP]-SG8-AR0820C-5300-G3A",
                    description:
                      "SG8S-AR0820C-5300-G3A-Hxxx camera module is equipped with On-semi Semiconductor CMOS image sensor AR0820 and Maxim GMSL3. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with AA lens .",
                      metaTitle: "[8MP]-SG8-AR0820C-5300-G3A – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8S-AR0820C-5300-G3A-Hxxx camera module is equipped with On-semi Semiconductor CMOS image sensor AR0820 and Maxim GMSL3. It has an automotive-grade…",
                      metaKeywords:
                        "8MP SG8 AR0820C 5300 G3A, Sensing Cameras, Vision Systems & Cameras, SG8S-AR0820C-5300-G3A-Hxxx, Semiconductor, CMOS, AR0820, Maxim, GMSL3, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-ar0820c-5300-g3a.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution:  3840(H) × 2160(V)",
                      "Frame Rate: 3840 × 2160 @ 30 fps",
                      "Sensor: ONSEMI 8.3MP AR0820 RGGB",
                      "Output data :YUV422, 8-bit",
                      "ISP :GW5300",
                      "Serializer:  MAXIM MAX96793",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 mm × 30 mm × 22.57 mm",
                      "Field of View (HFOV): 30°/ 64°/ 120°",
                    ],
                  },
                  {
                    id: "[17MP] SG17-IMX735C-G3A",
                    name: "[17MP]-SG17-IMX735C-G3A",
                    description:
                      "SG17-IMX735C-G3A-Hxxx camera module adopts SONY CMOS image sensor (IMX735) and Maxim GMSL3 serializer (MAX96793) to develop and design.It conforms to the performance of the vehicle specification and has a high-quality image effect after professional image debugging, and equipped with M21/AA on-board specifications lens, the module as a whole can reach IP64 protection level.",
                      metaTitle: "[17MP]-SG17-IMX735C-G3A – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG17-IMX735C-G3A-Hxxx camera module adopts SONY CMOS image sensor (IMX735) and Maxim GMSL3 serializer (MAX96793) to develop and design.It conforms to the…",
                      metaKeywords:
                        "17MP SG17 IMX735C G3A, Sensing Cameras, Vision Systems & Cameras, SG17-IMX735C-G3A-Hxxx, SONY, CMOS, IMX735, Maxim, GMSL3, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/17mp-sg17-imx735c-g3a.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8S-AR0820C-5300-G3A.1.png",
                      
                    ],

                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution:3000(H) × 5760(V)/ 3000(H) × 4000(V)/ 2160(H) × 3840(V)",
                      "Frame Rate :Max 45 fps",
                      "Sensor:SONY 17.42MP IMX735 RGGB",
                      "Output data :MIPI / RAW 12",
                      "Serializer:   MAXIM MAX96793",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 40 mm × 40 mm × 37.3 mm",
                      "Field of View (HFOV): 26°/ 96°/ 185°",
                    ],
                  },
                  {
                    id: "[8MP] SG8-IMX728C-G3A",
                    name: "[8MP]-SG8-IMX728C-G3A",
                    description:
                      "SG8-IMX728C-G3A-Hxxx camera module is equipped with SONY CMOS image sensor IMX728 and Maxim GMSL3. It has an automotive-grade sensor without ISP, which comes with an IP67-rated enclosure is equipped with an M12/M16 lens .",
                      metaTitle: "[8MP]-SG8-IMX728C-G3A – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "SG8-IMX728C-G3A-Hxxx camera module is equipped with SONY CMOS image sensor IMX728 and Maxim GMSL3. It has an automotive-grade sensor without ISP, which…",
                      metaKeywords:
                        "8MP SG8 IMX728C G3A, Sensing Cameras, Vision Systems & Cameras, SG8-IMX728C-G3A-Hxxx, SONY, CMOS, IMX728, Maxim, GMSL3, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8mp-sg8-imx728c-g3a.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                      "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 3840(H) × 2160(V)",
                      "Frame Rate : Max 40 fps",
                      "Sensor:  SONY 8.39MP IMX728 RGGB",
                      "Output data :RAW 12",
                      "Serializer:  MAXIM MAX96793",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : -40°C～+85°C",
                      "Dimensions: 30 mm × 30 mm × 22.5 mm",
                      "Field of View (HFOV): 30°/ 120°",
                    ],
                  },
                ],
              },
            ],
            products: [],
          },

          {
            id: "ti-fpdlink-iii-cameras",
            name: "TI FPD-Link III Cameras",
            description:
              "FPD-Link (Flat Panel Display Link) is a high-speed SerDes interface technology designed for reliable transmission of uncompressed video, control, and power signals over a single low-latency cable. Widely used in automotive ADAS, infotainment, industrial vision, and embedded imaging systems, FPD-Link enables high-resolution camera and display connectivity with robust EMI performance, long-distance communication, and simplified system integration. Supporting Full HD, 2K, and 3K video transmission, FPD-Link provides stable high-bandwidth performance for next-generation intelligent vision applications.",
            products: [
              {
                id: "[3MP]-SG3S-ISX031C-F3A",
                name: "[3MP]-SG3S-ISX031C-F3A",
                description:
                  "SG3S-ISX031C-F3A-Hxxx camera module equipped with SONY CMOS image sensor ISX031 and TI FPDLink III. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an AA lens .",
                  metaTitle: "[3MP]-SG3S-ISX031C-F3A – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SG3S-ISX031C-F3A-Hxxx camera module equipped with SONY CMOS image sensor ISX031 and TI FPDLink III. It has an automotive-grade sensor with a well-tuned…",
                  metaKeywords:
                    "3MP SG3S ISX031C F3A, Sensing Cameras, Vision Systems & Cameras, SG3S-ISX031C-F3A-Hxxx, SONY, CMOS, ISX031, FPDLink, III, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/3mp-sg3s-isx031c-f3a.png",

                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution:  1920(H) × 1536(V)",
                  "Frame Rate: 1920 × 1536 @ 30 fps",
                  "Sensor: SONY 2.95MP ISX031 RGGB",
                  "ISP: Built-in ISP",
                  "Output data :YUV422",
                  "Serializer: FPDLink III DS90UB953",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -40°C～+85°C",
                  "Dimensions: 25 mm × 25 mm × 18.6 mm",
                  "Field of View (HFOV): 30°/ 60°/ 100°/ 118°/ 196°",
                ],
              },

              {
                id: "[2MP] SG2-AR0233C-5200-F3A",
                name: "[2MP]-SG2-AR0233C-5200-F3A",
                description:
                  "SG2-AR0233C-5200-F3A-Hxxx camera module is equipped with On-semi CMOS image sensor AR0233 and TI FPDLink III. It has an automotive-grade sensor with a welltuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an M12 lens .",
                  metaTitle: "[2MP]-SG2-AR0233C-5200-F3A – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SG2-AR0233C-5200-F3A-Hxxx camera module is equipped with On-semi CMOS image sensor AR0233 and TI FPDLink III. It has an automotive-grade sensor with a…",
                  metaKeywords:
                    "2MP SG2 AR0233C 5200 F3A, Sensing Cameras, Vision Systems & Cameras, SG2-AR0233C-5200-F3A-Hxxx, CMOS, AR0233, FPDLink, III, Image, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/2mp-sg2-ar0233c-5200-f3a.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                  "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 1920 (H) × 1080 (V)",
                  "Frame Rate: 1920 × 1080 @ 30  fps",
                  "Sensor:  ONSEMI 2.6MP AR0233 RGGB",
                  "Output data :YUV422, 8-bit",
                  "ISP:GW5200",
                  "Serializer: FPDLink III DS90UB953",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -40°C～+85°C",
                  "Dimensions: 30 mm × 30 mm × 22.5 mm",
                  "Field of View (HFOV): 60°/ 100°/ 118°/ 196°",
                ],
              },
            ],
          },
          {
            id: "mipi-csi-2-camera",
            name: "MIPI CSI-2 Camera",
            description:
              "MIPI CSI-2 cameras are designed for advanced applications including machine vision, intelligent transportation, aerospace, robotics, and industrial inspection. Engineered for seamless integration, our cameras support leading embedded AI and computing platforms such as NVIDIA, Qualcomm, and other mainstream SoCs. We also provide professional ISP tuning and image optimization services to deliver superior image quality tailored to specific application requirements.",
            products: [
              {
                id: "[3MP]-SG3-IMX900C-MIPI",
                name: "[3MP]-SG3-IMX900C-MIPI",
                description:
                  "SG3-IMX900C-MIPI-Hxxx camera module is equipped with SONY CMOS image sensor IMX900. It can be adapted to different SOC platforms and is suitable for machine vision, aerospace and industrial inspection applications.",
                  metaTitle: "[3MP]-SG3-IMX900C-MIPI – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SG3-IMX900C-MIPI-Hxxx camera module is equipped with SONY CMOS image sensor IMX900. It can be adapted to different SOC platforms and is suitable for…",
                  metaKeywords:
                    "3MP SG3 IMX900C MIPI, Sensing Cameras, Vision Systems & Cameras, SG3-IMX900C-MIPI-Hxxx, SONY, CMOS, IMX900, SOC, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/3mp-sg3-imx900c-mipi.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/SG2-IMX390C-MIPI.1.jpg",
                  "https://assets.core-bolt.com/website-assets/SG2-IMX390C-MIPI.jpg",
                  "https://assets.core-bolt.com/website-assets/SG2-IMX390C-MIPI.2.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 2064(H) × 1552(V)",
                  "Frame Rate :30 fps",
                  "Sensor:  SONY 3.2MP IMX900 RGGB",
                  "Output data :MIPI/RAW12",
                  "Sensor Type :Global shutter",
                  "Operating Temperature :-30°C～+75°C",
                  "Dimensions: 30 mm × 35 mm × 19.4 mm",
                  "Field of View (HFOV): 69.8°/ 121.4°°",
                ],
              },

              {
                id: "[3MP]-SG3-ISX031C-MIPI",
                name: "[3MP]-SG3-ISX031C-MIPI",
                description:
                  "SG3-ISX031C-MIPI-Hxxx camera module is equipped with SONY CMOS image sensor ISX031. It has an automotive-grade sensor with a well tuned Image Signal Processor (ISP) that produces exceptional image quality, can be adapted to difference SOC platforms.",
                  metaTitle: "[3MP]-SG3-ISX031C-MIPI – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SG3-ISX031C-MIPI-Hxxx camera module is equipped with SONY CMOS image sensor ISX031. It has an automotive-grade sensor with a well tuned Image Signal…",
                  metaKeywords:
                    "3MP SG3 ISX031C MIPI, Sensing Cameras, Vision Systems & Cameras, SG3-ISX031C-MIPI-Hxxx, SONY, CMOS, ISX031, Image, Signal, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/3mp-sg3-isx031c-mipi.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/SG2-IMX390C-MIPI.1.jpg",
                  "https://assets.core-bolt.com/website-assets/SG2-IMX390C-MIPI.jpg",
                  "https://assets.core-bolt.com/website-assets/SG2-IMX390C-MIPI.2.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 1920(H) × 1536(V)",
                  "Frame Rate :Max 60 fps",
                  "Sensor:  SONY 2.95MP ISX031 RGGB",
                  "ISP:Built-in ISP",
                  "Output data : MIPI/YUV422-8bit",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -20°C～+75°C",
                  "Dimensions: 20 mm × 35 mm × 16.2 mm",
                  "Field of View (HFOV): 30°/ 60.35°/ 100.4°/ 196°",
                ],
              },
            ],
          },
          {
            id: "starlight-camera",
            name: "Starlight Camera	",
            description:
              "Starlight cameras are engineered for exceptional low-light imaging performance, delivering clear and detailed visuals even in near-dark environments without auxiliary lighting. Powered by advanced low-light CMOS sensors and high-performance ISP technology, these cameras provide superior day-and-night image quality for surveillance, intelligent transportation, robotics, and AI-driven vision applications operating under challenging lighting conditions.",
            products: [
              {
                id: "sensing[2MP] SN2M4EFGD Starlight Camera",
                name: "Sensing [2MP]-SN2M4EFGD-Starlight-Camera",
                description:
                  "SN2M4EFGD is equipped with a 2M dim light dedicated image sensor, a 2M high-performance lSP image processing chip, and a Maxim GMSL2 serializer. lt is designed and positioned as a dim light camera. After professional image debugging, it has high-quality image effects both in day and night, which comes with an IP67-rated enclosure-is equipped with an M16 lens .",
                  metaTitle: "Sensing [2MP]-SN2M4EFGD-Starlight-Camera – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SN2M4EFGD is equipped with a 2M dim light dedicated image sensor, a 2M high-performance lSP image processing chip, and a Maxim GMSL2 serializer. lt is…",
                  metaKeywords:
                    "Sensing 2MP SN2M4EFGD Starlight Camera, Sensing Cameras, Vision Systems & Cameras, SN2M4EFGD, Maxim, GMSL2, After, IP67-rated, M16, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/2mp-sn2m4efgd-starlight-camera.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/SN2M4EFGD-Starlight-Camera.jpg",
                  "https://assets.core-bolt.com/website-assets/SN2M4EFGD-Starlight-Camera.1.jpg",
                  "https://assets.core-bolt.com/website-assets/SN2M4EFGD-Starlight-Camera.2.jpg",
                  "https://assets.core-bolt.com/website-assets/SN2M4EFGD-Starlight-Camera.3.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 1920(H) × 1080(V)",
                  "Frame Rate: 1920 × 1080 @ 30  fps",
                  "Sensor: 2MP RGGB",
                  "ISP : Built-in ISP",
                  "Output data : YUV422@8bit",
                  "Serializer:  MAXIM MAX96717F",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -40°C～+85°C",
                  "Dimensions: 30 mm × 30 mm × 22.5 mm",
                  "Field of View (HFOV): 70°",
                ],
              },
            ],
          },
          {
            id: "automatic-defogging-camera",
            name: "Automatic Defogging Camera	",
            description:
              "Automatic Defogging cameras are designed to deliver reliable vision performance in extreme weather conditions including rain, snow, fog, and ice. Featuring electronic lens heating, anti-glare technology, low-latency imaging, and synchronized multi-camera support, these automotive-grade cameras provide stable and clear image output for autonomous vehicles, robotics, and industrial systems. With professional ISP tuning, rugged vehicular optics, and an IP67-rated enclosure, they ensure dependable high-quality imaging in harsh real-world environments.",
            products: [
              {
                id: "Automatic-Defogging-Camera-[3mp]-RedFox-D3Gx",
                name: "Automatic-Defogging-Camera[3MP]-RedFox-D3Gx",
                description:
                  "The camera is equipped with the SONY automotive-grade CMOS image sensor and Maxim GMSL serializer.It features a well-tuned Image Signal Processor (ISP) that delivers exceptional image quality. Housed in an IP67-rated enclosure, the camera is equipped with an AA lens that is precisely focused and performance.",
                  metaTitle: "Automatic-Defogging-Camera[3MP]-RedFox-D3Gx – Sensing… | CORE BOLT",
                  metaDescription:
                    "The camera is equipped with the SONY automotive-grade CMOS image sensor and Maxim GMSL serializer.It features a well-tuned Image Signal Processor (ISP)…",
                  metaKeywords:
                    "Automatic Defogging Camera3MP RedFox D3Gx, Sensing Cameras, Vision Systems & Cameras, SONY, CMOS, Maxim, GMSL, Image, Signal, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/automatic-defogging-camera-3mp-redfox-d3gx.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/RedFox-D3Gx.jpg",
                  "https://assets.core-bolt.com/website-assets/RedFox-D3Gx.1.jpg",
                  "https://assets.core-bolt.com/website-assets/RedFox-D3Gx.2.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 1920(H) × 1536(V)",
                  "Frame Rate :MAX 60 fps",
                  "Sensor:  SONY 2.95MP RGGB",
                  "ISP: Built-in ISP",
                  "Output data :YUV422",
                  "Serializer:  MAXIM MAX96717",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -40°C～+85°C",
                  "Dimensions: 30 mm × 30 mm × 35 mm",
                  "Field of View (HFOV): 53.2°/ 118.4°/ 196°",
                ],
              },
            ],
          },

          {
            id: "low-latency-camera",
            name: "Low Latency Camera",
            description:
              "Low-Latency cameras are engineered for real-time vision applications requiring high frame rates, fast response, and exceptional image clarity. Built using advanced CMOS image sensors from industry-leading manufacturers such as Sony and Onsemi, combined with high-speed GMSL connectivity and professional ISP tuning, these cameras deliver reliable automotive-grade performance for robotics, industrial inspection, autonomous systems, and AI-driven embedded vision applications.",
            products: [
              {
                id: "[2MP] SH2-N1B60-G2A",
                name: "[2MP]-SH2-N1B60-G2A",
                description:
                  "SH2-N1B60-G2A-Hxxx camera module is equipped with On-semi CMOS image sensor AR0233 and Maxim GMSL2. It has an automotive-grade sensor with a welltuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an AA lens .",
                  metaTitle: "[2MP]-SH2-N1B60-G2A – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SH2-N1B60-G2A-Hxxx camera module is equipped with On-semi CMOS image sensor AR0233 and Maxim GMSL2. It has an automotive-grade sensor with a welltuned…",
                  metaKeywords:
                    "2MP SH2 N1B60 G2A, Sensing Cameras, Vision Systems & Cameras, SH2-N1B60-G2A-Hxxx, CMOS, AR0233, Maxim, GMSL2, Image, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/2mp-sh2-n1b60-g2a.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/Sensing-[8MP]-SG8-ISX028C-G2G.jpg",
                  "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.1.jpg",
                  "https://assets.core-bolt.com/website-assets/SG8-ISX028C-G2G.2.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 1920 (H)× 1080(V)",
                  "Frame Rate: 1920 × 1080 @ 60 fps",
                  "Sensor:  ONSEMI 2.6MP AR0233 RGGB",
                  "Output data :YUV422, 8-bit",
                  "ISP: GEO GW5200 ",
                  "Serializer:  MAXIM MAX9295A",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -40°C～+85°",
                  "Dimensions: 30 mm × 30 mm × 22.5 mm",
                  "Field of View (HFOV): 60°/ 100°/ 118.4°/ 196°",
                ],
              },
              {
                id: "[3MP] SH3-S11A60-G2A",
                name: "[3MP]-SH3-S11A60-G2A",
                description:
                  "SH3-S11A60-G2A-Hxxx-Hxxx is equipped with SONY CMOS image sensor ISX031 and Maxim GMSL2 serializer MAX9295A. It has an automotive-grade sensor with a well-tuned Image Signal Processor (ISP) that produces exceptional image quality, which comes with an IP67-rated enclosure is equipped with an AA lens .",
                  metaTitle: "[3MP]-SH3-S11A60-G2A – Sensing Cameras | CORE BOLT",
                  metaDescription:
                    "SH3-S11A60-G2A-Hxxx-Hxxx is equipped with SONY CMOS image sensor ISX031 and Maxim GMSL2 serializer MAX9295A. It has an automotive-grade sensor with a…",
                  metaKeywords:
                    "3MP SH3 S11A60 G2A, Sensing Cameras, Vision Systems & Cameras, SH3-S11A60-G2A-Hxxx-Hxxx, SONY, CMOS, ISX031, Maxim, GMSL2, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/3mp-sh3-s11a60-g2a.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/sensing-[8mp]-SG8-OX08BC-5300-GMSL2.jpg",
                  "https://assets.core-bolt.com/website-assets/sensing-[8mp]-SG8-OX08BC-5300-GMSL2.1.jpg",
                  "https://assets.core-bolt.com/website-assets/sensing-[8mp]-SG8-OX08BC-5300-GMSL2.2.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "sensing-cameras",
                price: null,
                features: [
                  "Resolution: 1920(H) × 1536(V)",
                  "Frame Rate: 1920 × 1536 @ 60 fps",
                  "Sensor: SONY 2.95MP ISX031 RGGB",
                  "ISP: Built-in ISP",
                  "Output data :YUV422, 8-bit",
                  "Serializer:  MAXIM MAX9295A",
                  "Sensor Type :Rolling Shutter",
                  "Operating Temperature : -40°C～+85°C",
                  "Dimensions: 25 mm × 25 mm × 18.6 mm",
                  "Field of View (HFOV): 30°/ 60°/ 100°/ 118°/ 196°",
                ],
              },
            ],
          },
          {
            id: "gige-cameras",
            name: "GigE Cameras",
            description:
              "GigE cameras deliver high-speed and reliable image transmission over Gigabit Ethernet with support for long cable distances up to 100 meters. Designed for machine vision, robotics, industrial automation, and AI-powered inspection systems, these cameras feature Power over Ethernet (PoE), PTP synchronization, and GigE Vision / GenICam compliance for seamless integration, stable performance, and scalable deployment in demanding industrial environments.",
            productGroups: [
              {
                id: "area-scan-cameras",
                name: "Area Scan Cameras",
                description:
                  "SENSING GigE Area Scan Cameras provide high-speed, precision imaging with resolutions ranging from 0.3MP to 20MP. Powered by advanced SONY, SmartSens, and HAITU sensors, they offer global and rolling shutter options, C-mount lens compatibility, and reliable performance for machine vision, industrial inspection, and automation systems.",
                products: [
                  {
                    id: "[0.3MP] SGigE-E3-S1MC",
                    name: "[0.3MP]-SGigE-E3-S1MC",
                    description:
                      "The GigE camera module SGigE-E3-S1MC is equipped with SONY CMOS IMX287 image sensor, delivering industrial-grade performance. It comes equipped with a C-Mount interface to accommodate various lenses.",
                      metaTitle: "[0.3MP]-SGigE-E3-S1MC – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The GigE camera module SGigE-E3-S1MC is equipped with SONY CMOS IMX287 image sensor, delivering industrial-grade performance. It comes equipped with a…",
                      metaKeywords:
                        "0.3MP SGigE E3 S1MC, Sensing Cameras, Vision Systems & Cameras, GigE, SGigE, E3-S1MC, SONY, CMOS, IMX287, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/0-3mp-sgige-e3-s1mc.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.2.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.3.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.4.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 750(H) × 540(V)",
                      "Frame Rate :Max 299 fps",
                      "Sensor:  SONY 0.3MP IMX287 Mono",
                      "Sensor Type : Global shutter",
                      "Operating Temperature : 0℃~+50℃",
                      "Dimensions: 29 mm × 29 mm × 56.1 mm",
                      "Interface:GigE Vision",
                      "Image Size :1/2.9 inch CMOS",
                    ],
                  },
                  {
                    id: "[20MP] SGigE-L200-S1MC",
                    name: "[20MP]-SGigE-L200-S1MC",
                    description:
                      "The GigE camera module SGigE-L200-S1MC is equipped with SONY CMOS IMX183 image sensor, delivering industrial-grade performance. It comes equipped with a C-Mount interface to accommodate various lenses.",
                      metaTitle: "[20MP]-SGigE-L200-S1MC – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The GigE camera module SGigE-L200-S1MC is equipped with SONY CMOS IMX183 image sensor, delivering industrial-grade performance. It comes equipped with a…",
                      metaKeywords:
                        "20MP SGigE L200 S1MC, Sensing Cameras, Vision Systems & Cameras, GigE, SGigE, L200-S1MC, SONY, CMOS, IMX183, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/1-3mp-sgige-e13-s1mc.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.2.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.3.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.4.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 5472(H) × 3648(V)",
                      "Frame Rate :Max 6 fps",
                      "Sensor: SONY 20MP IMX183 Mono",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : 0℃~+50℃",
                      "Dimensions: 29 mm × 29 mm × 56.1 mm",
                      "Image Size : 1 inch CMOS",
                      "Interface:GigE Vision",
                    ],
                  },
                  {
                    id: "[1.3MP] SGigE-E13-S1MC",
                    name: "[1.3MP]-SGigE-E13-S1MC",
                    description:
                      "The GigE camera module SGigE-E13-S1MC is equipped with SMARTSEN CMOS SC130 image sensor, delivering industrial-grade performance. It comes equipped with a C-Mount interface to accommodate various lenses.",
                      metaTitle: "[1.3MP]-SGigE-E13-S1MC – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The GigE camera module SGigE-E13-S1MC is equipped with SMARTSEN CMOS SC130 image sensor, delivering industrial-grade performance. It comes equipped with a…",
                      metaKeywords:
                        "1.3MP SGigE E13 S1MC, Sensing Cameras, Vision Systems & Cameras, GigE, SGigE, E13-S1MC, SMARTSEN, CMOS, SC130, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/5mp-sgige-e50-h2mc.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.2.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.3.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.4.png",
                    ],
                    fileUrl: null,
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 1280(H) × 1024(V)",
                      "Frame Rate : Max 94 fps",
                      "Sensor:  SMARTSENS 1.3MP SC130 Mono",
                      "Sensor Type :Global shutter",
                      "Operating Temperature : 0℃~+50℃",
                      "Dimensions: 29 mm × 29 mm × 56.1 mm",
                      "Image Size :1/2.7 inch CMOS",
                      "Interface:GigE Vision",
                    ],
                  },
                  {
                    id: "[5MP] SGigE-E50-H2MC",
                    name: "[5MP]-SGigE-E50-H2MC",
                    description:
                      "The SGigE-E50-H2MC camera module adopts the HAITU CMOS HT50A image sensor, which features industrial-grade performance and is equipped with a C-Mount interface, enabling the connection of various lenses.",
                      metaTitle: "[5MP]-SGigE-E50-H2MC – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The SGigE-E50-H2MC camera module adopts the HAITU CMOS HT50A image sensor, which features industrial-grade performance and is equipped with a C-Mount…",
                      metaKeywords:
                        "5MP SGigE E50 H2MC, Sensing Cameras, Vision Systems & Cameras, SGigE, E50-H2MC, HAITU, CMOS, HT50A, Mount, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/20mp-sgige-l200-s1mc.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.2.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.3.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-E3-S1MC.4.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 2448(H) × 2048(V)",
                      "Frame Rate : 23.5 fps",
                      "Sensor:HAITU 5MP HT50A Mono",
                      "Sensor Type :Rolling Shutter",
                      "Operating Temperature : 0℃~+50℃",
                      "Dimensions: 29 mm × 29 mm × 56.1 mm",
                      "Image Size : 2/3 inch CMOS",
                      "Interface:GigE Vision",
                    ],
                  },
                ],
              },
              {
                id: "line-scan-cameras",
                name: "Line Scan Cameras",
                description:
                  "SENSING GigE Line Scan Cameras deliver ultra-high-resolution imaging from 4K to 16K with precise global shutter technology. Equipped with advanced P7088 and P7028 mono sensors, plus C-Mount and M72 lens compatibility, they are engineered for demanding applications such as web inspection, print quality control, and smart manufacturing.",
                products: [
                  {
                    id: "[4K] SGigE-L041-N1XMC",
                    name: "[4K]-SGigE-L041-N1XMC",
                    description:
                      "The GigE camera module GigE-L041-N1XMC adopts the North-South Micro CMOS P7028SL image sensor, which features industrial-grade performance and is equipped with an C-mount interface, enabling the connection of various lenses.",
                      metaTitle: "[4K]-SGigE-L041-N1XMC – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The GigE camera module GigE-L041-N1XMC adopts the North-South Micro CMOS P7028SL image sensor, which features industrial-grade performance and is equipped…",
                      metaKeywords:
                        "4K SGigE L041 N1XMC, Sensing Cameras, Vision Systems & Cameras, GigE, L041-N1XMC, North, South, Micro, CMOS, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/4k-sgige-l041-n1xmc.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-L041-N1XMC.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-L041-N1XMC.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-L041-N1XMC.2.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 4096(H) × 1(V)",
                      "Sensor:  4K P7028SL Mono",
                      "Sensor Type : Global shutter",
                      "Operating Temperature : 0℃~+50℃",
                      "Dimensions: 30 mm × 40 mm × 56.5 mm",
                      "Image Size :1 inch CMOS",
                      "Interface :10 Giga Ethernet",
                    ],
                  },
                  {
                    id: "[8K] SGigE-L081-N1XMM",
                    name: "[8K]-SGigE-L081-N1XMM",
                    description:
                      "The GigE camera module SGigE-L081-N1XMM adopts the North-South Micro CMOS P7088SL image sensor, which features industrial-grade performance and is equipped with an M interface, enabling the connection of various lenses.",
                      metaTitle: "[8K]-SGigE-L081-N1XMM – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The GigE camera module SGigE-L081-N1XMM adopts the North-South Micro CMOS P7088SL image sensor, which features industrial-grade performance and is…",
                      metaKeywords:
                        "8K SGigE L081 N1XMM, Sensing Cameras, Vision Systems & Cameras, GigE, SGigE, L081-N1XMM, North, South, Micro, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/8k-sgige-l081-n1xmm.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-L081-N1XMM.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-L081-N1XMM.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-L081-N1XMM.2.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 8192(H) × 1(V)",
                      "Sensor: 8K P7088SL Mono",
                      "Sensor Type :Global shutter",
                      "Operating Temperature : 0℃~+50℃",
                      "Dimensions: 78 mm × 78 mm × 65 mm",
                      "Interface :10 Giga Ethernet",
                      "Image Size: 3.6 inch CMOS",
                      "Interface:10 Giga Ethernet",
                    ],
                  },
                  {
                    id: "[16K] SGigE-L161-N1XMM",
                    name: "[16K]-SGigE-L161-N1XMM",
                    description:
                      "The GigE camera module GigE-L161-N1XMM adopts the North-South Micro CMOS P7088ML image sensor, which features industrial-grade performance and is equipped with an M interface, enabling the connection of various lenses.",
                      metaTitle: "[16K]-SGigE-L161-N1XMM – Sensing Cameras | CORE BOLT",
                      metaDescription:
                        "The GigE camera module GigE-L161-N1XMM adopts the North-South Micro CMOS P7088ML image sensor, which features industrial-grade performance and is equipped…",
                      metaKeywords:
                        "16K SGigE L161 N1XMM, Sensing Cameras, Vision Systems & Cameras, GigE, L161-N1XMM, North, South, Micro, CMOS, CORE BOLT",
                    image:
                      "https://assets.core-bolt.com/website-assets/16k-sgige-l161-n1xmm.png",
                    images: [
                      "https://assets.core-bolt.com/website-assets/SGigE-L081-N1XMM.1.png",
                      "https://assets.core-bolt.com/website-assets/SGigE-L081-N1XMM.2.png",
                    ],
                    fileUrl: "",
                    category: "vision-systems-cameras",
                    subcategory: "sensing-cameras",
                    price: null,
                    features: [
                      "Resolution: 16384(H) × 1(V)",
                      "Sensor: 16K P7088ML Mono",
                      "Sensor Type : Global shutter",
                      "Operating Temperature :  0℃~+50℃",
                      "Dimensions: 78 mm × 78 mm × 65 mm",
                      "Image Size: 3.6 inch CMOS",
                      "Interface :10 Giga Ethernet",
                    ],
                  },
                ],
              },
            ],
            products: [],
          },
        ],
        products: [],
      },
      {
        id: "zed-cameras",
        name: "ZED Cameras",
        description:
          "Explore ZED Cameras, ZED X Mini, ZED Mini,  ZED X GS, ZED 2i,  and StereoLabs ZED solutions for robotics, computer vision, AI applications, SLAM, depth sensing, object detection, ROS, and NVIDIA Jetson platforms.",
        metaTitle:
          "ZED Cameras | Stereo Vision, 3D Depth Sensing & AI Vision Solutions ",
        metaDescription:
          "Explore advanced sensing cameras including GMSL, TI FPD-Link III, MIPI CSI-2, Starlight, Defogging, Low Latency, and GigE cameras for robotics, AI vision, machine vision, and industrial automation applications. ",
        metaKeywords:
          "ZED Cameras, ZED Stereo Camera,  ZED 3D Camera, ZED Depth Camera, ZED Camera, ZED X Camera, StereoLabs ZED, StereoLabs ZED Camera, StereoLabs ZED 2i, StereoLabs ZED Stereo Camera, ZED 2i Stereo Camera, ZED Camera ROS, ZED Camera Object Detection, ZED Camera for Robotics, ZED Camera for Autonomous Navigation, ZED Camera for Computer Vision, ZED Camera for AI Applications, ZED Camera for SLAM, ZED Camera for NVIDIA Jetson, Jetson Nano ZED Camera, ZED Jetson Nano, Stereo Vision Camera, 3D Vision Camera, Embedded Vision Camera, AI Vision Camera, Robot Vision Camera, Computer Vision Camera, ZED X Mini Stereo Camera, ZED X GS, Neural Stereo Depth Sensing ",
        overview:
          "CoreBolt provides advanced ZED Camera solutions designed for robotics, computer vision, artificial intelligence, autonomous systems, and edge AI applications. Powered by StereoLabs ZED technology, these stereo vision cameras deliver accurate depth perception, real-time environmental awareness, and intelligent visual sensing for next-generation automation and autonomous systems. We offer ZED Stereo Cameras, ZED 3D Cameras, ZED Depth Cameras, ZED X Cameras, ZED X Mini Stereo Cameras, and ZED X GS vision systems that enable high-performance depth sensing, object detection, localization, mapping, and spatial understanding. Built for demanding AI and computer vision workloads, these cameras provide reliable visual intelligence for complex operating environments. Whether deploying Autonomous Mobile Robots (AMRs), robotic systems, autonomous navigation platforms, machine vision applications, or intelligent edge AI solutions, ZED Cameras deliver precise stereo vision and depth-sensing capabilities. Designed to support ROS, NVIDIA Jetson platforms, computer vision algorithms, SLAM, neural stereo depth sensing, and AI-powered object recognition, these cameras help accelerate the development of intelligent robotic and autonomous systems. From robotics and autonomous navigation to computer vision, AI perception, and depth-based analytics, ZED Cameras provide the imaging performance and integration flexibility required for modern intelligent applications. Their advanced stereo vision technology enables accurate environmental perception, real-time decision-making, and reliable operation across a wide range of automation and AI-driven projects.",
        overviewTitle:
          "ZED Cameras for Robotics, AI Vision & Autonomous Systems ",
        productGroups: [
          {
            id: "neural-stereo-depth-sensing",
            name: "Neural Stereo Depth Sensing",
             description:
          "Neural stereo depth sensing cameras combine advanced AI-powered depth perception with high-resolution global shutter imaging to deliver accurate 3D spatial awareness. Ideal for robotics, humanoids, Physical AI, and autonomous systems, these cameras support applications such as robotic manipulation, pick-and-place, inspection, and real-time environment perception. Optimized for NVIDIA Jetson platforms, they enable intelligent and autonomous machine operation.",
  
            products: [
              {
                id: "zed-x-nano",
                name: "ZED X Nano Stereo Camera",
                description:
                  "The most advanced wrist-mount stereo camera for robotic manipulation, humanoids and Physical AI. Packed with high-resolution 2.3MP global shutter sensors, zero-copy capture, Neural Depth Engine and a ruggedized GMSL2 design. Pick, place, and inspect with sub-millimeter spatial intelligence.",
                  metaTitle: "ZED X Nano Stereo Camera – ZED Cameras | CORE BOLT",
                  metaDescription:
                    "The most advanced wrist-mount stereo camera for robotic manipulation, humanoids and Physical AI. Packed with high-resolution 2.3MP global shutter sensors…",
                  metaKeywords:
                    "ZED X Nano Stereo Camera, ZED Cameras, Vision Systems & Cameras, Physical, Packed, 3MP, Neural, Depth, Engine, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/zed-x-nano.webp",
                images: [
                  "https://assets.core-bolt.com/website-assets/zed-x-nano.1.webp",
                  "https://assets.core-bolt.com/website-assets/zed-x-nano.2.webp",
                  "https://assets.core-bolt.com/website-assets/zed-x-nano.3.webp",
                  "https://assets.core-bolt.com/website-assets/zed-x-nano.4.webp",
                  "https://assets.core-bolt.com/website-assets/zed-x-nano.5.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "zed-cameras",
                price: null,
                features: [
                  "Dimensions: 42.0mm  × 30.5 mm × 33.8 mm",
                  "Baseline: 18 mm",
                  "Weight: 75 g",
                  "Operating Temperature: -20°C to +60°C",
                  "Video Output: 1200p @ 60/30/15 fps (2 × 1920 × 1200 Side-by-Side) / 1080p @ 60/30/15 fps (2 × 1920 × 1080 Side-by-Side) / 600p @ 120/60/30/15 fps (2 × 960 × 600 Side-by-Side)",
                  "Video Recording: H.264, H.265, or Lossless Encoding (Host-Based)",
                  "Video Streaming: IP Streaming via ZED SDK",
                  "Depth Technology: Neural Stereo Depth Sensing",
                  "Depth Resolution: Native Video Resolution (Ultra Mode)",
                  "Depth Range: 0.03 m to 2.0 m /0.05 m to 1.5 m",
                  "Depth Frame Rate: Up to 120 Hz",
                  "Motion Sensors: 16-bit Accelerometer (Up to 12g)",
                  "Motion Sensors: 16-bit Gyroscope (Up to 1000°/s)",
                  "Sensor Data Rate: 200 Hz",
                  "Pose Update Rate: Up to 120 Hz",
                ],
              },

              {
                id: "zed-x-mini",
                name: "ZED X Mini Stereo Camera",
                description:
                  "Unlock next-level machine autonomy with crisp, distortion-free 3D vision. Perfect for robotics requiring precision tracking of fast-moving objects.",
                  metaTitle: "ZED X Mini Stereo Camera – ZED Cameras | CORE BOLT",
                  metaDescription:
                    "Unlock next-level machine autonomy with crisp, distortion-free 3D vision. Perfect for robotics requiring precision tracking of fast-moving objects.",
                  metaKeywords:
                    "ZED X Mini Stereo Camera, ZED Cameras, Vision Systems & Cameras, Unlock, Perfect, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/ZED-X-Mini-2.2mm-Front.webp",
                images: [
                  "https://assets.core-bolt.com/website-assets/ZED-X-Mini-2.2mm-Side.webp",
                  "https://assets.core-bolt.com/website-assets/ZED-X-Mini-4mm-Back.webp",
                  "https://assets.core-bolt.com/website-assets/ZED-X-Mini-4mm-Back-with-cable.webp",
                  "https://assets.core-bolt.com/website-assets/ZED-X-Mini-4mm-Bottom.webp",
                  "https://assets.core-bolt.com/website-assets/ZED-X-Mini-2.2mm-Packaging.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "zed-cameras",
                price: null,
                features: [
                  "Dimensions: 94 mm × 32 mm × 37 mm",
                  "Baseline: 50 mm",
                  "Weight: 150 g",
                  "Operating Temperature: -20°C to +55°C",
                  "Video Output: 1200p @ 60/30/15 fps (2 × 1920 × 1200 Side-by-Side) / 1080p @ 60/30/15 fps (2 × 1920 × 1080 Side-by-Side) / 600p @ 120/60/30/15 fps (2 × 960 × 600 Side-by-Side)",
                  "Video Recording: H.264, H.265, or Lossless Encoding (Host-Based)",
                  "Video Streaming: IP Streaming via ZED SDK",
                  "Depth Technology: Neural Stereo Depth Sensing",
                  "Depth Resolution: Native Video Resolution (Ultra Mode)",
                  "Depth Range: 0.1 m to 8 m (2.2 mm Lens) /0.15 m to 12 m (4 mm Lens)",
                  "Ideal Range: 0.1 m to 4 m (2.2 mm Lens) /0.15 m to 6 m (4 mm Lens)",
                  "Depth Frame Rate: Up to 120 Hz",
                  "Motion Sensors: 16-bit Accelerometer (Up to 12g)",
                  "Motion Sensors: 16-bit Gyroscope (Up to 1000°/s)",
                  "Sensor Data Rate: 200 Hz",
                  "Pose Update Rate: Up to 120 Hz",
                ],
              },

              {
                id: "zed-x-gs",
                name: "ZED X  GS",
                description:
                  "The ZED X stereo camera features a global shutter that captures sharp imagery without motion artifacts, even in dynamic environments. Powered by the ZED SDK, it delivers advanced collision avoidance, real-time 3D perception, accurate localization, and semantic scene understanding, making it ideal for demanding automation tasks.",
                  metaTitle: "ZED X  GS – ZED Cameras | CORE BOLT",
                  metaDescription:
                    "The ZED X stereo camera features a global shutter that captures sharp imagery without motion artifacts, even in dynamic environments. Powered by the ZED…",
                  metaKeywords:
                    "ZED X  GS, ZED Cameras, Vision Systems & Cameras, ZED, Powered, SDK, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/ZED_X-2.2mm-Front.webp",
                images: [
                  "https://assets.core-bolt.com/website-assets/ZED_X-2.2mm-Tilted-side.webp",
                  "https://assets.core-bolt.com/website-assets/ZED_X-4mm-Back-with-connector.webp",
                  "https://assets.core-bolt.com/website-assets/ZED_X-4mm-Back-with-cable.webp",
                  "https://assets.core-bolt.com/website-assets/ZED_X-2.2mm-Packaging.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "zed-cameras",
                price: null,
                features: [
                  "Dimensions: 163.4 mm × 31.8 mm × 36.7 mm",
                  "Baseline: 120 mm",
                  "Weight: 239 g",
                  "Operating Temperature: -20°C to +60°C",
                  "Depth Technology: Neural Stereo Depth Sensing",
                  "Video Output: 1200p @ 60/30/15 fps (2 × 1920 × 1200 Side-by-Side) / 1080p @ 60/30/15 fps (2 × 1920 × 1080 Side-by-Side) / 600p @ 120/60/30/15 fps (2 × 960 × 600 Side-by-Side)",
                  "Video Recording: H.264, H.265, or Lossless Encoding (Host-Based)",
                  "Video Streaming: IP Streaming via ZED SDK",
                  "Depth Range: 0.3 m to 20 m (2.2 mm Lens /1.0 m to 35 m (4.6 mm Lens)",
                  "Ideal Range: 0.3 m to 12 m (2.2 mm Lens /1.0 m to 20 m (4.6 mm Lens)",
                  "Depth Frame Rate: Up to 100 Hz",
                  "Motion Sensors: 16-bit Accelerometer (Up to 12g)",
                  "Motion Sensors: 16-bit Gyroscope (Up to 1000°/s)",
                  "Sensor Data Rate: 200 Hz",
                  "Pose Update Rate: Up to 100 Hz",
                  "Interface: GMSL2 (FAKRA Z Connector)",
                  "Image Sensors: Dual 2.3 MP Global Shutter Sensors",
                  "Output Format: RAW10",
                  "IP Rating: IP67",
                ],
              },
              {
                id: "zed-2i",
                name: "ZED 2i",
                description:
                  "AI-Powered Stereo Vision for Robotics and Spatial Analytics. Industrial-grade depth camera with neural sensing and modular design for any environment. The plug-and-play USB 3 connectivity makes it compatible with embedded and desktop PC solutions.",
                  metaTitle: "ZED 2i – ZED Cameras | CORE BOLT",
                  metaDescription:
                    "AI-Powered Stereo Vision for Robotics and Spatial Analytics. Industrial-grade depth camera with neural sensing and modular design for any environment. The…",
                  metaKeywords:
                    "ZED 2i, ZED Cameras, Vision Systems & Cameras, Powered, Stereo, Vision, Robotics, Spatial, Analytics, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/Zed2ifacedawn.webp",
                images: [
                  "https://assets.core-bolt.com/website-assets/zed-2i-dawn-usb_1.webp",
                  "https://assets.core-bolt.com/website-assets/Zed-2i-back-profile-dawn-square.webp",
                  "https://assets.core-bolt.com/website-assets/zed2iback.webp",
                  "https://assets.core-bolt.com/website-assets/Stereolabs-ZED2iGreyShop.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "zed-cameras",
                price: null,
                features: [
                  "Dimensions: 175 mm × 30 mm × 33 mm",
                  "Baseline: 120 mm",
                  "Weight: 262 g",
                  "Operating Temperature: -10°C to +50°C",
                  "Lens Cover: Gorilla Glass",
                  "Depth Technology: Neural Stereo Depth Sensing",
                  "Video Output: 2K @ 15 fps (2208 × 1242) / 1080p @ 30 fps (1920 × 1080) /720p @ 60 fps (1280 × 720) / WVGA @ 100 fps (672 × 376)",
                  "Video Recording: H.264, H.265, or Lossless Encoding (Host-Based)",
                  "Video Streaming: IP Streaming via ZED SDK",
                  "Depth Resolution: Native Video Resolution (Ultra Mode)",
                  "Depth Range: 0.3 m to 20 m",
                  "Ideal Range: 0.3 m to 12 m",
                  "Depth Frame Rate: Up to 100 Hz",
                  "Motion Sensors: Accelerometer, Gyroscope, Magnetometer, Barometer",
                  "Sensor Data Rate: 800 Hz",
                  "Pose Update Rate: Up to 200 Hz",
                  "Interface: USB 3.0 Type-C",
                  "Field of View (Wide Lens): 110° × 70° × 120°",
                  "Field of View (Narrow Lens): 90° × 60° × 100°",
                  "IP Rating: IP66",
                ],
              },
            ],
          },
          {
            id: "stereo-depth-sensing",
            name: "Stereo Depth Sensing",
             description:
          " ZED stereo depth sensing cameras for robotics, autonomous systems, and machine vision applications. Featuring accurate 3D depth perception and real-time spatial awareness, these cameras support SLAM, obstacle avoidance, object detection, and autonomous navigation. Designed for seamless integration with NVIDIA Jetson AI edge computers and edge AI platforms.",
  
            products: [
              {
                id: "zed-mini",
                name: "ZED Mini",
                description:
                  "The ZED Mini offers ultra-depth sensing and motion tracking in a compact design. Ideal for augmented reality, 3D mapping, and robotics applications.",
                  metaTitle: "ZED Mini – ZED Cameras | CORE BOLT",
                  metaDescription:
                    "The ZED Mini offers ultra-depth sensing and motion tracking in a compact design. Ideal for augmented reality, 3D mapping, and robotics applications.",
                  metaKeywords:
                    "ZED Mini, ZED Cameras, Vision Systems & Cameras, ZED, Mini, Ideal, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/zed-mini-dawn-usb_1.webp",
                images: [
                  "https://assets.core-bolt.com/website-assets/zed-mini-top-dawn-square.webp",
                  "https://assets.core-bolt.com/website-assets/zed-m-dawn-square.webp",
                  "https://assets.core-bolt.com/website-assets/zed-mini-usb-dawn-square.webp",
                  "https://assets.core-bolt.com/website-assets/zedminipackaging.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "zed-cameras",
                price: null,
                features: [
                  "Dimensions: 124.5 mm × 30.5 mm × 26.5 mm",
                  "Baseline: 63 mm",
                  "Operating Temperature: 0°C to +45°C",
                  "Video Output: 2K @ 15 fps (2208 × 1242) / 1080p @ 30/15 fps (1920 × 1080) / 720p @ 60/30/15 fps (1280 × 720) / WVGA @ 100 fps (672 × 376)",
                  "Video Recording: H.264, H.265, or Lossless Encoding (Host-Based)",
                  "Video Streaming: Stream Anywhere Over IP",
                  "Depth Technology: Stereo Depth Sensing",
                  "Depth Resolution: Native Video Resolution (Ultra Mode)",
                  "Depth Range: 0.1 m to 15 m /0.1 m to 9 m",
                  "Depth Frame Rate: Up to 100 Hz",
                  "Motion Sensors: Accelerometer and Gyroscope",
                  "Sensor Data Rate: 800 Hz",
                  "Pose Update Rate: Up to 100 Hz",
                  "Interface: USB 3.0",
                  "Field of View (H × V): 90° × 60°",
                  "IMU: Integrated 6DoF IMU",
                ],
              },
            ],
          },
        ],
        products: [],
      },
      {
        id: "realsense-cameras",
        name: "RealSense Cameras",
        description:
          "Intel® RealSense™ depth cameras provide accurate depth perception, RGB imaging, and AI-ready vision capabilities for robotics, automation, and autonomous systems. Designed for seamless integration with NVIDIA Jetson AI edge computers and Intel-based industrial computers, these cameras enable advanced applications such as SLAM, obstacle avoidance, object detection, and 3D vision.",
        metaTitle:
          "Intel RealSense Cameras | Depth Sensing, 3D Vision & AI Camera Solutions ",
        metaDescription:
          "Explore Intel RealSense Cameras including D455 and D435i for robotics, computer vision, SLAM, depth sensing, 3D perception, AI applications, NVIDIA Jetson integration, and autonomous systems. ",
        metaKeywords:
          "RealSense Cameras, Intel RealSense Camera, RealSense Depth Camera, RealSense 3D Camera, RealSense Camera, Intel RealSense Depth Camera, RealSense Stereo Camera, Depth Sensing Camera, 3D Vision Camera, Computer Vision Camera, Intel RealSense Camera, RealSense 3D Camera, RealSense Camera for Robotics, RealSense Camera for NVIDIA Jetson, Intel RealSense D455 Intel, RealSense D435i, RealSense Camera for Computer Vision, RealSense Camera for SLAM, RGB-D Camera, Depth Sensing Camera,  Stereo Depth Cameras, Facial Authentication,  Ruggedized / Industrial Stereo Depth",
        overview:
          "CoreBolt provides advanced Intel RealSense Camera solutions designed for robotics, computer vision, artificial intelligence, autonomous systems, and edge AI applications. These intelligent depth-sensing cameras combine RGB imaging and depth perception technologies to deliver accurate environmental awareness, real-time object detection, and spatial understanding for next-generation intelligent systems. We offer Intel RealSense Cameras, RealSense Depth Cameras, RealSense 3D Cameras, and Stereo Depth Cameras including the Intel RealSense D455 and Intel RealSense D435i. These advanced RGB-D camera solutions provide reliable depth measurement, 3D perception, motion tracking, and environmental mapping capabilities, enabling intelligent automation and vision-based applications across diverse industries. Whether deploying Autonomous Mobile Robots (AMRs), robotic systems, AI-powered inspection platforms, autonomous navigation solutions, or edge computing applications, RealSense Cameras provide accurate depth sensing and real-time visual intelligence. Designed to support NVIDIA Jetson platforms, computer vision algorithms, SLAM, object detection, facial authentication, and AI-based perception systems, these cameras help accelerate the development of intelligent automation and robotics solutions. From robotics and autonomous navigation to machine vision, 3D perception, and intelligent edge applications, Intel RealSense Cameras deliver the depth-sensing performance, reliability, and integration flexibility required for modern computer vision systems. Ruggedized and industrial stereo depth camera options further support demanding environments where accurate spatial awareness and dependable operation are essential.",
        overviewTitle:
          " Intel RealSense Cameras for Robotics, Computer Vision & AI Application",
        productGroups: [
          {
            id: "stereo-depth-with-ir-pass-filter",
            name: "Stereo Depth with IR Pass Filter",
            description: "Intel® RealSense™ stereo depth cameras with IR pass filters, including the D435f and D455f, engineered to enhance depth quality in environments with reflections, glare, and repetitive patterns. Ideal for robotics, machine vision, and autonomous systems, these cameras integrate seamlessly with NVIDIA Jetson AI edge computers and Intel-based industrial computing platforms for reliable depth sensing and real-time perception.",
            metaTitle:
              "Intel RealSense D435f & D455f Cameras | Depth Sensing & Computer Vision",
            metaDescription:
              "Explore Intel RealSense D435f and D455f depth cameras for robotics, computer vision, AI applications, SLAM, object detection, depth sensing, and NVIDIA Jetson-based autonomous systems. ",
            metaKeywords:
              "Stereo Depth, Intel RealSense D435f, RealSense D435f, D435f RealSense, Intel D435f, D435f Depth Camera, Intel RealSense Depth Camera D435f, Intel RealSense D455f, RealSense D455f, Intel RealSense Depth Camera D455f, RealSense Depth Camera, Intel RealSense Camera, Depth Sensing Camera, Stereo Depth Camera, RGB-D Camera, 3D Depth Camera, Computer Vision Camera, Machine Vision Camera, Depth Camera for Robotics, Depth Camera for NVIDIA Jetson, RealSense Camera for SLAM, RealSense Camera for Object Detection, Industrial Depth Camera, AI Vision Camera,, 3D Vision Camera, Robot Vision Camera, Intel RealSense for Robotics, RealSense Camera for AI Applications, Depth Perception Camera, Stereo Vision Camera",
            overview:
              "CoreBolt provides Intel RealSense D435f and D455f depth camera solutions designed for robotics, computer vision, artificial intelligence, autonomous systems, and edge AI applications. These advanced depth-sensing cameras combine RGB imaging and stereo vision technology to deliver accurate depth perception, environmental awareness, and real-time visual intelligence for intelligent automation systems. CoreBolt offer Intel RealSense D435f and Intel RealSense D455f cameras for applications requiring reliable depth measurement, object detection, localization, mapping, and spatial understanding. These RGB-D cameras generate precise depth information that enables robots, autonomous platforms, and AI-powered systems to perceive and interact with their surroundings more effectively. Whether deploying Autonomous Mobile Robots (AMRs), robotic inspection systems, machine vision platforms, autonomous navigation solutions, or AI edge computing applications, RealSense depth cameras provide dependable depth sensing and environmental perception capabilities. Designed to support NVIDIA Jetson platforms, computer vision algorithms, SLAM, obstacle detection, and AI-powered analytics, these cameras help accelerate the development of intelligent robotic and automation systems. From robotics and machine vision to autonomous navigation and depth-based analytics, the Intel RealSense D435f and D455f cameras deliver the accuracy, reliability, and integration flexibility required for modern computer vision applications.",
            overviewTitle:
              " Intel RealSense D435f & D455f Depth Cameras for Robotics & AI Vision ",
            products: [
              {
                id: "intel-real-sense-depth-camera-d435if",
                name: "Intel RealSense Depth Camera D435if",
                description:
                  "Intel® RealSense™ stereo depth cameras, including the D415, D435, D435i, D455, D405, D421, and D430, designed for robotics, computer vision, depth sensing, SLAM, object detection, and AI-powered autonomous systems. These cameras integrate seamlessly with NVIDIA Jetson and Intel-based computing platforms.",
                  metaTitle: "Intel RealSense Depth Camera D435if – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "Intel® RealSense™ stereo depth cameras, including the D415, D435, D435i, D455, D405, D421, and D430, designed for robotics, computer vision, depth…",
                  metaKeywords:
                    "Intel RealSense Depth Camera D435if, RealSense Cameras, Vision Systems & Cameras, Intel, RealSense, D415, D435, D435i, D455, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d435if.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/1-3-D435iF.png",
                  "https://assets.core-bolt.com/website-assets/2-D435iF.png",
                  "https://assets.core-bolt.com/website-assets/3-D435iF.png",
                  "https://assets.core-bolt.com/website-assets/4-D435iF.png",
                ],
                fileUrl:
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-D400-Series-Datasheet.pdf",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Image Sensor Technology: Global Shutter",
                  "Ideal Range:0.3 m to 3 m",
                  "Depth Technology: Stereoscopic",
                  "Minimum Depth Distance (Min-Z) at Max Resolution: ~28 cm",
                  "Depth Accuracy: <2% at 2 m",
                  "Depth Field of View (FOV):87° × 58°",
                  "Depth output resolution:Up to 1280 × 720",
                  "Depth frame rate:Up to 90 fps",
                  "RGB Frame Resolution: Up to 1920 × 1080",
                  "RGB frame rate:30 fps",
                  "RGB Sensor Technology: Rolling Shutter",
                  "RGB sensor FOV (H × V):69° × 42°",
                  "RGB Sensor Resolution:2 MP",
                  "Connectors:USB‑C* 3.1 Gen 1*",
                  "Dimensions (L × D × H): 90 mm × 25.8 mm × 25 mm",
                  "Interface: USB-C 3.1 Gen 1",
                ],
              },
              {
                id: "intel-real-sense-depth-camera-d435f",
                name: "Intel RealSense Depth Camera D435f",
                description:
                  "The RealSense™ Depth Camera D435f expands our portfolio targeting the growing market of autonomous mobile robots. The D435f utilizes an IR pass filter to enhance depth noise quality and performance range in many robotic environments.",
                  metaTitle: "Intel RealSense Depth Camera D435f – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The RealSense™ Depth Camera D435f expands our portfolio targeting the growing market of autonomous mobile robots. The D435f utilizes an IR pass filter to…",
                  metaKeywords:
                    "Intel RealSense Depth Camera D435f, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Camera, D435f, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d435f.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/1-3-D435iF.png",
                  "https://assets.core-bolt.com/website-assets/2-D435iF.png",
                  "https://assets.core-bolt.com/website-assets/3-D435iF.png",
                  "https://assets.core-bolt.com/website-assets/4-D435iF.png",
                ],
                fileUrl:
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-D400-Series-Datasheet.pdf",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Image sensor technology: Global Shutter",
                  "Ideal Range:0.3 m to 3 m",
                  "Depth Technology: Stereoscopic",
                  "Minimum Depth Distance (Min-Z) at Max Resolution:~28 cm",
                  "Depth Accuracy:<2% at 2 m",
                  "Depth Field of View (FOV):87° × 58°",
                  "Depth output resolution:Up to 1280 × 720",
                  "Depth frame rate:Up to 90 fps",
                  "RGB frame resolution:Up to 1920 × 1080",
                  "RGB frame rate:30 fps",
                  "RGB Sensor Technology:Rolling Shutter",
                  "RGB sensor FOV (H × V):69° × 42°",
                  "RGB Sensor Resolution:2 MP",
                  "Connectors:USB‑C* 3.1 Gen 1*",
                  "Dimensions (L × D × H): 90 mm × 25.8 mm × 25 mm",
                  "Interface: USB-C 3.1 Gen 1",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-D455f",
                name: "RealSense™ Depth Camera D455f",
                description:
                  "The RealSense™ Depth Camera D455f features our long range D455 with an IR pass filter. The addition of an IR Pass Filter over the lenses resolves repetitive pattern and false object detection due to light reflections.. The SDK 2.0 is designed to allow seamless transitions from one generation to the next and between our cameras.",
                  metaTitle: "RealSense™ Depth Camera D455f – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The RealSense™ Depth Camera D455f features our long range D455 with an IR pass filter. The addition of an IR Pass Filter over the lenses resolves…",
                  metaKeywords:
                    "RealSense™ Depth Camera D455f, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Camera, D455f, D455, Pass, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d455.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/gallery_depth-camera-d455-34-up-view_960x600-realsense.webp",
                  "https://assets.core-bolt.com/website-assets/gallery_depth-camera-d455-bottom-view_960x600-realsense.webp",
                  "https://assets.core-bolt.com/website-assets/gallery_depth-camera-d455-back-view_960x600-realsense.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Image Sensor Technology	:Global Shutter",
                  "Ideal Range	: 0.6 m to 6 m",
                  "Depth technology:	Stereoscopic",
                  "Minimum Depth Distance (Min-Z) at Max Resolution: ~52 cm",
                  "Depth Accuracy:	<2% at 4 m",
                  "Depth Field of View (FOV):	87° × 58°",
                  "Depth output resolution:	Up to 1280 × 720",
                  "Depth frame rate:	Up to 90 fps",
                  "Depth Filter	:IR Pass",
                  "RGB frame resolution:	Up to 1280 × 800",
                  "RGB frame rate:	60  fps",
                  "RGB sensor technology:	Global Shutter",
                  "RGB sensor FOV (H × V):	87 × 62°",
                  "RGB sensor resolution:	1 MP",
                  "Dimensions (L × D × H): 124 mm × 29 mm × 26.8 mm",
                  "Interface: USB-C 3.1 Gen 1",
                ],
              },
            ],
          },
          {
            id: "facial-authentication",
            name: "Facial Authentication",
            description:
              "Intel® RealSense™ facial authentication solutions designed for secure biometric access, identity verification, and embedded security applications. Leveraging advanced depth sensing and AI-based anti-spoofing technology, these modules provide reliable and privacy-focused authentication for kiosks, access control systems, smart locks, and industrial applications.",
            metaTitle:
              "Intel RealSense ID Facial Authentication Cameras | F450, F455 & F500",
            metaDescription:
              "Explore Intel RealSense ID F450, F455, and F500 facial authentication cameras for secure biometric access control, identity verification, and embedded security applications.",
            metaKeywords:
              "Facial Authentication, Intel RealSense ID F450, Intel RealSense ID F455, Intel RealSense ID F500, RealSense Facial Authentication, AI Facial Authentication, Contactless Authentication System, Face Recognition Camera, Identity Verification System, Secure Facial Authentication, Embedded Authentication Solution, AI Vision Authentication, Edge AI Authentication, Intelligent Access Control, Facial Recognition for Smart Buildings, Facial Authentication for Access Control",
            overview:
              "CoreBolt provides advanced facial authentication solutions designed for secure identity verification, intelligent access control, biometric security, and AI-powered authentication applications. Powered by Intel RealSense ID technology, these solutions enable fast, accurate, and contactless user authentication while enhancing security and user convenience across modern digital environments. CoreBolt offer Intel RealSense ID F450, Intel RealSense ID F455, and Intel RealSense ID F500 solutions that support real-time facial recognition, face verification, and secure identity management. These intelligent authentication technologies leverage AI vision and computer vision capabilities to provide reliable user verification while helping organizations improve security and streamline access management processes. Whether deploying intelligent access control systems, smart building solutions, enterprise security platforms, visitor management systems, self-service kiosks, healthcare applications, or digital identity verification systems, facial authentication technologies provide secure and efficient user authentication. Advanced AI-based identity verification capabilities help reduce unauthorized access while delivering a seamless and touchless user experience. Designed for modern security environments, facial authentication solutions support contactless authentication, intelligent access management, biometric verification, and real-time identity validation. By combining AI vision technologies with secure authentication workflows, these solutions help organizations strengthen security, improve operational efficiency, and support next-generation digital transformation initiatives. ",
            overviewTitle:
              " Facial Authentication Solutions for Secure Identity Verification & Access Control ",
            products: [
              {
                id: "Intel-RealSense-F450",
                name: "Intel RealSense ID Solution F450",
                description:
                  "Designed for easy system integration, our complete line of modules features an imaging sub‑system with stereo sensors. When paired with an RealSense™ Vision Processor, depth data can be output via USB to any platform.Connectors sold separately. Check out our Interposer offering under Accessories.",
                  metaTitle: "Intel RealSense ID Solution F450 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "Designed for easy system integration, our complete line of modules features an imaging sub‑system with stereo sensors. When paired with an RealSense™…",
                  metaKeywords:
                    "Intel RealSense ID Solution F450, RealSense Cameras, Vision Systems & Cameras, Designed, When, RealSense, Vision, Processor, USB, CORE BOLT",

                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-id-f450.png",
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Authentication Type: Facial Authentication",
                  "Field of View (H × V): 59° × 80°",
                  "IR LED: Yes",
                  "False Acceptance Rate (FAR): 1 in 1,000,000",
                  "True Acceptance Rate (TAR): 99.76%",
                  "Spoof Acceptance Rate (SAR): <0.1%",
                  "Presentation Attack Detection: ISO/IEC 30107-3 Level 2",
                  "Recommended Range: 0.3 m to 1.0 m",
                  "Authentication Time: <300 ms",
                  "Face Capacity: Up to 10,000 Users",
                  "Processing: On-Device Neural Network",
                  "Security: AES-256 Encryption",
                  "Storage: Encrypted Face Templates Only (No Image Storage)",
                  "Host Interfaces: USB, UART",
                  "Auxiliary Interfaces: SPI, GPIOs",
                  "Dimensions: 18 mm × 50 mm × 4.4 mm",
                  "Use Environment: Indoor /Outdoor",
                  "Operating Temperature: 0°C to 60°C",
                  "Operating Humidity: 10% to 90% RH (Non-Condensing)",
                  "Accuracy: NIST-Verified 99.76% (1:1 Verification)",
                  "Applications: Access Control, Smart Locks, Kiosks, POS Systems",
                ],
              },

              {
                id: "Intel-RealSense-F455",
                name: "Intel RealSense ID Solution F455",
                description:
                  "RealSense™ ID is a trusted and accurate on-device, facial authentication solution built on RealSense’s leadership in vision technology and AI. It combines an Stereoscopic depth sensor with a specialized neural network to deliver a secure solution that adapts over time.RealSense ID simplifies secure access and entry for everyone, everywhere. It supports people of varied heights and is designed to learn and adapt in real-time for Access Control, Kiosks, Point-of-Sale, ATMs and more.",
                  metaTitle: "Intel RealSense ID Solution F455 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "RealSense™ ID is a trusted and accurate on-device, facial authentication solution built on RealSense’s leadership in vision technology and AI. It combines…",
                  metaKeywords:
                    "Intel RealSense ID Solution F455, RealSense Cameras, Vision Systems & Cameras, RealSense, Stereoscopic, Access, Control, Kiosks, Point, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-id-f455.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/f455_2.jpg",
                  "https://assets.core-bolt.com/website-assets/f455_3.jpg",
                  "https://assets.core-bolt.com/website-assets/f455_bottom_1_1.png",
                  "https://assets.core-bolt.com/website-assets/f455_5.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Authentication Type: Facial Authentication",
                  "Field of View (H × V): 59° × 80°",
                  "IR LED: Yes",
                  "False Acceptance Rate (FAR): 1 in 1,000,000",
                  "True Acceptance Rate (TAR): 99.76%",
                  "Spoof Acceptance Rate (SAR): <0.1%",
                  "Presentation Attack Detection: ISO/IEC 30107-3 Level 2",
                  "Recommended Range: 0.3 m to 1.0 m",
                  "Authentication Time: <800 ms",
                  "Face Capacity: Up to 500 Users",
                  "Processing: On-Device Neural Network",
                  "Security: AES-256 Encryption",
                  "Storage: Encrypted Face Templates Only (No Image Storage)",
                  "Host Interface: USB",
                  "Auxiliary Interfaces: SPI, GPIOs, UART",
                  "Dimensions: 32.5 mm × 62 mm × 11 mm",
                  "Use Environment: Indoor /Outdoor",
                  "Operating Temperature: 0°C to 55°C",
                  "Operating Humidity: 10% to 90% RH (Non-Condensing)",
                  "Accuracy: NIST-Verified 99.76% (1:1 Verification)",
                  "Applications: Access Control, Smart Locks, POS Systems, Kiosks",
                ],
              },
              {
                id: "Intel-RealSense-F500",
                name: "Intel RealSense ID Solution F500",
                description:
                  "The RealSense ID solution is ready-to-use, purpose-built biometrics solution that can get you up and running in minutes.  Only RealSense delivers ISO 30107-3 Presentation Attack Detection Level 2 certification, NIST-verified accuracy at 99.77% for 1:1 verification, and advanced biometrics capabilities like person-detection and tracking in a single, unified platform that’s ¼ the size of a business card.",
                  metaTitle: "Intel RealSense ID Solution F500 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The RealSense ID solution is ready-to-use, purpose-built biometrics solution that can get you up and running in minutes. Only RealSense delivers ISO…",
                  metaKeywords:
                    "Intel RealSense ID Solution F500, RealSense Cameras, Vision Systems & Cameras, RealSense, Only, ISO, 30107-3, Presentation, Attack, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-id-f500.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/f500_iso_bfl.55_0.5x.png",
                  "https://assets.core-bolt.com/website-assets/f500_match_perspective._front_3quarter._no_shadow_0.5x.png",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Product Name: RealSense ID Pro F500 Module",
                  "Product MMID: 99D9A5 (Label F500A)",
                  "Authentication Type: Facial Authentication",
                  "Easy Enrollment: On-Device or From an Image",
                  "Authentication Time: <300 ms",
                  "Presentation Attack Detection: ISO/IEC 30107-3 Level 2",
                  "False Acceptance Rate (FAR): 1 in 1,000,000",
                  "True Acceptance Rate (TAR): 99.87%",
                  "Spoof Acceptance Rate (SAR): <0.1%",
                  "Face Capacity: Up to 10,000 Users",
                  "Processing: On-Device AI",
                  "Security: AES-256 Encryption",
                  "Storage: Encrypted Face Templates Only (No Image Storage)",
                  "Typical Operating Power: 1.5 W",
                  "Host Interfaces: UART, USB 2.0",
                  "Dimensions: 49.8 × 18 × 4.4 mm",
                  "Weight: 8.8 g",
                  "Authentication Range: 0.3 m to 1.5 m",
                  "Anti-Spoofing Range: 0.3 m to 1.3 m",
                  "Ambient Light Range: 0 to 50,000 lux",
                  "Storage Temperature: -30°C to +70°C",
                  "Operating Temperature: 0°C to +55°C",
                  "Applications: Access Control, ATMs, Kiosks, POS Systems, Smart Locks",
                ],
              },
            ],
          },
          {
            id: "ruggedized-industrial-stereo-depth",
            name: "Ruggedized / Industrial Stereo Depth",
            description:
              "Intel® RealSense™ ruggedized and industrial stereo depth cameras designed for demanding environments. Featuring reliable depth sensing and robust enclosures, these cameras are ideal for industrial automation, AMRs, machine vision, and outdoor robotics applications. Compatible with NVIDIA Jetson AI edge computers and Intel-based industrial computing platforms.",
            metaTitle:
              "Ruggedized Industrial Stereo Depth Cameras | Intel RealSense D456, D457 & D555 ",
            metaDescription:
              "Explore ruggedized industrial stereo depth cameras including Intel RealSense D456, D457, and D555 for robotics, computer vision, machine vision, AI applications, SLAM, depth sensing, and NVIDIA Jetson platforms. ",
            metaKeywords:
              "Ruggedized Industrial Stereo Depth Camera, Industrial Stereo Depth Camera, Stereo Depth Camera, Intel RealSense D456, RealSense D456, Intel RealSense Depth Camera D456, Intel RealSense D457, RealSense D457, Intel D457, D457 Intel, D457 RealSense, Depth Camera D457, Intel RealSense Depth Camera D457, Intel RealSense D555, RealSense D555, Intel RealSense Camera, Depth Sensing Camera, RGB-D Camera, 3D Depth Camera, Computer Vision Camera, Machine Vision Camera, Depth Camera for Robotics, Depth Camera for NVIDIA Jetson, RealSense Camera for SLAM, RealSense Camera for Object Detection, Industrial Depth Camera, AI Vision Camera, 3D Vision Camera, Robot Vision Camera, Embedded Vision Camera, Edge AI Vision Camera ",
            overview:
              "CoreBolt provides ruggedized industrial stereo depth camera solutions designed for robotics, computer vision, machine vision, autonomous systems, and edge AI applications. These advanced depth-sensing technologies combine stereo vision and RGB-D imaging to deliver accurate depth perception, environmental awareness, and real-time spatial intelligence for modern automation systems. We offer Intel RealSense depth camera solutions including the Intel RealSense D456, Intel RealSense D457, and Intel RealSense D555. These industrial stereo depth cameras provide reliable depth measurement, 3D perception, object detection, localization, and mapping capabilities, enabling intelligent systems to accurately understand and interact with their surroundings. Whether deploying Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), robotic systems, machine vision inspection platforms, autonomous navigation solutions, or AI-powered edge computing applications, stereo depth cameras provide dependable environmental perception and visual intelligence. Designed to support NVIDIA Jetson platforms, computer vision algorithms, SLAM, obstacle detection, object recognition, and AI-powered analytics, these cameras help accelerate the development of intelligent robotic and automation solutions. From robotics and industrial automation to machine vision, 3D perception, and intelligent edge applications, ruggedized industrial stereo depth cameras deliver the performance, reliability, and integration flexibility required for demanding environments. Their advanced depth-sensing capabilities support enhanced navigation, real-time decision-making, and improved operational efficiency across a wide range of intelligent systems.",
            overviewTitle:
              "Ruggedized Industrial Stereo Depth Cameras for Robotics, AI Vision & Intelligent Automation",
            products: [
              {
                id: "Intel-RealSense-Depth-Camera-D456",
                name: "RealSense™ Depth Camera D456",

                description:
                  "The RealSense™ Depth Camera D456 is based on our longest range D455 USB popular camera with 3 global shutter sensors and IMU. The D456 has an IP65 rated enclosure which is dust tight and protected from projected water",
                  metaTitle: "RealSense™ Depth Camera D456 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The RealSense™ Depth Camera D456 is based on our longest range D455 USB popular camera with 3 global shutter sensors and IMU. The D456 has an IP65 rated…",
                  metaKeywords:
                    "RealSense™ Depth Camera D456, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Camera, D456, D455, USB, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d456.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/d456_ecommerce_front-ortho_070221-1024x640.webp",
                  "https://assets.core-bolt.com/website-assets/d456_ecommerce_bottom-ortho_070221-1024x640.webp",
                  "https://assets.core-bolt.com/website-assets/d456_ecommerce_back-ortho_070221-1024x640.webp",
                  "https://assets.core-bolt.com/website-assets/d456_ecommerce_3-4-up-angle-hero_070221-1024x640.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Camera Module: RealSense Module D450",
                  "Vision Processor: RealSense Vision Processor D4",
                  "Depth Technology: Stereoscopic",
                  "Image Sensor Technology: Global Shutter",
                  "Stereo Sensors: Dual Global Shutter Sensors",
                  "Ideal Range: 0.6 m to 6.0 m",
                  "Minimum Depth Distance (Min-Z): ~52 cm",
                  "Depth Accuracy: <2% at 4 m",
                  "Depth Field of View (FOV): 87° × 58°",
                  "Depth Stream Output Resolution: Up to 1280 × 720",
                  "Depth Stream Output Frame Rate: Up to 90 fps",
                  "RGB Sensor: RGB Color Camera",
                  "RGB Sensor Technology: Global Shutter",
                  "RGB Sensor Resolution: 1 MP",
                  "RGB Sensor FOV: 90° × 65°",
                  "RGB Frame Resolution: 1280 × 800",
                  "RGB Frame Rate: 30 fps",
                  "Stereo Baseline: 95 mm",
                  "IMU: BMI055 6DoF IMU",
                  "Emitter: Class 1 Laser",
                  "Interface: USB Type-C (USB 3.1 Gen 1)",
                  "Protection Rating: IP65",
                  "Dimensions (L × D × H): 124 mm × 26 mm × 29 mm",
                  "Operating Temperature: -20°C to +50°C",
                ],
              },

              {
                id: "Intel-RealSense-Depth-Camera-D457",
                name: "RealSense™ Depth Camera D457",
                description:
                  "The Intel® RealSense™ Depth Camera D457 is our first GMSL/FAKRA high bandwidth stereo camera. The D457 has an IP65 grade enclosure protecting it from dust ingress and projected water.",
                  metaTitle: "RealSense™ Depth Camera D457 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The Intel® RealSense™ Depth Camera D457 is our first GMSL/FAKRA high bandwidth stereo camera. The D457 has an IP65 grade enclosure protecting it from dust…",
                  metaKeywords:
                    "RealSense™ Depth Camera D457, RealSense Cameras, Vision Systems & Cameras, Intel, RealSense, Depth, Camera, D457, GMSL, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d457.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/d457-fakra_hero_rendering_3-4view-top_081622-copy-2048x1280.webp",
                  "https://assets.core-bolt.com/website-assets/d457-fakra_ortho_rendering_back_081622-2048x1280.webp",
                  "https://assets.core-bolt.com/website-assets/d457-fakra_ortho_rendering_bottomeac_no-cap_081622-copy-2048x1280.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Depth Technology: Stereoscopic",
                  "Image Sensor Technology: Global Shutter",
                  "Stereo Sensors: Dual Global Shutter Sensors",
                  "Ideal Range: 0.6 m to 6.0 m",
                  "Minimum Depth Distance (Min-Z): ~52 cm",
                  "Depth Accuracy: <2% at 4 m",
                  "Depth Field of View (FOV): 87° × 58°",
                  "Depth Output Resolution: Up to 1280 × 720",
                  "Depth Frame Rate: Up to 90 fps",
                  "RGB Sensor: RGB Color Camera",
                  "RGB Sensor Technology: Global Shutter",
                  "RGB Sensor Resolution: 1 MP",
                  "RGB Sensor FOV (H × V): 90° × 65°",
                  "RGB Frame Resolution: Up to 1280 × 800",
                  "RGB Frame Rate: 30 fps",
                  "Inertial Measurement Unit: Bosch BMI085",
                  "Stereo Baseline: 95 mm",
                  "Emitter: Class 1 Laser",
                  "Interface: GMSL2 with FAKRA Connector",
                  "Synchronization Support: Hardware Sync",
                  "Protection Rating: IP65",
                  "Dimensions (L × D × H): 90 mm × 25.8 mm × 25 mm",
                  "Operating Temperature: -20°C to +50°C",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-D555",
                name: "RealSense™ Depth Camera D555",
                description:
                  "RealSense™ Depth Camera D555 introduces Power over Ethernet (PoE) interface on chip, expanding ourportfolio of USB and GMSL/FAKRA products.RealSense™ Depth Camera D555 is the first camera powered by the new RealSense™ Vision SoC V5. V5 is a low power, small form factor vision System-on-Chip (SoC). Optimized neural networks offer great efficiency, while delivering ultra-low power inference and simplifies the design by reducing system complexity",
                  metaTitle: "RealSense™ Depth Camera D555 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "RealSense™ Depth Camera D555 introduces Power over Ethernet (PoE) interface on chip, expanding ourportfolio of USB and GMSL/FAKRA products.RealSense™…",
                  metaKeywords:
                    "RealSense™ Depth Camera D555, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Camera, D555, Power, Ethernet, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d555.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/d555_img1.webp",
                  "https://assets.core-bolt.com/website-assets/d555_img2.webp",
                  "https://assets.core-bolt.com/website-assets/d555_img3.webp",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Vision Processor: RealSense SoC V5",
                  "Depth Technology: Stereoscopic",
                  "Image Sensor Technology: Global Shutter",
                  "Stereo Sensors: Dual Global Shutter Sensors",
                  "Depth Field of View (FOV) (H × V): 87° × 58°",
                  "Depth Resolution: Up to 1280 × 720",
                  "Depth Frame Rate: Up to 90 fps",
                  "Minimum Depth Distance (Min-Z): 26 cm (VGA)",
                  "RGB Sensor: RGB Color Camera",
                  "RGB Resolution: Up to 1280 × 800",
                  "RGB Frame Rate: Up to 60 fps",
                  "RGB Field of View (FOV) (H × V): 90° × 65°",
                  "IMU: 6DoF IMU",
                  "Stereo Baseline: 95 mm",
                  "Emitter: Class 1 Laser",
                  "PoE Connector: RJ45",
                  "USB Connector: USB Type-C (Power Supported)",
                  "Interface: Power over Ethernet (PoE)",
                  "External Hardware Synchronization: Via USB Connector",
                  "Hardware Synchronization: Supported",
                  "Low Power Operation: Supported",
                  "Protection Rating: IP65",
                  "Typical Power Consumption: 5.5 W",
                  "Dimensions: 167 mm × 42 mm × 48 mm",
                  "Operating Case Temperature: -20°C to +50°C",
                  "Industrial Applications: Robotics, Automation, Smart Infrastructure",
                ],
              },
            ],
          },
          {
            id: "stereo-depth-cameras",
            name: "Stereo Depth Cameras",
            description:" Intel® RealSense™ stereo depth cameras, including the D415, D435, D435i, D455, D401, D405, D421, and D430, designed for robotics, computer vision, depth sensing, SLAM, object detection, and AI-powered autonomous systems. Compatible with NVIDIA Jetson AI edge computers and Intel-based industrial computing platforms.",
            metaTitle:
              "Stereo Depth Cameras | Intel RealSense D415, D435, D435i & D455 ",
            metaDescription:
              "Explore Stereo Depth Cameras including Intel RealSense D415, D435, D435i, D455, D401, D405, D421, and D430 for robotics, computer vision, AI vision, depth sensing, SLAM, object detection, and NVIDIA Jetson applications. ",
            metaKeywords:
              "Ruggedized Industrial Stereo Depth Camera, Industrial Stereo Depth Camera, Stereo Depth Camera, Intel RealSense D456, RealSense D456, Intel RealSense Depth Camera D456, Intel RealSense D457, RealSense D457, Intel D457, D457 Intel, D457 RealSense, Depth Camera D457, Intel RealSense Depth Camera D457, Intel RealSense D555, RealSense D555, Intel RealSense Camera, Depth Sensing Camera, RGB-D Camera, 3D Depth Camera, Computer Vision Camera, Machine Vision Camera, Depth Camera for Robotics, Depth Camera for NVIDIA Jetson, RealSense Camera for SLAM, RealSense Camera for Object Detection, Industrial Depth Camera, AI Vision Camera, 3D Vision Camera, Robot Vision Camera, Embedded Vision Camera, Edge AI Vision Camera ",
            overview:
              "CoreBolt provides advanced Stereo Depth Camera solutions designed for robotics, computer vision, machine vision, autonomous systems, and edge AI applications. These intelligent vision technologies combine stereo imaging and depth sensing capabilities to deliver accurate environmental perception, real-time spatial awareness, and 3D vision for next-generation automation systems. CoreBolt offer Intel RealSense Camera solutions including the Intel RealSense D415, Intel RealSense D435, Intel RealSense D435i, Intel RealSense D455, D401, D405, D421, and D430 depth camera series. These stereo depth cameras provide reliable depth measurement, object detection, localization, mapping, and 3D perception capabilities, enabling intelligent systems to better understand and interact with their surroundings. Whether deploying Autonomous Mobile Robots (AMRs), Automated Guided Vehicles (AGVs), robotic systems, autonomous navigation platforms, machine vision applications, or AI-powered edge computing solutions, stereo depth cameras provide dependable visual intelligence and environmental awareness. Designed to support NVIDIA Jetson platforms, computer vision algorithms, SLAM, obstacle detection, object recognition, and AI-powered analytics, these cameras help accelerate the development of intelligent robotic and automation systems. From robotics and autonomous navigation to machine vision, computer vision, and AI-powered perception, Stereo Depth Cameras deliver the performance, accuracy, and integration flexibility required for modern intelligent applications. Their advanced depth-sensing capabilities enable enhanced navigation, real-time decision-making, and improved operational efficiency across a wide range of industries",
            overviewTitle:
              " Stereo Depth Cameras for Robotics, Computer Vision & Edge AI",
            products: [
              {
                id: "intel-real-sense-depth-camera-d415",
                name: "Intel RealSense Depth Camera D415",
                description:
                  "The D415 is a USB-powered depth camera and consists of a pair of depth sensors, RGB sensor, and infrared projector. It is ideal for makers and developers to add depth perception capability to their prototype development.",
                  metaTitle: "Intel RealSense Depth Camera D415 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The D415 is a USB-powered depth camera and consists of a pair of depth sensors, RGB sensor, and infrared projector. It is ideal for makers and developers…",
                  metaKeywords:
                    "Intel RealSense Depth Camera D415, RealSense Cameras, Vision Systems & Cameras, D415, USB, RGB, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d415.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D415-01.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D415-03.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D415-04.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D415-05.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D415-06.png",
                ],
                fileUrl:
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-D400-Series-Datasheet.pdf",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Image Sensor: OmniVision OV2740",
                  "RGB Sensor Resolution: 1920 × 1080",
                  "Active Pixels: 1920 × 1080",
                  "Sensor Aspect Ratio: 16:9",
                  "Image Format: 10-bit RAW",
                  "F Number: f/2.0",
                  "Focal Length: 1.88 mm",
                  "Filter Type: IR Cut Filter",
                  "Focus: Fixed",
                  "Shutter Type: Rolling Shutter",
                  "Signal Interface: MIPI CSI-2, 1 Lane",
                  "Horizontal Field of View: 69.4°",
                  "Vertical Field of View: 42.5°",
                  "Diagonal Field of View: 77°",
                  "Distortion: ≤1.5%",
                  "Depth Technology: Stereoscopic",
                  "Depth Sensors: Dual Rolling Shutter Sensors",
                  "Depth Resolution: Up to 1280 × 720",
                  "Depth Field of View (H × V): 65° × 40°",
                  "Stereo Baseline: 55 mm",
                  "Frame Rate: Up to 90 fps",
                  "Emitter: Class 1 Laser",
                  "Interface: USB 3.1 Gen 1",
                  "Ideal Range: 0.3 m to 10 m",
                ],
              },
              {
                id: "intel-real-sense-depth-camera-d435",
                name: "Intel RealSense Depth Camera D435",
                description:
                  "The D435 is a USB-powered depth camera and consists of a pair of depth sensors, RGB sensor, and infrared projector. It is ideal for makers and developers to add depth perception capability to their prototype.",
                  metaTitle: "Intel RealSense Depth Camera D435 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The D435 is a USB-powered depth camera and consists of a pair of depth sensors, RGB sensor, and infrared projector. It is ideal for makers and developers…",
                  metaKeywords:
                    "Intel RealSense Depth Camera D435, RealSense Cameras, Vision Systems & Cameras, D435, USB, RGB, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d435.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D435-01.png",
                ],
                fileUrl:
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-D400-Series-Datasheet.pdf",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Depth Technology: Stereoscopic",
                  "Depth Resolution: Up to 1280 × 720",
                  "Depth Frame Rate: Up to 90 fps",
                  "Depth Field of View (FOV): 87° × 58°",
                  "RGB Sensor Resolution: 1920 × 1080",
                  "Stereo Baseline: 50 mm",
                  "Ideal Range: 0.2 m to 10 m",
                  "Emitter: Class 1 Laser",
                  "Interface: USB 3.1 Gen 1",
                  "Dimensions (L × D × H): 90 mm  × 25 mm × 25 mm",
                ],
              },
              {
                id: "intel-real-sense-depth-camera-d435i",
                name: "Intel RealSense Depth Camera D435i",
                description:
                  "RealSense™ Depth Camera D435i combines the depth sensing capabilities of the D435 with the addition of an inertial measurement unit (IMU). For great scans, an IMU provides an extra set of data allowing for better dense reconstruction. Alternately, in robotics, the Robotic Operating System (ROS) takes this input for your robot so your can understand its position in the world.",
                  metaTitle: "Intel RealSense Depth Camera D435i – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "RealSense™ Depth Camera D435i combines the depth sensing capabilities of the D435 with the addition of an inertial measurement unit (IMU). For great…",
                  metaKeywords:
                    "Intel RealSense Depth Camera D435i, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Camera, D435i, D435, IMU, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d435.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d435i.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D435i-02.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D435i-03.png",
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-Depth-Camera-D435i-04.png",
                ],
                fileUrl:
                  "https://assets.core-bolt.com/website-assets/Intel-RealSense-D400-Series-Datasheet.pdf",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Depth Technology: Stereoscopic",
                  "Depth Sensors: Dual Global Shutter Sensors",
                  "Depth Resolution: Up to 1280 × 720",
                  "Depth Stream Output Frame Rate: Up to 90 fps",
                  "Depth Field of View (FOV): 87° × 58°",
                  "RGB Sensor Resolution: 1920 × 1080",
                  "Stereo Baseline: 50 mm",
                  "Ideal Range: 0.2 m to 10 m",
                  "IMU: BMI055 6DoF Inertial Measurement Unit",
                  "Accelerometer Output Rate: Up to 250 Hz",
                  "Gyroscope Output Rate: Up to 400 Hz",
                  "Emitter: Class 1 Laser",
                  "Interface: USB 3.1 Gen 1",
                  "Connector: USB Type-C",
                  "Dimensions (L × D × H): 90 mm × 25 mm × 25 mm",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-d421",
                name: "RealSense™ Depth Camera D421",
                description:
                  "RealSense Depth Module D421 is the first all-in-one module integrating the D4 Vision Processor with the optical module on the same board. The RealSense vision processor D4 does all depth calculations onboard, making this a low power, platform-agnostic device.",
                  metaTitle: "RealSense™ Depth Camera D421 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "RealSense Depth Module D421 is the first all-in-one module integrating the D4 Vision Processor with the optical module on the same board. The RealSense…",
                  metaKeywords:
                    "RealSense™ Depth Camera D421, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Module, D421, Vision, Processor, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d421.png",
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Form Factor: Camera Module",
                  "Depth Technology: Stereoscopic",
                  "Image Sensor Technology: Global Shutter",
                  "Depth Sensors: Dual Global Shutter Sensors",
                  "Ideal Range: 0.2 m to 2.0+ m",
                  "Minimum Depth Distance (Min-Z): ~20 cm",
                  "Depth Accuracy: <4% at 2 m",
                  "Depth Field of View (FOV): 75° ±3° × 50° ±3°",
                  "Depth Output Resolution: Up to 1280 × 720",
                  "Depth Frame Rate: Up to 60 fps",
                  "Depth Filter: IR Band Pass Filter",
                  "Stereo Baseline: 55 mm",
                  "Emitter: Class 1 Laser",
                  "Connector: USB Type-C",
                  "Dimensions (L × D × H): 95 mm × 32 mm × 10.18 mm",
                  "Operating Temperature: 0°C to 35°C",
                  "Low Power Consumption: Supported",
                  "Platform Agnostic Design: Supported",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-D405",
                name: "RealSense™ Depth Camera D405",
                description:
                  "The Intel® RealSense™ Depth Camera D405 is a short-range stereo camera providing sub-millimeter accuracy for your close-range computer vision needs.The D405 operates at an ideal ange of 7 cm to 50 cm with inimum object detection  own to .1 mm at 7 cm.Built-in advanced image processing allows us to make a smaller camera without sacrificing quality — at 42 mm x 42 mm x 23 mm and 60 g the D405 is smaller than a golf ball.Sing an mage Signa processor (ISP) to enhance the RGB data from the depth sensor allows for matched RGB and depth data.",
                  metaTitle: "RealSense™ Depth Camera D405 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The Intel® RealSense™ Depth Camera D405 is a short-range stereo camera providing sub-millimeter accuracy for your close-range computer vision needs.The…",
                  metaKeywords:
                    "RealSense™ Depth Camera D405, RealSense Cameras, Vision Systems & Cameras, Intel, RealSense, Depth, Camera, D405, Built, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d405.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/D-405.png",
                  "https://assets.core-bolt.com/website-assets/disassembled-1.png",
                  "https://assets.core-bolt.com/website-assets/405-camera-1-768x424.jpg",
                ],
                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Depth Technology: Stereoscopic",
                  "Image Sensor Technology: Global Shutter",
                  "Inertial Measurement Unit: None",
                  "Ideal Range: 7 cm to 50 cm",
                  "Minimum Depth Distance (Min-Z): 7 cm @ 480p",
                  "Depth Accuracy: ±2% at 50 cm",
                  "Depth Field of View (FOV): 87° × 58°",
                  "Depth Output Resolution: Up to 1280 × 720",
                  "Depth Frame Rate: Up to 90 fps",
                  "RGB Sensor Technology: Global Shutter",
                  "RGB Sensor: Left Imager RGB with ISP",
                  "RGB Resolution: 1280 × 720",
                  "RGB Frame Rate: Up to 90 fps",
                  "RGB Sensor FOV (H × V): 87° × 58°",
                  "Operating Temperature: 0°C to 35°C (Ambient), 0°C to 55°C (Case)",
                  "Dimensions (Peripheral): 42 × 42 × 23 mm",
                  "Dimensions (Module): 36.5 mm × 19.4 mm × 10.5 mm",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-D401",
                name: "RealSense™ Depth Camera D401",
                description:
                  "D401 GMSL is a high-precision stereo depth module engineered for close-range perception, robotic manipulation, and industrial inspection. With its ultra-short baseline design and exceptional depth accuracy at short distances, the D401 enables precise object detection, measurement, and positioning for robotic hands, end-effectors, and automated inspection systems.",
                  metaTitle: "RealSense™ Depth Camera D401 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "D401 GMSL is a high-precision stereo depth module engineered for close-range perception, robotic manipulation, and industrial inspection. With its…",
                  metaKeywords:
                    "RealSense™ Depth Camera D401, RealSense Cameras, Vision Systems & Cameras, D401, GMSL, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d401.png",

                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Depth Technology: Stereoscopic",
                  "Depth Sensors: Dual Global Shutter Sensors",
                  "Ideal Range: 7 cm to 50 cm",
                  "Minimum Object Detection: 0.1 mm",
                  "Stereo Baseline: 7 mm",
                  "Depth Field of View (FOV): 87° × 58°",
                  "Depth Frame Rate: Up to 90 fps",
                  "Interface: USB Type-C",
                  "Emitter: Class 1 Laser",
                  "Image Sensor: OmniVision OV9782",
                  "Active Pixels: 1280 × 800",
                  "Sensor Aspect Ratio: 8:5",
                  "Image Format: 10-bit RAW",
                  "F Number: f/2.0",
                  "Focal Length: 1.93 mm",
                  "Focus: Fixed",
                  "Shutter Type: Global Shutter",
                  "Signal Interface: MIPI CSI-2, 2 Lanes",
                  "Horizontal Field of View: 90° ±1°",
                  "Vertical Field of View: 64° ±1°",
                  "Diagonal Field of View: 98° ±1°",
                  "Distortion: ≤1.5%",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-D430",
                name: "RealSense™ Depth Camera D430",
                description:
                  "D430 GMSL is a compact stereo depth module designed for spatial awareness, autonomous navigation, and robotics applications. Featuring a wide field of view, global shutter sensors, and GMSL2 connectivity, the D430 delivers reliable depth perception in dynamic environments while minimizing motion artifacts.",
                  metaTitle: "RealSense™ Depth Camera D430 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "D430 GMSL is a compact stereo depth module designed for spatial awareness, autonomous navigation, and robotics applications. Featuring a wide field of…",
                  metaKeywords:
                    "RealSense™ Depth Camera D430, RealSense Cameras, Vision Systems & Cameras, D430, GMSL, Featuring, GMSL2, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d430.png",

                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Image Sensor: OmniVision OV9782",
                  "Active Pixels: 1280 × 800",
                  "Sensor Aspect Ratio: 8:5",
                  "Image Format: 10-bit RAW",
                  "F Number: f/2.0",
                  "Focal Length: 1.93 mm",
                  "Filter Type: None",
                  "Focus: Fixed",
                  "Shutter Type: Global Shutter",
                  "Signal Interface: MIPI CSI-2, 2 Lanes",
                  "Horizontal Field of View: 90° ±1°",
                  "Vertical Field of View: 64° ±1°",
                  "Diagonal Field of View: 98° ±1°",
                  "Distortion: ≤1.5%",
                  "Interface: GMSL2",
                  "Depth Sensors: Dual Global Shutter Sensors",
                  "Frame Rate: Up to 90 fps",
                  "Field of View (RGB): 90° × 64°",
                  "Depth Technology: Stereoscopic",
                  "Wide Field of View: Yes",
                  "Depth Sensing Range: Mid-Range",
                ],
              },
              {
                id: "Intel-RealSense-Depth-Camera-D455",
                name: "RealSense™ Depth Camera D455",
                description:
                  "The RealSense® RealSense™ Depth Camera D455 takes what makes the D435 products great and make them even better by increasing range and accuracy by a factor of two. The SDK 2.0 is designed to allow seamless transitions from one generation to the next and between our cameras.",
                  metaTitle: "RealSense™ Depth Camera D455 – RealSense Cameras | CORE BOLT",
                  metaDescription:
                    "The RealSense® RealSense™ Depth Camera D455 takes what makes the D435 products great and make them even better by increasing range and accuracy by a…",
                  metaKeywords:
                    "RealSense™ Depth Camera D455, RealSense Cameras, Vision Systems & Cameras, RealSense, Depth, Camera, D455, D435, SDK, CORE BOLT",
                image:
                  "https://assets.core-bolt.com/website-assets/intel-realsense-depth-camera-d455.png",
                images: [
                  "https://assets.core-bolt.com/website-assets/depth-camera-d455-front_800x1000.jpg",
                  "https://assets.core-bolt.com/website-assets/depth-camera-d455-three-quarters_800x1000.jpg",
                  "https://assets.core-bolt.com/website-assets/depth-camera-d455-back_800x1000.jpg",
                  "https://assets.core-bolt.com/website-assets/depth-camera-d455-bottom_800x1000.jpg",
                  "https://assets.core-bolt.com/website-assets/depth-camera-d455-top_800x1000.jpg",
                ],

                fileUrl: "",
                category: "vision-systems-cameras",
                subcategory: "realsense-cameras",
                price: null,
                features: [
                  "Use Environment: Indoor /Outdoor",
                  "Depth Technology: Stereoscopic",
                  "Image Sensor Technology: Global Shutter",
                  "Ideal Range: 0.6 m to 6.0 m",
                  "Minimum Depth Distance (Min-Z): ~52 cm",
                  "Depth Accuracy: <2% at 4 m",
                  "Depth Field of View (FOV): 87° × 58°",
                  "Depth Output Resolution: Up to 1280 × 720",
                  "Depth Frame Rate: Up to 90 fps",
                  "RGB Sensor Technology: Global Shutter",
                  "RGB Sensor Resolution: 1 MP",
                  "RGB Sensor FOV (H × V): 90° × 65°",
                  "RGB Frame Resolution: Up to 1280 × 800",
                  "RGB Frame Rate: 30 fps",
                  "Stereo Baseline: 95 mm",
                  "Connectors: USB Type-C (USB 3.1 Gen 1)",
                  "Dimensions (L × D × H): 124mm × 26mm × 29 mm",
                ],
              },
            ],
          },
        ],
        products: [],
      },
    ],
  },
];
