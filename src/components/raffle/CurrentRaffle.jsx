import { Link } from "react-router-dom";


const CurrentRaffle = () => {
   return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Raffle</h2>
              <p className="text-gray-300 mb-6">
                Join our latest raffle featuring an exclusive NFT collection. Entry fee is just 0.01 ETH, and
                non-winners get their money back!
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Entry Fee:</span>
                  <span className="text-white font-semibold">0.01 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Participants:</span>
                  <span className="text-white font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400 font-semibold">Open</span>
                </div>
              </div>

              <Link to='raffle'>
                <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105">
                  Enter Raffle Now
                </button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cosmic Art Collection #3</h3>
              <p className="text-gray-300">Exclusive digital artwork by renowned artist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentRaffle