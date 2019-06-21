const LI_CLASS = "mainLiButton";
// Elements
const inputAside = document.querySelector("aside input");
const section = document.querySelector("section");

addMainListeners();

// Main panel
function addMainListeners() {
  const arrow = document.querySelector("i");
  const aside = document.querySelector("aside");

  arrow.addEventListener("click", () => {
    arrow.classList.toggle("active");
    aside.classList.toggle("active");
  });

  inputAside.addEventListener("focus", ({ target }) => {
    target.classList.add("color");
  });

  inputAside.addEventListener("blur", ({ target }) => {
    target.classList.remove("color");
  });

  const buttonAside = document.querySelector("aside button");
  buttonAside.addEventListener("click", addNewLifePart);
}

let counter = 0;

// Main div
function addNewLifePart() {
  const inputValue = inputAside.value;
  if (!inputValue) return;

  const lifePart = createLifePart(inputValue);
  section.appendChild(lifePart);

  inputAside.value = "";
}

// Create all necessary elements of div and section
function createLifePart(lifePartTitle) {
  const div = document.createElement("div");
  div.classList.add("main");

  const h2 = document.createElement("h2");
  h2.classList.add("mainH2");

  const input = document.createElement("input");
  input.placeholder = "Add another hard activity";
  input.classList.add("mainInput");

  const button = document.createElement("button");
  button.classList.add("mainButton");
  button.textContent = "+";

  const buttonRemove = document.createElement("button");
  buttonRemove.innerHTML = '<i class="fas fa-times-circle"></i>';
  buttonRemove.classList.add("mainRemoveButton");
  buttonRemove.setAttribute(`data-key`, `${counter++}`);

  const ul = document.createElement("ul");
  ul.classList.add("mainUl");
  ul.setAttribute(`data-key`, `${counter++}`);

  const inputSearch = document.createElement("input");
  inputSearch.placeholder = "You have to search?";
  inputSearch.classList.add("mainSearch");
  inputSearch.setAttribute(`data-key`, `${counter++}`);

  const h3Counter = document.createElement("h3");
  h3Counter.classList.add("mainH3");

  h2.textContent = lifePartTitle;

  div.appendChild(h2);
  div.appendChild(input);
  div.appendChild(button);
  div.appendChild(inputSearch);
  div.appendChild(ul);
  div.appendChild(buttonRemove);
  div.appendChild(h3Counter);

  addLifePartListeners(div, {
    h2,
    input,
    button,
    inputSearch,
    ul,
    buttonRemove,
    h3Counter
  });

  return div;
}

function addLifePartListeners(div, elements) {
  elements.button.addEventListener("click", addNewActivity(elements));
  elements.buttonRemove.addEventListener("click", removeLifePart(div));
}

function addNewActivity(elements) {
  return () => {
    const inputDivValue = elements.input.value;
    if (!inputDivValue) return;

    liOperations(inputDivValue, elements);

    elements.input.value = "";
  };
}

function liOperations(value, elements) {
  // Create li
  const li = document.createElement("li");
  li.classList.add("mainLi");
  li.innerHTML = `<button class=${LI_CLASS}><i class="fas fa-times"></i></button>${value}`;
  elements.ul.appendChild(li);

  // Count li
  const index = elements.ul.dataset.key;
  const liElements = [
    ...document.querySelectorAll(`ul[data-key="${index}"] li`)
  ];
  elements.h3Counter.textContent = liElements.length;

  // Check each li
  const checkLi = e => {
    e.target.classList.toggle("mainLiChecked");
  };
  for (const liElement of liElements) {
    liElement.onclick = checkLi;
  }

  // Search
  const indexInputs = elements.inputSearch.dataset.key;
  const inputSearching = document.querySelector(
    `input[data-key="${indexInputs}"]`
  );

  const search = e => {
    const text = e.target.value.toLowerCase();
    let tasks = liElements;
    tasks = tasks.filter(li => {
      if (li.textContent.toLowerCase().includes(text)) {
        li.style.display = "block";
      } else {
        li.style.display = "none";
      }
    });
  };

  inputSearching.addEventListener("input", search);

  // Remove li and count again
  const icoElements = document.querySelectorAll("li button i");

  const removeLi = e => {
    e.target.parentNode.parentNode.remove();
    const index = elements.ul.dataset.key;
    const liElements = [
      ...document.querySelectorAll(`ul[data-key="${index}"] li`)
    ];
    elements.h3Counter.innerText = liElements.length;
    if (liElements.length === 0) {
      elements.h3Counter.innerText = "";
    }
  };

  icoElements.forEach(icoElement =>
    icoElement.addEventListener("click", removeLi)
  );
}

function removeLifePart(div) {
  const confirm = createCloseDiv(div);

  return () => {
    div.classList.add("background");
    div.appendChild(confirm);
  };
}

function createCloseDiv(div) {
  const closeDiv = document.createElement("div");
  closeDiv.classList.add("closeDiv");

  const closeH1 = document.createElement("h1");
  closeH1.classList.add("closeH1");
  closeH1.innerHTML = "You really want to close this life chapter?";

  const closeButtonYes = document.createElement("button");
  closeButtonYes.textContent = "Yes";
  closeButtonYes.classList.add("closeButtons");

  const closeButtonNo = document.createElement("button");
  closeButtonNo.classList.add("closeButtons");
  closeButtonNo.textContent = "No";

  closeDiv.appendChild(closeH1);
  closeDiv.appendChild(closeButtonYes);
  closeDiv.appendChild(closeButtonNo);

  addCloseDivListeners(closeDiv, div, {
    closeButtonYes,
    closeButtonNo
  });

  return closeDiv;
}

function addCloseDivListeners(closeDiv, div, elements) {
  // Close main div and close div
  elements.closeButtonYes.addEventListener("click", () => {
    div.remove();
  });

  // Close close div and remove class from main div
  elements.closeButtonNo.addEventListener("click", () => {
    div.classList.remove("background");
    closeDiv.remove();
  });
}
