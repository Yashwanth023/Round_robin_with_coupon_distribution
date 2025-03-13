
export interface Coupon {
  id: string;
  code: string;
  description: string;
  expiresAt: Date;
  claimed: boolean;
  claimedBy?: string;
  claimedAt?: Date;
}

export interface UserInfo {
  ipAddress: string;
  fingerprint: string;
  claimTime: Date;
  couponId: string;
}

export interface FeedbackMessage {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

export type PreventionStatus = {
  allowed: boolean;
  reason?: string;
  timeRemaining?: number;
};
