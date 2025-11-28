import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css'; // CSS classique

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>
        Échangez vos compétences, développez vos talents !
      </h1>
      <p>
        Bienvenue sur <span style={{ fontWeight: '700' }}>SkillSwap</span> ! Apprenez, partagez et grandissez en échangeant vos compétences.
      </p>
      <div className="button-group">
        <button
          onClick={() => navigate('/register')}
          className="button-primary"
        >
          Créer un compte
        </button>
        <button
          onClick={() => navigate('/login')}
          className="button-secondary"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
