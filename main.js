// Elements
const arrow = document.querySelector('i');
const aside = document.querySelector('aside');
const inputAside = document.querySelector('aside input');
const buttonAside = document.querySelector('aside button');
const section = document.querySelector('section');

// Main panel
const changePosition = () => {
    arrow.classList.toggle('active');
    aside.classList.toggle('active');
};
arrow.addEventListener('click', changePosition);

inputAside.addEventListener('focus', (e) => {
    e.target.classList.add('color');
});
inputAside.addEventListener('blur', (e) => {
    e.target.classList.remove('color');
});

let counterUl = 0;
let counterInputSearch = 0;
let counterButtonRemove = 0;

// Main div
const addNewLifePart = (e) => {
    e.preventDefault();
    const inputValue = inputAside.value;
    if (inputValue === '') return;

    // Create all necessary elements of div and section
    const div = document.createElement('div');
    div.classList.add('main');
    const h2 = document.createElement('h2');
    h2.classList.add('mainH2');
    const input = document.createElement('input');
    input.placeholder = "Add another hard activity";
    input.classList.add('mainInput');
    const button = document.createElement('button');
    button.classList.add('mainButton');
    button.textContent = '+';
    const buttonRemove = document.createElement('button');
    buttonRemove.innerHTML = '<i class="fas fa-times-circle"></i>';
    buttonRemove.classList.add('mainRemoveButton');
    buttonRemove.setAttribute(`data-key`, `${counterButtonRemove++}`);
    const ul = document.createElement('ul');
    ul.classList.add('mainUl');
    ul.setAttribute(`data-key`, `${counterUl++}`);
    const inputSearch = document.createElement('input');
    inputSearch.placeholder = "You have to search?";
    inputSearch.classList.add('mainSearch');
    inputSearch.setAttribute(`data-key`, `${counterInputSearch++}`)
    const h3Counter = document.createElement('h3');
    h3Counter.classList.add('mainH3');

    h2.textContent = inputValue;

    div.appendChild(h2);
    div.appendChild(input);
    div.appendChild(button);
    div.appendChild(inputSearch);
    div.appendChild(ul);
    div.appendChild(buttonRemove);
    div.appendChild(h3Counter);

    section.appendChild(div);

    inputAside.value = '';

    // ToDoList - mechanism
    const addNewActivity = (e) => {
        e.preventDefault();
        const inputDivValue = input.value;
        if (inputDivValue === '') return;

        // Create li
        const li = document.createElement('li');
        li.classList.add('mainLi');
        li.innerHTML = '<button class="mainLiButton"><i class="fas fa-times"></i></button>' + '' + inputDivValue;
        ul.appendChild(li);

        // Count li
        const index = ul.dataset.key;
        const liElements = [...document.querySelectorAll(`ul[data-key="${index}"] li`)];
        h3Counter.textContent = liElements.length;

        // Render input
        input.value = '';

        // Check each li
        const checkLi = (e) => {
            e.preventDefault();
            e.target.classList.toggle('mainLiChecked');
        };
        for (const liElement of liElements) {
            liElement.onclick = checkLi;
        };

        // Search
        const indexInputs = inputSearch.dataset.key;
        const inputSearching = document.querySelector(`input[data-key="${indexInputs}"]`);
        const ulElement = document.querySelector(`ul[data-key="${index}"]`);
        const search = (e) => {
            const text = e.target.value.toLowerCase();
            let tasks = liElements;
            tasks = tasks.filter(li => {
                if (li.textContent.toLowerCase().includes(text)) {
                    li.style.display = 'block';
                } else {
                    li.style.display = 'none';
                }
            });
        };
        inputSearching.addEventListener('input', search);

        // Remove li and count again
        const icoElements = document.querySelectorAll('li button i');
        const removeLi = (e) => {
            e.target.parentNode.parentNode.remove();
            const index = ul.dataset.key;
            const liElements = [...document.querySelectorAll(`ul[data-key="${index}"] li`)];
            h3Counter.innerText = liElements.length;
            if (liElements.length === 0) {
                h3Counter.innerText = '';
            }
        };
        icoElements.forEach(icoElement => icoElement.addEventListener('click', removeLi));
    };

    button.addEventListener('click', addNewActivity);

    // Remove main div
    const indexButtonRemove = buttonRemove.dataset.key;
    const iButtonsRemove = document.querySelectorAll(`button[data-key="${indexButtonRemove}"] i`);
    const removeDiv = (e) => {
        // Create close div
        const closeDiv = document.createElement('div');
        closeDiv.classList.add('closeDiv');
        const closeH1 = document.createElement('h1');
        closeH1.classList.add('closeH1');
        closeH1.innerHTML = 'You really want to close this life chapter?';
        const closeButtonYes = document.createElement('button');
        closeButtonYes.textContent = 'Yes';
        closeButtonYes.classList.add('closeButtons');
        const closeButtonNo = document.createElement('button');
        closeButtonNo.classList.add('closeButtons');
        closeButtonNo.textContent = 'No';
        div.appendChild(closeDiv);
        closeDiv.appendChild(closeH1);
        closeDiv.appendChild(closeButtonYes);
        closeDiv.appendChild(closeButtonNo);

        // Blur and grayscale to main div
        e.target.parentNode.parentNode.classList.add('background');

        // Close main div and close div
        const closeAllDiv = (e) => {
            e.target.parentNode.parentNode.remove();
            e.target.parentNode.remove();
        }
        closeButtonYes.addEventListener('click', closeAllDiv);

        // Close close div and remove class from main div
        const closeCloseDiv = (e) => {
            e.target.parentNode.parentNode.classList.remove('background');
            e.target.parentNode.remove();
        }
        closeButtonNo.addEventListener('click', closeCloseDiv);
    };
    for (const iButtonRemove of iButtonsRemove) {
        iButtonRemove.addEventListener('click', removeDiv);
    };
};

buttonAside.addEventListener('click', addNewLifePart);