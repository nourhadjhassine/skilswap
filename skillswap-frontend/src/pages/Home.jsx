// skillswap-frontend/src/pages/Home.jsx
import React, { useState } from "react";

export default function Home() {
  // Compétences initiales (mock data)
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Guitare",
      description: "Cours pour débutants",
      category: "Musique",
      contact: {
        whatsapp: "123456789",
        facebook: "fb.com/user",
        instagram: "insta_user",
      },
    },
    {
      id: 2,
      name: "Photoshop",
      description: "Bases du design",
      category: "Art",
      contact: {
        whatsapp: "987654321",
        facebook: "fb.com/artist",
        instagram: "insta_artist",
      },
    },
  ]);

  // État pour afficher le formulaire
  const [showForm, setShowForm] = useState(false);

  // État du formulaire d'ajout
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    category: "",
    contact: { whatsapp: "", facebook: "", instagram: "" },
  });

  // Ajouter une compétence
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.description || !newSkill.category) return;

    setSkills([
      ...skills,
      { id: skills.length + 1, ...newSkill },
    ]);

    // Reset du formulaire
    setNewSkill({ name: "", description: "", category: "", contact: { whatsapp: "", facebook: "", instagram: "" } });
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Compétences disponibles</h1>

      {/* Bouton Ajouter */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Annuler" : "Ajouter une compétence"}
      </button>

      {/* Formulaire Ajouter */}
      {showForm && (
        <form onSubmit={handleAddSkill} className="mb-6 bg-white p-6 rounded shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-4">Nouvelle compétence</h2>
          <input
            type="text"
            placeholder="Nom de la compétence"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          <h3 className="text-lg font-semibold mb-2">Contact utilisateur</h3>
          <input
            type="text"
            placeholder="WhatsApp"
            value={newSkill.contact.whatsapp}
            onChange={(e) => setNewSkill({ ...newSkill, contact: { ...newSkill.contact, whatsapp: e.target.value } })}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            placeholder="Facebook"
            value={newSkill.contact.facebook}
            onChange={(e) => setNewSkill({ ...newSkill, contact: { ...newSkill.contact, facebook: e.target.value } })}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            placeholder="Instagram"
            value={newSkill.contact.instagram}
            onChange={(e) => setNewSkill({ ...newSkill, contact: { ...newSkill.contact, instagram: e.target.value } })}
            className="w-full p-2 mb-3 border rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Ajouter
          </button>
        </form>
      )}

      {/* Liste des compétences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-1">{skill.name}</h2>
            <p className="text-gray-700 mb-1">{skill.description}</p>
            <p className="text-sm text-gray-500 mb-2">Catégorie : {skill.category}</p>
            <div className="text-sm">
              <p>WhatsApp: {skill.contact.whatsapp || "-"}</p>
              <p>Facebook: {skill.contact.facebook || "-"}</p>
              <p>Instagram: {skill.contact.instagram || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
