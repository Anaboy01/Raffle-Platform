import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const features = [
    {
      icon: "🎯",
      title: "Fair & Transparent",
      description:
        "Our smart contract ensures complete transparency. Every raffle is provably fair with on-chain verification.",
    },
    {
      icon: "💰",
      title: "Free Refunds",
      description:
        "Didn't win? No problem! Non-winners automatically get their entry fee refunded to their wallet.",
    },
    {
      icon: "🔒",
      title: "Secure & Trustless",
      description:
        "Built on blockchain technology. No central authority can manipulate results or steal funds.",
    },
    {
      icon: "⚡",
      title: "Instant Results",
      description:
        "Winners are selected instantly using cryptographically secure randomness. No waiting periods.",
    },
    {
      icon: "🎨",
      title: "Exclusive NFTs",
      description:
        "Win unique, high-quality NFTs from top artists and creators. Each raffle features premium collectibles.",
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description:
        "Simple interface that works on any device. Connect your wallet and enter raffles with just a few clicks.",
    },
  ];

  // Transform values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const featureYTransforms = features.map((_, index) =>
    useTransform(
      scrollYProgress,
      [0, 1],
      [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]
    )
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose RaffleNFT?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the most fair, transparent, and user-friendly NFT raffle
            platform in the Web3 space.
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                y: featureYTransforms[index],
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 group"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
