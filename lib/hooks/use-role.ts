"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';

export function useRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get role from localStorage
    const storedRole = localStorage.getItem('userRole') as 'admin' | 'user' | null;
    setRole(storedRole);
    setIsLoading(false);
  }, []);

  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  return {
    role,
    isAdmin,
    isUser,
    isLoading,
    // Add these helper functions
    requireAdmin: () => {
      if (!isAdmin) throw new Error('Admin access required');
    },
    requireUser: () => {
      if (!isUser) throw new Error('User access required');
    }
  };
} 