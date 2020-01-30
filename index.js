const express = require('express');

const server = express();

server.use(express.json());

const tasks = []
const projects = []

server.use((req, res, next) => {
  console.count('Request');
  next();
});

function checkProjectInArray(req, res,next){
 

  const project = projects.find(x => x.id === req.params.id);

  if(!project){
    return res.status(400).json({ error: 'Project does not exists'});
  }

  req.project = project;

  return next();
}


server.post('/projects', (req, res) => {
  
  
  const { id, title } = req.body;

  projects.push({id, title, tasks})

  
  return res.json(projects);

});

server.get('/projects', (req, res) => {
  
  return res.json(projects);
  
});

server.put('/projects/:id', checkProjectInArray, (req,res) => {

  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(x => x.id === id);
  project.title = title;

  return res.json(projects)

});

server.delete('/projects/:id', checkProjectInArray, (req, res) => {

  const { id } = req.params;

  const project = projects.find(x => x.id === id);

  projects.splice(project)

  return res.send();


});

server.post('/projects/:id/tasks',checkProjectInArray, (req, res) => {
  
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(x => x.id === id);
  
  project.tasks.push(title);

  return res.json(projects)

});


server.listen(3000);
