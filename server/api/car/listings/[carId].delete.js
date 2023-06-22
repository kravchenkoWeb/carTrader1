import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
    const { carId } = event.context.params;

    return prisma.car.delete({
        where: {
            id: parseInt(carId)
        }
    });
});