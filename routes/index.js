import {Router} from "express";
import users from "./users";
import candidates from "./candidates";
import parties from "./parties";
import doors from "./doors";

const router = Router();

router.use('/users', users);
router.use('/parties', parties);
router.use('/candidates', candidates);
router.use('/doors',doors);
router.use('/mail',candidates)

export default router;


