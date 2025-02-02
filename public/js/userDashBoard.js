const tableBody = document.querySelector('.user-table tbody');
const loadContent = (tasks) => {
  tableBody.innerHTML = '';
  tasks.forEach((task) => {
    const markup = `<tr>
                      <td>${task.title}</td>
                      <td>${task.priority}</td>
                      <td>${task.dueDate.split('T')[0]}</td>
                      <td>
                        ${task.status}
                        <a href='/user/status-update/${
                          task._id
                        }'><i class="fa-regular fa-pen-to-square"></i></a>
                      </td>
                  </tr>`;
    tableBody.insertAdjacentHTML('beforeend', markup);
  });
};
document.addEventListener('DOMContentLoaded', async () => {
  const res = await axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/api/user/get-tasks-by-user',
    withCredentials: true,
  });
  const {
    data: { tasks },
  } = res.data;
  loadContent(tasks);
});

document.querySelector('.search').addEventListener('click', async () => {
  const searchBy = document.querySelector('#search').value;
  const res = await axios({
    method: 'get',
    url: 'http://127.0.0.1:3000/api/user/get-tasks-by-user',
    params: {
      searchBy,
    },
    withCredentials: true,
  });
  const {
    data: { tasks },
  } = res.data;
  loadContent(tasks);
});

const filterForm = document.querySelector('.filter-form');
document.querySelector('.filter').addEventListener('click', (eve) => {
  eve.stopPropagation();
  filterForm.style.display = 'flex';
});
document.addEventListener('click', (eve) => {
  if (!eve.target.closest('.filter-form')) filterForm.style.display = 'none';
});
document.querySelector('#filter-cancel-btn').addEventListener('click', () => {
  filterForm.style.display = 'none';
});
document
  .querySelector('#filter-apply-btn')
  .addEventListener('click', async () => {
    const filterByStatus = document.querySelector('#status').value;
    const filterByPriority = document.querySelector('#priority').value;
    const res = await axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/api/user/get-tasks-by-user',
      params: {
        filterByStatus,
        filterByPriority,
      },
      withCredentials: true,
    });
    const {
      data: { tasks },
    } = res.data;
    loadContent(tasks);
    filterForm.style.display = 'none';
  });
