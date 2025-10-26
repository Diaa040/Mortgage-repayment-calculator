const form = document.getElementById("mortgageForm");
const clearBtn = document.getElementById("clearBtn");
const calcBtn = document.getElementById("calcBtn");
const resultsText = document.getElementById("resultsText");

function showError(input, message) {
  const field = input.closest(".field");
  field.classList.add("error");

  
  let err = input.parentElement.nextElementSibling;
  if (err && err.classList.contains("error-message")) {
    err.remove();
  }

  
  const errorMsg = document.createElement("div");
  errorMsg.className = "error-message";
  errorMsg.textContent = message;
  input.parentElement.insertAdjacentElement("afterend", errorMsg);
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
  document.querySelectorAll(".error-message").forEach(e => e.remove());
}

clearBtn.addEventListener("click", () => {
  form.reset();
  clearErrors();
  resultsText.textContent =
    "Complete the form and click “calculate repayments” to see what your monthly repayments would be.";
});

calcBtn.addEventListener("click", () => {
  clearErrors();

  const P = parseFloat(document.getElementById("amount").value);
  const years = parseFloat(document.getElementById("term").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const type = form.elements["type"].value;

  const monthlyValue = document.getElementById("monthlyValue");
  const totalValue = document.getElementById("totalValue");
  const resultPanel = document.querySelector(".right-result");
  const emptyPanel = document.querySelector(".right-content:not(.right-result)");

  let hasError = false;

  if (!P) {
    showError(document.getElementById("amount"), "This field is required");
    hasError = true;
  }
  if (!years) {
    showError(document.getElementById("term"), "This field is required");
    hasError = true;
  }
  if (!rate) {
    showError(document.getElementById("rate"), "This field is required");
    hasError = true;
  }
  if (!type) {
    const group = document.querySelector(".radio-group");
    let err = group.nextElementSibling;
    if (!err || !err.classList.contains("error-message")) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "error-message";
      errorMsg.textContent = "This field is required";
      group.insertAdjacentElement("afterend", errorMsg);
    }
    hasError = true;
  }

  if (hasError) {
    resultsText.textContent =
      `Complete the form and click “calculate repayments” to see what your monthly repayments would be.`;
    resultPanel.classList.add("hidden");
    emptyPanel.classList.remove("hidden");
    return;
  }

 
  const n = years * 12;
  const r = rate / 100 / 12;
  let monthly = 0;
  let total = 0;

  if (type === "repayment") {
    monthly = (P * r) / (1 - Math.pow(1 + r, -n));
    total = monthly * n;
  } else {
    monthly = P * r;
    total = monthly * n;
  }

 
  monthlyValue.textContent = `£${monthly.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  totalValue.textContent = `£${total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  
  emptyPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
});

