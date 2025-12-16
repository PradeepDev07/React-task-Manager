import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./productedRoutes/ProductedRoute";
import AuthAdmin from "./productedRoutes/AuthAdmin";
import LoginForm from "./components/LoginForm";
import { initData } from "./utils/storage";
import TaskForm from "./components/TaskForm";
import TaskFormUser from "./components/TaskFormUser";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        
        <Route element={<AuthAdmin />}>
          <Route path="/admin" element={<TaskForm />} />
        </Route>

        <Route element={<ProtectedRoute />}>
           <Route path="/user" element={<TaskFormUser />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    </DndProvider>
  )
}

export default App
