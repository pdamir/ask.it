const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');
const { Preference, Property } = require('./index');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class UserFeedback extends Model {
    static get tableName () {
        return 'user_feedback'
    }

    static get relationMappings () {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/user',
                join: {
                    from: 'user_feedback.userId',
                    to: 'users.id'
                }
            },
            question: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/question',
                join: {
                    from: 'user_feedback.questionId',
                    to: 'questions.id'
                }
            },
            answer: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/answer',
                join: {
                    from: 'user_feedback.answerId',
                    to: 'answers.id'
                }
            }
        }
    }
}

module.exports = { UserFeedback };