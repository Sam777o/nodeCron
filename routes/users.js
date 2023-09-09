import {Router} from "express";
import UsersController from "../controllers/UsersController";
import validate from "../middlewares/validate.js";
import usersSchema from "../schema/usersSchema.js";

const router = Router();

router.post(
    '/create',
    validate(usersSchema.create, 'body'),
    UsersController.create
);
router.get(
    '/list',
    validate(usersSchema.list,'query'),
    UsersController.list
);
router.delete(
    '/delete/:id',
    // validate(usersSchema.delete,'params'),
    UsersController.delete
);
router.put(
    '/authorization',
    validate(usersSchema.authorization, 'body'),
    UsersController.authorization
);
router.put(
    '/vote',
    validate(usersSchema.vote,'body'),
    UsersController.vote
);

export default router;
