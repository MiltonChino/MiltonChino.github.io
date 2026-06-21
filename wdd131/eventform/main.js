const form = document.querySelector("#eventForm");
const type = document.querySelector("#type");
const idContainer = document.querySelector("#idContainer");
const id = document.querySelector("#id");
const output = document.querySelector("#output");

const idLabel = idContainer.querySelector("label");

function updateIdField() {
    const value = type.value;

    idContainer.hidden = true;
    id.required = false;
    if (value === 'student') {
        idContainer.hidden = false;
        id.required = true;
        idLabel.textContent = "Student I#";
    } else if (value === 'guest') {
        idContainer.hidden = false;
        id.required = true;
        idLabel.textContent = "Access Code";
    }
}

type.addEventListener("change", updateIdField);
updateIdField();


// Ensure they choose a date later than the current date
function isPastDate(value) {
    const today = new Date();
    const chosen = new Date(value);
    return chosen < today;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const type = form.type.value;
    const eventDate = form.eventDate.value;
    const id = form.id.value.trim();

    // Validate the input
    if (type === 'student') {
        if (!id) {
            output.textContent = "Please add a student ID number";
            return;
        }
        if (id.length !== 9) {
            output.textContent = "Student ID must be exactly 9 digits";
            return;
        }
    }

    if (type === 'guest') {
        if (!id) {
            output.textContent = "Please add an access code";
            return;
        }
        if (id.toUpperCase() !== 'EVENT131') {
            output.textContent = "Please enter the correct access code";
            return;
        }
    }

    if (isPastDate(eventDate)) {
        output.textContent = "Please choose a later date";
        return;
    }

    output.innerHTML = `
  <h2>Ticket created</h2>
  <p>${firstName} ${lastName}</p>
  <p>Type: ${type}</p>
  <p>Event date: ${eventDate}</p>
  `;

    form.reset();
    updateIdField();
});
