// "project" routerını buraya yazın!

const express = require("express");
const Projects = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.json([]);
    });
});

router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    let newProject = await Projects.insert(req.project);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  async (req, res, next) => {
    try {
      let updated = await Projects.update(req.params.id, req.project);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.project);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    let projectAction = await Projects.getProjectActions(req.params.id);
    res.json(projectAction);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});

module.exports = router;
