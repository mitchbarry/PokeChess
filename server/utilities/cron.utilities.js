import cron from "node-cron";

const cronUtilities = {
    // async runFetchAtMidnight() {
    //     cron.schedule('0 0 * * *', async () => {
    //         try {
    //             console.log('Fetching data from API...');
    //             const data = await fetchDataFromAPI();
    //             console.log('Data fetched successfully:', data);
        
    //             // Store the fetched data in your server (e.g., save it to a database)
    //             // Example: saveDataToServer(data);
    //         } catch (error) {
    //             console.error('Error fetching and storing data:', error.message);
    //         }
    //     }, {
    //         timezone: 'your-timezone' // Set the timezone (e.g., 'America/New_York')
    //     });
    // }
}

export default cronUtilities;