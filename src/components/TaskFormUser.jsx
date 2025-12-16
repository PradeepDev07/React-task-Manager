import { useState } from "react";
import { getTasks, saveTasks } from "../utils/storage";
import TaskList from "./TaskList";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TaskFormUser = () => {
    const { user, signOut } = useAuth();
    const [tasks, setTasks] = useState(()=>getTasks() || []);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate("/login");
    }

   

    const handleComplete = (taskId) => {
        const updatedTasks = tasks.map(t => 
            t.id === taskId ? { ...t, status: "Completed" } : t
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const userTasks = tasks.filter(t => t.assignedTo === user.id);

    return (
        <div className="container">
            <div className="header">
                <h1>My Tasks</h1>
                <div className="user-info">
                    <span className="profile-circle"> {user.name.split(" ")[0][0].toUpperCase()}</span>
 <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
               
            </div>
            <div className="task-list">
                {userTasks.map(task => (
                    <TaskList 
                        key={task.id} 
                        task={task} 
                        isAdmin={false} 
                        onComplete={handleComplete} 
                    />
                ))}
                {userTasks.length === 0 && <p>No tasks assigned.</p>}
            </div>
        </div>
    );
};

export default TaskFormUser;
