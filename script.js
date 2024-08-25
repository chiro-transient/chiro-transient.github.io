document.addEventListener("DOMContentLoaded", function() {
    const loaderContainer = document.getElementById("loader-container");
    loaderContainer.style.display = "none";

    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(bookingForm);
            const bookingDetails = {
                name: formData.get('name'),
                email: formData.get('email'),
                checkin: formData.get('checkin'),
                checkout: formData.get('checkout'),
                roomType: formData.get('room-type'),
                guests: formData.get('guests')
            };

            console.log('Booking Details:', bookingDetails);

            // Send data to Google Sheets via Apps Script Web App
            fetch("https://script.google.com/macros/s/your-web-app-url/exec", {
                method: 'POST',
                body: JSON.stringify(bookingDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);

                // Display confirmation message to the user
                const confirmationMessage = document.createElement('p');
                confirmationMessage.textContent = 'Thank you for your booking! We will contact you shortly.';
                confirmationMessage.style.color = 'green';
                bookingForm.appendChild(confirmationMessage);

                // Clear the form and remove the message after 3 seconds
                setTimeout(() => {
                    confirmationMessage.remove();
                    bookingForm.reset();
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Additional logic for check-in and check-out date inputs
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', function() {
            checkoutInput.min = checkinInput.value;
        });
    }
});
