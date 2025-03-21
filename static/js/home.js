document.getElementById("logout").addEventListener("click", async () => {
    try {
        const response = await fetch("/logout", {method: "GET"});
        if (response.redirected) {
            window.location.href = response.url;        
    }   else {
        const result = await response.text();
        alert(result);
    }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while logging out.");
    }
});