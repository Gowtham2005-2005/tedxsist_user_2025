import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  inView: boolean;
}

const AnimatedCounter = ({ value, duration = 2, inView }: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      count.set(0); // Reset counter when coming into view
      const controls = animate(count, value, {
        duration,
        ease: "easeOut" as const,
      });
      return () => controls.stop();
    }
  }, [value, inView, count, duration]);

  return <motion.span>{rounded}</motion.span>;
};

interface Stat {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

interface StatsCardProps {
  stats: Stat[];
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { margin: "-50px" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {stats.map((stat, index) => {
        return (
          <motion.div
            ref={cardRef}
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }} // No 'once: true' to allow retriggering
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number] }}
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-50px" }}
                  >
                    <CardTitle className="text-center text-5xl font-bold text-primary">
                      <AnimatedCounter value={stat.value} inView={cardInView} />
                      {stat.suffix}
                    </CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-400 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

const StatisticsSection = () => {
  const stats: Stat[] = [
    {
      label: "Client Success Rate",
      value: 3,
      suffix: "+",
      description: "Years of thought-provoking events",
    },
    {
      label: "Annual Registrations",
      value: 1200,
      suffix: "+",
      description: "Annual Registrations",
    },
    {
      label: "Inspiring Speakers per edition",
      value: 6,
      suffix: "",
      description: "Inspiring Speakers per edition",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          className="text-4xl md:text-4xl font-bold mb-4"
        >
          Our Impact in <span className="text-primary">Numbers</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto"
        >
          Inspiring Minds, Building Community

        </motion.p>
      </div>
      <StatsCard stats={stats} />
    </section>
  );
};

export default StatisticsSection;
