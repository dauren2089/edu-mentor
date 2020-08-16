// add admin cloud functions

const adminForm = document.querySelector('.admin-actions');

adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');

  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  })
})

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
      // check if the user has the admins claim
      user.getIdTokenResult().then(IdTokenResult => {
        // console.log(IdTokenResult.claims);
        user.admin = IdTokenResult.claims.admin;
        setupUI(user);
      })
      console.log('User logged in! UID:', user.uid);
      // get the data db.collection refers specific data from Firestore db
      // BELOW: not real-time updating methods >> .GET().THEN() 
      //db.collection('guides').get().then(snapshot => {

      //BELOW: Method for realTime updating data >> .ONSNAPSHOT()
      db.collection('guides').onSnapshot(snapshot => {
        // console.log(snapshot.docs);
        // setupUI(user);
        setupGuides(snapshot.docs);
      }, err => {
        console.log(err.message);
      });

  } else {
      console.log('User logged out');
      setupUI();
      setupGuides([]);
      setTimeout(() => location.replace("index.html"), 3000);
  }
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  //used signOut() method to logout
  auth.signOut();
});

// get access to html arributes to show the data from db
const guideList = document.querySelector('.guides');

//function thats show up the data
const setupGuides = (dataFromDB) => {

  // добавляем правила для проверки безопасности
  if (dataFromDB.length) {
    // обновляемая переменная HTML
    // необходима для записи данных из DB
    let html = '';

    //функция для обходма массива из DB
    dataFromDB.forEach(Element => {
    
      //находим из массива необходимые данные и присваиваем в переменную GUIDE
      const guide = Element.data();

      // создаем заготовок для вставки в главный html с выгзузкой данных из DB 
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;

      // добавляем заготовки
      html += li;
    });

    //вставляем в HTML отрезок полученного кода
    guideList.innerHTML = html;

  } else {
    const h5 = `
      <h5 class="center-align">Login to view guides</h5>
    `;
    guideList.innerHTML = h5;
  }
}

// Create new guide
const createForm = document.querySelector('#create-form');
//add evenlistener to listen button click
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  //add new guide to DB using db.collection.add methods
  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    //close the modal page and reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    // modal.style.display = "none";
    createForm.reset();
  }).catch(err => {
    console.log(err.message)
    createForm.querySelector('.error').innerHTML = err.message;
  })  
});

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

// Showing account info
const accountDetails = document.querySelector(".account-details");

//showing admin info
// const adminItems = document.querySelectorAll('.admin');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }

    db.collection('users').doc(user.uid).get().then(doc => {
    //account info
    const html = `
      <div>UID:  ${user.uid}</div>
      <div>Name: ${user.displayname}</div>
      <div>Email: ${user.email}</div>
      <div>Bio: ${doc.data().bio}</div>
      <div class="red-text">${user.admin ? 'Admin' : ''}</div>
    `;
    accountDetails.innerHTML = html;
    })
  } else {
    // adminItems.forEach(item => item.style.display = 'none');
    accountDetails.innerHTML = '';
    adminItems.forEach(item => item.style.display = 'none');
  }
};
