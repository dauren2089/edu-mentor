// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        console.log('User logged in! UID:', user.uid);
        // location.replace("home.html");
        setTimeout(() => location.replace("home.html"), 3000);
    } else {
        console.log('User logged out');
    }
});

// add evenlistener to sign in button
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred);
      
        // reset form
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = 'Success!';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });

});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  //used signOut() method to logout
  auth.signOut();
});

//init #signup-form
const signupForm = document.querySelector('#signup-form');
    // add evenlistener to sign up button
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // get user info
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value
    });
    }).then(() => {
        //console.log(cred);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        // M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});
