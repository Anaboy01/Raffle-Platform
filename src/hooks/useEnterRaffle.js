import { useCallback } from "react"
import useContractInstance from "./useContractInstance"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import {toast} from "react-toastify"
import {ErrorDecoder} from "ethers-decode-error"
import { ethers } from "ethers";


const useEnterRaffle = () => {
     const contract = useContractInstance(true)
    const {address} = useAppKitAccount()
    const {chainId} = useAppKitNetwork()


    return useCallback(
        async (fee) => {
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

             const amountInWei = ethers.parseEther(fee);
             console.log("", amountInWei)

            try {
                const estimatedGas =  await contract.enterRaffle.estimateGas({
                    value: amountInWei,
                });

                const tx = await contract.enterRaffle({
                    value:amountInWei,
                    gasLimit:(estimatedGas * BigInt(120)) / BigInt(100),
                })

                 const receipt = await tx.wait();
                if (receipt.status === 1) {
                    toast.success("You have entered the raffle!");
                    return;
                }

                toast.error("Failed to enter Raffle");
            }catch(error){
                 const errorDecoder = ErrorDecoder.create();
                const {reason} = await errorDecoder.decode(error);
                toast.error(reason)
                console.error("error entering raffle", reason)
            }
        },[address, chainId, contract]
    )
}

export default useEnterRaffle