// projects ara yazılımları buraya

const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(`${req.method} - ${new Date().toLocaleString()}`);
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({ message: "not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "İşlem yapılamadı" });
  }
}

async function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed == undefined) {
    res.status(400).json({ message: "gerekli alanlar eksik" });
  } else {
    req.project = {
      name: name,
      description: description,
      completed: completed,
    };
    next();
  }
}

module.exports = {
  logger,
  validateProjectId,
  validateProject,
};
