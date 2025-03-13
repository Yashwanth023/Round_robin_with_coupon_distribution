import { UserInfo, PreventionStatus } from '@/types';

// In-memory storage of claims by IP address
const ipClaimMap: Record<string, UserInfo[]> = {};

// Time restriction in milliseconds (e.g., one hour)
const TIME_RESTRICTION = 60 * 60 * 1000; // 1 hour

/**
 * Checks if a user is allowed to claim a coupon based on IP address
 * @param ip - User's IP address
 */
export const canClaimByIp = (ip: string): PreventionStatus => {
  const claims = ipClaimMap[ip] || [];
  
  // If no previous claims, user is allowed to claim
  if (claims.length === 0) {
    return { allowed: true };
  }
  
  // Check the most recent claim time
  const latestClaim = claims.reduce((latest, claim) => 
    latest.claimTime > claim.claimTime ? latest : claim
  );
  
  const timeSinceLastClaim = Date.now() - latestClaim.claimTime.getTime();
  
  // If the time restriction has passed, allow the claim
  if (timeSinceLastClaim > TIME_RESTRICTION) {
    return { allowed: true };
  }
  
  // Otherwise, deny the claim with time remaining
  const timeRemaining = TIME_RESTRICTION - timeSinceLastClaim;
  return {
    allowed: false,
    reason: "Time restriction",
    timeRemaining: Math.ceil(timeRemaining / 1000 / 60) // in minutes
  };
};

/**
 * Records a claim by a user
 * @param userInfo - Information about the user and their claim
 */
export const recordClaim = (userInfo: UserInfo): void => {
  if (!ipClaimMap[userInfo.ipAddress]) {
    ipClaimMap[userInfo.ipAddress] = [];
  }
  
  ipClaimMap[userInfo.ipAddress].push({
    ...userInfo,
    claimTime: new Date()
  });
};

/**
 * Gets a mock IP address for demo purposes
 * In a real application, this would be determined server-side
 */
export const getMockIpAddress = (): string => {
  // For demonstration, we'll generate a "random" IP
  // In a real app, this would come from the server
  const storedIp = localStorage.getItem('mock-ip');
  
  if (storedIp) {
    return storedIp;
  }
  
  const newIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  localStorage.setItem('mock-ip', newIp);
  return newIp;
};

/**
 * Gets a browser fingerprint for tracking purposes
 * In a real application, this would use more sophisticated fingerprinting
 */
export const getBrowserFingerprint = (): string => {
  const storedFingerprint = localStorage.getItem('browser-fingerprint');
  
  if (storedFingerprint) {
    return storedFingerprint;
  }
  
  const fingerprint = `${navigator.userAgent}-${window.screen.width}x${window.screen.height}-${new Date().getTimezoneOffset()}`;
  const hash = Array.from(fingerprint)
    .reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    .toString(36);
  
  localStorage.setItem('browser-fingerprint', hash);
  return hash;
};

/**
 * Resets the claim history (for demo purposes)
 */
export const resetClaimHistory = (): void => {
  Object.keys(ipClaimMap).forEach(key => {
    delete ipClaimMap[key];
  });
};
