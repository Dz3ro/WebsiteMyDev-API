const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Project, validate } = require("../models/project");
const auth = require("../middleware/auth");

const msg400 = "Bad request";
const msg400InData = "Item already exists in database";
const msg404 = "Could not find item in database";
const msg500 = "Something went wrong";

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (e) {
    console.log("failed getting projects", e);
    res.status(500).send(msg500);
  }
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send(msg404);
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send(msg404);
  res.send(project);
});

router.post("/", auth, async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send(msg400);

  try {
    const projectinData = await Project.findOne({ name: req.body.name });
    if (projectinData) return res.status(400).send(msg400InData);
  } catch (e) {
    return res.status(500).send(msg500);
  }

  const { name, tools, urlImgMain, urlImgSec, urlImgAll, urlCode, urlLive } =
    req.body;

  const project = new Project({
    name,
    tools,
    urlImgMain,
    urlImgSec,
    urlImgAll,
    urlCode,
    urlLive,
  });

  try {
    await project.validate();
  } catch (e) {
    console.log("did not pass mongoose validation at posting", e);
    return res.status(400).send(msg400);
  }
  try {
    const result = await project.save();
    res.send(result);
  } catch (e) {
    console.log("failed to post project");
    res.status(500).send(msg500);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  let project;
  try {
    project = await ProgrammingTool.findById(id);
  } catch (e) {
    console.log("could not find the project with provided id", e);
    res.status(404).send(msg404);
  }
  try {
    project.delete();
  } catch (e) {
    console.log("failed deleting project", e);
    res.status(500).send(msg500);
  }
});

router.put("/:id", auth, async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send(msg400);

  const id = req.params.id;
  const project = await Project.findById(id);
  if (!project) res.status(404).send(msg404);

  project.name = req.body.name;
  project.tools = req.body.tools;
  project.urlImgMain = req.body.urlImgMain;
  project.urlImgSec = req.body.urlImgSec;
  project.urlImgAll = req.body.urlImgAll;
  project.urlCode = req.body.urlCode;
  project.urlLive = req.body.urlLive;

  try {
    await project.validate();
  } catch (e) {
    console.log("did not pass mongoose validation at putting project", e);
    return res.status(400).send(msg400);
  }

  try {
    const result = await project.save();
    res.send(result);
  } catch (e) {
    console.log("failed to save edited project");
    res.status(500).send(msg500);
  }
});

module.exports = router;
