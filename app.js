import express from "express";
import HttpError from "http-errors";
import routes from "./routes/index";
import cors from "cors";
import Socket from "./services/Socket.js";
import http from 'http';
import {CronJob} from "cron";

import CandidatesController from "./controllers/CandidatesController.js";

const app = express();
app.use(cors());


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);

const crone = new CronJob(
    '0 11 * * * *',
    function() {
        CandidatesController.sendCandidateVotes();

    },
    null,
    true,
    'Asia/Yerevan'
);

app.use((err, req, res, next) => {
    if (!err.status) {
        console.error(err);
        err = new HttpError(500, 'Internal Server Error');
    }


    res.status(err.status);
    res.json({ error: err.errors });
});

const server = http.createServer(app);

Socket.init(server);

server.listen(7000, () => {
    console.log(`Server start... `)
})
