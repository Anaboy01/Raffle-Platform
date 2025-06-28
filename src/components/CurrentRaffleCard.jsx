import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useRaffle } from "../context/RaffleContext";
import { button } from "framer-motion/client";





const CurrentRaffleCard = () => {

  const {raffleInfo, entryFee} = useRaffle()

  
   const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform values for scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10])
  const xTransform = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const itemXTransform = useTransform(scrollYProgress, [0, 1], (value, index) => (index % 2 === 0 ? -20 : 20))
  const itemXTransform2 = useTransform(scrollYProgress, [0, 1], (value, index) => (index % 2 === 0 ? 20 : -20))
  const floatingParticleYTransform1 = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const floatingParticleXTransform1 = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const floatingParticleYTransform2 = useTransform(scrollYProgress, [0, 1], [10, -10])
  const floatingParticleXTransform2 = useTransform(scrollYProgress, [0, 1], [5, -5])
  const headingYTransform = useTransform(scrollYProgress, [0, 1], [0, -10])
  const paragraphYTransform = useTransform(scrollYProgress, [0, 1], [0, -5])

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          style={{ y, rotateY }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden"
        >
          {/* Animated background glow with scroll effects */}
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl"
          />
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 1.5]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.4]),
            }}
            animate={{
              rotate: [360, 0],
            }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-60 h-60 bg-pink-500/30 rounded-full blur-2xl"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <motion.div style={{ x: xTransform }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Raffle</h2>
              <p className="text-gray-300 mb-6">
                Join our latest raffle featuring an exclusive NFT collection. Entry fee is just 0.01 ETH, and
                non-winners get their money back!
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Entry Fee:", value: entryFee },
                  { label: "Current Participants:", value: raffleInfo.participantCount },
                  { label: "Status:", value: raffleInfo.status ? "open": "closed", isStatus: raffleInfo.status },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    style={{
                      x: index % 2 === 0 ? itemXTransform : itemXTransform2,
                    }}
                    className="flex justify-between"
                  >
                    <span className="text-gray-300">{item.label}</span>
                    <span className={`font-semibold ${item.isStatus ? "text-green-400" : "text-white"}`}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>

             {!raffleInfo.status ? (
               <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled
                  className="px-8 py-3 bg-gradient-to-r cursor-not-allowed from-red-500 to-rose-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-rose-600 transition-all duration-200"
                >
                 Raffle closed
                </motion.button>
             ):(
               <Link to="/raffle">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                >
                  Enter Raffle Now
                </motion.button>
              </Link>
             )}
            </motion.div>

            <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], [30, -30]) }} className="text-center">
              <motion.div
                style={{
                  rotateY: useTransform(scrollYProgress, [0, 1], [0, 360]),
                  rotateX: useTransform(scrollYProgress, [0, 1], [0, 15]),
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center relative overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl"
                >
                  🎨
                </motion.span>

                {/* Floating particles with scroll effects */}
                <motion.div
                  style={{
                    y: floatingParticleYTransform1,
                    x: floatingParticleXTransform1,
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-4 right-4 w-2 h-2 bg-white/50 rounded-full"
                />
                <motion.div
                  style={{
                    y: floatingParticleYTransform2,
                    x: floatingParticleXTransform2,
                  }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/40 rounded-full"
                />
              </motion.div>

              <motion.h3
                style={{
                  y: headingYTransform,
                }}
                className="text-xl font-semibold text-white mb-2"
              >
                Cosmic Art Collection #{raffleInfo.id}
              </motion.h3>

              <motion.p
                style={{
                  y: paragraphYTransform,
                }}
                className="text-gray-300"
              >
                Exclusive digital artwork by renowned artist
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )

}

export default CurrentRaffleCard