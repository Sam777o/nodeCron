import {CronJob} from "cron";

const crone = new CronJob(
    '*/10 * * * * *',
    function() {
        console.log('You will see this message every second');
    },
    null,
    true,
    'America/Los_Angeles'
);

export default crone