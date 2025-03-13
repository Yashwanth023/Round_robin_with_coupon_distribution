
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText, Shield, Code, Server, List, User } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center mb-8 text-primary hover:text-primary/80 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Application
        </Link>
        
        <div className="glass-card rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-gray-600 mb-8">Setup instructions and explanation of the implemented abuse prevention strategies.</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                Overview
              </h2>
              <p className="text-gray-600 mb-4">
                This application demonstrates a round-robin coupon distribution system with 
                mechanisms to prevent abuse. It allows guest users to claim coupons without 
                requiring login, while preventing multiple claims within a restricted time frame.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <List className="h-5 w-5 text-primary" />
                Coupon Distribution
              </h2>
              <p className="text-gray-600 mb-4">
                The application maintains a list of available coupons and distributes them in a 
                round-robin fashion, ensuring fair distribution among users.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium mb-2">Implementation Details:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• A circular queue system tracks the current coupon position</li>
                  <li>• When a user requests a coupon, they receive the next available coupon in the queue</li>
                  <li>• The pointer moves to the next position after each request</li>
                  <li>• This ensures that each coupon gets an equal opportunity to be claimed</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                Guest Access
              </h2>
              <p className="text-gray-600 mb-4">
                Users can access the system without requiring login or account creation, making 
                the coupon distribution process accessible to all visitors.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium mb-2">Implementation Details:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• No login or registration required</li>
                  <li>• Alternative tracking mechanisms implemented to prevent abuse</li>
                  <li>• Clear user feedback on coupon availability and claim status</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                Abuse Prevention
              </h2>
              <p className="text-gray-600 mb-4">
                To prevent users from claiming multiple coupons, the application implements 
                the following prevention mechanisms:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium mb-2">IP Tracking:</h3>
                  <p className="text-sm text-gray-600">
                    Records each user's IP address when they claim a coupon, restricting 
                    subsequent claims from the same IP for a specified time period (e.g., one hour). 
                    This prevents users from repeatedly claiming coupons.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium mb-2">Cookie Tracking:</h3>
                  <p className="text-sm text-gray-600">
                    Uses browser cookies and fingerprinting to identify users across sessions, 
                    adding another layer of abuse prevention even if IP addresses change.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium mb-2">Time-Based Restrictions:</h3>
                  <p className="text-sm text-gray-600">
                    Implements a cooldown period between claims from the same user, preventing 
                    rapid consecutive claims even if the system is refreshed or accessed from different browsers.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-primary" />
                Technical Implementation
              </h2>
              <p className="text-gray-600 mb-4">
                The application is built using the following technologies and approaches:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Frontend:</strong> React, TypeScript, Tailwind CSS</li>
                  <li>• <strong>State Management:</strong> React hooks and context</li>
                  <li>• <strong>Abuse Prevention:</strong> IP tracking, browser fingerprinting, time-based restrictions</li>
                  <li>• <strong>User Experience:</strong> Animated feedback, clear status indicators</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-primary" />
                Deployment Considerations
              </h2>
              <p className="text-gray-600 mb-4">
                For a production environment, consider the following:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Server-side Implementation:</strong> Move abuse prevention logic to the server</li>
                  <li>• <strong>Database Integration:</strong> Store coupon and user tracking data in a database</li>
                  <li>• <strong>Rate Limiting:</strong> Implement additional server-side rate limiting</li>
                  <li>• <strong>HTTPS:</strong> Ensure the application is served over HTTPS for security</li>
                  <li>• <strong>Proxy Consideration:</strong> Account for potential proxy usage in IP tracking</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Round-Robin Coupon Distribution with Abuse Prevention</p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
