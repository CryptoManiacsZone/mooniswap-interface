import { createReducer } from '@reduxjs/toolkit';
import { loadBalance, loadPerformance, loadPurchaseHistory, loadReferralPurchaseHistory } from './actions'

interface Unlock {
  amount: string;
  lock_date: string;
  unlock_part: number,
  period: number,
  unlock_date: string;
}

interface Balance
{
  amount: string;
  available: string;
  locked: number;
  nearest_unlock: null | Unlock;
}


interface CabinetState {
  performance: ReferralPerformance;
  balance: Balance;
  purchaseHistory: PurchaseHistory[];
  referralHistory: ReferralPurchaseHistory[]
}

interface PerformanceLevel
{
  "total_count": number,
  "purchases_count": number,
  "amount": string;
}

interface Reward {
  "dai": string;
  "esw": string;
};

export interface ReferralPerformance {
  "reward": Reward;
  "total_amount": string;
  "total_count": number;
  "first_level": PerformanceLevel;
  "second_level": PerformanceLevel;
  "third_level": PerformanceLevel;
}

export interface PurchaseHistory {
  amount: string;
  date: string;
  transaction_hash: string;
}

export interface ReferralPurchaseHistory {
  amount: string;
  date: string;
  transaction_hash: string;
}

const initialState: CabinetState = {
  performance: {
    reward: {} as Reward
  } as ReferralPerformance,
  balance: {} as Balance,
  purchaseHistory: [] as PurchaseHistory[],
  referralHistory: [] as ReferralPurchaseHistory[]
}

export default createReducer(initialState, builder =>
  builder
    .addCase(loadPerformance.fulfilled, (state, action) => {
      state.performance = action.payload
    })
    .addCase(loadPurchaseHistory.fulfilled, (state, action) => {
      state.purchaseHistory = action.payload
    })
    .addCase(loadBalance.fulfilled, (state, action) => {
      state.balance = action.payload
    })
    .addCase(loadReferralPurchaseHistory.fulfilled, (state, action) => {
      state.referralHistory = action.payload
    })

)
