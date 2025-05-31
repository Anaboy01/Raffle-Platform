import React from 'react'

const HowItWorks = () => {
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

  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Participating in our NFT raffles is simple and straightforward. Follow these easy steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

}

export default HowItWorks