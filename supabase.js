import { createClient } from '@supabase/supabase-js'

// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = 'https://olfnhbxaicjgmtytkykm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZm5oYnhhaWNqZ210eXRreWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTQ0NTgsImV4cCI6MjA2NjU3MDQ1OH0.y3U7Idsx3Hv8hH0H4tGkSLoXS61K-uc5jmbpeTu8XJw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 