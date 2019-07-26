exports.up = (knex) => {
    return knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('username', 60).notNullable();
            table.string('fullName', 200).nullable();
            table.string('email', 150).nullable();
            table.dateTime('dateOfBirth').nullable();
            table.string('password').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        })
        .createTable('questions', table => {
            table.increments('id').primary();
            table.string('text').notNullable();
            table.integer('userId').references('users.id').notNullable().onDelete('CASCADE');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        })
        .createTable('answers', table => {
            table.increments('id').primary();
            table.string('text').notNullable();
            table.integer('userId').references('users.id').notNullable().onDelete('CASCADE');
            table.integer('questionId').references('questions.id').notNullable().onDelete('CASCADE');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        })
        .createTable('user_feedback', table => {
            table.increments('id').primary();
            table.integer('type').notNullable();
            table.integer('userId').references('users.id').nullable().onDelete('CASCADE');
            table.integer('questionId').references('questions.id').nullable().onDelete('CASCADE');
            table.integer('answerId').references('answers.id').nullable().onDelete('CASCADE');
            table.string('ipAddress').nullable();
        })
};

exports.down = (knex) => {
    return knex.schema
        .dropTable('users')
        .dropTable('questions')
        .dropTable('answers')
        .dropTable('user_feedback');
};

exports.config = { transaction: false };
