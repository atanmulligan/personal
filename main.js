import { supabase } from './supabase.js'

// Function to check database connection
async function checkConnection() {
    const statusElement = document.getElementById('db-status')
    
    try {
        // Try to connect to Supabase
        const { data, error } = await supabase.from('test').select('*').limit(1)
        
        if (error && error.code === 'PGRST116') {
            // This error means the table doesn't exist, but connection is working
            statusElement.textContent = 'Connected to Supabase! (No test table found)'
            statusElement.className = 'status connected'
        } else if (error) {
            throw error
        } else {
            statusElement.textContent = 'Connected to Supabase! Database is working.'
            statusElement.className = 'status connected'
        }
    } catch (error) {
        console.error('Database connection error:', error)
        statusElement.textContent = 'Not connected to Supabase. Please check your credentials.'
        statusElement.className = 'status disconnected'
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('yh\'s website loaded!')
    checkConnection()
}) 