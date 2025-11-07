const cards = document.querySelectorAll(".card");
const nicknameInput = document.getElementById("nickname");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("feedback");
const knivesOverlay = document.getElementById("knivesOverlay");
const closeOverlayBtn = document.getElementById("closeOverlay");
const insightBtn = document.getElementById("insightBtn");
const insightBlock = document.getElementById("insightBlock");
const knivesGrid = document.querySelector(".knives-grid");
const overlayActions = document.querySelector(".overlay-actions");
let revealed = false;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("selected");
  });
});

const showFeedback = (message, isError = true) => {
  feedbackEl.textContent = message;
  feedbackEl.style.color = isError ? "#fb3569" : "#38f2b1";
};

const resetOverlayView = () => {
  knivesGrid.classList.remove("is-collapsed");
  insightBlock.classList.add("is-collapsed");
  if (overlayActions) {
    overlayActions.classList.remove("is-collapsed");
  }
  insightBtn.classList.remove("is-collapsed");
  insightBtn.disabled = false;
  insightBtn.textContent = "Get insight";
};

const resetFlow = () => {
  cards.forEach((card) => card.classList.remove("selected"));
  nicknameInput.value = "";
  knivesOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
  resetOverlayView();
  showFeedback("");
  nextBtn.textContent = "Next";
  revealed = false;
};

const revealKnives = (nickname) => {
  knivesOverlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
  resetOverlayView();
  showFeedback("Your knives are ready!", false);
  nextBtn.textContent = "Reset";
  revealed = true;
};

nextBtn.addEventListener("click", () => {
  if (revealed) {
    resetFlow();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const nickname = nicknameInput.value.trim();
  const selectedCards = Array.from(cards).filter((card) =>
    card.classList.contains("selected"),
  );

  if (!nickname) {
    showFeedback("Enter a nickname to continue.");
    nicknameInput.focus();
    return;
  }

  if (selectedCards.length === 0) {
    showFeedback("Pick at least one card.");
    return;
  }

  revealKnives(nickname);
});

closeOverlayBtn.addEventListener("click", resetFlow);

knivesOverlay.addEventListener("click", (event) => {
  if (event.target === knivesOverlay) {
    resetFlow();
  }
});

insightBtn.addEventListener("click", () => {
  knivesGrid.classList.add("is-collapsed");
  insightBlock.classList.remove("is-collapsed");
  if (overlayActions) {
    overlayActions.classList.add("is-collapsed");
  }
  insightBtn.classList.add("is-collapsed");
  insightBtn.disabled = true;
  insightBtn.textContent = "Insight loaded";
});
