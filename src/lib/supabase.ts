import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iaotycscgjrmfaeoqbht.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhb3R5Y3NjZ2pybWZhZW9xYmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMDcyMzQsImV4cCI6MjA4NzY4MzIzNH0.QRFk2We_YOZHm69Rjla4f2jWmZAyiWUUDBWmlC9SpXg';

// If variables are missing, we still export the client but it will fail on calls
// This allows the build to pass while requiring the user to set up their .env
export const supabase = createClient(supabaseUrl, supabaseAnonKey);