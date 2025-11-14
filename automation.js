document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".q-step");
    const nextBtn = document.getElementById("nextBtn");
    const sendBtn = document.getElementById("sendBtn");
    const qLabel = document.getElementById("q-label");

    let currentStep = 1;

    const quantityLabels = {
        "Upholstery Cleaning": "How many seats/items?",
        "Mattress Steam & Extraction": "How many mattresses?",
        "Carpet Deep Cleaning": "How many rooms?",
        "Car Interior Cleaning": "How many seats/items?"
    };

    function showStep(step) {
        steps.forEach((s, i) => {
            s.style.display = (i === step - 1) ? "block" : "none";
        });

        // Update label for each step
        if (step === 1) {
            qLabel.textContent = "What type of cleaning do you need?";
        }
        if (step === 2) {
            const service = document.getElementById("service").value;
            qLabel.textContent = quantityLabels[service] || "How many items?";
        }
        if (step === 3) {
            qLabel.textContent = "Select your area in Durban";
        }
        if (step === 4) {
            qLabel.textContent = "Ready to send your details";
            updateWhatsAppLink();
            nextBtn.style.display = "none";
        }
    }

    function validateStep(step) {
        const service = document.getElementById("service").value;
        const quantity = document.getElementById("quantity").value;
        const location = document.getElementById("location").value;

        if (step === 1 && !service) {
            alert("Please select a service.");
            return false;
        }
        if (step === 2 && !quantity) {
            alert("Please enter a quantity.");
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
        const quantity = document.getElementById("quantity").value;
        const location = document.getElementById("location").value;

        const message = `Good-Day!, I'm looking for help with:\n\n• Service: ${service}\n• Quantity: ${quantity}\n• Area: ${location}\n\nPlease let me know availability and pricing.`;
        sendBtn.href = `https://wa.me/2768741012?text=${encodeURIComponent(message)}`;
    }

    nextBtn.addEventListener("click", () => {
        if (!validateStep(currentStep)) return;
        currentStep++;
        showStep(currentStep);
    });

    // Initialize first step
    showStep(currentStep);
});
