import { useEffect, useState } from "react";


import CurrentRaffle from "../components/raffle/CurrentRaffle";
import WalletStatus from "../components/raffle/WalletStatus";
import ParticipantsLists from "../components/raffle/ParticipantsLists";
import RaffleHistory from "../components/raffle/RaffleHistory";
import RefundSection from "../components/raffle/RefundSection";
import { motion } from "framer-motion";



const Raffle = () => {
  // Mock state - you'll replace these with actual contract calls
  const [raffleOpen, setRaffleOpen] = useState(true)
  const [entryFee, setEntryFee] = useState("0.01") // in ETH
  const [participants, setParticipants] = useState([])
  const [raffleCount, setRaffleCount] = useState(0)
  const [raffleResults, setRaffleResults] = useState([])
  const [userRefund, setUserRefund] = useState("0")
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // Simulate some existing raffle data
    setRaffleResults([ 
      {
        raffleId: 1,
        winner: "0x1234...5678",
        tokenId: 1,
        tokenURI: "https://example.com/token/1",
        participants: 15,
      },
      {
        raffleId: 2,
        winner: "0x8765...4321",
        tokenId: 2,
        tokenURI: "https://example.com/token/2",
        participants: 23,
      },
    ])
    setParticipants(["0x1111...1111", "0x2222...2222", "0x3333...3333", "0x4444...4444"])
    setRaffleCount(2)
  }, [])

  const handleEnterRaffle = async () => {
    setLoading(true)
    // Your web3 integration will go here
    console.log("Entering raffle with fee:", entryFee)

    // Simulate transaction
    setTimeout(() => {
      setParticipants((prev) => [...prev, userAddress])
      setLoading(false)
    }, 2000)
  }

  const handleCloseRaffle = async () => {
    setLoading(true)
    // Your web3 integration will go here
    console.log("Closing raffle and selecting winner")

    // Simulate transaction
    setTimeout(() => {
      setRaffleOpen(false)
      setLoading(false)
    }, 3000)
  }

  const handleWithdrawRefund = async () => {
    setLoading(true)
    // Your web3 integration will go here
    console.log("Withdrawing refund:", userRefund)

    // Simulate transaction
    setTimeout(() => {
      setUserRefund("0")
      setLoading(false)
    }, 2000)
  }

  const handleWalletConnect = () => {
    setIsConnected(!isConnected)
    if (!isConnected) {
      setUserAddress("0x1234567890123456789012345678901234567890")
    } else {
      setUserAddress("")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 180],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-20 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
          x: [-50, 50, -50],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute bottom-40 left-20 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl"
      />

      <div className="relative z-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto p-4 pt-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl font-bold text-white mb-4"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="inline-block"
              >
                🎲
              </motion.span>{" "}
              NFT Raffle System
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-gray-300"
            >
              Enter the raffle to win exclusive NFTs!
            </motion.p>
          </motion.div>

          {/* Wallet Status */}
          <motion.div variants={itemVariants}>
            <WalletStatus isConnected={isConnected} userAddress={userAddress} onConnect={handleWalletConnect} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Current Raffle */}
            <motion.div variants={itemVariants}>
              <CurrentRaffle
                raffleOpen={raffleOpen}
                entryFee={entryFee}
                participants={participants}
                raffleCount={raffleCount}
                isConnected={isConnected}
                loading={loading}
                onEnterRaffle={handleEnterRaffle}
                onCloseRaffle={handleCloseRaffle}
              />
            </motion.div>

            {/* Refunds */}
            <motion.div variants={itemVariants}>
              <RefundSection
                userRefund={userRefund}
                isConnected={isConnected}
                loading={loading}
                onWithdrawRefund={handleWithdrawRefund}
              />
            </motion.div>
          </div>

          {/* Current Participants */}
          <motion.div variants={itemVariants} className="mb-8">
            <ParticipantsLists participants={participants} />
          </motion.div>

          {/* Raffle History */}
          <motion.div variants={itemVariants} className="mb-8">
            <RaffleHistory raffleResults={raffleResults} />
          </motion.div>

          {/* Stats */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: raffleResults.length, label: "Completed Raffles" },
              { value: participants.length, label: "Current Participants" },
              { value: entryFee, label: "Entry Fee (ETH)" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
              >
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-3xl font-bold text-white"
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  )

}

export default Raffle