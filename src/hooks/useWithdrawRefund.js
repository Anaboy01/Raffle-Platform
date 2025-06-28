import { useCallback } from "react"
import useContractInstance from "./useContractInstance"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import {toast} from "react-toastify"
import {ErrorDecoder} from "ethers-decode-error"




const useWithdrawRefund = () => {
      const contract = useContractInstance(true)
    const {address} = useAppKitAccount()
    const {chainId} = useAppKitNetwork()


    return useCallback(
        async () => {
             if(!address){
                toast.error("Connect your wallet!")
                return;
            }

              if(!contract){
                toast.error("Contract not found")
            }

           

             if(Number(chainId) !== 44787){
                toast.error("You are not connected to crossFi")
                return;
            }

             

            try {
                const estimatedGas =  await contract.withdrawRefund.estimateGas();

                const tx = await contract.withdrawRefund({
                    gasLimit:(estimatedGas * BigInt(120)) / BigInt(100),
                })

                 const receipt = await tx.wait();
                if (receipt.status === 1) {
                    toast.success("You have withdraw successfully!");
                    return;
                }

                toast.error("Failed to withdraw");
            }catch(error){
                 const errorDecoder = ErrorDecoder.create();
                const {reason} = await errorDecoder.decode(error);
                toast.error(reason)
                console.error("error withdrawing refund", reason)
            }
        },[address, chainId, contract]
    )
  
}

export default useWithdrawRefund