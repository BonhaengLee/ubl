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
    this.#modal.append(this.#nextBtn);
  }

  set title(value) {
    this.#title.innerText = value;
  }

  set body(value) {
    this.#body.innerText = value;
  }

  show() {
    this.#modal.classList.show();
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
  }

  #showCurrentStep() {
    this.#modal.show();
  }

  #createModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.classList.add("close-btn");
    modal.append(closeBtn);

    return modal;
  }
}

const intro = new Intro([
  {
    title: "Test title",
    body: "This is the body of the modal",
  },
]);
intro.start();
