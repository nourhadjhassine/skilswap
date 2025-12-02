
import Skill from "../models/Skill.js";

// ✅ Ajouter une compétence
export const addSkill = async (req, res) => {
  try {
    const skill = new Skill({ ...req.body, userId: req.userId });
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer toutes les compétences
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
