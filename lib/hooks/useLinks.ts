"use client";

import { useState } from 'react';
import type { Link } from '../mockData';

export function useLinks(initialLinks: Link[] = []) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const addLink = (newLink: Omit<Link, 'id' | 'clickCount' | 'createdAt'>) => {
    const link: Link = {
      ...newLink,
      id: Math.random().toString(36).substr(2, 9),
      clickCount: 0,
      createdAt: new Date().toISOString()
    };
    setLinks([...links, link]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: string, updates: Partial<Link>) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  return {
    links,
    addLink,
    removeLink,
    updateLink
  };
}