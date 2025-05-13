
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yedpzredlfafvabxumba.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZHB6cmVkbGZhZnZhYnh1bWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDk5MDksImV4cCI6MjA2MjYyNTkwOX0.Fgm038M7QXGraGtudALvhTmpCLjCZkrgV7p9M0xoorY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
