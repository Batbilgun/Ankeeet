const screens = Array.from(document.querySelectorAll('.screen'));
const stageForms = Array.from(document.querySelectorAll('.stage-form'));
const state = {
  color: "",
  movie: "",
  movieTwo: "",
};

let currentStage = 1;

function showStage(nextStage) {
  currentStage = nextStage;

  screens.forEach((screen) => {
    const isActive = Number(screen.dataset.stage) === currentStage;
    screen.classList.toggle("active", isActive);
  });

  const activeInput = document.querySelector(
    `.screen.active input:not([type="hidden"])`
  );
  if (activeInput) {
    setTimeout(() => activeInput.focus(), 120);
  }
}

function setMessage(stageForm, message, isError = false) {
  const helper = stageForm.closest(".screen").querySelector(".helper-text");
  if (!helper) return;
  helper.textContent = message;
  helper.style.color = isError ? "#c05c7a" : "#7f6c73";
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function handleStageSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const stage = Number(form.dataset.stage);
  const input = form.querySelector("input");
  const value = input.value.trim();

  if (stage === 1 || stage === 2 || stage === 3) {
    if (!value) {
      setMessage(form, "Please enter something first.", true);
      return;
    }

    if (stage === 1) state.color = value;
    if (stage === 2) state.movie = value;
    if (stage === 3) state.movieTwo = value;

    setMessage(form, "");
    showStage(stage + 1);
    return;
  }

  if (stage === 4) {
    const passcode = normalizeText(value);
    const correctPasscode = "yuch hamaagui biccihee";

    if (passcode === correctPasscode) {
      setMessage(form, "");
      showStage(5);
      return;
    }

    setMessage(form, "Not quite, try again ✨", true);
    return;
  }
}

stageForms.forEach((form) => {
  form.addEventListener("submit", handleStageSubmit);

  const input = form.querySelector("input");
  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        form.requestSubmit();
      }
    });
  }
});

showStage(1);
