const tasks = require('../models/tasks');

module.exports = {
  getTodoList: (request, h) => {
    const { userId } = request.pre.auth; // User details from middleware
    const userTasks = tasks.filter(task => task.userId === userId);
    return h.response(userTasks).code(200);
  },

  updateTask: (request, h) => {
    const { userId } = request.pre.auth; // User details from middleware
    const taskId = parseInt(request.params.id, 10);
    const task = tasks.find(task => task.id === taskId && task.userId === userId);

    if (!task) {
      return h.response({ error: 'Task not found' }).code(404);
    }

    const { start_time, end_time, priority } = request.payload;
    task.start_time = start_time || task.start_time;
    task.end_time = end_time || task.end_time;
    task.priority = priority || task.priority;

    return h.response({ message: 'Task updated successfully', task }).code(200);
  },
};
