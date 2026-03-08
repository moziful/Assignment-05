document.getElementById("signInButton").addEventListener("click", ()=>{
    const EnteredUsername = document.getElementById("usernameInput").value;
    const EnteredPassword = document.getElementById("passwordInput").value;
    if(EnteredUsername === "admin" && EnteredPassword === "admin123"){
        console.log("Correct Username & Password");
    } else {
        alert("Wrong Credentials!")
    }
});