

const RaffleHistory = ({raffleResults}) => {
 const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Raffle History</h2>

      {raffleResults.length > 0 ? (
        <div className="space-y-4">
          {raffleResults.map((result, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-gray-400 text-sm">Raffle #{result.raffleId}</p>
                  <p className="text-white font-semibold">Token #{result.tokenId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Winner</p>
                  <p className="text-white font-mono">{formatAddress(result.winner)}</p>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    View NFT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">No completed raffles yet</p>
        </div>
      )}
    </div>
  )

}

export default RaffleHistory