const { ObjectID } = require("bson");
const ApiError = require("../errors/apiError");

let posts;

    
exports.injectDB = async (conn) => {
    if(posts) {
        return;
    }
    try {
        posts = await conn.db("template").collection("posts");
    } catch (error) {
        console.error(error);
    }
}

exports.getAll = async () => {
    const result = await posts.find().toArray();
    return result;
}

exports.getOneById = async (id) => {
    if (!ObjectID.isValid(id)) {
        throw new ApiError("Ungültiger Parameter.", 400);
    };
    const result = await posts.findOne( {_id: ObjectID(id)} );
    return result;
}

exports.create = async (data) => {
    const { insertedId } = await posts.insertOne(data);
    const insertedDocument = await this.getOneById(insertedId);
    return insertedDocument;
}

exports.updateById = async (id, data) => {
    if (!ObjectID.isValid(id)) {
        throw new ApiError("Ungültiger Parameter.", 400);
    };
    const result = await posts.updateOne( {_id: ObjectID(id)}, {$set:data} );

    if (result.matchedCount < 1) {
        throw new ApiError("Kein Dokument zum aktualisieren gefunden.", 400);
    };

    const updatedDocument = await this.getOneById(id);
    return updatedDocument;
}

exports.deleteById = async (id) => {
    if (!ObjectID.isValid(id)) {
        throw new ApiError("Ungültiger Parameter.", 400);
    };
    const result = await posts.deleteOne( {_id: ObjectID(id)} );

    if (result.deletedCount < 1) {
        throw new ApiError("Kein Dokument zum löschen gefunden.", 400);
    };

    return null;
}
