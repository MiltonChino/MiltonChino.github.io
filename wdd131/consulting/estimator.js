/**
 * Apex Software Consulting - Interactive Cost Estimator Logic
 * Milton Chino | WDD 131-A2
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Pricing and labels mapping
    const FEATURE_PRICES = {
        uiux: 1500,
        auth: 1000,
        ecommerce: 2000,
        dashboard: 2500,
        mobile: 3500
    };

    const FEATURE_NAMES = {
        uiux: "UI/UX Design",
        auth: "User Login & Authentication",
        ecommerce: "E-commerce Integration & Payments",
        dashboard: "Analytics & Admin Dashboard",
        mobile: "Mobile Companion App"
    };

    // 2. DOM Elements Selection
    const form = document.getElementById("estimator-form");
    const checkboxes = document.querySelectorAll('input[name="features"]');
    const totalPriceDisplay = document.getElementById("estimator-total-price");
    const summaryBreakdownList = document.getElementById("summary-breakdown-list");
    
    // Inputs & Errors
    const clientNameInput = document.getElementById("client-name");
    const clientEmailInput = document.getElementById("client-email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    // Modal elements
    const successModal = document.getElementById("success-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalNameVal = document.getElementById("modal-name-val");
    const modalEmailVal = document.getElementById("modal-email-val");
    const modalFeaturesVal = document.getElementById("modal-features-val");
    const modalTotalVal = document.getElementById("modal-total-val");

    // 3. Main Estimate Calculator Function
    function calculateTotal() {
        let total = 0;
        let selectedItems = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const key = checkbox.value;
                const price = FEATURE_PRICES[key] || 0;
                const name = FEATURE_NAMES[key] || key;
                total += price;
                selectedItems.push({ name, price });
            }
        });

        // Update Total Display
        totalPriceDisplay.textContent = `$${total.toLocaleString()}`;

        // Render Summary Breakdown List
        summaryBreakdownList.innerHTML = "";
        if (selectedItems.length === 0) {
            summaryBreakdownList.innerHTML = `<p class="empty-breakdown">No features selected yet.</p>`;
        } else {
            selectedItems.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "summary-item-row";
                itemDiv.innerHTML = `
                    <span class="summary-item-name">${item.name}</span>
                    <span class="summary-item-price">$${item.price.toLocaleString()}</span>
                `;
                summaryBreakdownList.appendChild(itemDiv);
            });
        }

        return { total, selectedItems };
    }

    // 4. Input Validation Helper Function
    function validateForm() {
        let isValid = true;

        // Reset error messages
        nameError.classList.remove("active");
        emailError.classList.remove("active");
        clientNameInput.classList.remove("invalid");
        clientEmailInput.classList.remove("invalid");

        // Validate Name
        if (!clientNameInput.value.trim()) {
            nameError.textContent = "Full name is required.";
            nameError.classList.add("active");
            clientNameInput.classList.add("invalid");
            isValid = false;
        }

        // Validate Email
        const emailValue = clientEmailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            emailError.textContent = "Email address is required.";
            emailError.classList.add("active");
            clientEmailInput.classList.add("invalid");
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.classList.add("active");
            clientEmailInput.classList.add("invalid");
            isValid = false;
        }

        return isValid;
    }

    // 5. Submit Event Handler
    function handleFormSubmit(event) {
        event.preventDefault();

        // Run validation
        if (!validateForm()) {
            return;
        }

        // Get estimate data
        const { total, selectedItems } = calculateTotal();
        const clientName = clientNameInput.value.trim();
        const clientEmail = clientEmailInput.value.trim();
        
        // Prepare submission details
        const submission = {
            id: `est_${Date.now()}`,
            name: clientName,
            email: clientEmail,
            features: selectedItems.map(item => item.name),
            totalPrice: total,
            submittedAt: new Date().toISOString()
        };

        // Persist to localStorage
        let existingSubmissions = [];
        try {
            existingSubmissions = JSON.parse(localStorage.getItem("apex_consultations")) || [];
        } catch (e) {
            existingSubmissions = [];
        }
        existingSubmissions.push(submission);
        localStorage.setItem("apex_consultations", JSON.stringify(existingSubmissions));

        // Populate Modal Fields
        modalNameVal.textContent = submission.name;
        modalEmailVal.textContent = submission.email;
        modalTotalVal.textContent = `$${submission.totalPrice.toLocaleString()}`;

        modalFeaturesVal.innerHTML = "";
        if (submission.features.length === 0) {
            modalFeaturesVal.innerHTML = "<li>None</li>";
        } else {
            submission.features.forEach(featName => {
                const li = document.createElement("li");
                li.textContent = featName;
                modalFeaturesVal.appendChild(li);
            });
        }

        // Open Success Modal Popup
        openModal();
    }

    // 6. Modal Functions
    function openModal() {
        successModal.classList.add("active");
        successModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModal() {
        successModal.classList.remove("active");
        successModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Re-enable background scroll
        
        // Reset the form fully
        form.reset();
        calculateTotal();
        
        // Clear active validation errors
        nameError.classList.remove("active");
        emailError.classList.remove("active");
        clientNameInput.classList.remove("invalid");
        clientEmailInput.classList.remove("invalid");
    }

    // 7. Event Listeners Setup
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", calculateTotal);
    });

    form.addEventListener("submit", handleFormSubmit);
    closeModalBtn.addEventListener("click", closeModal);

    // Close modal when clicking the top-right X button
    const closeXBtn = document.getElementById("modal-close-x");
    if (closeXBtn) {
        closeXBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking on the overlay background (outside the modal box)
    successModal.addEventListener("click", (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });

    // Real-time input validation triggers on blur
    clientNameInput.addEventListener("blur", () => {
        if (clientNameInput.value.trim()) {
            nameError.classList.remove("active");
            clientNameInput.classList.remove("invalid");
        }
    });
    clientEmailInput.addEventListener("blur", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (clientEmailInput.value.trim() && emailPattern.test(clientEmailInput.value.trim())) {
            emailError.classList.remove("active");
            clientEmailInput.classList.remove("invalid");
        }
    });

    // Initial calculation (to handle browser-cached checkboxes on reload)
    calculateTotal();
});
