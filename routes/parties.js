import {Router} from "express";
import PartiesController from "../controllers/PartiesController.js";
import validate from "../middlewares/validate.js";
import partiesSchema from "../schema/partiesSchema.js";

const router = Router();
router.post(
    '/create',
    validate(partiesSchema.create, 'body'),
    PartiesController.create
);
router.get(
    '/list',
    PartiesController.list
);
router.delete(
    '/delete/:id',
    validate(partiesSchema.delete,'params'),
    PartiesController.delete
)


export default router;
