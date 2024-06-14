import { ALREADY_EXISTS } from "../../../libs/errors.js";
export const checkExistence = (app) => async (request, reply) => {
    const books = app.mongo.db.collection('books');

    let book = request.body;

    let result = await books.count({name: books.name});

    if(result > 0) throw new ALREADY_EXISTS();
}