import HttpError from "http-errors";
import Parties from "../models/Parties.js";
import Candidates from "../models/Candidates.js";

class PartiesController {

    static create = async (req, res, next) => {
        try {
            const {name} = req.body;
            const party = await Parties.create({
                name: name,
            });
            res.json({
                status: 'ok',
                party
            })

        } catch (e) {
            next(e);
        }
    }
    static list = async (req, res, next) => {
        try {
            const parties = await Parties.findAll({

                include: [
                    {
                        model: Candidates,
                        required: false,
                        as: 'candidates'
                    }
                ]
            })
            res.json({
                status: 'ok',
                parties
            })
        } catch (err) {
            next(err)
        }
    }


    static delete = async (req, res, next) => {
        try {
            const {id} = req.params
            const party = await Parties.findOne({
                where:{id}
            })
            if (!party){
                throw HttpError(404, {errors:'Party Not Found'})
            }
            await Parties.destroy({
                where: {
                    id: id
                }
            })
            res.json({
                status: 'ok',
            })
        } catch (err) {
            next(err)
        }
    }
}

export default PartiesController