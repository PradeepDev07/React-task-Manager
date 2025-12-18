import { getUsers } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const users = getUsers();
    
    const handelLogin = (e) => {
        e.preventDefault();
        const userId = e.target.user.value;
        const password = e.target.password.value;
        
        console.log("LoginForm: Login attempt", { userId, password });

        const selectedUser = users.find(user => user.id === userId);

        if (selectedUser && selectedUser.password === password) {
            console.log("LoginForm: Login successful", selectedUser);
            login(selectedUser);
            if (selectedUser.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } else {
            console.log("LoginForm: Login failed - Invalid credentials");
            toast.error("Invalid user ID or password");
        }
    }

    return (
        <div className="login-container">
        <div className="card">
            

          
            <img src="/logo.svg" width="10%" alt="Logo" />
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
                <button type="submit">Login</button><span className="info-text"> (Select any user and use password: "123")</span>
            </form>
              </div>
        </div>
    );
};

export default LoginForm;
