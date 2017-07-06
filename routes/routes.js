const express = require('express');
const router = express.Router();
const models = require('../models')


router.get('/', function(req,res){
  models.Task.findAll()
  .then(function(tasks){
    return res.render('index', {
      tasks: tasks
    })
  })
})


router.post('/', function(req, res){
  const task = models.Task.build({
    task: req.body.todo
  })
  task.save()
  .then(function(){
    console.log('task added')
    return res.redirect('/')
  })
  .catch(function(err){
    console.log('Something went wrong' + err)
  })
})


router.post('/delete', function(req, res){
  models.Task.findOne({
    where: {
      id: req.body.delete
    }
  }).then(function(task){
    task.destroy()
    .then(function(){
      res.redirect('/')
    })
  })
})


router.post('/deleteAll', function (req, res){
  models.Task.destroy({
    where: {
    }
  }).then(function(tasks){
    return res.redirect('/')
  })
})


router.get('/task/:id', function(req, res){
  let id = req.params.id
  models.Task.findOne({
    where: {
      id: id
    }
  })
  .then(function(task){
    return res.render('edit', {
      task: task
    })
  })
})


router.post('/task/:id', function(req, res){
  let id = req.params.id
  models.Task.findOne({
    where : {
      id: id
    }
  }).then(function(task){
    task.task = req.body.edit
    task.save()
  })
  .then(function(){
    return res.redirect('/')
  })
})


module.exports = router
