import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // <-- Import du CSS

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Créer un compte :", { name, email, password });
    // Ici on pourra appeler l'API backend plus tard
    alert("Compte créé ! (simulation)");
    navigate("/login"); // Redirige vers Login après inscription
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Créer un compte</h2>

        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Créer un compte</button>

        <p
          className="switch-link"
          onClick={() => navigate("/login")}
        >
          Déjà un compte ? Se connecter
        </p>
      </form>
    </div>
  );
}
