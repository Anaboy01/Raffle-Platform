import { useEffect, useState } from "react";


import CurrentRaffle from "../components/raffle/CurrentRaffle";
import WalletStatus from "../components/raffle/WalletStatus";
import ParticipantsLists from "../components/raffle/ParticipantsLists";
import RaffleHistory from "../components/raffle/RaffleHistory";
import RefundSection from "../components/raffle/RefundSection";
import { motion } from "framer-motion";
import { useRaffle } from "../context/RaffleContext";
import { useAppKitAccount } from "@reown/appkit/react";
import ProfitWithdraw from "../components/raffle/ProfitWithdraw";
import useEnterRaffle from "../hooks/useEnterRaffle";
import useWithdrawRefund from "../hooks/useWithdrawRefund";
import useWithdrawProfit from "../hooks/useWithdrawProfit";








const Raffle = () => {
  // Mock state - you'll replace these with actual contract calls
 
 
  const {address, isConnected} = useAppKitAccount();
 const [raffleCount, setRaffleCount] = useState()
  const [userRefund, setUserRefund] = useState("0")
 


  const [userAddress, setUserAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const enterRaffle = useEnterRaffle()
  const withdrawRefund = useWithdrawRefund()
  const withdrawProfit = useWithdrawProfit()

  const {participants,isAlreadyParticipating, entryFee, raffleOpen, raffleInfo, owner, refunds, raffleResults, contractFunds} = useRaffle()

   const isOwner = userAddress.toLowerCase() === owner

  useEffect(() => {
    setRaffleCount(raffleInfo.id)
    setUserRefund(refunds)
    setUserAddress(address)
   
  },[raffleInfo, refunds, address, participants])







 

  const handleEnterRaffle = async () => {
    setLoading(true)
    try {
     await enterRaffle(entryFee)
    } catch (error) {
      console.error("Raffle entery error", error)
    }finally{
      setLoading(false)
    }

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
    try {
     await withdrawRefund()
    } catch (error) {
      console.error("Refund withdrawal error", error)
    }finally{
      setLoading(false)
    }
    
  }

  const handleProfitWithdrawal = async () => {
     setLoading(true)
    try {
     await withdrawProfit()
    } catch (error) {
      console.error("Profit withdrawal error", error)
    }finally{
      setLoading(false)
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
            <WalletStatus isConnected={isConnected} userAddress={userAddress} />
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
                userAddress={address}
                contractOwner={owner}
                onEnterRaffle={handleEnterRaffle}
                onCloseRaffle={handleCloseRaffle}
                participating={isAlreadyParticipating}
              />
            </motion.div>

            {/* Refunds */}
           {isOwner ? (<motion.div variants={itemVariants}>
              <ProfitWithdraw
               
                profit={contractFunds.withdrawableProfit}
                loading={loading}
                onWithdrawRefund={handleProfitWithdrawal}
              />
            </motion.div>):( 
            <motion.div variants={itemVariants}>
              <RefundSection
                userRefund={userRefund}
                isConnected={isConnected}
                loading={loading}
                onWithdrawRefund={handleWithdrawRefund}
                userAddress={address}
                contractOwner={owner}
              />
            </motion.div>)}
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
              { value: entryFee, label: "Entry Fee (Celo)" },
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