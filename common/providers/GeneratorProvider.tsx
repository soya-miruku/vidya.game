import { CHAIN_GENERATOR_SETTINGS } from '@/contracts/generator';
import React, { createContext, useReducer, useEffect } from 'react';

export interface IPoolState {
  name: string;
  token: string;
  lptoken: string;
  teller: string;
  image: string;
  commitmentStatus: boolean;
  isClaimingRewards: boolean;
  accountBalance: number;
  claimAmount: number;
  depositAvailable: number;
  deposited: number;
  remainingUnlockTime: number;
  amountCommitted: number;
  commitmentIndex: number;
  apr: number;
  canWidthdraw: boolean;
  canCommit: boolean;
  approved: boolean;
  ready: boolean;
}

export interface IGeneratorStats {
  totalDistributed: number;
  rewardRate: number;
  totalPriority: number;
}

export interface IGeneratorState {
  currentPool: string
  singleCoinSymbol: string
  stats: IGeneratorStats
  pools: {
    [key: string]: IPoolState
  }
}

export interface IGeneratorContext {
  state: IGeneratorState;
  updatePool: (pool: string, update: IPoolState | any) => void;
  reset: () => void;
  setClaimAmount: (pool: string, claimAmount: number) => void;
  setDeposited: (pool: string, depositedAmount: number) => void;
  setAccountBalance: (pool: string, balance: number) => void;
  setAmountCommitted: (pool: string, amountCommitted: number) => void;
  setCommitmentIndex: (pool: string, commitmentIndex: number) => void;
  setApproval: (pool: string, approved: boolean) => void;
  setReady: (pool: string, ready: boolean) => void;
  setIsClaimingRewards: (pool: string, isClaimingRewards: boolean) => void;
  setCurrentPool: (pool: string) => void;
  setStats: (stats: IGeneratorStats) => void;
}

const initialState = {
  currentPool: 'single',
  singleCoinSymbol: 'VIDYA',
  stats: {
    totalDistributed: 0,
    rewardRate: 0,
    totalPriority: 0
  },
  pools: 
  {
    eth: {
      ...CHAIN_GENERATOR_SETTINGS[1].pool.eth,
      commitmentStatus: false,
      isClaimingRewards: false,
      accountBalance: 0,
      claimAmount: 0,
      depositAvailable: 0,
      deposited: 0,
      remainingUnlockTime: 0,
      amountCommitted: 0,
      commitmentIndex: 0,
      apr: 0,
      canWidthdraw: false,
      canCommit: false,
      approved: false,
      ready: false
    },
    single: {
      ...CHAIN_GENERATOR_SETTINGS[1].pool.single,
      commitmentStatus: false,
      isClaimingRewards: false,
      accountBalance: 0,
      claimAmount: 0,
      depositAvailable: 0,
      deposited: 0,
      remainingUnlockTime: 0,
      amountCommitted: 0,
      commitmentIndex: 0,
      apr: 0,
      canWidthdraw: false,
      canCommit: false,
      approved: false,
      ready: false
    }
  }
}

const ACTIONS = {
  SET_NEW: 'SET_NEW',
  RESET: 'RESET',
  SET_ACCOUNT_BALANCE: 'SET_ACCOUNT_BALANCE',
  SET_CLAIM_AMOUNT: 'SET_CLAIM_AMOUNT',
  SET_DEPOSITED: 'SET_DEPOSITED',
  SET_AMOUNT_Committed: 'SET_AMOUNT_Committed',
  SET_COMMITMENT_INDEX: 'SET_COMMITMENT_INDEX',
  SET_APPROVAL: 'SET_APPROVAL',
  SET_READY: 'SET_READY',
  SET_CURRENT_POOL_INDEX: 'SET_CURRENT_POOL_INDEX',
  SET_IS_CLAIMING_REWARDS: 'SET_IS_CLAIMING_REWARDS',
  SET_STATS: 'SET_STATS'
}

export const GeneratorContext = createContext<IGeneratorContext | null>(null);

const updatePool = (state: IGeneratorState, pool: string, update: IPoolState | any) => {
  return {
    pools: {
      ...state.pools,
      [pool]: {
        ...state.pools[pool],
        ...update,
      }
    }
  }
}

export type Action = {
  type: string;
  payload?: any;
  pool?: string;
}

const reducer = (state: IGeneratorState, action: Action) => {
  switch(action.type) {
    case ACTIONS.SET_STATS: {
      return {
        ...state,
        stats: action.payload
      }
    }
    case ACTIONS.SET_NEW:{
      return {
        ...state,
        ...updatePool(state, action.pool, action.payload)
      }
    }
    case ACTIONS.SET_ACCOUNT_BALANCE: {
      return {
        ...state,
        ...updatePool(state, action.pool, {accountBalance: action.payload})
      }
    }
    case ACTIONS.SET_CLAIM_AMOUNT: {
      return {
        ...state,
        ...updatePool(state, action.pool, {claimAmount: action.payload})
      }
    }
    case ACTIONS.SET_DEPOSITED: {
      const currentPool = state.pools[action.pool];
      const newDepositAvailable = action.payload - currentPool.amountCommitted;
      return {
        ...state,
        ...updatePool(state, action.pool, {
          deposited: action.payload, 
          depositAvailable: newDepositAvailable,
          commitmentStatus: currentPool.amountCommitted > 0,
          canCommit: newDepositAvailable > 0 && !currentPool.commitmentStatus,
          canWidthdraw: newDepositAvailable > 0
        })
      }
    }
    case ACTIONS.SET_AMOUNT_Committed: {
      const currentPool = state.pools[action.pool];
      const newDepositAvailable = currentPool.deposited - action.payload;
      return {
        ...state,
        ...updatePool(state, action.pool, {
          amountCommitted: action.payload,
          commitmentStatus: currentPool.amountCommitted > 0,
          depositAvailable: newDepositAvailable,
          canCommit: newDepositAvailable > 0 && !currentPool.commitmentStatus,
          canWidthdraw: newDepositAvailable > 0
        })
      }
    }
    case ACTIONS.SET_COMMITMENT_INDEX: {
      return {
        ...state,
        ...updatePool(state, action.pool, {
          commitmentIndex: action.payload
        })
      }
    }
    case ACTIONS.SET_APPROVAL: {
      return {
        ...state,
        ...updatePool(state, action.pool, {
          approved: action.payload
        })
      }
    }
    case ACTIONS.SET_READY: {
      return {
        ...state,
        ...updatePool(state, action.pool, {
          ready: action.payload
        })
      }
    }
    case ACTIONS.SET_CURRENT_POOL_INDEX: {
      return {
        ...state,
        currentPool: action.pool
      }
    }
    case ACTIONS.SET_IS_CLAIMING_REWARDS: {
      return {
        ...state,
        ...updatePool(state, action.pool, {
          isClaimingRewards: action.payload
        })
      }
    }
    case ACTIONS.RESET: {
      return initialState;
    }
    default:
      return state;
  }
}

export const GeneratorProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    if(typeof(window) !== 'undefined') {
      initialState.currentPool = localStorage.getItem('currentPool') ? JSON.parse(localStorage.getItem('currentPool')) : initialState.currentPool;
    }
    return initialState;
  });  

  const updatePool = (pool: string, update: IPoolState | any) : void => dispatch({ type: ACTIONS.SET_NEW, payload:update, pool });
  const reset = () : void => dispatch({ type: ACTIONS.RESET });
  const setClaimAmount = (pool: string, claimAmount: number) : void => dispatch({ type: ACTIONS.SET_CLAIM_AMOUNT, payload:claimAmount, pool });
  const setDeposited = (pool: string, depositedAmount: number) : void => dispatch({ type: ACTIONS.SET_DEPOSITED, payload:depositedAmount, pool });
  const setAmountCommitted = (pool: string, amountCommitted: number) : void => dispatch({ type: ACTIONS.SET_AMOUNT_Committed, payload:amountCommitted, pool });
  const setCommitmentIndex = (pool: string, commitmentIndex: number) : void => dispatch({ type: ACTIONS.SET_COMMITMENT_INDEX, payload:commitmentIndex, pool});
  const setAccountBalance = (pool: string, balance: number) : void => dispatch({ type: ACTIONS.SET_ACCOUNT_BALANCE, payload:balance, pool });
  const setApproval = (pool: string, approved: boolean) : void => dispatch({ type: ACTIONS.SET_APPROVAL, payload:approved, pool });
  const setReady = (pool: string, isReady: boolean) : void => dispatch({ type: ACTIONS.SET_READY, payload:isReady, pool });
  const setCurrentPool = (pool: string) : void => dispatch({ type: ACTIONS.SET_CURRENT_POOL_INDEX, pool });
  const setIsClaimingRewards = (pool: string, isClaimingRewards: boolean) : void => dispatch({ type: ACTIONS.SET_IS_CLAIMING_REWARDS, payload:isClaimingRewards, pool });
  const setStats = (stats: IGeneratorStats) : void => dispatch({ type: ACTIONS.SET_STATS, payload:stats });

  useEffect(() => {
    localStorage.setItem('currentPool', JSON.stringify(state.currentPool));
  }, [state.currentPool])
  
  return (
    <GeneratorContext.Provider value={{state, updatePool, reset, setClaimAmount, setStats, setDeposited, setAmountCommitted, setCommitmentIndex, setAccountBalance, setApproval, setReady, setCurrentPool, setIsClaimingRewards}}>
      {children}
    </GeneratorContext.Provider>
  )
}