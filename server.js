const express = require('express');
const app = express();
const PORT = 3000;

const tasks = [];

app.use(express.json()); 


app.get('/tasks', (req, res) => {
  console.log('GET /tasks called'); 
  res.json(tasks); 
});


app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

 
  if (!title || title.length < 3) {
    return res.status(400).json({ error: 'Title is required and must be at least 3 characters long.' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required.' });
  }


  const newTask = {
    id: tasks.length + 1, 
    title,
    description,
    status: 'pending' 
  };


  tasks.push(newTask);


});


app.put('/tasks/:id', (req, res) => {
  const { id } = req.params; 
  const { title, description } = req.body; 


  const task = tasks.find(task => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }


  if (title) task.title = title;
  if (description) task.description = description;


  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params; 


  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }


  tasks.splice(taskIndex, 1);


  res.json({ message: 'Task deleted successfully' });
});



app.patch('/tasks/:id/status', (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 
  

    if (!status || !['pending', 'completed', 'in-progress'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Valid values are "pending", "completed", or "in-progress".' });
    }
  

    const task = tasks.find(task => task.id === parseInt(id));
  
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
   
    task.status = status;
  
    
    res.json(task);
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
