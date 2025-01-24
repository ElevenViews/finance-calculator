const loanAmountInput = document.getElementById("loan-amount");
const repaymentTermInput = document.getElementById("repayment-term");
const creditRatingInput = document.getElementById("credit-rating");

const summaryLoanAmount = document.getElementById("summary-loan-amount");
const summaryRepaymentTerm = document.getElementById("summary-repayment-term");
const summaryMonthlyRepayment = document.getElementById("summary-monthly-repayment");
const summaryTypicalRate = document.getElementById("summary-typical-rate");
const summaryTotalPayable = document.getElementById("summary-total-payable");

const loanWarning = document.getElementById("loan-warning");

const aprRates = {
  excellent: 29.3,
  good: 32.3,
  poor: 35.3,
  bad: 38.3,
};

const adminFee = 199;
const optionToPurchaseFee = 199;

function calculateMonthlyRepayment(loanAmount, monthlyRate, months) {
  return loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
}

function updateSummary() {
  let loanAmount = parseFloat(loanAmountInput.value) || 0;

  if (loanAmount > 20000) {
    loanWarning.style.display = "block";
    loanAmount = 20000;
    loanAmountInput.value = loanAmount.toFixed(2);
  } else {
    loanWarning.style.display = "none";
  }

  const repaymentTerm = parseInt(repaymentTermInput.value) || 60;
  const creditRating = creditRatingInput.value;
  const apr = aprRates[creditRating];
  const monthlyRate = apr / 100 / 12;

  const monthlyRepayment = calculateMonthlyRepayment(loanAmount, monthlyRate, repaymentTerm - 2);
  const initialPayment = monthlyRepayment + adminFee;
  const finalPayment = monthlyRepayment + optionToPurchaseFee;
  const totalPayable = initialPayment + finalPayment + monthlyRepayment * (repaymentTerm - 2);

  summaryLoanAmount.textContent = loanAmount.toFixed(2);
  summaryRepaymentTerm.textContent = repaymentTerm;
  summaryMonthlyRepayment.textContent = monthlyRepayment.toFixed(2);
  summaryTypicalRate.textContent = apr.toFixed(2);
  summaryTotalPayable.textContent = totalPayable.toFixed(2);
}

loanAmountInput.addEventListener("input", updateSummary);
repaymentTermInput.addEventListener("change", updateSummary);
creditRatingInput.addEventListener("change", updateSummary);

updateSummary();
