// utils/storage.js

const TASKS_KEY = "tasks";
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const initData = () => {
    console.log("Storage: Checking/Initializing data...");
    if (!localStorage.getItem(USERS_KEY)) {
        console.log("Storage: Seeding default users");
        localStorage.setItem(
            USERS_KEY,
            JSON.stringify([
                { id: "u1", name: "pradeep admin", password:"123",role: "admin" },
                { id: "u2", name: "ravi", password:"123", role: "user" },
                { id: "u3", name: "gayu", password:"123", role: "user" }
            ])
        );
    }

    if (!localStorage.getItem(TASKS_KEY)) {
        localStorage.setItem(TASKS_KEY, JSON.stringify([
            { id: "t1", title: "Design Homepage", assignedTo: "u2", status: "Pending" },
            { id: "t2", title: "Fix Login Bug", assignedTo: "u3", status: "Pending" },
            { id: "t3", title: "Setup Database", assignedTo: "unassigned", status: "Pending" },
            { id: "t4", title: "Write Documentation", assignedTo: "unassigned", status: "Pending" }
        ]));
    }
};

export const getUsers = () =>JSON.parse(localStorage.getItem(USERS_KEY)) || [];

export const saveUsers = (users) =>localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getTasks = () =>JSON.parse(localStorage.getItem(TASKS_KEY)) || [];

export const saveTasks = (tasks) =>localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const setCurrentUser = (user) => {
    console.log("Storage: Saving current user to localStorage:", user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export const getCurrentUser = () =>JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

export const logout = () => {
    console.log("Storage: Removing current user from localStorage");
    localStorage.removeItem(CURRENT_USER_KEY);
}
