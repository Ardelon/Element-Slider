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

    let i = 1;
    let frame = 50
    let frameRate = 6;
    let myInterval;
    const fnLeft = () => {
        mainContainer.scrollLeft -= amount/frame;
        console.log(mainContainer.scrollLeft);
        if (i === frame) {
            clearInterval(myInterval)
        }
        i++;
    }

    const fnRight = () => {
        mainContainer.scrollLeft += amount/frame;
        console.log(mainContainer.scrollLeft);
        if (i === frame) {
            clearInterval(myInterval)
        }
        i++;
    }

    clearInterval(myInterval)
    if (direction === 'left') {
        myInterval = setInterval(fnLeft, frameRate)

    } else if (direction === 'right') {
        myInterval = setInterval(fnRight, frameRate);
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