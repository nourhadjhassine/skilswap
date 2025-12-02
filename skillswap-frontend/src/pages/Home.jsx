
// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { getSkills, addSkill } from "../services/api"; // ✅ Service API

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    category: "",
    contact: { whatsapp: "", facebook: "", instagram: "" },
  });

  const token = localStorage.getItem("token");

  // ✅ Charger les compétences depuis l’API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills(); // GET /api/skills
        setSkills(res.data);           // tableau d'objets Skill depuis MongoDB
      } catch (err) {
        console.error("Erreur getSkills:", err);
        alert(
          err.response?.data?.message ||
            "Erreur lors du chargement des compétences"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // ✅ Ajouter une compétence via l’API (protégée par JWT)
  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!newSkill.name || !newSkill.description || !newSkill.category) {
      alert("Veuillez remplir nom, description et catégorie.");
      return;
    }

    if (!token) {
      alert("Vous devez être connecté pour ajouter une compétence.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addSkill(newSkill, token); // POST /api/skills
      // Ajoute la nouvelle compétence renvoyée par l’API à la liste
      setSkills((prev) => [...prev, res.data]);

      // Reset form et fermeture
      setNewSkill({
        name: "",
        description: "",
        category: "",
        contact: { whatsapp: "", facebook: "", instagram: "" },
      });
      setShowForm(false);
      alert("Compétence ajoutée avec succès !");
    } catch (err) {
      console.error("Erreur addSkill:", err);
      alert(err.response?.data?.message || "Erreur lors de l'ajout de la compétence");
    } finally {
      setSubmitting(false);
    }
  };

  // Optional: Bouton de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="home-container">
        <p>Chargement des compétences...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Compétences disponibles</h1>
        <div className="actions">
          <button
            onClick={() => setShowForm(true)}
            className="add-skill-btn"
            disabled={!token}
            title={!token ? "Connectez-vous pour ajouter une compétence" : ""}
          >
            Ajouter une compétence
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Formulaire Ajouter */}
      {showForm && (
        <form onSubmit={handleAddSkill} className="skill-form">
          <h2>Nouvelle compétence</h2>

          <input
            type="text"
            placeholder="Nom de la compétence"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={newSkill.description}
            onChange={(e) =>
              setNewSkill({ ...newSkill, description: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Catégorie"
            value={newSkill.category}
            onChange={(e) =>
              setNewSkill({ ...newSkill, category: e.target.value })
            }
            required
          />

          <h3>Contact utilisateur</h3>
          <input
            type="text"
            placeholder="WhatsApp"
            value={newSkill.contact.whatsapp}
            onChange={(e) =>
              setNewSkill({
                ...newSkill,
                contact: { ...newSkill.contact, whatsapp: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Facebook"
            value={newSkill.contact.facebook}
            onChange={(e) =>
              setNewSkill({
                ...newSkill,
                contact: { ...newSkill.contact, facebook: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Instagram"
            value={newSkill.contact.instagram}
            onChange={(e) =>
              setNewSkill({
                ...newSkill,
                contact: { ...newSkill.contact, instagram: e.target.value },
              })
            }
          />

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Ajout..." : "Ajouter"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Liste des compétences */}
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill._id || skill.id} className="skill-card">
            <h2>{skill.name}</h2>
            <p>{skill.description}</p>
            <p>Catégorie : {skill.category}</p>

            {/* Le champ contact peut ne pas exister pour certains documents */}
            <p>WhatsApp: {skill.contact?.whatsapp || "-"}</p>
            <p>Facebook: {skill.contact?.facebook || "-"}</p>
            <p>Instagram: {skill.contact?.instagram || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
