const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
    // Prevent browser refreshing
    event.preventDefault();

    // Getting userinput

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Make sure all the fields are not empty

    if (name === '' || email === '' || message === '') {
        formStatus.textContent = "Please fill out all fields.";
        formStatus.className = "error";
        return; // Making the function stop when an error occurs
    }

    // Check for correct email pattern - using a simple regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!email.match(emailPattern)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.className = "error";
        return;
    }

    // Simulation a fake message sent!

    formStatus.textContent = "Sending Message...";
    formStatus.className = "";

    // Simulating a small server delay

    setTimeout(() => {
        formStatus.textContent = "Message sent successfully!";
        formStatus.className = "success";
    }, 3000);

});