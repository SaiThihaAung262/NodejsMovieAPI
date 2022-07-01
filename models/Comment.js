const Joi = require("@hapi/joi");
const { MongoDBNamespace } = require("mongodb");
const { dbCon } = require("../configuration");

class Comment {
    constructor(commentData) {
        this.data = commentData;
        this.data.createdAt = new Date();
        this.data.updatedAt = new Date();
    }

    static validate(commentText) {
        const validation = Joi.string().max(300).validate(commentText);

        if (validation.error) {
            const error = new Error(validation.error.message);
            error.statusCode = 400;
            return error;
        }

        return null;
    }

    save() {
        return new Promise((resolve, reject) => {
            dbCon("comments", async(db) => {
                try {
                    await db.insertOne(this.data);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    static edit(commentId, text) {
        return new Promise((resolve, reject) => {
            dbCon("comments", async(db) => {
                try {
                    await db.updateOne({ _id: commentId }, {
                        $set: { text: text },
                        $currentDate: { updatedAt: true },
                    });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    static delete(commentId) {
        return new Promise((resolve, reject) => {
            dbCon("comments", async(db) => {
                try {
                    await db.deleteOne({ _id: commentId });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}

module.exports = Comment;