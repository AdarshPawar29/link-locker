"use client";

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { env, validateEnv } from '../config/env';

// Validate environment variables
validateEnv();

const supabaseUrl = env.supabase.url!;
const supabaseAnonKey = env.supabase.anonKey!;

// Initialize Supabase client with error handling
function initSupabaseClient() {
  try {
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    throw new Error('Failed to initialize Supabase client. Please check your configuration.');
  }
}

export const supabase = initSupabaseClient();

export type { Database };