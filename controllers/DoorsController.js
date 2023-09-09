import HttpError from "http-errors";
import Users from "../models/Users";
import Candidates from "../models/Candidates.js";
import {v4 as uuidV4} from "uuid";
import Doors from "../models/Doors.js";

class DoorsController {

    static create = async (req, res, next) => {
        try {
            const {status } = req.body;


            const door = await Doors.create({
                status,

            });
            res.json({
                status: 'ok',
                door,
            })

        } catch (e) {
            next(e);
        }
    }
    static list = async (req, res, next) => {
        try {
            const doors = await Doors.findAll({


            })
            res.json({
                status: 'ok',
                doors,

            })
        } catch (err) {
            next(err)
        }
    }



}


export default DoorsController;
