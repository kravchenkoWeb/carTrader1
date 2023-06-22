export default async (id) => {
    const {data, error} = await useFetch(`/api/car/${id}`);

    if(error.value) {
        console.log({error});
        throw createError({
            statusCode: error.value.statusCode,
            statusMessage: error.value.statusMessage,
        })
    }

    return {data};
};