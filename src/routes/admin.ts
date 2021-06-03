import {Router, Request, Response} from 'express';
import Languages from '../models/languages';

const router = Router();

router.post('/add/language',(req:Request, res:Response)=>{
    // const language = new Languages({
    //     name: req.body.name,
    //     id: req.body.id,
    //     mode: req.body.mode,
    //     compilers: req.body.compilers,
    //     precode: req.body.precode
    // });
    // language.save()
    // .then((data:JSON)=>{
    //     res.status(201).json(data);
    // })
    // .catch((err:JSON)=>{
    //     res.status(400).json(err);
    // })
    res.status(403).json({message:'Access denied'});
});

export default router;