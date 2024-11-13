import cron from 'node-cron';
import axios from 'axios';

// Use a flag to check if the cron job has already been executed
let cronRunning = false;

// Schedule the task to run every minute
cron.schedule('* * * * *', async () => {
    if (cronRunning) return; // Prevent running the cron job twice
    cronRunning = true;

    console.log('Running cron job to check auction statuses...');

    try {
        // Make a POST request to the API endpoint to end auctions
        const response = await axios.post(`http://localhost:3000/api/end-auctions`);
        console.log('Auction status update response:', response.data);
    } catch (error) {
        console.error('Error triggering auction end task:', error);
    } finally {
        cronRunning = false; // Reset the flag after task completion
    }
});
