import Header from "./components/Header";
import Banner from "./components/Banner";
import { EvenementsList } from "./components/Evenements";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Banner />
      <main>
        <Routes>
          <Route path="/" element={<EvenementsList />} />
          <Route path="/events" element={<EvenementsList />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/events/new"
            element={
              <RequireAuth>
                <div>Créer un événement</div>
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
