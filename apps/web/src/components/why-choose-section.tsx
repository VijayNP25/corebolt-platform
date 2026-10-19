import { motion } from "framer-motion";
import {
  CheckCircle,
  Zap,
  Users,
  Target,
  Network,
  Lightbulb,
} from "lucide-react";

export default function WhyChooseSection() {
  const advantages = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "End to End Execution",
      description:
        "From product development to manufacturing and final delivery, we deliver end-to-end hardware solutions with precision and reliability.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Integrated Engineering Expertise",
      description:
        "We bring together mechanical engineering, embedded hardware , control electronics and advanced manufacturing to build fully integrated, production-ready systems.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "OEM-Centric Approach",
      description:
        "We build and supply systems that are scalable, customizable, and designed with integration in mind.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Agility & Speed",
      description:
        "Rapid prototyping and supply chain to accelerate your innovation.",
    },
    {
      icon: <Network className="h-8 w-8 text-primary" />,
      title: "Strong Supply Network",
      description:
        "Access to top-tier components from Ouster, NVIDIA, INTEL and many more.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation-Driven",
      description:
        "Continuously advancing with cutting-edge hardware innovations for robotics, AI, and connected technologies",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Why Choose CORE BOLT?
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            End-to-end hardware excellence for robotics, mobility, and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-card/50 rounded-xl p-6 neon-border hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors duration-300">
                    {advantage.icon}
                  </div>

                  <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                    {advantage.title}
                  </h3>
                </div>

                <p className="text-black leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
