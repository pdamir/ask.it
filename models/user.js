const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class User extends Model {
    $beforeInsert() {
        this.createdAt = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }

    static get tableName () {
        return 'users'
    }

    static get relationMappings () {
        return {
            questions: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/question',
                join: {
                    from: 'users.id',
                    to: 'questions.userId',
                }
            },
            answers: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/answer',
                join: {
                    from: 'users.id',
                    to: 'answers.userId',
                }
            }
        }
    }
}

module.exports = { User };