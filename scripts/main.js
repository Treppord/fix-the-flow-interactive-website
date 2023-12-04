// scripts/main.js

// Function to submit a booking
function submitBooking() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const email = document.getElementById("email").value;
  const selectedTimeSlot = document.querySelector(".selected");

  if (!name || !date || !email || !selectedTimeSlot) {
    alert("Please fill in all fields before booking.");
    return;
  }

  const timeSlot = selectedTimeSlot.value;
  const serviceOption = document.querySelector(".selected-service-option");
  const service = selectedService;
  const serviceDetails = serviceOption
    ? getServiceOptionDetails(serviceOption)
    : null;

  const booking = {
    name,
    service,
    date,
    time: timeSlot,
    email,
    serviceDetails,
  };

  // Save the booking to sessionStorage
  const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
  bookings.push(booking);
  sessionStorage.setItem("bookings", JSON.stringify(bookings));

  // Display the success modal
  const modal = document.getElementById("success-modal");
  modal.style.display = "block";

  // Reset the form
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("email").value = "";
  removeSelectedClass();
  generateTimeSlots();
}

// Function to get details of the selected service option
function getServiceOptionDetails(selectedOption) {
  const duration = selectedOption.innerText.split("\n")[0];
  const price = selectedOption.value;
  return { duration, price };
}

function closeModal() {
  // Hide the success modal
  const modal = document.getElementById("success-modal");
  modal.style.display = "none";
}

function removeSelectedClass() {
  // Remove the 'selected' class from all time slots
  const buttons = document.getElementsByName("time-slot");
  buttons.forEach((button) => {
    button.classList.remove("selected");
    button.style.backgroundColor = ""; // Reset background color for all time slots
  });
}

function generateTimeSlots() {
  const timeSlotsContainer = document.getElementById("time-slots-container");
  const date = new Date(document.getElementById("date").value);

  // Clear previous time slots
  timeSlotsContainer.innerHTML = "";

  // Check if the date is valid
  if (!isNaN(date.getTime())) {
    // Set the initial time to 12:00
    const initialTime = new Date(date);
    initialTime.setHours(12, 0, 0, 0);

    for (let i = 0; i < 20; i++) {
      const timeSlot = new Date(initialTime);
      timeSlot.setMinutes(timeSlot.getMinutes() + i * 15);

      const button = document.createElement("button");
      button.type = "button";
      button.name = "time-slot";
      button.value = timeSlot.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
      });
      button.innerText = timeSlot.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Add click event listener to handle button clicks
      button.addEventListener("click", handleTimeSlotClick);

      timeSlotsContainer.appendChild(button);
    }
  } else {
  }
}

function handleTimeSlotClick() {
  // Remove the 'selected' class from all time slots
  const buttons = document.getElementsByName("time-slot");
  buttons.forEach((button) => {
    button.classList.remove("selected");
    button.style.backgroundColor = ""; // Reset background color for all time slots
  });

  // Add the 'selected' class to the clicked time slot
  this.classList.add("selected");
  this.style.backgroundColor = "#99641f"; // Set background color to red for the selected time slot
}

let selectedService = null;

function selectService(service) {
  selectedService = service;

  // Clear previous service options
  const serviceOptionsContainer = document.getElementById("service-options");
  serviceOptionsContainer.innerHTML = "";

  // Define service options based on the selected service
  const options = getServiceOptions(service);

  // Generate and display service options
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.name = "service-option"; // Add a name attribute to identify service option buttons
    button.value = option.price;
    button.innerText = `${option.duration} Min\n$${option.price}`;
    button.addEventListener("click", handleServiceOptionClick);

    serviceOptionsContainer.appendChild(button);
  });

  // Remove the 'selected' class from all service options when a new service is selected
  removeSelectedServiceOptionClass();
}

function handleServiceOptionClick() {
  // Remove the 'selected' class from all service options
  removeSelectedServiceOptionClass();

  // Add the 'selected' class to the clicked service option
  this.classList.add("selected");
  this.style.backgroundColor = "#99641f"; // Set background color to green for the selected option
}

function removeSelectedServiceOptionClass() {
  // Remove the 'selected' class from all service options
  const buttons = document.getElementsByName("service-option");
  buttons.forEach((button) => {
    button.classList.remove("selected");
    button.style.backgroundColor = ""; // Reset background color for all options
  });
}

function getServiceOptions(service) {
  // Define service options based on the selected service
  if (service === "massage") {
    return [
      { duration: 30, price: 50 },
      { duration: 45, price: 75 },
      { duration: 60, price: 90 },
    ];
  } else if (service === "pedicure") {
    return [
      { duration: 30, price: 40 },
      { duration: 45, price: 65 },
      { duration: 60, price: 70 },
    ];
  } else {
    return [];
  }
}

function displayBookings() {
  const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
  const agenda = document.getElementById("agenda");

  if (bookings.length === 0) {
    agenda.innerHTML = "<p>No bookings yet.</p>";
  } else {
    agenda.innerHTML = "";
    bookings.forEach((booking) => {
      const agendaItem = document.createElement("div");
      agendaItem.className = "agenda-item";

      const bookingDetails = `
              <p><strong>Name:</strong> ${booking.name}</p>
              <p><strong>Service:</strong> ${booking.service}</p>
              <p><strong>Date:</strong> ${booking.date}</p>
              <p><strong>Time:</strong> ${booking.time}</p>
              <p><strong>Email:</strong> ${booking.email}</p>
              <p><strong>Service Details:</strong> ${
                booking.serviceDetails
                  ? `(${booking.serviceDetails.duration}, $${booking.serviceDetails.price})`
                  : "Not specified"
              }</p>
          `;

      agendaItem.innerHTML = bookingDetails;
      agenda.appendChild(agendaItem);
    });
  }
}
