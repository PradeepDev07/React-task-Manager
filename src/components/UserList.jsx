import { useDrop } from "react-dnd";
import TaskList from "./TaskList";

export default function UserList({ user, tasks, onDropTask, onDelete }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => onDropTask(item.id, user.id),
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    }), [onDropTask, user.id]);
    
    return (
        <div
            ref={drop}
            className={`user-column ${isOver ? "drag-over" : ""}`}
        >
            <h3>{user.name}</h3>
            {tasks.map(task => (
                <TaskList key={task.id} task={task} isAdmin={true} onDelete={onDelete} />
            ))}
        </div>
    );
}
