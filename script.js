class Modal {
  #modal;
  #closeBtn;
  #title;
  #body;
  #footer;
  #backBtn;
  #nextBtn;

  constructor(onBack, onNext) {
    this.#modal = document.createElement("div");
    this.#modal.classList.add("modal");

    this.#closeBtn = document.createElement("button");
    this.#closeBtn.innerHTML = "&times;";
    this.#closeBtn.classList.add("close-btn");
    this.#modal.append(this.#closeBtn);

    this.#title = document.createElement("div");
    this.#title.classList.add("title");
    this.#modal.append(this.#title);

    this.#body = document.createElement("div");
    this.#body.classList.add("body");
    this.#modal.append(this.#body);

    this.#footer = document.createElement("div");
    this.#footer.classList.add("footer");
    this.#modal.append(this.#footer);

    this.#backBtn = document.createElement("button");
    this.#backBtn.textContent = "Back";
    this.#backBtn.addEventListener("click", onBack);
    this.#footer.append(this.#backBtn);

    this.#nextBtn = document.createElement("button");
    this.#nextBtn.textContent = "Next";
    this.#nextBtn.addEventListener("click", onNext);
    this.#footer.append(this.#nextBtn);

    document.body.append(this.#modal);
  }

  set title(value) {
    this.#title.innerText = value;
  }

  set body(value) {
    this.#body.innerText = value;
  }

  show(value = true) {
    this.#modal.classList.toggle("show", value);
  }

  center(value = true) {
    this.#modal.classList.toggle("center", value);
  }

  position({ bottom, left }) {
    const offset = ".5rem";
    this.#modal.style.setProperty(
      "--x",
      `calc(${left + window.scrollX}px + ${offset})`
    );
    this.#modal.style.setProperty(
      "--y",
      `calc(${bottom + window.scrollY}px + ${offset})`
    );
  }

  remove() {
    this.#modal.remove();
  }

  enableBackButton(enabled) {
    this.#backBtn.disabled = !enabled;
  }
}

class Intro {
  #modal;
  #highlightContainer;

  constructor(steps) {
    this.steps = steps;
  }

  start() {
    this.currentStepIndex = 0;
    this.#modal = new Modal(
      () => {
        this.currentStepIndex--;
        this.#showCurrentStep();
      },
      () => {
        this.currentStepIndex++;
        if (this.currentStepIndex >= this.steps.length) {
          this.finish();
        } else {
          this.#showCurrentStep();
        }
      }
    );
    this.#highlightContainer = this.#createHighlightContainer();
    this.#showCurrentStep();
  }

  finish() {
    this.#modal.remove();
    this.#highlightContainer.remove();
  }

  get #currentStep() {
    return this.steps[this.currentStepIndex];
  }

  #showCurrentStep() {
    this.#modal.show();
    this.#modal.enableBackButton(this.currentStepIndex !== 0);
    this.#modal.title = this.#currentStep.title;
    this.#modal.body = this.#currentStep.body;
    if (this.#currentStep.element == null) {
      this.#highlightContainer.classList.add("hide");
      this.#positionHighlightContainer({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
      this.#modal.center();
    } else {
      this.#modal.center(false);
      const rect = this.#currentStep.element.getBoundingClientRect();
      this.#modal.position(rect);
      this.#highlightContainer.classList.remove("hide");
      this.#positionHighlightContainer(rect);
      this.#currentStep.element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }

  #createHighlightContainer() {
    const highlightContainer = document.createElement("div");
    highlightContainer.classList.add("highlight-container");
    document.body.append(highlightContainer);
    return highlightContainer;
  }

  #positionHighlightContainer(rect) {
    this.#highlightContainer.style.top = `${rect.top + window.scrollY}px`;
    this.#highlightContainer.style.left = `${rect.left + window.scrollX}px`;
    this.#highlightContainer.style.width = `${rect.width}px`;
    this.#highlightContainer.style.height = `${rect.height}px`;
  }
}

const intro = new Intro([
  {
    title: "Test title",
    body: "This is the body of the modal",
  },
  {
    title: "Test title 2",
    body: "This is the body of the modal 2",
    element: document.querySelector("[data-first]"),
  },
  {
    title: "Test title 3",
    body: "This is the body of the modal 3",
    element: document.querySelector("[data-second]"),
  },
]);
intro.start();
