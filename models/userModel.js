const database = [{
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "jimmy123!",
        admin: true
    },
    {
        id: 2,
        name: "Johnny Doe",
        email: "johnny123@gmail.com",
        password: "johnny123!",
        admin: false
    },
    {
        id: 3,
        name: "Jonathan Chen",
        email: "jonathan123@gmail.com",
        password: "jonathan123!",
        admin: false
    },
    {
        id: 4,
        name: "Test",
        email: "1@hotmail.com",
        password: "2",
        admin: false
    },
    {
        id: 5,
        name: "Testadmin",
        email: "2@hotmail.com",
        password: "2",
        admin: true
    },
];

const userModel = {
    findOne: (email) => {
        const user = database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with id: ${id}`);
    },
    enterDatabase: (user) => {
        database.push(user)
    }
};

module.exports = { database, userModel };