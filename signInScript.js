document.getElementById("signInButton").addEventListener("click", ()=>{
    const EnteredUsername = document.getElementById("usernameInput").value;
    const EnteredPassword = document.getElementById("passwordInput").value;
    if(EnteredUsername === "admin" && EnteredPassword === "admin123"){
        console.log("Correct Username & Password");
        document.getElementById("signInContainer").classList.add("hidden");
        document.getElementById("loader").classList.remove("hidden");
        window.location.href = "./issues.html";
    } else {
        alert("Wrong Credentials!");
        return;
    }
});