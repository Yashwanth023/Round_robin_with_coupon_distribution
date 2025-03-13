# Round-Robin Coupon Distribution System

A fair coupon distribution system with built-in abuse prevention mechanisms.

## Project Overview

This application demonstrates a round-robin coupon distribution system with mechanisms to prevent abuse. Users can claim coupons without requiring login, while the system prevents multiple claims within a restricted time frame.

### Key Features

- **Round-Robin Distribution**: Ensures fair distribution of coupons in a circular queue
- **Abuse Prevention**:
  - IP address tracking
  - Browser fingerprinting
  - Time-based restrictions (one claim per hour)
- **Guest Access**: No login required to claim coupons
- **User-Friendly Interface**: Clear feedback and intuitive design

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Running the Project

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Implementation Details

### Coupon Distribution

The application maintains a list of available coupons and distributes them in a round-robin fashion:
- A circular queue system tracks the current coupon position
- When a user requests a coupon, they receive the next available coupon in the queue
- The pointer moves to the next position after each request
- This ensures that each coupon gets an equal opportunity to be claimed

### Abuse Prevention

To prevent multiple claims by the same user:
- **IP Tracking**: Records each user's IP address and restricts subsequent claims
- **Time Restrictions**: Implements a cooldown period (1 hour) between claims from the same user
- **Browser Fingerprinting**: Uses device characteristics to identify users across sessions

### Demo Reset

For demonstration purposes, the application includes reset functionality to:
- Reset all claimed coupons back to unclaimed status
- Clear the tracking history
- Allow testing the full functionality

## Production Considerations

For a production environment, consider:
- Server-side implementation of abuse prevention logic
- Database integration for coupon and user tracking data
- Additional rate limiting mechanisms
- Ensuring HTTPS for secure connections
