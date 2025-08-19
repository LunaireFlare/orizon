import { Response, Request } from "express";
import argon2 from "argon2";
import { User } from '../models/associations.js';
import { z } from "zod";

const userController = {
    async index(req:Request, res:Response){
        const users = await User.findAll();
        console.log(users);
        
        res.json(users);
    }

}

export { userController }