let _id, taskTitle, taskDescription, taskAssignee, taskPriority, taskDueDate;

document.addEventListener('DOMContentLoaded', async () => {
  taskTitle = document.querySelector('#task-title');
  taskDescription = document.querySelector('#task-description');
  taskAssignee = document.querySelector('#task-assignee');
  taskPriority = document.querySelector('#task-priority');
  taskDueDate = document.querySelector('#task-due-date');
  const { pathname } = window.location;
  _id = pathname.split('/')[3];

  const [taskRes, usersRes] = await Promise.all([
    axios({
      method: 'get',
      url: `http://127.0.0.1:3000/api/admin/get-task-by-id/${_id}`,
      withCredentials: true,
    }),
    axios({
      method: 'get',
      url: `http://127.0.0.1:3000/api/admin/get-all-user`,
      withCredentials: true,
    }),
  ]);

  const {
    data: { task },
  } = taskRes.data;
  const {
    data: { users },
  } = usersRes.data;

  users.forEach((user) => {
    const markup = `<option value="${user._id}" ${
      task.assignee._id === user._id ? 'selected' : ''
    }>${user.username}</option>`;
    taskAssignee.insertAdjacentHTML('beforeend', markup);
  });

  taskTitle.value = task.title;
  taskDescription.value = task.description;
  taskPriority.value = task.priority;
  taskDueDate.value = new Date(task.dueDate).toISOString().split('T')[0];
});

document
  .querySelector('.task-form-button')
  .addEventListener('click', async (eve) => {
    eve.preventDefault();
    const res = await axios({
      method: 'patch',
      url: `http://127.0.0.1:3000/admin/update/${_id}`,
      data: {
        title: taskTitle.value,
        description: taskDescription.value,
        assignee: taskAssignee.value,
        priority: taskPriority.value,
        dueDate: taskDueDate.value,
      },
      withCredentials: true,
    });
    window.location.href = 'http://127.0.0.1:3000/admin/';
  });
