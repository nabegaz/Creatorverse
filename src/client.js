import { createClient } from '@supabase/supabase-js';

const URL = process.env.REACT_APP_SUPABASE_URL;
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate environment variables
if (!URL || !API_KEY) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(URL, API_KEY);
