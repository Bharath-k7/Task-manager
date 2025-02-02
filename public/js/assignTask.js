document.addEventListener('DOMContentLoaded', async () => {
  const taskAssignee = document.querySelector('#task-assignee');
  try {
    const { pathname } = window.location;
    const [, , , username, _id] = pathname.split('/');

    if (username && _id) {
      const markup = `<option value="${_id}" disabled selected>${username}</option>`;
      taskAssignee.insertAdjacentHTML('beforeend', markup);
    }

    if (!username && !_id) {
      const res = await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/admin/get-all-user',
        withCredentials: true,
      });
      const {
        data: { users },
      } = res.data;

      taskAssignee.insertAdjacentHTML(
        'beforeend',
        '<option value="" disabled selected>Select assignee</option>'
      );

      users.forEach((user) => {
        const markup = `<option value="${user._id}">${user.username}</option>`;
        taskAssignee.insertAdjacentHTML('beforeend', markup);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const assignTask = async (eve) => {
  eve.preventDefault();
  const taskTitle = document.querySelector('#task-title').value;
  const taskDescription = document.querySelector('#task-description').value;
  const taskAssignee = document.querySelector('#task-assignee').value;
  const taskPriority = document.querySelector('#task-priority').value;
  const taskDueDate = document.querySelector('#task-due-date').value;

  try {
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/admin/assign-task',
      data: {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        dueDate: taskDueDate,
        assignee: taskAssignee,
      },
      withCredentials: true,
    });
    console.log('successfully created', res.data);
    window.location.href = 'http://127.0.0.1:3000/admin/all-user';
  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector('.task-form-button')
  .addEventListener('click', assignTask);
