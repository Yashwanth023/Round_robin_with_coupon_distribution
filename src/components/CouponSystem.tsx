
import React, { useState, useEffect } from 'react';
import { Coupon, FeedbackMessage, UserInfo } from '@/types';
import { getCoupons, getNextCoupon, claimCoupon, resetCoupons } from '@/utils/couponDistribution';
import { canClaimByIp, getMockIpAddress, getBrowserFingerprint, recordClaim, resetClaimHistory } from '@/utils/prevention';
import UserFeedback from './UserFeedback';
import { ClipboardCopy, Clock, RefreshCw, Gift } from 'lucide-react';

const CouponSystem: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [availableCoupon, setAvailableCoupon] = useState<Coupon | null>(null);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [ipAddress] = useState<string>(getMockIpAddress());
  const [fingerprint] = useState<string>(getBrowserFingerprint());
  
  // Load coupons on component mount
  useEffect(() => {
    setCoupons(getCoupons());
  }, []);
  
  // Function to handle requesting a coupon
  const handleRequestCoupon = () => {
    setLoading(true);
    
    // Simulate network delay for a more realistic experience
    setTimeout(() => {
      // Check IP-based restrictions
      const ipCheck = canClaimByIp(ipAddress);
      
      if (!ipCheck.allowed) {
        setMessage({
          type: 'error',
          message: `You've already claimed a coupon. Please try again later (${ipCheck.timeRemaining} minutes remaining).`,
          duration: 7000
        });
        setLoading(false);
        return;
      }
      
      // Get next available coupon
      const nextCoupon = getNextCoupon();
      
      if (!nextCoupon) {
        setMessage({
          type: 'error',
          message: 'Sorry, all coupons have been claimed. Please check back later.',
          duration: 7000
        });
        setLoading(false);
        return;
      }
      
      setAvailableCoupon(nextCoupon);
      setMessage({
        type: 'success',
        message: 'Your coupon is ready to claim!',
        duration: 5000
      });
      setLoading(false);
    }, 1500);
  };
  
  // Function to handle claiming a coupon
  const handleClaimCoupon = (couponId: string) => {
    setLoading(true);
    
    // Simulate network delay for a more realistic experience
    setTimeout(() => {
      // Claim the coupon
      const userInfo: Omit<UserInfo, 'couponId'> = {
        ipAddress,
        fingerprint,
        claimTime: new Date()
      };
      
      const claimedCoupon = claimCoupon(couponId, userInfo);
      
      if (!claimedCoupon) {
        setMessage({
          type: 'error',
          message: 'Sorry, this coupon is no longer available.',
          duration: 5000
        });
        setAvailableCoupon(null);
        setLoading(false);
        return;
      }
      
      // Record the claim for abuse prevention
      recordClaim({
        ...userInfo,
        couponId
      });
      
      // Update the coupon lists
      setCoupons(getCoupons());
      setAvailableCoupon(null);
      
      setMessage({
        type: 'success',
        message: `Coupon ${claimedCoupon.code} has been claimed successfully!`,
        duration: 7000
      });
      setLoading(false);
    }, 1500);
  };
  
  // Function to copy coupon code to clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setMessage({
      type: 'info',
      message: 'Coupon code copied to clipboard!',
      duration: 3000
    });
  };
  
  // Function to reset the demo (for demo purposes only)
  const handleReset = () => {
    resetCoupons();
    resetClaimHistory();
    setCoupons(getCoupons());
    setAvailableCoupon(null);
    setMessage({
      type: 'info',
      message: 'Demo has been reset. All coupons are now available.',
      duration: 5000
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <UserFeedback message={message} />
      
      <div className="mb-10 flex flex-col items-center">
        <div className="w-full max-w-md">
          {availableCoupon ? (
            <div className="glass-card rounded-2xl p-6 animate-fade-in coupon-card relative overflow-hidden">
              <div className="coupon-shine"></div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">{availableCoupon.code}</h3>
                <button 
                  onClick={() => handleCopyCode(availableCoupon.code)}
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Copy code"
                >
                  <ClipboardCopy className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-5">{availableCoupon.description}</p>
              
              <div className="flex items-center text-xs text-gray-500 mb-6">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  Expires: {new Date(availableCoupon.expiresAt).toLocaleDateString()}
                </span>
              </div>
              
              <button
                onClick={() => handleClaimCoupon(availableCoupon.id)}
                disabled={loading}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    Claim This Coupon
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 text-center">
              <h3 className="text-xl font-medium mb-4">Get Your Coupon</h3>
              <p className="text-gray-600 mb-6">
                Click the button below to get your next available coupon. 
                Each user can claim one coupon per hour.
              </p>
              
              <button
                onClick={handleRequestCoupon}
                disabled={loading}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    Request Coupon
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Available Coupons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {coupons.map((coupon) => (
            <div 
              key={coupon.id}
              className={`border rounded-lg p-4 ${
                coupon.claimed 
                  ? 'bg-gray-50 border-gray-200 opacity-60' 
                  : 'bg-white border-primary/20 hover:border-primary/50'
              } transition-all`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-medium ${coupon.claimed ? 'text-gray-500' : 'text-primary'}`}>
                  {coupon.code}
                </h3>
                {!coupon.claimed && (
                  <button 
                    onClick={() => handleCopyCode(coupon.code)}
                    className="text-gray-500 hover:text-primary transition-colors"
                    aria-label="Copy code"
                  >
                    <ClipboardCopy className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{coupon.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className={`${coupon.claimed ? 'text-gray-500' : 'text-primary'} flex items-center`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(coupon.expiresAt).toLocaleDateString()}
                </span>
                
                <span className={`px-2 py-1 rounded-full ${
                  coupon.claimed 
                    ? 'bg-gray-100 text-gray-500' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {coupon.claimed ? 'Claimed' : 'Available'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mb-10">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Demo
        </button>
        <p className="text-xs text-gray-500 mt-2">
          For demonstration purposes only. This will reset all claimed coupons and tracking data.
        </p>
      </div>
      
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium mb-3">About This Demo</h2>
        <p className="text-sm text-gray-600 mb-4">
          This demonstration showcases a round-robin coupon distribution system with abuse prevention mechanisms.
        </p>
        
        <h3 className="text-sm font-medium mb-2">Demo Features</h3>
        <ul className="text-sm text-gray-600 space-y-1 mb-4">
          <li>• IP-based tracking (simulated)</li>
          <li>• Time-based restrictions</li>
          <li>• Round-robin distribution algorithm</li>
          <li>• Browser fingerprinting (simulated)</li>
        </ul>
        
        <p className="text-xs text-gray-500">
          <strong>Note:</strong> For this demo, the IP address and browser fingerprint are simulated using 
          local storage. In a production environment, these would be determined server-side.
        </p>
      </div>
    </div>
  );
};

export default CouponSystem;
