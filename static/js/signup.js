document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    try {
        const response = await fetch("/signup", {
            method: "POST",
            body: formData
        });

        if (response.redirected) {
            window.location.href = response.url;
        }   else {
                const result = await response.text();
                alert(result);
                window.location.href = '/signup';
            }

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while signing up.");
    }
});