// Function to submit a contact
function submitConnection() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const email = document.getElementById("email").value;

  if (!name || !date || !email || !selectedConnection) {
    alert(
      "Please fill in all fields and select a connection type before contact."
    );
    return;
  }

  const connection = selectedConnection;

  const contact = {
    name,
    connection,
    date,
    email,
  };

  // Save the contact to sessionStorage
  const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
  bookings.push(contact);
  sessionStorage.setItem("bookings", JSON.stringify(bookings));

  // Display the success modal
  const modal = document.getElementById("success-modal");
  modal.style.display = "block";

  // Reset the form and selected connection
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("email").value = "";
  selectedConnection = null;

  // Update button styles
  document.querySelectorAll("[name='connection-button']").forEach((button) => {
    button.classList.remove("selected");
  });

  displayConnections();
}

function closeModal() {
  // Hide the success modal
  const modal = document.getElementById("success-modal");
  modal.style.display = "none";
}

let selectedConnection = null;

function selectConnection(connection) {
  selectedConnection = connection;

  // Reset button styles
  document.querySelectorAll("[name='connection-button']").forEach((button) => {
    button.classList.remove("selected");
  });

  // Apply style to the selected button
  const selectedButton = document.querySelector(
    `[onclick="selectConnection('${connection}')"]`
  );
  if (selectedButton) {
    selectedButton.classList.add("selected");
  }
}

// Displays connections within div block
function displayConnections() {
  const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
  const agenda = document.getElementById("agenda");

  if (bookings.length === 0) {
    agenda.innerHTML = "<p>No bookings yet.</p>";
  } else {
    agenda.innerHTML = "";
    bookings.forEach((connection) => {
      const agendaItem = document.createElement("div");
      agendaItem.className = "agenda-item";

      const connectionDetails = `
              <p><strong>Name:</strong> ${connection.name}</p>
              <p><strong>Connection Type:</strong> ${connection.connection}</p>
              <p><strong>Birthday:</strong> ${connection.date}</p>
              <p><strong>Email:</strong> ${connection.email}</p>
          `;

      agendaItem.innerHTML = connectionDetails;
      agenda.appendChild(agendaItem);
    });
  }
}
