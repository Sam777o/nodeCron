import {Router} from "express";
import DoorsController from "../controllers/DoorsController";

const router = Router();
router.post(
    '/create', DoorsController.create);
router.get('/list', DoorsController.list);



export default router;
