

const ProfitWithdraw = ({ profit, loading, onWithdrawRefund }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Profits</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Available Profit:</span>
          <span className="text-white font-semibold">{profit} Celo</span>
        </div>

        {Number.parseFloat(profit) > 0 && (
          <button
            onClick={onWithdrawRefund}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "Withdrawing..." : `Withdraw ${profit} Celo`}
          </button>
        )}

        {Number.parseFloat(profit) === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No refunds available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfitWithdraw