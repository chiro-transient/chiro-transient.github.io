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

            const confirmationMessage = document.createElement('p');
            confirmationMessage.textContent = 'Thank you for your booking! We will contact you shortly.';
            confirmationMessage.style.color = 'green';
            bookingForm.appendChild(confirmationMessage);

            setTimeout(() => {
                confirmationMessage.remove();
                bookingForm.reset();
            }, 3000);
        });
    }

    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', function() {
            checkoutInput.min = checkinInput.value;
        });
    }
});