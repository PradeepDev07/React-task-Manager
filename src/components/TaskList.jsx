import { useDrag } from "react-dnd";

export default function TaskList({ task, isAdmin, onComplete, onDelete }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task.id },
        canDrag: isAdmin,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }), [task.id, isAdmin]);

    return (
        <div
            ref={isAdmin ? drag : null}
            className={`task-card ${isDragging ? "dragging" : ""} ${isAdmin ? "draggable" : ""}`}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <div>
                    <p className="task-title">{task.title}</p>
                    <p className="task-status">Status: {task.status}</p>
                </div>
                {isAdmin && (
                    <button 
                        onClick={() => onDelete(task.id)}
                        style={{
                            backgroundColor: 'transparent', 
                            color: '#ef4444', 
                            padding: '2px 6px', 
                            fontSize: '1.2em',
                            border: 'none'
                        }}
                        title="Delete Task"
                    >
                        &times;
                    </button>
                )}
            </div>

            {!isAdmin && task.status !== "Completed" && (
                <button
                    onClick={() => onComplete(task.id)}
                    className="complete-btn"
                >
                    Mark Completed
                </button>
            )}
        </div>
    );
}
