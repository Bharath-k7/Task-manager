let _id;
document.addEventListener('DOMContentLoaded', async () => {
  const taskDetails = document.querySelector('.status-task-details');
  const taskStatus = document.querySelector('#task-status');
  const { pathname } = window.location;
  // console.log(pathname);
  _id = pathname.split('/')[3];

  const res = await axios({
    method: 'get',
    url: `http://127.0.0.1:3000/api/admin/get-task-by-id/${_id}/`,
    withCredentials: true,
  });
  const {
    data: { task },
  } = res.data;

  ['pending', 'in-progress', 'completed', 'denied'].forEach((status) => {
    taskStatus.insertAdjacentHTML(
      'beforeend',
      `<option value="${status}"  ${status === task.status ? 'selected' : ''}>${
        status === 'denied' ? 'deny' : status
      }</option>`
    );
  });
  const markup = `<p class="task-title"><span>Title:</span> ${task.title}</p>
                  <p class="task-description">
                       <span>Description:</span> ${task.description}
                  </p>
                  <p class="task-assignee"><span>Assignee:</span> ${
                    task.assignee.username
                  }</p>
                  <p class="task-priority"><span>Priority:</span> ${
                    task.priority
                  }</p>
                  <p class="task-createdBy"><span>Created By:</span> ${
                    task.createdBy.username
                  }</p>
                  <p class="task-createdAt"><span>Created At:</span> ${
                    task.createdAt.split('T')[0]
                  }</p>
                  <p class="task-dueDate"><span>Due Date:</span> ${
                    task.dueDate.split('T')[0]
                  }</p>`;
  taskDetails.insertAdjacentHTML('afterbegin', markup);
});

document
  .querySelector('.statusUpdate-btn')
  .addEventListener('click', async (eve) => {
    eve.preventDefault();
    try {
      const { pathname } = window.location;
      _id = pathname.split('/')[3];

      const res = await axios({
        method: 'patch',
        url: `http://127.0.0.1:3000/user/status-update/${_id}`,
        data: {
          status: document.querySelector('#task-status').value,
        },
        withCredentials: true,
      });
      console.log('successfully status updated!');
    } catch (error) {
      console.log(error);
    }
  });
