// eylemlerle ilgili ara katman yazılımları yazın
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    const actions = await Actions.get(req.params.id);
    if (!actions) {
      res.status(404).json({ message: "not found" });
    } else {
      req.actions = actions;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "İşlem yapılamadı" });
  }
}

async function validateAction(req, res, next) {
  try {
    let { project_id, description, notes, completed } = req.body;
    if (!project_id || !description || !notes || completed == undefined) {
      res.status(400).json({ message: "gerekli alanlar eksik" });
    } else {
      if (project_id > 0) {
        let isExistProject = await Projects.get(project_id);
        if (!isExistProject)
          res.status(400).json({ message: "Project not found" });
        else {
          req.actions = {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: completed,
          };
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { validateActionId, validateAction };
