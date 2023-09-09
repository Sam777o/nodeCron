import HttpError from "http-errors";
import Users from "../models/Users";
import Candidates from "../models/Candidates.js";
import {v4 as uuidV4} from "uuid";

class UsersController {

    static create = async (req, res, next) => {
        try {
            const {firstName, lastName, middleName, passport} = req.body;
            console.log(req.body,111111111);
            const people = await Users.findOne({
                where: {passport}
            })
            if (people) {
                throw HttpError(409, {errors: 'Duplicate'})
            }

            const user = await Users.create({
                firstName,
                lastName,
                middleName,
                passport
            });
            res.json({
                status: 'ok',
                user,
            })

        } catch (e) {
            next(e);
        }
    }
    static list = async (req, res, next) => {
        try {
            const {offset = 1, limit = 1} = req.query;
            const users = await Users.findAll({

                offset: +offset,
                limit: +limit,
                include: [
                    {
                        model: Candidates,
                        required: false,
                        as: 'candidates'
                    }
                ]
            })
            const total = await Users.count()
            res.json({
                status: 'ok',
                users,
                total,
                totalPages: Math.ceil(total / limit)
            })
        } catch (err) {
            next(err)
        }
    }


    static delete = async (req, res, next) => {
        try {
            const {id}= req.params
            console.log(id,11111111111111121131232132123311)
            const user = Users.findOne({
                where:{id}
            })
            if (!user){
                throw HttpError(404, {errors:'User NOt Found'})
            }
        await  Users.destroy({
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
    static  authorization = async (req, res, next) => {
        try {
            const {passport} = req.body;
            const user = await Users.update({
                    token: uuidV4().replaceAll('-', '')
                },
                {
                    where: {
                        passport: passport,
                        voted: null
                    }
                })
            console.log(user, 123456789456231)
            if (+[user] === 0) {
                throw HttpError(409, {errors: "User has voted"})
            }
            res.json({
                status: 'ok',
                user
            })

        } catch (err) {
            next(err)
        }
    }
    static vote = async (req, res, next) => {
        try {
            const {token, candidateId} = req.body;
            const user = await Users.findOne({
                where: {
                    token: token,
                    voted: null
                }
            })
            if (!user) {
                throw HttpError(409, {errors:'The User has voted'})
            }
                const candidate = await Candidates.findOne({
                    where: {
                        id: candidateId,
                    }
                })
                if (candidate) {
                    const user = await Users.update({
                        voted: Date.now()
                    }, {
                        where: {
                            token: token
                        }
                    })
                    await Candidates.update({
                        votes: candidate.dataValues.votes + 1
                    }, {
                        where: {
                            id: candidateId
                        }
                    })
                }
                res.json({
                    status: 'ok',
                    candidate
                })



        } catch (err) {
            next(err)
        }
    }
}


export default UsersController;
