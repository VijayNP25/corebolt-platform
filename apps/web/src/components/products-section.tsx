import { motion } from "framer-motion";
import { Link } from "@/lib/wouter-compat";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            What We Build and Supply
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge hardware solutions for robotics, autonomous systems,
            and advanced engineering applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-card rounded-xl p-6 neon-border hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-foreground transition-colors duration-300">
                  {category.name}
                </h3>
                {/* <p className="text-muted-foreground">{category.description}</p> */}
                <div className="flex flex-wrap gap-2">
                  {(category.subcategories?.length
                    ? category.subcategories.slice(0, 3).map((sub) => ({
                        id: sub.id,
                        name: sub.name,
                      }))
                    : (category.products ?? [])
                        .slice(0, 3)
                        .map((p) => ({ id: p.id, name: p.name }))
                  ).map((item) => (
                    <Badge key={item.id} variant="secondary" className="text-xs">
                      {item.name}
                    </Badge>
                  ))}
                </div>
                <Link href={`/${category.id}`}>
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Explore {category.name}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
