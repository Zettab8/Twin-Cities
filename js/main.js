const interestMessages = {
    volunteer: "Volunteers can help with animal care, dog walking, and other shelter needs.",
    foster: "Fostering gives an animal a safe place to stay while waiting for a forever home.",
    adoption: "We can help you learn more about adopting an animal from our rescue."
};

const validationMessages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    interest: "Please choose an interest type.",
    availability: "Please enter your availability.",
    experience: "Please tell us about your experience with pets.",
    message: "Please enter a message that is at least 10 characters."
};

function showInterestMessage() {
    const interest = document.getElementById("interest-selector").value;
    const message = document.getElementById("interest-message");

    message.textContent = interestMessages[interest] || "";
}

function saveInterest() {
    const interest = document.getElementById("interest-selector").value;

    localStorage.setItem("rescueInterest", interest);
}

function saveName() {
    const name = document.getElementById("name").value;

    localStorage.setItem("rescueName", name);
}

function loadSavedData() {
    const savedName = localStorage.getItem("rescueName");
    const savedInterest = localStorage.getItem("rescueInterest");

    if (savedName) {
        document.getElementById("name").value = savedName;
    }

    if (savedInterest) {
        document.getElementById("interest-selector").value = savedInterest;
        document.getElementById("interest").value = savedInterest;
        showInterestMessage();
    }
}

function clearErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("interest-error").textContent = "";
    document.getElementById("availability-error").textContent = "";
    document.getElementById("experience-error").textContent = "";
    document.getElementById("message-error").textContent = "";
}

function validateForm(event) {
    event.preventDefault();

    clearErrors();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const interest = document.getElementById("interest").value;
    const availability = document.getElementById("availability").value;
    const experience = document.getElementById("experience").value;
    const message = document.getElementById("message").value;

    let formIsValid = true;

    if (name === "") {
        document.getElementById("name-error").textContent =
            validationMessages.name;
        formIsValid = false;
    }

    if (email === "" || !email.includes("@")) {
        document.getElementById("email-error").textContent =
            validationMessages.email;
        formIsValid = false;
    }

    if (interest === "") {
        document.getElementById("interest-error").textContent =
            validationMessages.interest;
        formIsValid = false;
    }

    if (availability === "") {
        document.getElementById("availability-error").textContent =
            validationMessages.availability;
        formIsValid = false;
    }

    if (experience === "") {
        document.getElementById("experience-error").textContent =
            validationMessages.experience;
        formIsValid = false;
    }

    if (message.length < 10) {
        document.getElementById("message-error").textContent =
            validationMessages.message;
        formIsValid = false;
    }

    if (formIsValid) {
        document.getElementById("form-message").textContent =
            "Thank you! Your form was completed successfully.";
    }
}

function setupPage() {
    const interestSelector = document.getElementById("interest-selector");
    const formInterest = document.getElementById("interest");
    const nameInput = document.getElementById("name");
    const form = document.getElementById("interest-form");

    loadSavedData();

    interestSelector.addEventListener("change", function() {
        formInterest.value = interestSelector.value;

        showInterestMessage();
        saveInterest();
    });

    nameInput.addEventListener("input", saveName);

    form.addEventListener("submit", validateForm);
}

setupPage();