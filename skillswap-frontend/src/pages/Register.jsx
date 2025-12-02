
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { registerUser } from "../services/api"; // ✅ Import API

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Appel API pour inscription
      const response = await registerUser({ name, email, password });
      alert(response.data.message); // Message du backend
      navigate("/login"); // Redirection après succès
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
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

        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer un compte"}
        </button>

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
