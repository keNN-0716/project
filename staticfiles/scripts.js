document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("myModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navLinksAll = document.querySelectorAll(".nav-link");
    
    window.openModal = function(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = "block";
    }

    window.closeModal = function() {
        modal.style.display = "none";
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", window.closeModal);
    }

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            window.closeModal();
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            this.classList.toggle("active");
        });
    }
    
    // Active nav link on scroll
    window.addEventListener("scroll", function() {
        let fromTop = window.scrollY + 80;
        
        navLinksAll.forEach(link => {
            let section = document.querySelector(link.hash);
            
            if (section && 
                section.offsetTop <= fromTop && 
                section.offsetTop + section.offsetHeight > fromTop) {
                navLinksAll.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });
    
    // Close mobile menu when clicking nav links
    navLinksAll.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.classList.remove("active");
            mobileMenuBtn.classList.remove("active");
        });
    });

    // Secret Numpad functionality
    const floatBtn = document.getElementById('fixed-float-btn');
    const numpadModal = document.getElementById('numpadModal');
    const numpadDisplay = document.getElementById('numpadDisplay');
    const numpadKeys = document.querySelectorAll('.numpad-key');
    let enteredCode = '';
    const SECRET_CODE = '143';

    if (floatBtn) {
        floatBtn.addEventListener('click', function() {
            numpadModal.classList.add('active');
            resetNumpad();
        });
    }

    if (numpadKeys) {
        numpadKeys.forEach(key => {
            key.addEventListener('click', function() {
                const value = this.getAttribute('data-value');

                if (value === 'close') {
                    numpadModal.classList.remove('active');
                    resetNumpad();
                } else if (value === 'clear') {
                    resetNumpad();
                } else {
                    if (enteredCode.length < 3) {
                        enteredCode += value;
                        updateDisplay();

                        if (enteredCode.length === 3) {
                            if (enteredCode === SECRET_CODE) {
                                // Correct code - redirect to secret page
                                window.location.href = '/secret';
                            } else {
                                // Wrong code - shake effect and reset
                                numpadDisplay.style.animation = 'none';
                                numpadDisplay.offsetHeight; // Trigger reflow
                                numpadDisplay.style.animation = 'shake 0.5s ease';
                                setTimeout(resetNumpad, 500);
                            }
                        }
                    }
                }
            });
        });
    }

    // Close numpad when clicking outside container
    numpadModal.addEventListener('click', function(e) {
        if (e.target === numpadModal) {
            numpadModal.classList.remove('active');
            resetNumpad();
        }
    });

    function resetNumpad() {
        enteredCode = '';
        updateDisplay();
    }

    function updateDisplay() {
        let displayText = '';
        for (let i = 0; i < 3; i++) {
            if (enteredCode[i]) {
                displayText += '* ';
            } else {
                displayText += '_ ';
            }
        }
        numpadDisplay.textContent = displayText.trim();
    }
});
