import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // <-- Import du CSS

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion :", { email, password });
    // Ici on pourra appeler l'API backend plus tard
    alert("Connexion réussie ! (simulation)");
    navigate("/home"); // redirige vers Home après connexion
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Se connecter</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Se connecter</button>

        <p
          className="switch-link"
          onClick={() => navigate("/register")}
        >
          Pas encore de compte ? S'inscrire
        </p>
      </form>
    </div>
  );
}
