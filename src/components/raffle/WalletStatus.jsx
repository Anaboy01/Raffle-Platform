

const WalletStatus = () => {


  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Wallet Status</h3>
        </div>
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          <appkit-button/>
        </button>
      </div>
    </div>
  )
}

export default WalletStatus