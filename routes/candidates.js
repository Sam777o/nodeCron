import {Router} from "express";
import CandidatesController from "../controllers/CandidatesController";
import validate from "../middlewares/validate.js";
import candidatesSchema from "../schema/candidatesSchema.js";

const router = Router();
router.get('/', CandidatesController.sendCandidateVotes)
router.post(
    '/create',
    validate(candidatesSchema.create,'body'),
    CandidatesController.create
);
router.get(
    '/list',
    CandidatesController.list
);
router.delete(
    '/delete/:id',
    validate(candidatesSchema.delete, 'params'),
    CandidatesController.delete
)


export default router;
