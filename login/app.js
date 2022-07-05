window.onload = function(){
    //IF USER ALREADY LOGGED GO TO DASHBOARD
    if ((localStorage.getItem('email') && localStorage.getItem('password'))!=null) {
        window.location.href = '/dashboard/dashboard.html';
    }

    //MODAL SETUP
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }

    //INPUTS RETRIVE
    const clickButton = document.getElementById('btn');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var em_email = document.getElementById('em_email');
    var em_password = document.getElementById('em_password');

    // //GET LOCAL STORAGE
    // email.value = localStorage.getItem('email');
    // password.value = localStorage.getItem('password');

    //VALIDATION FUNCTIONS
    //Password
    function validatePassword(){
        if (password.value.length < 7) {
            em_password.classList.remove('hiddenError');
            successMsg = false;
        }
    }    
    //Email
    function validateEmail(){
        regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!regex.test(email.value)) {
            em_email.classList.remove('hiddenError');
            successMsg = false;
        }
    }

    //CLEAR ERROR FUNCTION
    function clearErrorMsg(){
        var errorType = "em_" + document.activeElement.name;
        var errorMsg = document.getElementById(errorType);
        errorMsg.classList.add('hiddenError');
    }

    //CLEANING ERROR EVENTS
    email.addEventListener('focus',clearErrorMsg);
    password.addEventListener('focus',clearErrorMsg);

    //LOGIN FETCH API
    clickButton.onclick = function(){
        clickButton.addEventListener('click', () => {
        })
        //Execute validations
        validateEmail();
        validatePassword();

        //Continue to fetch api to login
        fetch("https://basic-server-one.vercel.app/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: email.value,
            password: password.value
            })
        })

        .then(function(response){
            //IF SUCCESS
            if (response.status===200) {
                console.log('cool');
                console.log('loggueadix');

            //Local storage
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value);
            
            //Redirect to dashboard
            window.location.href = '/dashboard/dashboard.html';
            }

            //IF ERROR
            if (response.status!=200) {
                console.log('F en el chat');
                //Show modal
                modal.style.display = "block";
            }
            return response.text()
        })
        .then(function(text){
            console.log(text);
        })
        .catch(function(error){
            console.log(error);
            console.log('F en el chat');
        })
    }
}

