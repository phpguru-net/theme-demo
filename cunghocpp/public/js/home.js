document.addEventListener("DOMContentLoaded", () => {
  const quotes = document.querySelectorAll("#quote-slider .quote");
  let currentQuoteIndex = 0;

  function showNextQuote() {
    // Hide the current quote
    quotes[currentQuoteIndex].classList.remove("active");

    // Move to the next quote
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

    // Show the new quote
    quotes[currentQuoteIndex].classList.add("active");
  }

  // Show the first quote initially
  quotes[currentQuoteIndex].classList.add("active");

  // Change quote every 5 seconds
  setInterval(showNextQuote, 5000);

  const tabs = document.querySelectorAll(".tab");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active state from all tabs
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.style.backgroundColor = "var(--inactive-bg)";
        t.style.color = "var(--inactive-text)";
      });

      // Add active state to clicked tab
      tab.classList.add("active");
      tab.style.backgroundColor = "var(--primary-color)";
      tab.style.color = "#fff";

      // Hide all tab panes
      tabPanes.forEach((pane) => pane.classList.add("hidden"));

      // Show corresponding tab pane
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.remove("hidden");
    });
  });
});
