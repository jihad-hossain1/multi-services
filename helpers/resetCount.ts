import prisma from "@/lib/prismalib";
import cron from 'node-cron';


const RESET_INTERVAL_HOURS = 24;
const RESET_INTERVAL_MINUTES = 1;

async function resetCountsIfNeeded() {
  const now = new Date();
  const cutoffDate = new Date();

  // Set the cutoff date to 1 minit ago
  cutoffDate.setMinutes(cutoffDate.getMinutes() - RESET_INTERVAL_MINUTES);

  // Set the cutoff date to 24 hours ago
//   cutoffDate.setHours(cutoffDate.getHours() - RESET_INTERVAL_HOURS);

  // Find records where the last reset was more than 24 hours ago
  const recordsToUpdate = await prisma.macAddTrack.findMany({
    where: {
      lastreset: {
        lt: cutoffDate,
      },
    },
  });

  if (recordsToUpdate.length > 0) {
    await prisma.macAddTrack.updateMany({
      where: {
        id: {
          in: recordsToUpdate.map(record => record.id),
        },
      },
      data: {
        count: 0,
        lastreset: now,
      },
    });
  }
}



// Schedule to run the reset function every minute
cron.schedule('* * * * *', async () => {
    try {
      await resetCountsIfNeeded();
      console.log('Counts reset if needed');
    } catch (error) {
      console.error('Error resetting counts:', error);
    }
  })

  
  console.log('Scheduled reset function to run every minute.');

// Schedule to run the reset function every hour
// cron.schedule('0 * * * *', async () => {
//     try {
//       await resetCountsIfNeeded();
//       console.log('Counts reset if needed');
//     } catch (error) {
//       console.error('Error resetting counts:', error);
//     }
//   });