import { Request, Response } from "express";
import prisma from "../DB/prisma";
import {hashSync} from 'bcrypt';

export const login = (req: Request, res: Response) => {
    res.send("Login Works!");
};

export const signup = async (req: Request, res: Response) => {
    // res.send("Signup Works!");
    const { email, password, name } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    if (user) {
        res.status(400).send({ errorMessage: "User already exists" });
    } else {
        user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashSync(password, 10),
            }
        })
        res.send(user);
    } 

};
