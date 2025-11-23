import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

import Login from "../pages/Login";
import Chat from "../pages/Chat";

const AppRoutes = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Se o usuário estiver logado, a rota "/" leva para o Chat.
            Caso contrário, qualquer rota leva para o Login. */}
        <Route path="*" element={signed ? <Chat /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
