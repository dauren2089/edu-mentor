const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");

const signupModal = document.querySelector(".signup-modal-overlay");
const signinModal = document.querySelector(".signin-modal-overlay");


const btnClose = document.querySelector(".btn-close");

const closeBtn = document.querySelector(".close-btn");

// open singup modal page
// signupBtn.addEventListener("click", function() {
//     signupModal.classList.add("signup-open-modal");

//     closeBtn.addEventListener("click", function() {
//         signupModal.classList.remove("signup-open-modal");
//     });


// });

// Sign in Modal page functions
signupBtn.onclick = () => {
    signupModal.classList.add("signup-open-modal");

    closeBtn.addEventListener('click', closeModal);
    signupModal.addEventListener('click', hideModal);

    function closeModal() {
        signupModal.classList.remove("signup-open-modal");
        signupModal.removeEventListener('click', closeModal);
    }
    function hideModal(event) {
        if (event.target === signupModal) {
            signupModal.classList.remove("signup-open-modal");
            signupModal.removeEventListener('click', hideModal);
        }
    }
}

// Sign in Modal page functions
signinBtn.onclick = () => {
    signinModal.classList.add("signin-open-modal");

    btnClose.addEventListener('click', closeModal);
    signinModal.addEventListener('click', hideModal);

    function closeModal() {
        signinModal.classList.remove("signin-open-modal");
        signinModal.removeEventListener('click', closeModal);
    }
    function hideModal(event) {
        if (event.target === signinModal) {
            signinModal.classList.remove("signin-open-modal");
            signinModal.removeEventListener('click', hideModal);
        }
    }
}

