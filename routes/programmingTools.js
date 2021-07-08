const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { ProgrammingTool, validate } = require("../models/programmingTool");

const msg400 = "Bad request";
const msg400InData = "Item already exists in database";
const msg404 = "Could not find item in database";
const msg500 = "Something went wrong";

router.get("/", async (req, res) => {
  try {
    const tools = await ProgrammingTool.find();
    res.send(tools);
  } catch (e) {
    console.log("failed getting tools", e);
    res.status(500).send(msg500);
  }
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send(msg404);
  const tool = await ProgrammingTool.findById(req.params.id);
  if (!tool) return res.status(404).send(msg404);
  res.send(tool);
});

router.post("/", auth, async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send(msg400);

  try {
    const toolInData = await ProgrammingTool.findOne({ name: req.body.name });
    if (toolInData) return res.status(400).send(msg400InData);
  } catch (e) {
    return res.status(500).send(msg500);
  }

  const tool = new ProgrammingTool({ name: req.body.name });

  try {
    await tool.validate();
  } catch (e) {
    console.log("did not pass mongoose validation at posting", e);
    return res.status(400).send(msg400);
  }
  try {
    const result = await tool.save();
    res.send(result);
  } catch (e) {
    console.log("failed to post tool");
    res.status(500).send(msg500);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  let tool;
  try {
    tool = await ProgrammingTool.findById(id);
  } catch (e) {
    console.log("could not find the tool with provided id", e);
    res.status(404).send(msg404);
  }
  try {
    await tool.delete();
  } catch (e) {
    console.log("failed deleting tool", e);
    res.status(500).send(msg500);
  }
});

router.put("/:id", auth, async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send(msg400);

  const id = req.params.id;
  const tool = await ProgrammingTool.findById(id);
  if (!tool) res.status(404).send(msg404);

  tool.name = req.body.name;

  try {
    await tool.validate();
  } catch (e) {
    console.log("did not pass mongoose validation at putting", e);
    return res.status(400).send(msg400);
  }

  try {
    const result = await tool.save();
    res.send(result);
  } catch (e) {
    console.log("failed to save edited tool");
    res.status(500).send(msg500);
  }
});

router.delete("/", auth, (req, res) => {
  res.status(400).send(msg400);
});

router.put("/", auth, (req, res) => {
  res.status(400).send(msg400);
});

module.exports = router;
