import { motion } from "framer-motion";



const CurrentRaffle = ({ 
  raffleOpen,
  entryFee,
  participants,
  raffleCount,
  isConnected,
  loading,
  onEnterRaffle,
  onCloseRaffle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Current Raffle</h2>

      <div className="space-y-4">
        {[
          { label: "Status:", value: raffleOpen ? "Open" : "Closed", isStatus: true },
          { label: "Entry Fee:", value: `${entryFee} ETH` },
          { label: "Participants:", value: participants.length },
          { label: "Raffle #:", value: raffleCount + 1 },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <span className="text-gray-300">{item.label}</span>
            <span
              className={`font-semibold ${
                item.isStatus
                  ? raffleOpen
                    ? "bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                    : "bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                  : "text-white"
              }`}
            >
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      {raffleOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 space-y-4"
        >
          <motion.button
            onClick={onEnterRaffle}
            disabled={!isConnected || loading}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <motion.span
              animate={loading ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
              transition={{ duration: 1, repeat: loading ? Number.POSITIVE_INFINITY : 0 }}
            >
              {loading ? "Entering..." : `Enter Raffle (${entryFee} ETH)`}
            </motion.span>
          </motion.button>

          <motion.button
            onClick={onCloseRaffle}
            disabled={participants.length === 0 || loading}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <motion.span
              animate={loading ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
              transition={{ duration: 1, repeat: loading ? Number.POSITIVE_INFINITY : 0 }}
            >
              {loading ? "Closing..." : "Close Raffle & Select Winner"}
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )

}

export default CurrentRaffle