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

const RaffleContext = createContext({
  entryFee: "",
  participants: [],
  rafleCount: "",
  raffleOpen: "",
  refunds: "",
  raffleResult: "",
});

export const RaffleContextProvider = ({ children }) => {
  const [raffleResult, setRaffleResult] = useState("");
  const [raffleOpen, setRafleOpen] = useState("");
  const [entryFee, setEntryFee] = useState();
  const [rafleCount, setRafleCount] = useState("");
  const [refunds, setRefunds] = useState("");
  const [participants, setParticipants] = useState([]);

  return (
    <RaffleContext.Provider
      value={
        {entryFee, participants, rafleCount, raffleOpen, refunds, raffleResult}
      }
    >
      {children}
    </RaffleContext.Provider>
  );
};
