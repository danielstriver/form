const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if(!name || !email || !message) {
        formStatus.textContent = "Please fill out all fields";
        formStatus.className = "error";
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        formStatus.textContent = "Please enter a valid email";
        formStatus.className = "error";
        return;
    }

    formStatus.textContent = "Sending Message...";
    formStatus.className = "";

    try {
        const response = await fetch("http://localhost:5000/send", {
            method: "POST",
            headers: {"content-Type": "application/json"}, 
            body: JSON.stringify({name, email, message}),
        });

        const result = await response.json();

        if (result.success) {
            formStatus.textContent = result.message;
            formStatus.className = "success";
            contactForm.reset();
        } else {
            formStatus.textContent = result.message;
            formStatus.className = "error";
        }
    } catch (error) {
        console.error(error);
        formStatus.textContent = "Something went wrong, please try again.";
        formStatus.className = "error";
    }
});