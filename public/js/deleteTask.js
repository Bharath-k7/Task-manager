let _id;
document.addEventListener('DOMContentLoaded', async () => {
  const taskDetails = document.querySelector('.delete-task-details');
  const { pathname } = window.location;
  _id = pathname.split('/')[3];

  const res = await axios({
    method: 'get',
    url: `http://127.0.0.1:3000/api/admin/get-task-by-id/${_id}/`,
    withCredentials: true,
  });
  const {
    data: { task },
  } = res.data;

  const markup = `<p class="delete-title"><span>Title:</span> ${task.title}</p>
                  <p class="delete-description">
                       <span>Description:</span> ${task.description}
                  </p>
                  <p class="delete-assignee"><span>Assignee:</span> ${
                    task.assignee.username
                  }</p>
                  <p class="delete-status"><span>Status:</span> ${
                    task.status
                  }</p>
                  <p class="delete-priority"><span>Priority:</span> ${
                    task.priority
                  }</p>
                  <p class="delete-createdBy"><span>Created By:</span> ${
                    task.createdBy.username
                  }</p>
                  <p class="delete-createdAt"><span>Created At:</span> ${
                    task.createdAt.split('T')[0]
                  }</p>
                  <p class="delete-dueDate"><span>Due Date:</span> ${
                    task.dueDate.split('T')[0]
                  }</p>`;
  taskDetails.insertAdjacentHTML('afterbegin', markup);
});

const deleteConfirmPopup = document.querySelector('.delete-confirm-popup');
document.querySelector('.delete-btn').addEventListener('click', (eve) => {
  eve.stopPropagation();
  deleteConfirmPopup.style.display = 'block';
});

document.addEventListener('click', (eve) => {
  if (!eve.target.closest('.delete-confirm-popup'))
    deleteConfirmPopup.style.display = 'none';
});

document
  .querySelector('.delete-confirm-cancel')
  .addEventListener('click', () => {
    deleteConfirmPopup.style.display = 'none';
  });

document
  .querySelector('.delete-confirm-btn')
  .addEventListener('click', async (eve) => {
    eve.preventDefault();
    await axios({
      method: 'delete',
      url: `http://127.0.0.1:3000/admin/delete/${_id}/`,
      withCredentials: true,
    });
    window.location.href = 'http://127.0.0.1:3000/admin/';
    console.log(res.data);
  });
