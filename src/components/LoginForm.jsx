import { getUsers } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { login } = useAuth();
    const Navigate = useNavigate();
    const users = getUsers();
    
    const handelLogin = (e) => {
        e.preventDefault();
        const userId = e.target.user.value;
        const password = e.target.password.value;

        const selectedUser = users.find(user => user.id === userId);

        if (selectedUser && selectedUser.password === password) {
            login(selectedUser);
            if (selectedUser.role === 'admin') {
                Navigate('/admin');
            } else {
                Navigate('/user');
            }
        } else {
            toast.error("Invalid user ID or password");
        }
    }

    return (
        <div className="card">
            <h2>Login</h2>

            <form onSubmit={handelLogin}>
                <label htmlFor="user">Select User:</label>
                <select id="user" name="user">
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                    ))}
                </select>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
