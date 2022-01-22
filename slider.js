(() => {

const mainContainer = document.getElementById("main-container");
const goLeftButton = document.getElementById("go-left-button");
const goRightButton = document.getElementById("go-right-button");
const goUpButton = document.getElementById("go-up-button");
const goDownButton = document.getElementById("go-down-button");

const elementArray = [];
const beltArray = [];

for (i=0; i<31; i++) {
    elementArray.push(`Element ${i}`);
}

for (j = 0; j < 31; j++) {
    beltArray.push(`Belt ${j}`);
}



goLeftButton.addEventListener('click', (e) => {
    e.preventDefault();
    slideVisionMethod2('left')
    goLeftButton.removeEventListener('click', (e) => {
        e.preventDefault()
    });
});

goRightButton.addEventListener('click', (e) => {
    e.preventDefault();
    slideVisionMethod2('right')
    goRightButton.removeEventListener('click', (e) => {
        e.preventDefault()
    });
});


goUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    slideVisionMethod2('up')
    goUpButton.removeEventListener('click', (e) => {
        e.preventDefault()
    });
});


goDownButton.addEventListener('click', (e) => {
    e.preventDefault();
    slideVisionMethod2('down')
    goDownButton.removeEventListener('click', (e) => {
        e.preventDefault()
    });
});
const slideVisionMethod1 = (direction, amount = 250) => {

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

const slideVisionMethod2 = (direction, amount = 250) => {

    let frame = 64; 
    let frameRate = 6; // miliseconds
    let animationDuration = frame * frameRate // miliseconds
    let interval;
    let target;
    clearInterval(interval);
    const driver = {
        'left' : () => {
      
            console.log('left');
            target = Math.max(mainContainer.scrollLeft - amount, 0);
      
            interval = setInterval(() => {
                mainContainer.scrollLeft = Math.max(mainContainer.scrollLeft - amount/frame, target)
                if (mainContainer.scrollLeft === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'right' : () => {

            console.log('right');
            target = Math.min(mainContainer.scrollLeft + amount, mainContainer.scrollWidth - mainContainer.clientWidth)

            interval = setInterval(() => {
                mainContainer.scrollLeft = Math.min(mainContainer.scrollLeft + amount/frame, target)
                if (mainContainer.scrollLeft === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'up' : () => {

            console.log('up');
            target = Math.max(mainContainer.scrollTop - amount, 0);

            interval = setInterval(() => {
                mainContainer.scrollTop = Math.max(mainContainer.scrollTop - amount/frame, target)
                if (mainContainer.scrollTop === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'down' : () => {

            console.log('down');
            target = Math.min(mainContainer.scrollTop + amount, mainContainer.scrollHeight - mainContainer.clientHeight)

            interval = setInterval(() => {
                mainContainer.scrollTop = Math.min(mainContainer.scrollTop + amount/frame, target)
                if (mainContainer.scrollTop === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        }
    }

    const driverKeys = Object.keys(driver);
    if (driverKeys.includes(direction)) {
        driver[direction]();
    } else {
        console.log('No or wrong direction');
    }
}

const generateElementsForVisionMethod = () => {
    beltArray.forEach(beltValue => {

        const belt = document.createElement("div");
        belt.classList.add("belt");

        elementArray.forEach(number => {
            const element = document.createElement("div");
            element.classList.add("element");
            element.innerHTML = `<p>${beltValue} ${number}</p>`;
            belt.appendChild(element);
        });
        mainContainer.appendChild(belt);
    });
}

generateElementsForVisionMethod();


})();