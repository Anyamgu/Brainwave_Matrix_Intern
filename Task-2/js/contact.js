document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.querySelector("input[type='text']").value;
        const email = form.querySelector("input[type='email']").value;
        const message = form.querySelector("textarea").value;

        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been received.`);
            form.reset();
        } else {
            alert("Please fill out all fields.");
        }
    });
});
