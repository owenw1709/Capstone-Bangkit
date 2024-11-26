const Hapi = require('@hapi/hapi');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/auth');

module.exports = [
  {
    method: 'GET',
    path: '/student/todo',
    handler: studentController.getTodoList,
    options: {
      pre: [authMiddleware.verifyToken], // Ensures only authenticated requests
    },
  },
  {
    method: 'PUT',
    path: '/student/task/{id}',
    handler: studentController.updateTask,
    options: {
      pre: [authMiddleware.verifyToken],
    },
  },
];
