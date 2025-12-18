import React from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "./modules/app/components/Layout";
import { useAuth } from "./context/AuthContext";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {User} = useAuth();
  return User ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <Layout>
        
      </Layout>
    </>
  );
};

export default App;
