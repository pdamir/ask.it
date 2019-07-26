exports.seed = (knex) => {

    const randomDate = () => {
        const start = new Date(2018, 0, 1);
        return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
    };

    return knex('users').del()
        .then(() => {
            return knex('users').insert([
                {
                    id: 1,
                    username: 'john-d',
                    fullName: 'John Doe',
                    email: 'john@johndoe.com',
                    dateOfBirth: null,
                    password: '$2b$12$Qo/Bw9h2X/tp9GeWtNzAQeReY7en/ZA4UL/hlkfhTVRtb6HD2ii.W'
                },
                {
                    id: 2,
                    username: 'Janey',
                    fullName: 'Jane Doe',
                    email: null,
                    dateOfBirth: null,
                    password: '$2b$12$Qo/Bw9h2X/tp9GeWtNzAQeReY7en/ZA4UL/hlkfhTVRtb6HD2ii.W'
                },
                {
                    id: 3,
                    username: 'Jim2019',
                    fullName: 'Jimmy Jimson',
                    email: 'jimmy@jimson.com',
                    dateOfBirth: null,
                    password: '$2b$12$Qo/Bw9h2X/tp9GeWtNzAQeReY7en/ZA4UL/hlkfhTVRtb6HD2ii.W'
                },
                {
                    id: 4,
                    username: 'damirp',
                    fullName: 'Damir Pirija',
                    email: 'pdamir@live.com',
                    dateOfBirth: null,
                    password: '$2b$12$Qo/Bw9h2X/tp9GeWtNzAQeReY7en/ZA4UL/hlkfhTVRtb6HD2ii.W'
                },
            ]);
        })
        .then(() => {
            // need to set sequence number to max id since newly registered users would start from id === 1
            return knex.raw('select setval(\'users_id_seq\', max(id)) from users');
        })
        .then(() => {
            return knex('questions').del()
                .then(() => {
                    return knex('questions').insert([
                        {id: 1, text: 'What is the best Javascript framework currently?', userId: 1, createdAt: randomDate()},
                        {id: 2, text: 'Where can I buy a nice PC?', userId: 1, createdAt: randomDate()},
                        {id: 3, text: 'What is the most recommended restaurant in Sarajevo?', userId: 1, createdAt: randomDate()},
                        {id: 4, text: 'Should I travel to Berlin, Germany?', userId: 1, createdAt: randomDate()},
                        {id: 5, text: 'Which jobs have the highest salaries?', userId: 1, createdAt: randomDate()},
                        {id: 6, text: 'How is everyone?', userId: 1, createdAt: randomDate()},
                        {
                            id: 7,
                            text: 'If You Had The World’s Attention For 30 Seconds, What Would You Say?',
                            userId: 2,
                            createdAt: randomDate()
                        },
                        {id: 8, text: 'What is in your fridge right now?', userId: 2, createdAt: randomDate()},
                        {id: 9, text: 'Would you leave your hometown forever?', userId: 2, createdAt: randomDate()},
                        {id: 10, text: 'Why do people gossip?', userId: 2, createdAt: randomDate()},
                        {id: 11, text: 'Why do people wear flip-flops with socks?', userId: 2, createdAt: randomDate()},
                        {id: 12, text: 'What color is the best for Lamborghini Murcielago?', userId: 3, createdAt: randomDate()},
                        {id: 13, text: 'Why should I visit Sarajevo?', userId: 3, createdAt: randomDate()},
                        {id: 14, text: 'What is the stupidest thing you\'ve done?', userId: 3, createdAt: randomDate()},
                        {id: 15, text: 'Do you like dancing?', userId: 3, createdAt: randomDate()},
                        {id: 16, text: 'Do you go out often?', userId: 3, createdAt: randomDate()},
                        {id: 17, text: 'Who likes to play Player Unknown\'s Battlegrounds?', userId: 3, createdAt: randomDate()},
                        {id: 18, text: 'Which PS4 game should I buy next?', userId: 3, createdAt: randomDate()},
                        {id: 19, text: 'Is there someone awake right now?', userId: 4, createdAt: randomDate()},
                        {id: 20, text: 'What is your favourite animal?', userId: 4, createdAt: randomDate()},
                        {id: 21, text: 'What is your favourite band', userId: 4, createdAt: randomDate()},
                        {id: 22, text: 'Is this app any good?', userId: 4, createdAt: randomDate()},
                        {id: 23, text: 'Should I get hired for building this app?', userId: 4, createdAt: randomDate()},
                    ]);
                })
                .then(() => {
                    return knex.raw('select setval(\'questions_id_seq\', max(id)) from questions');
                })
        })
        .then(() => {
            return knex('answers').del()
                .then(() => {
                    return knex('answers').insert([
                        {id: 1, text: 'Yes!! Definitely!', questionId: 23, userId: 1},
                        {
                            id: 2,
                            text: 'App could use some improvements, but yes you should.',
                            questionId: 23,
                            userId: 2
                        },
                        {
                            id: 3,
                            text: 'Yes, but I am saying this just because I know you IRL',
                            questionId: 23,
                            userId: 3
                        },
                        {id: 4, text: 'Yes, I like it. Very simple yet fun', questionId: 22, userId: 1},
                        {
                            id: 5,
                            text: 'It is not bad. I have some ideas on what to add, but for starters I think it is nice.',
                            questionId: 1,
                            userId: 2
                        },
                        {id: 6, text: 'Also, you could work on design.', questionId: 22, userId: 2},
                        {id: 7, text: 'I think Angular and React are currently the best.', questionId: 1, userId: 2},
                        {id: 8, text: 'I do not even know what javascript is', questionId: 1, userId: 3},
                        {
                            id: 9, text:
                            'I am starting to like React', questionId:
                            1, userId:
                            4
                        }
                        ,
                        {
                            id: 10, text:
                            'Forgot to add framerwork/library in question text', questionId:
                            1, userId:
                            1
                        }
                        ,
                        {
                            id: 11, text:
                            'You can try on Amazon, eBay and such websites', questionId:
                            2, userId:
                            2
                        }
                        ,
                        {
                            id: 12, text:
                            'If you are looking for a local shop, try Imtec or Plus', questionId:
                            2, userId:
                            3
                        }
                        ,
                        {
                            id: 13, text:
                            'Yellow!', questionId:
                            12, userId:
                            1
                        }
                        ,
                        {
                            id: 14, text:
                            'Red with black roof could look nice.', questionId:
                            12, userId:
                            2
                        }
                        ,
                    ])
                        ;
                })
                .then(() => {
                    return knex.raw('select setval(\'answers_id_seq\', max(id)) from answers');
                })
        })
        .then(() => {
            return knex('user_feedback').del()
                .then(() => {
                    // Setting type === 0 for Like, and type === 1  e
                    return knex('user_feedback').insert([
                        {id: 1, type: 0, userId: 1, questionId: 23, answerId: null},
                        {id: 2, type: 0, userId: 2, questionId: 23, answerId: null},
                        {id: 3, type: 0, userId: 3, questionId: 23, answerId: null},
                        {id: 4, type: 0, userId: 4, questionId: null, answerId: 1},
                        {id: 5, type: 0, userId: 2, questionId: null, answerId: 1},
                        {id: 6, type: 0, userId: 1, questionId: 22, answerId: null},
                        {id: 7, type: 0, userId: 2, questionId: 22, answerId: null},
                        {id: 8, type: 0, userId: 3, questionId: 22, answerId: null},
                        {id: 9, type: 0, userId: 1, questionId: 17, answerId: null},
                        {id: 10, type: 0, userId: 2, questionId: 17, answerId: null},
                        {id: 11, type: 0, userId: 2, questionId: 4, answerId: null},
                        {id: 12, type: 1, userId: 3, questionId: 4, answerId: null},
                        {id: 13, type: 0, userId: 4, questionId: 4, answerId: null},
                        {id: 14, type: 0, userId: 2, questionId: 3, answerId: null},
                        {id: 15, type: 0, userId: 3, questionId: 3, answerId: null},
                        {id: 16, type: 1, userId: 4, questionId: 3, answerId: null},
                        {id: 17, type: 0, userId: 1, questionId: 7, answerId: null},
                        {id: 18, type: 0, userId: 3, questionId: 7, answerId: null},
                    ]);
                })
                .then(() => {
                    return knex.raw('select setval(\'user_feedback_id_seq\', max(id)) from user_feedback');
                })
        });
};
