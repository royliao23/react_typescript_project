// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://ttrgbkagfkunaxrfkhsq.supabase.co'; // Replace with your Supabase URL
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cmdia2FnZmt1bmF4cmZraHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MTIwNzIsImV4cCI6MjA1MjM4ODA3Mn0.T_dIOdfB_exhKXaYUb58g32Of27w8W5rfwqr_-7bAmc'; // Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);


