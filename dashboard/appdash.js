window.onload = function(){
   
    const buttonLogout = document.getElementById('btnLogout');
    buttonLogout.onclick = function(){
        localStorage.clear();
        window.location.href='/index.html';
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

    fetch("https://basic-server-one.vercel.app/users").then(
        res=>{
            res.json().then(
                data=>{
                    console.log(data.data);
                    if(data.data.length > 0){
                        var temp = "";

                        //start for loop
                        data.data.forEach((u)=>{
                            temp += "<tr>";
                            temp += "<td>"+u.id+"</td>";
                            temp += "<td>"+u.name+"</td>";
                            temp += "<td>"+u.email+"</td>";
                            // temp += "<td>"+u.address+"</td>";
                            // temp += "<td>"+u.company+"</td>";
                            temp += "<td>"+u.phone+"</td>";
                            temp += "<td>"+u.website+"</td></tr>";
                        });
                        //close for loop
                        document.getElementById("data").innerHTML = temp;
                    }
                    //IF ERROR
                    if (res.status!=200) {
                        console.log('F en el chat');
                        //Show modal
                        modal.style.display = "block";
                    }
                }
            )
        }
    )
}