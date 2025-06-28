import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ethers } from "ethers";
import useSignerOrProvider from "../hooks/useSignerOrProvider";
import ABI from "../ABI/raffleSystem.json";
import { useAppKitAccount } from "@reown/appkit/react";
import useContractInstance from "../hooks/useContractInstance";

const RaffleContext = createContext({
  entryFee: "",
  participants: [],
  raffleInfo: {},
  raffleOpen: false,
  refunds: "",
  raffleResults: [],
  contractFunds: [],
  owner:"",
  isAlreadyParticipating: false,
});

export const RaffleContextProvider = ({ children }) => {
  const [raffleResults, setRaffleResults] = useState("");
  const [raffleOpen, setRaffleOpen] = useState(false);
  const [entryFee, setEntryFee] = useState(0.01);
  const [raffleInfo, setRaffleInfo] = useState("");
  const [refunds, setRefunds] = useState("");
  const [participants, setParticipants] = useState([]);
  const [contractFunds, setContractFunds] = useState();
  const [owner, setOwner] = useState("");
  const [isAlreadyParticipating, setIsAlreadyParticipating] = useState(false);

  const readOnlyRaffleContract = useContractInstance();
  const { signer, provider } = useSignerOrProvider();
  const { address } = useAppKitAccount();

  // useEffect(() => {
  //   console.log({"Contract":readOnlyRaffleContract,"signer":signer, "provider":provider, "addres":address})
  // })

  const getParticipants = useCallback(async () => {
    if (!readOnlyRaffleContract) return;
    try {
      const currentParticipants =
        await readOnlyRaffleContract.getCurrentParticipants();
      const participantsArray = Array.from(currentParticipants);
      setParticipants(participantsArray);
    } catch (error) {
      console.log("Error getting participants", error);
    }
  }, [readOnlyRaffleContract]);

  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

  const currentRaffleInfo = useCallback(async () => {
    if (!readOnlyRaffleContract) return;
    try {
      const currentRaffleInfo =
        await readOnlyRaffleContract.getCurrentRaffleInfo();
      const [id, status, participantCount] = [
        currentRaffleInfo[0],
        currentRaffleInfo[1],
        currentRaffleInfo[2],
      ];

      const raffleData = {
        id: Number(id),
        status: status,
        participantCount: Number(participantCount),
      };
      setRaffleOpen(raffleData.status);
      setRaffleInfo(raffleData);
    } catch (error) {
      console.log("Error fetching raffle info", error);
    }
  }, [readOnlyRaffleContract]);

  useEffect(() => {
    currentRaffleInfo();
  }, [currentRaffleInfo]);

  const getEntryFee = useCallback(async () => {
    if (!readOnlyRaffleContract) return;
    try {
      const theEntryFee = await readOnlyRaffleContract.entryFee();

      const entryFeeInEth = ethers.formatEther(theEntryFee);

      setEntryFee(entryFeeInEth);
    } catch (error) {
      console.log("Error fetching entry fee", error);
    }
  }, [readOnlyRaffleContract]);

  useEffect(() => {
    getEntryFee();
  }, [getEntryFee]);

  const getRefund = useCallback(async () => {
    if (!readOnlyRaffleContract || !address) return;
    try {
      const theRefunds = await readOnlyRaffleContract.getRefundAmount(address);

      const refundInEth = ethers.formatEther(theRefunds);
      setRefunds(refundInEth);
    } catch (error) {
      console.log("Error fetching refund of this address", error);
    }
  }, [readOnlyRaffleContract, address]);

  useEffect(() => {
    getRefund();
  }, [getRefund]);

  const getRaflleResults = useCallback(async () => {
    if (!readOnlyRaffleContract) return;
    try {
       const [winners, tokenIds, tokenURIs]  = await readOnlyRaffleContract.getAllRaffleResults();
      const parsedResults = winners.map((winner, i) => ({
      winner,
      tokenId: Number(tokenIds[i]),
      tokenURI: tokenURIs[i]
    }));

    setRaffleResults(parsedResults);

      
    } catch (error) {
      console.log("Error fetching previous raffle", error);
    }
  }, [readOnlyRaffleContract]);

  useEffect(() => {
    getRaflleResults();
  }, [getRaflleResults]);


  const getContractFinancials = useCallback(async () => {
     if (!readOnlyRaffleContract) return;

     try {
        const contractFinancials = await readOnlyRaffleContract.getContractFinancials()
        
        const [bal, totalRef, profit] = [
        contractFinancials[0],
        contractFinancials[1],
        contractFinancials[2],
      ];

       const financials = {
        balance:ethers.formatEther(bal) ,
        totalRefund: ethers.formatEther(totalRef),
        withdrawableProfit: ethers.formatEther(profit),
      };

      setContractFunds(financials);

     

     } catch (error) {
       console.log("Error fetching contract financials", error);
     }
  },[readOnlyRaffleContract])

  useEffect(() => {
    getContractFinancials();
  },[getContractFinancials])





 const getOwner = useCallback(async () => {
    if (!readOnlyRaffleContract) return;

    try {
      const contractOwner = await readOnlyRaffleContract.owner()
      const ownerLowerCase = contractOwner.toLowerCase()

      setOwner(ownerLowerCase)
      
    } catch (error) {
       console.log("Error fetching owner", error);
    }
 },[readOnlyRaffleContract])

 useEffect(() => {
  getOwner()
 },[getOwner])


 useEffect(() => {
  const found = participants.some(addr => addr.toLowerCase() === address.toLowerCase());
    if(found){
      setIsAlreadyParticipating(true)
    }else{
      setIsAlreadyParticipating(false)
    }

 }, [address, participants])


  useEffect(() => {
    if  (!readOnlyRaffleContract || !address) return;

    const entryListener = (part) => {
      if (part.toLowerCase() === address.toLowerCase()) {
        getParticipants()
        currentRaffleInfo()
        getRefund()
        getRaflleResults()
      }
    }

    const winneerListener = (winner) => {
      getRefund();
      getRaflleResults();
      currentRaffleInfo();
      getParticipants();
    }

    const refundListener = (part, amount) => {
      getRefund()
    }

    const balanceWithdrawalListener = (admin, amount) => {
        if(admin.toLowerCase() === address.toLowerCase()) {
          getContractFinancials()
        }
    }



    readOnlyRaffleContract.on("RaffleEntered", entryListener)
    readOnlyRaffleContract.on("WinnerSelected", winneerListener)
    readOnlyRaffleContract.on("RefundIssued", refundListener)
    readOnlyRaffleContract.on("BalanceWithdrawn", balanceWithdrawalListener)






  },[
    readOnlyRaffleContract,
    getContractFinancials,
    address,
    currentRaffleInfo,
    getParticipants,
    getRaflleResults,
    getRefund

  ])

  return (
    <RaffleContext.Provider
      value={{
        entryFee,
        participants,
        raffleInfo,
        raffleOpen,
        refunds,
        raffleResults,
        contractFunds,
        owner,
        isAlreadyParticipating
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffle = () => {
  return useContext(RaffleContext)
}
