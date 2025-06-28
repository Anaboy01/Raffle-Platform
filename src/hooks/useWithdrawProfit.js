import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";

const useWithdrawProfit = () => {
  const contract = useContractInstance(true); // with signer
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(async () => {
  
    if (!address) {
      toast.error("Connect your wallet!");
      return;
    }

  
    if (!contract) {
      toast.error("Contract not connected. Please wait or reconnect wallet.");
      return;
    }

   
    if (Number(chainId) !== 44787) {
      toast.error("You are not connected to CrossFi");
      return;
    }

    try {
     
      const contractOwner = await contract.owner();
      if (contractOwner.toLowerCase() !== address.toLowerCase()) {
        toast.error("Only the contract owner can withdraw profits.");
        return;
      }

      const estimatedGas = await contract.withdrawContractProfit.estimateGas({
        from: address,
      });

    
      const tx = await contract.withdrawContractProfit({
        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
      });

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("You have successfully withdrawn the profit!");
        return;
      }

      toast.error("Transaction failed. Please try again.");
    } catch (error) {
      const errorDecoder = ErrorDecoder.create();
      const { reason } = await errorDecoder.decode(error);
      toast.error(reason || "Transaction reverted");
      console.error("Withdraw profit error:", reason);
    }
  }, [address, chainId, contract]);
};

export default useWithdrawProfit;
