import { CHAIN_GENERATOR_SETTINGS } from '@/contracts/generator';
import React, { createContext, useReducer, useEffect } from 'react';

export interface IGeneratorStats {
  totalDistributed: number;
  timeToCalculateRate?: number;
  vidyaRate: number;
}

export interface IPoolState {
  token: string;
  lptoken: string;
  teller: string;
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

export interface IGeneratorState {
  currentPool: string;
  totalDistributed: number;
  timeToCalculateRate: number;
  vidyaRate: number;
  pools: {
    eth: IPoolState;
    single: IPoolState;
  };
}

export interface IGeneratorContext {
  state: IGeneratorState;
  setNew: (pool: string, update: IPoolState | any) => void;
  setAccountBalance: (pool: string, balance: number) => void;
  setClaimAmount: (pool: string, amount: number) => void;
  setDeposited: (pool: string, amount: number) => void;
  setAmountCommitted: (pool: string, amount: number) => void;
  setCommitmentIndex: (pool: string, index: number) => void;
  setApproval: (pool: string, approved: boolean) => void;
  setReady: (pool: string, ready: boolean) => void;
  setIsClaimingRewards: (pool: string, isClaimingRewards: boolean) => void;
  setStats: (stats: IGeneratorStats) => void;
  setCurrentPoolIndex: (index: number) => void;
}

const initialState = {
  currentPool: 'single',
  totalDistributed: 0,
  timeToCalculateRate: 0,
  vidyaRate: 0,
  pools: {
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
  SET_AMOUNT_COMMITED: 'SET_AMOUNT_COMMITED',
  SET_COMMITMENT_INDEX: 'SET_COMMITMENT_INDEX',
  SET_APPROVAL: 'SET_APPROVAL',
  SET_READY: 'SET_READY',
  SET_CURRENT_POOL_INDEX: 'SET_CURRENT_POOL_INDEX',
  SET_IS_CLAIMING_REWARDS: 'SET_IS_CLAIMING_REWARDS',
  SET_STATS: 'SET_STATS',
}

export const GeneratorContext = createContext<IGeneratorContext>({
  state: initialState,
  setNew: () => {},
  setAccountBalance: () => {},
  setClaimAmount: () => {},
  setDeposited: () => {},
  setAmountCommitted: () => {},
  setCommitmentIndex: () => {},
  setApproval: () => {},
  setReady: () => {},
  setIsClaimingRewards: () => {},
  setStats: () => {},
  setCurrentPoolIndex: () => {},
});

const updatePool = (state: IGeneratorState, pool: string, update: IPoolState | any) => {
  return {
    ...state,
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
    case ACTIONS.SET_NEW:{
      return {
        ...state,
        pools: {
          ...state.pools,
          [action.pool]: updatePool(state, action.pool, action.payload)
        }
      }
    }
    case ACTIONS.SET_ACCOUNT_BALANCE: {
      return {
        ...state,
        pools: updatePool(state, action.pool, {accountBalance: action.payload})
      }
    }
    case ACTIONS.SET_CLAIM_AMOUNT: {
      return {
        ...state,
        pools: updatePool(state, action.pool, {claimAmount: action.payload})
      }
    }
    case ACTIONS.SET_DEPOSITED: {
      const currentPool = state.pools[action.pool];
      const newDepositAvailable = action.payload - currentPool.amountCommitted;
      return {
        ...state,
        pools: updatePool(state, action.pool, {
          deposited: action.payload, 
          depositAvailable: newDepositAvailable,
          commitmentStatus: currentPool.amountCommitted > 0,
          canCommit: newDepositAvailable > 0 && !currentPool.commitmentStatus,
          canWidthdraw: newDepositAvailable > 0
        })
      }
    }
    case ACTIONS.SET_AMOUNT_COMMITED: {
      const currentPool = state.pools[action.pool];
      const newDepositAvailable = currentPool.deposited - action.payload;
      return {
        ...state,
        pools: updatePool(state, action.pool, {
          amountCommited: action.payload,
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
        pools: updatePool(state, action.pool, {
          commitmentIndex: action.payload
        })
      }
    }
    case ACTIONS.SET_APPROVAL: {
      return {
        ...state,
        pools: updatePool(state, action.pool, {
          approved: action.payload
        })
      }
    }
    case ACTIONS.SET_READY: {
      return {
        ...state,
        pools: updatePool(state, action.pool, {
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
        pools: updatePool(state, action.pool, {
          isClaimingRewards: action.payload
        })
      }
    }
    case ACTIONS.SET_STATS: {
      return {
        ...state,
        ...action.payload
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
    initialState.currentPool = localStorage.getItem('currentPool') ? JSON.parse(localStorage.getItem('currentPool')) : initialState.currentPool;
    return initialState;
  });  

  const actions = {
    setNew: (newPool: IPoolState, pool: string) => dispatch({ type: ACTIONS.SET_NEW, payload:newPool, pool }),
    reset: () => dispatch({ type: ACTIONS.RESET }),
    setClaimAmount: (claimAmount: number, pool: string) => dispatch({ type: ACTIONS.SET_CLAIM_AMOUNT, payload:claimAmount, pool }),
    setDeposited: (depositedAmount: number, pool: string) => dispatch({ type: ACTIONS.SET_DEPOSITED, payload:depositedAmount, pool }),
    setAmountCommited: (amountCommited: number, pool: string) => dispatch({ type: ACTIONS.SET_AMOUNT_COMMITED, payload:amountCommited, pool }),
    setCommitmentIndex: (commitmentIndex: number, pool: string) => dispatch({ type: ACTIONS.SET_COMMITMENT_INDEX, payload:commitmentIndex, pool}),
    setAccountBalance: (amount: number, pool: string) => dispatch({ type: ACTIONS.SET_ACCOUNT_BALANCE, payload:amount, pool }),
    setApproved: (approved: boolean, pool: string) => dispatch({ type: ACTIONS.SET_APPROVAL, payload:approved, pool }),
    setReady: (isReady: boolean, pool: string) => dispatch({ type: ACTIONS.SET_READY, payload:isReady, pool }),
    setCurrentPool: (pool: string) => dispatch({ type: ACTIONS.SET_CURRENT_POOL_INDEX, pool }),
    setIsClaimingRewards: (isClaimingRewards: boolean, pool: string) => dispatch({ type: ACTIONS.SET_IS_CLAIMING_REWARDS, payload:isClaimingRewards, pool }),
    setStats: (stats: IGeneratorStats) => dispatch({ type: ACTIONS.SET_STATS, payload:stats }),
  }

  useEffect(() => {
    localStorage.setItem('currentPool', JSON.stringify(state.currentPool));
  }, [state.currentPool])

  return (
    <GeneratorContext.Provider value={{...state, ...actions}}>
      {children}
    </GeneratorContext.Provider>
  )
}