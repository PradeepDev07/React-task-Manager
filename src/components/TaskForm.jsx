import { useState } from "react";
import UserList from "./UserList";
import { getUsers, getTasks, saveTasks, saveUsers } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TaskForm() {
    const [tasks, setTasks] = useState(()=>getTasks() || []);
    const [users, setUsers] = useState(()=>getUsers() || []);
    const [title, setTitle] = useState("");
    const [view, setView] = useState("dragdrop"); // 'dragdrop', 'table', 'createUser'
    const [newUser, setNewUser] = useState({ name: "", password: "", role: "user" });
    const { signOut } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        signOut();
        navigate("/login");
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.password) return;
        
        const user = {
            id: "u" + Date.now(),
            ...newUser
        };
        
        const updatedUsers = [...users, user];
        setUsers(updatedUsers);
        saveUsers(updatedUsers);
        setNewUser({ name: "", password: "", role: "user" });
        toast.success("User created successfully!");
    };

   

    const addTask = () => {
        if (!title) return;
        const newTask = {
            id: Date.now().toString(),
            title,
            assignedTo: "unassigned",
            status: "Pending"
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setTitle("");
        toast.success("Task created successfully!");
    };

    const assignTask = (taskId, userId) => {
        const updatedTasks = tasks.map(t =>
            t.id === taskId ? { ...t, assignedTo: userId } : t
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        const userName = userId === "unassigned" ? "Unassigned" : users.find(u => u.id === userId)?.name || "Unknown";
        toast.success(`Task assigned to ${userName}`);
    };

    const deleteTask = (taskId) => {
        toast((t) => (
            <div>
                <p style={{marginBottom: '10px'}}>Are you sure you want to delete this task?</p>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                    <button 
                        onClick={() => {
                            const updatedTasks = tasks.filter(t => t.id !== taskId);
                            setTasks(updatedTasks);
                            saveTasks(updatedTasks);
                            toast.dismiss(t.id);
                            toast.success("Task deleted successfully");
                        }}
                        style={{backgroundColor: '#ef4444', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => toast.dismiss(t.id)}
                        style={{backgroundColor: '#e5e7eb', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000, icon: '⚠️' });
    };

    const getUserName = (userId) => {
        if (userId === "unassigned") return "Unassigned";
        const user = users.find(u => u.id === userId);
        return user ? user.name : "Unknown";
    };

    return (
        <div className="admin-dashboard">
            <div className="header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <div className="navbar">
                <button 
                    className={`nav-btn ${view === "dragdrop" ? "active" : ""}`}
                    onClick={() => setView("dragdrop")}
                >
                    Drag & Drop
                </button>
                <button 
                    className={`nav-btn ${view === "table" ? "active" : ""}`}
                    onClick={() => setView("table")}
                >
                    Overview Table
                </button>
                <button 
                    className={`nav-btn ${view === "createUser" ? "active" : ""}`}
                    onClick={() => setView("createUser")}
                >
                    Create User
                </button>
            </div>

            {view !== "createUser" && (
                <div className="create-task">
                    <input
                        placeholder="New task..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <button onClick={addTask}>Add Task</button>
                </div>
            )}

            {view === "createUser" ? (
                <div className="card" style={{maxWidth: "500px", margin: "0 auto"}}>
                    <h2>Create New User</h2>
                    <form onSubmit={handleAddUser}>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={newUser.name} 
                            onChange={e => setNewUser({...newUser, name: e.target.value})}
                            placeholder="Enter user name"
                            required
                        />
                        
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={newUser.password} 
                            onChange={e => setNewUser({...newUser, password: e.target.value})}
                            placeholder="Enter password"
                            required
                        />
                        
                        <label>Role:</label>
                        <select 
                            value={newUser.role} 
                            onChange={e => setNewUser({...newUser, role: e.target.value})}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        
                        <button type="submit" style={{marginTop: "10px", width: "100%"}}>Create User</button>
                    </form>
                </div>
            ) : view === "dragdrop" ? (
                <div className="columns-container">
                    {/* Unassigned Tasks Column */}
                    <UserList
                        user={{ id: "unassigned", name: "Unassigned Tasks" }}
                        tasks={tasks.filter(t => t.assignedTo === "unassigned")}
                        onDropTask={assignTask}
                        onDelete={deleteTask}
                    />
                    
                    {/* User Columns */}
                    {users.filter(u => u.role !== 'admin').map(user => (
                        <UserList
                            key={user.id}
                            user={user}
                            tasks={tasks.filter(t => t.assignedTo === user.id)}
                            onDropTask={assignTask}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            ) : (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{getUserName(task.assignedTo)}</td>
                                <td>
                                    <button 
                                        onClick={() => deleteTask(task.id)}
                                        style={{backgroundColor: "#ef4444", padding: "4px 8px", fontSize: "0.8em"}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tasks.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{textAlign: "center"}}>No tasks found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
