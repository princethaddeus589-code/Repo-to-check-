import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./AppLayout";
import Login from "./Login";
import Signup from "./Signup";
import UserDashboard from "./UserDashboard";
import Settings from "./Settings";
import MyPortfolios from "./MyPortfolios";
import Templates from "./Templates";
import CreatePortfolio from "./CreatePortfolio";
import { isLoggedIn } from "./api";

function RequireAuth({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-portfolios" element={<MyPortfolios />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create-portfolio" element={<CreatePortfolio />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
