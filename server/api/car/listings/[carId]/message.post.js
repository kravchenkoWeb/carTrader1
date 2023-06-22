import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ["com", "net"]}
    }),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    name: Joi.string().required(),
    message: Joi.string().min(10),
});

export default defineEventHandler(async (event) => {
    const { carId } = event.context.params;
    const body = await readBody(event);

    const { error } = await schema.validate(body);

    if(error) {
        throw createError({
            statusCode: 412,
            statusMessage: error.message,
        })
    }

    const {message, email, phone, name} = body;

    return prisma.message.create({
        data: {
            message,
            email,
            name,
            phone,
            listingId: parseInt(carId),
        }
    });
});