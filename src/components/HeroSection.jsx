import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"



const HeroSection = () => {
 const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform values based on scroll position
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const statYTransforms = [0, 1].map((progress) =>
    useTransform(scrollYProgress, [0, 1], [progress % 2 === 0 ? 20 : -20, progress % 2 === 0 ? -20 : 20]),
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="relative py-20 px-4 overflow-hidden">
      {/* Floating background elements with scroll-based movement */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
      />

      <motion.div
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold text-white mb-6">
          Win Exclusive
          <motion.span
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%]"
          >
            {" "}
            NFTs
          </motion.span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join our fair and transparent raffle system. Enter with a small fee, and you could win amazing NFTs.
          Non-winners get their money back!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link href="/raffle">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Enter Current Raffle
            </motion.button>
          </Link>
          <Link href="/how-it-works">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200"
            >
              How It Works
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: "150+", label: "NFTs Raffled" },
            { number: "2,500+", label: "Happy Winners" },
            { number: "98%", label: "Refund Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              style={{
                y: statYTransforms[index],
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 200 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )


}

export default HeroSection