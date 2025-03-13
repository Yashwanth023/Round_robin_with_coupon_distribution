
import React from 'react';
import { Link } from 'react-router-dom';
import CouponSystem from '@/components/CouponSystem';
import { FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <header className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
            Coupon Distribution System
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Round-Robin Coupon Distribution</h1>
          <p className="text-xl text-gray-600 mb-6">
            A fair distribution system with abuse prevention mechanisms
          </p>
          <Link 
            to="/documentation" 
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <FileText className="w-4 h-4 mr-1" />
            View Documentation
          </Link>
        </header>
        
        <main>
          <CouponSystem />
        </main>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Round-Robin Coupon Distribution with Abuse Prevention</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
