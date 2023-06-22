import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { carId } = event.context.params;
    

    return prisma.message.findMany({
        where: {
            listingId: parseInt(carId)
        }
    });
});