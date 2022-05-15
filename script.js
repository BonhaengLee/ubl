class Modal {
  #modal;
  #closeBtn;
  #title;
  #body;
  #footer;
  #backBtn;
  #nextBtn;

  constructor() {
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
    this.#footer.append(this.#backBtn);

    this.#nextBtn = document.createElement("button");
    this.#nextBtn.textContent = "Next";
    this.#footer.append(this.#nextBtn);

    document.body.append(this.#modal);
  }

  set title(value) {
    this.#title.innerText = value;
  }

  set body(value) {
    this.#body.innerText = value;
  }

  show() {
    this.#modal.classList.add("show");
  }

  center() {
    this.#modal.classList.add("center");
  }
}

class Intro {
  #modal;

  constructor(steps) {
    this.steps = steps;
  }

  start() {
    this.currentStepIndex = 0;
    this.#modal = new Modal();
    this.#showCurrentStep();
  }

  get #currentStep() {
    return this.steps[this.currentStepIndex];
  }

  #showCurrentStep() {
    this.#modal.show();
    this.#modal.title = this.#currentStep.title;
    this.#modal.body = this.#currentStep.body;
    if (this.#currentStep.element === null) {
      this.#modal.center();
    } else {
    }
  }
}

const intro = new Intro([
  {
    title: "Test title",
    body: "This is the body of the modal",
  },
]);
intro.start();
