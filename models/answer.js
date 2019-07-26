const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');
const { Preference, Property } = require('./index');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Answer extends Model {
    $beforeInsert() {
        this.createdAt = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }

    static get tableName () {
        return 'answers'
    }

    static get relationMappings () {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/user',
                join: {
                    from: 'answers.userId',
                    to: 'users.id'
                }
            },
            question: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/question',
                join: {
                    from: 'answers.questionId',
                    to: 'questions.id'
                }
            },
            user_feedback: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/user-feedback',
                join: {
                    from: 'answers.id',
                    to: 'user_feedback.answerId'
                }
            }
        }
    }
}

module.exports = { Answer };