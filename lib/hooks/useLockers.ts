"use client";

import { useState, useEffect } from 'react';
import { mockLockers } from '../mockData';
import type { Locker } from '../mockData';

export function useLockers() {
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setLockers(mockLockers);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const addLocker = (newLocker: Omit<Locker, 'id'>) => {
    const locker: Locker = {
      ...newLocker,
      id: Math.random().toString(36).substr(2, 9),
      links: []
    };
    setLockers([...lockers, locker]);
  };

  const removeLocker = (id: string) => {
    setLockers(lockers.filter(locker => locker.id !== id));
  };

  return {
    lockers,
    isLoading,
    addLocker,
    removeLocker
  };
}