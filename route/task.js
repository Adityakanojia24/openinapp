const express = require("express");
const router = express.Router();
const TaskSchema = require('../model/task');
const SUbTaskSchema = require('../model/subtask');
const bcrypt = require("bcrypt");
const SubtaskSchema = require("../model/subtask");
const Authenticate = require('../middleware/authenticate');

router.post('/api/create/task', async(req, res) => {
    try {
        const { description, title, due_date } = req.body;
        if (! description || !title || !due_date) {
            return res.status(422).json({ error: "please fill required fields" });
        }
        
        const newUser = new TaskSchema({
          description, title, due_date
        })
        await newUser.save();
        res.json({success:true, message: "new user created"})
    } catch (error) {
        console.log("Getting an error");
        console.log(error);
        res.status(404).json({success:false, message:"task is not created"})
    }
})

router.post('/api/create/task/sub', async(req, res) => {
  try {
      const { id, status } = req.body;
      if (! id ) {
          return res.status(422).json({ error: "please fill required fields" });
      }
      const newSubTask = new SUbTaskSchema({
      task_id:id, status
      })
      await newSubTask.save();
      res.json({success:true, message: " new SubTask created"})
  } catch (error) {
      console.log("Getting an error");
      console.log(error);
      res.status(404).json({success:false, message:"SubTask is not created"})
  }
})
router.get('/api/all/tasks',Authenticate, async (req, res) => {
 const result = await TaskSchema.find()
  res.json({ success: true, data: result});
  res.status(200).json({success:true,message:'All Task '})
})
router.get('/api/all/sub/tasks',Authenticate, async (req, res) => {
  // we are clearing the cookie once cookie clear then user will log out
 const result = await SubtaskSchema.find()
  res.json({ success: true, data: result});
  res.status(200).json({success:true,message:'All Sub Task '})
})

router.put('/api/update/task', Authenticate, async (req, res) => {
  try {
    const { status, due_date, id } = req.body;
    const updt = await TaskSchema.findByIdAndUpdate(
      { id},
      { status, due_date, }
    );
    res.json({message:"updated", success:true})
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"failed to update"})
  }
    
})
router.put('/api/update/sub/task', Authenticate, async (req, res) => {
  try {
    const { status, id } = req.body;
    const updt = await SUbTaskSchema.findByIdAndUpdate(
      { id},
      {  status}
    );
    res.json({message:"updated", success:true})
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"failed to update"})
  }
    
})
module.exports = router;
 
