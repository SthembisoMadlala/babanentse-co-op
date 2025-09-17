// ========== GLOBAL FORM HANDLER FOR BABANENTSE ==========

// Helper: set order/quote/contact date automatically
function setFormDate(form) {
  const dateField = form.querySelector("input[name='date']");
  if (dateField) {
    dateField.value = new Date().toLocaleString();
  }
}

// Helper: flash message (success or error)
function flashMessage(element) {
  element.classList.add("flash");
  setTimeout(() => element.classList.remove("flash"), 2000);
}

// Attach form handler to any form with class "babanentse-form"
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form.babanentse-form");

  forms.forEach((form) => {
    const successMsg = form.querySelector(".form-success");
    const errorMsg = form.querySelector(".form-error");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      // reset messages
      if (successMsg) successMsg.style.display = "none";
      if (errorMsg) errorMsg.style.display = "none";

      // set date if available
      setFormDate(form);

      // collect data
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          if (successMsg) {
            successMsg.style.display = "block";
            successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
            flashMessage(successMsg);
          }
          form.reset();
        } else {
          if (errorMsg) {
            errorMsg.style.display = "block";
            errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
            flashMessage(errorMsg);
          }
        }
      } catch (error) {
        if (errorMsg) {
          errorMsg.style.display = "block";
          errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          flashMessage(errorMsg);
        }
      }
    });
  });
});
