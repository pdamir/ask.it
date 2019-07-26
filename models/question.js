const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Question extends Model {
    $beforeInsert() {
        this.createdAt = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }

    static get tableName () {
        return 'questions'
    }

    static get relationMappings () {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/user',
                join: {
                    from: 'questions.userId',
                    to: 'users.id'
                }
            },
            answers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/answer',
                join: {
                    from: 'questions.id',
                    to: 'answers.questionId'
                }
            },
            user_feedback: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/user-feedback',
                join: {
                    from: 'questions.id',
                    to: 'user_feedback.questionId'
                }
            }
        }
    }
}

module.exports = { Question };