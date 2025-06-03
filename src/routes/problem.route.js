import { Router } from "express";
import {addProblem,problemBYDiffculty,ToggleCompeletion,} from '../controllers/problems.controller.js'

const problemRouter = Router();

problemRouter.post('/add',addProblem);                      //    http://localhost:8000/api/v1/problem/add
problemRouter.post('/toggle',ToggleCompeletion);            //    http://localhost:8000/api/v1/problem/toggle
problemRouter.get('/getprobByDifc',problemBYDiffculty)      //    http://localhost:8000/api/v1/problem/getprobByDifc



export default problemRouter