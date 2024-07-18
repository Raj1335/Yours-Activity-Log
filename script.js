document.addEventListener('DOMContentLoaded', () => {
    const activityForm = document.getElementById('activity-form');
    const activityInput = document.getElementById('activity-input');
    const activityTime = document.getElementById('activity-time');
    const activityList = document.getElementById('activity-list');
    const changeNameBtn = document.getElementById('change-name');
    const nameUser = document.getElementById('user-name');

    
  // this function was causing to load the activities twice ; henced commented out
    // loadActivities();

    let userName = localStorage.getItem('userName');
    if(!userName){
      userName = prompt('Enter your name, you can change it letter from menu');
      localStorage.setItem('userName',userName);
    }

    nameUser.textContent = userName + "'s";

    loadActivities();

  
    activityForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const activity = activityInput.value.trim();
      const time = activityTime.value || new Date().toISOString(); // Use user input or current time
  
      if (activity === '') {
        return;
      }
  
      const activityData = {
        activity,
        time
      };
  
      addActivityToList(activityData);
      saveActivityToLocalStorage(activityData);
  
      activityInput.value = '';
      activityTime.value = ''; 
    });
  
    function addActivityToList(activityData) {
      const li = document.createElement('li');
      li.innerHTML = `
        ${activityData.activity} - ${formatDate(activityData.time)}
        <button class="delete-btn" onclick="confirmDelete('${activityData.activity}', '${activityData.time}')">x</button>
      `;
      activityList.appendChild(li);
    }
  
    function saveActivityToLocalStorage(activityData) {
      let activities = JSON.parse(localStorage.getItem('activities')) || [];
      activities.push(activityData);
      localStorage.setItem('activities', JSON.stringify(activities));
    }
  
    function loadActivities() {
      let activities = JSON.parse(localStorage.getItem('activities')) || [];
      activities.forEach(activityData => addActivityToList(activityData));
    }
  
    function formatDate(dateTime) {
      const date = new Date(dateTime);
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return date.toLocaleString(undefined, options);
    }
  
    window.confirmDelete = function(activity, time) {
      if (confirm('Are you sure you want to delete this activity?')) {
        deleteActivity(activity, time);
      }
    };
  
    function deleteActivity(activity, time) {
      let activities = JSON.parse(localStorage.getItem('activities')) || [];
      activities = activities.filter(a => a.activity !== activity || a.time !== time);
      localStorage.setItem('activities', JSON.stringify(activities));
      refreshActivityList();
    }

   const dltAllBtn = document.getElementById('dlt-all');
    dltAllBtn.addEventListener('click', ()=>{
      if(confirm("Delete All Data ? This cannot be Undone !...")){
      localStorage.removeItem('activities');
       refreshActivityList();
    }
}) 
  
changeNameBtn.addEventListener('click', ()=>{
  const newName = prompt('Enter new name..');
  if(newName){
    localStorage.setItem('userName', newName);
    nameUser.textContent = newName + "'s";
  }
});

    function refreshActivityList() {
      activityList.innerHTML = '';
      loadActivities();
    }
  });
  
  const menuToggle = document.getElementById('menu-toggle');
const menuContent = document.querySelector('.show');

menuToggle.addEventListener('click', () => {
  menuContent.classList.toggle('show');
});

