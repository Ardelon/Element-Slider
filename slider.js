(() => {

const mainContainer = document.getElementById("main-container");
const goLeftButton = document.getElementById("go-left-button");
const goRightButton = document.getElementById("go-right-button");

const arr = [];
for (i=0; i<31; i++) {
    arr.push(i);
}

goLeftButton.addEventListener('click', (e) => {
    e.preventDefault();
    slideVisionMethod('left')
    goLeftButton.removeEventListener('click', (e) => {
        e.preventDefault()
    });
});

goRightButton.addEventListener('click', (e) => {
    e.preventDefault();
    slideVisionMethod('right')
    goRightButton.removeEventListener('click', (e) => {
        e.preventDefault()
    });
});

const slideVisionMethod = (direction, amount = 250) => {

    if (direction === 'left') {
        mainContainer.scrollLeft -= amount
    } else if (direction === 'right') {
        mainContainer.scrollLeft += amount
    }
};

const generateElementsForVisionMethod = () => {
    arr.forEach(number => {
        const element = document.createElement("div");
        element.classList.add("element");
        element.innerText = number;
        mainContainer.appendChild(element);
    });
}

generateElementsForVisionMethod();


})();