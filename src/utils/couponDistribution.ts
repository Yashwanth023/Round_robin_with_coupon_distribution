
import { Coupon, UserInfo } from '@/types';

// Sample coupon data
const SAMPLE_COUPONS: Coupon[] = [
  {
    id: "1",
    code: "SAVE10NOW",
    description: "10% off your purchase",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    claimed: false
  },
  {
    id: "2",
    code: "FREESHIP",
    description: "Free shipping on orders over $50",
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    claimed: false
  },
  {
    id: "3",
    code: "BOGO2023",
    description: "Buy one get one free",
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    claimed: false
  },
  {
    id: "4",
    code: "SUMMER25",
    description: "25% off summer collection",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    claimed: false
  },
  {
    id: "5",
    code: "WELCOME15",
    description: "15% off your first purchase",
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    claimed: false
  }
];

// Track the current coupon index
let currentCouponIndex = 0;

// In-memory storage for available coupons
let availableCoupons: Coupon[] = [...SAMPLE_COUPONS];

/**
 * Gets all available coupons
 */
export const getCoupons = (): Coupon[] => {
  return availableCoupons;
};

/**
 * Adds a new coupon to the available list
 */
export const addCoupon = (coupon: Omit<Coupon, 'id' | 'claimed'>): Coupon => {
  const newCoupon: Coupon = {
    ...coupon,
    id: (availableCoupons.length + 1).toString(),
    claimed: false
  };
  
  availableCoupons.push(newCoupon);
  return newCoupon;
};

/**
 * Retrieve the next available coupon in round-robin fashion
 */
export const getNextCoupon = (): Coupon | null => {
  if (availableCoupons.length === 0) {
    return null;
  }
  
  // Find the next unclaimed coupon using round-robin approach
  const startIndex = currentCouponIndex;
  let couponToReturn: Coupon | null = null;
  
  do {
    const coupon = availableCoupons[currentCouponIndex];
    
    // Move to the next coupon for the next request
    currentCouponIndex = (currentCouponIndex + 1) % availableCoupons.length;
    
    // If this coupon is available, return it
    if (!coupon.claimed && new Date(coupon.expiresAt) > new Date()) {
      couponToReturn = coupon;
      break;
    }
    
    // If we've checked all coupons and come back to where we started, there are no available coupons
  } while (currentCouponIndex !== startIndex);
  
  return couponToReturn;
};

/**
 * Claims a coupon for a user
 */
export const claimCoupon = (couponId: string, userInfo: Omit<UserInfo, 'couponId'>): Coupon | null => {
  const couponIndex = availableCoupons.findIndex((c) => c.id === couponId);
  
  if (couponIndex === -1 || availableCoupons[couponIndex].claimed) {
    return null;
  }
  
  // Mark the coupon as claimed
  availableCoupons[couponIndex] = {
    ...availableCoupons[couponIndex],
    claimed: true,
    claimedBy: userInfo.ipAddress,
    claimedAt: new Date()
  };
  
  return availableCoupons[couponIndex];
};

/**
 * Reset all coupons (for demo purposes)
 */
export const resetCoupons = (): void => {
  availableCoupons = [...SAMPLE_COUPONS].map(coupon => ({
    ...coupon,
    claimed: false,
    claimedBy: undefined,
    claimedAt: undefined
  }));
  currentCouponIndex = 0;
};
