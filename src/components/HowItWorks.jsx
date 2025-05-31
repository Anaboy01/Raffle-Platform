
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"


const HowItWorks = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const scaleX = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])
  const opacityLine = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360])

  const steps = [
    {
      step: "1",
      title: "Connect Wallet",
      description: "Connect your Web3 wallet (MetaMask, WalletConnect, etc.) to get started.",
    },
    {
      step: "2",
      title: "Enter Raffle",
      description: "Pay the entry fee to join the current raffle. Your transaction is recorded on-chain.",
    },
    {
      step: "3",
      title: "Wait for Results",
      description: "When the raffle closes, a winner is selected using cryptographically secure randomness.",
    },
    {
      step: "4",
      title: "Claim Prize or Refund",
      description: "Winners receive their NFT automatically. Non-winners can claim their refund instantly.",
    },
  ]

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="py-20 px-4 bg-black/20 relative overflow-hidden">
      {/* Animated background elements with scroll-based movement */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]),
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]),
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-10 left-10 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Participating in our NFT raffles is simple and straightforward. Follow these easy steps to get started.
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                y: index % 2 === 0 ? 40 : -40,
              }}
              className="text-center relative"
            >
              {/* Connection line with scroll effect */}
              {index < steps.length - 1 && (
                <motion.div
                  style={{
                    scaleX,
                    opacity: opacityLine,
                  }}
                  className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
                />
              )}

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  rotateY,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 relative z-10"
              >
                {step.step}
              </motion.div>

              <motion.h3
                whileHover={{ color: "#c084fc" }}
                className="text-xl font-semibold text-white mb-3 transition-colors"
              >
                {step.title}
              </motion.h3>

              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )

}

export default HowItWorks