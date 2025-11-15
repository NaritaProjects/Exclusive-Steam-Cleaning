document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".q-step");
    const nextBtn = document.getElementById("nextBtn");
    const sendBtn = document.getElementById("sendBtn");
    const qLabel = document.getElementById("q-label");

    const qtyDisplay = document.getElementById("qty-display");
    const qtyInput = document.getElementById("quantity");
    const plusBtn = document.getElementById("qty-plus");
    const minusBtn = document.getElementById("qty-minus");

    // Always default quantity to at least 1
    qtyInput.value = 1;
    qtyDisplay.textContent = 1;

    plusBtn.addEventListener("click", () => {
        let qty = parseInt(qtyInput.value) || 1;
        qty++;
        qtyInput.value = qty;
        qtyDisplay.textContent = qty;
    });

    minusBtn.addEventListener("click", () => {
        let qty = parseInt(qtyInput.value) || 1;
        if (qty > 1) qty--;
        qtyInput.value = qty;
        qtyDisplay.textContent = qty;
    });

    let currentStep = 1;

    const quantityLabels = {
        "Upholstery Cleaning": "How many seats/items?",
        "Mattress Steam & Extraction": "How many mattresses?",
        "Carpet Deep Cleaning": "How many rooms?",
        "Car Interior Cleaning": "How many seats/items?"
    };

    const unitNames = {
        "Upholstery Cleaning": "seat",
        "Mattress Steam & Extraction": "mattress",
        "Carpet Deep Cleaning": "room",
        "Car Interior Cleaning": "seat"
    };

    function pluralize(count, word) {
        return count === 1 ? word : word + "s";
    }

    function showStep(step) {
        steps.forEach((s, i) => {
            s.style.display = (i === step - 1) ? "block" : "none";
        });

        if (step === 1) qLabel.textContent = "What type of cleaning do you need?";
        if (step === 2) {
            const service = document.getElementById("service").value;
            qLabel.textContent = quantityLabels[service] || "How many items?";
        }
        if (step === 3) qLabel.textContent = "Select your area in Durban";
        if (step === 4) {
            qLabel.textContent = "Ready to send your details";
            updateWhatsAppLink();
            nextBtn.style.display = "none";
        }
    }

    function validateStep(step) {
        const service = document.getElementById("service").value;
        const quantity = parseInt(qtyInput.value) || 1;
        const location = document.getElementById("location").value;

        if (step === 1 && !service) {
            alert("Please select a service.");
            return false;
        }
        if (step === 2 && quantity < 1) {
            alert("Please enter a valid quantity.");
            return false;
        }
        if (step === 3 && !location) {
            alert("Please select your area.");
            return false;
        }
        return true;
    }

    function updateWhatsAppLink() {
        const service = document.getElementById("service").value;
        const quantity = parseInt(qtyInput.value);
        const location = document.getElementById("location").value;

        const unit = unitNames[service] || "item";
        const unitWord = pluralize(quantity, unit);

        const message =
            `Good day! I would like assistance with a cleaning service.

🧹 *Service Requested:* ${service}
📦 *Amount Needed:* ${quantity} ${unitWord}
📍 *Location:* ${location}

Please advise on availability, pricing, and the next steps.`;

        sendBtn.href = `https://wa.me/+27768741012?text=${encodeURIComponent(message)}`;
    }

    nextBtn.addEventListener("click", () => {
        if (!validateStep(currentStep)) return;
        currentStep++;
        showStep(currentStep);
    });

    showStep(currentStep);
});
