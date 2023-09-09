import HttpError from "http-errors";
import Parties from "../models/Parties.js";
import Candidates from "../models/Candidates.js";
import Users from "../models/Users.js";
import {CronJob} from "cron";
import Mail from "../services/Mail.js";

class CandidatesController {

    static create = async (req, res, next) => {
        try {

            const {userId, partyId} = req.body;
            console.log(req.body)
            console.log({userId},9999999999999999999)
            const user = await Users.findOne({
                where:{
                    id: +userId
                }
            })
            const party = await Parties.findOne({
                where:{
                    id: +partyId
                }
            })
            if (!user ){
                throw HttpError(404,{errors:'User Not Found'})
            }
            if(!party){
                throw HttpError(404,{errors:'Party Not Found'})
            }
            const exist = await Candidates.findOne({
                where:{
                    userId
                }
            })
            if (exist){
                throw HttpError(409,{errors:'user is already a candidate'})
            }
            const candidate = await Candidates.create({
                userId,
                partyId,
            });
            console.log(candidate,5555555555555)
            res.json({
                status: 'ok',
                candidate
            })

        } catch (e) {
            next(e);
        }
    }
    static list = async (req, res, next) => {
        try {
            const candidates = await Candidates.findAll({

                include: [
                    {
                        model: Users,
                        required: true,
                        as: 'user'
                    },
                    {
                        model: Parties,
                        required: false,
                        as: 'party'
                    }

                ],
            })


            res.json({
                status: 'ok',
                candidates
            })
        } catch (err) {
            next(err)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const {id} = req.params
            const candidate = Candidates.destroy({
                where: {
                    id: +id
                }
            })
            res.json({
                status: 'ok',

            })
        } catch (err) {
            next(err)
        }
    }
    static sendCandidateVotes = async (req, res, next) => {
        try {
            const candidates = await Candidates.findAll({});
            const votes = candidates.map(candidate => candidate.dataValues.votes);

            const email = `<p>Candidate Votes: ${votes.join(', ')}</p>`;
            console.log(email, 4444444444);

            await Mail.send('Candidates Votes',  email,
            );            console.log('Candidate votes sent successfully.');
            res.json({ status: 'ok' });
        } catch (err) {
            HttpError(err)
        }
    }





}

export default CandidatesController