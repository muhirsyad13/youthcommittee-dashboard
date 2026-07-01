const defaultAdmin = {

    username: "admin",
    password: "admin123",
    role: "admin"

};

const registeredUsers =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

const users = [
    defaultAdmin,
    ...registeredUsers
];