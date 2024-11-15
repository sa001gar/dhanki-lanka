(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    
    // Services carousel
$(".service-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav : false,
    responsive: {
        0:{
            items:1  // 1 item per slide on mobile
        },
        768:{
            items:2  // 2 items per slide on tablet
        },
        992:{
            items:3  // 3 items per slide on desktop
        }
    }
});



    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    
    
})(jQuery);


// Set default values for date and time
// Set the current date as the default for the date field
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

const now = new Date();

// Format the current date as yyyy-MM-dd for the date input
const formattedDate = now.toISOString().split('T')[0];
dateInput.value = formattedDate;

// Format the current time as HH:mm for the time input
const formattedTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
});
timeInput.value = formattedTime;

// Event listeners for validation
dateInput.addEventListener('input', validateDate);
timeInput.addEventListener('input', validateTime);

// Add event listeners for live validation
document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmailOrPhone);
document.getElementById('date').addEventListener('input', validateDate);
document.getElementById('time').addEventListener('input', validateTime);
document.getElementById('select1').addEventListener('input', validateSeats);

function validateName() {
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    if (name === "") {
        nameError.classList.remove('d-none');
    } else {
        nameError.classList.add('d-none');
    }
}

function validateEmailOrPhone() {
    const emailOrPhone = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailError = document.getElementById('emailError');
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        emailError.classList.remove('d-none');
    } else {
        emailError.classList.add('d-none');
    }
}

function validateDate() {
    const selectedDate = dateInput.value;
    const currentDate = new Date().toISOString().split('T')[0];
    const dateError = document.getElementById('dateError');
    if (selectedDate < currentDate) {
        dateError.classList.remove('d-none');
    } else {
        dateError.classList.add('d-none');
    }
}

function validateTime() {
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;
    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const timeError = document.getElementById('timeError');
    if (selectedDateTime < currentDateTime) {
        timeError.classList.remove('d-none');
    } else {
        timeError.classList.add('d-none');
    }
}
function validateSeats() {
    const seats = document.getElementById('select1').value;
    const seatsError = document.getElementById('seatsError');
    if (seats === "" || seats <= 0) {
        seatsError.classList.remove('d-none');
    } else {
        seatsError.classList.add('d-none');
    }
}

// Final form validation
function validateForm(event) {
    validateName();
    validateEmailOrPhone();
    validateDate();
    validateTime();
    validateSeats();

    const errors = document.querySelectorAll('.text-danger:not(.d-none)');
    return errors.length === 0; // Prevent form submission if there are errors
}
