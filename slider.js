(() => {
	const mainContainer = document.getElementById('main-container');
	const goLeftButton = document.getElementById('go-left-button');
	const goRightButton = document.getElementById('go-right-button');
	const goUpButton = document.getElementById('go-up-button');
	const goDownButton = document.getElementById('go-down-button');

	const elementArray = [];
	const beltArray = [];
	let selectedBelt = 0;

	for (i = 0; i < 31; i++) {
		elementArray.push(`Element ${i}`);
	}

	for (j = 0; j < 31; j++) {
		beltArray.push(`Belt ${j}`);
	}

	const thLeft = _.throttle(function () {
		slideVisionMethod2('left');
	}, 800);

	const thRight = _.throttle(function () {
		slideVisionMethod2('right');
	}, 800);

	const thUp = _.throttle(function () {
		slideVisionMethod2('up');
	}, 800);

	const thDown = _.throttle(function () {
		slideVisionMethod2('down');
	}, 800);

	goLeftButton.addEventListener('click', thLeft);

	goRightButton.addEventListener('click', thRight);

	goUpButton.addEventListener('click', thUp);

	goDownButton.addEventListener('click', thDown);
	// const slideVisionMethod1 = (direction, amount = 250) => {
	// 	let i = 1;
	// 	let frame = 50;
	// 	let frameRate = 6;
	// 	let myInterval;
	// 	const fnLeft = () => {
	// 		mainContainer.scrollLeft -= amount / frame;
	// 		if (i === frame) {
	// 			clearInterval(myInterval);
	// 		}
	// 		i++;
	// 	};

	// 	const fnRight = () => {
	// 		mainContainer.scrollLeft += amount / frame;
	// 		if (i === frame) {
	// 			clearInterval(myInterval);
	// 		}
	// 		i++;
	// 	};

	// 	clearInterval(myInterval);
	// 	if (direction === 'left') {
	// 		myInterval = setInterval(fnLeft, frameRate);
	// 	} else if (direction === 'right') {
	// 		myInterval = setInterval(fnRight, frameRate);
	// 	}
	// };

	const slideVisionMethod2 = (direction) => {
		let frame = 64;
		let frameRate = 6; // miliseconds
		let interval;
		let target;
		let horizontalAmount;
		let verticalAmount;
		clearInterval(interval);
		const driver = {
			left: () => {
				console.log('left');
				const belt = document.getElementById(`selected-belt-${selectedBelt}`);
                console.log(belt);
				const firstChild = belt.firstElementChild;
				const style = window.getComputedStyle(firstChild);
				horizontalAmount =
					parseInt(style.marginLeft) +
					parseInt(style.marginRight) +
					parseInt(style.width);
				const elementIndex = belt.scrollLeft ? Math.floor(belt.scrollLeft / horizontalAmount) : 0;
                console.log(elementIndex);
				target = Math.max((elementIndex - 1) * horizontalAmount, 0);
                console.log(target);
				// target = Math.max(belt.scrollLeft - horizontalAmount, 0);

				interval = setInterval(() => {
                    console.count('leftCount');
					belt.scrollLeft = Math.max(belt.scrollLeft - Math.max(horizontalAmount/frame, 1),target
                    // belt.scrollLeft = Math.max(belt.scrollLeft - Math.max(horizontalAmount/frame, 1), target);
					);
					if (belt.scrollLeft === target) {
						clearInterval(interval);
					}
				}, frameRate);
			},
			right: () => {
				console.log('right');
				const belt = document.getElementById(`selected-belt-${selectedBelt}`);
                console.log(belt);
				const firstChild = belt.firstElementChild;
				const style = window.getComputedStyle(firstChild);
				horizontalAmount =
					parseInt(style.marginLeft) +
					parseInt(style.marginRight) +
					parseInt(style.width);
				const elementIndex = Math.floor(belt.scrollLeft / horizontalAmount);
                console.log(elementIndex);
				target = Math.min((elementIndex + 1) * horizontalAmount,belt.scrollWidth - belt.clientWidth);
                    console.log(target);

				interval = setInterval(() => {
                    console.count('rightCount');
					belt.scrollLeft = Math.min(belt.scrollLeft + Math.max(horizontalAmount/frame, 1),target);
                    // belt.scrollLeft = Math.min(belt.scrollLeft + Math.max(horizontalAmount/frame, 1), target);
					if (belt.scrollLeft === target) {
						clearInterval(interval);
					}
				}, frameRate);
			},
			up: () => {
				console.log('up');
				selectedBelt = Math.max(selectedBelt - 1, 0);
				const belt = document.getElementById(`selected-belt-${selectedBelt}`);
                console.log(belt);
				const style = window.getComputedStyle(belt);
				verticalAmount =
					parseInt(style.marginTop) +
					parseInt(style.marginBottom) +
					parseInt(style.height);
                    const elementIndex = Math.floor(mainContainer.scrollTop / verticalAmount);
					target = Math.min((elementIndex - 1) * verticalAmount, mainContainer.scrollHeight - mainContainer.clientHeight);


				interval = setInterval(() => {
					mainContainer.scrollTop = Math.max(
						mainContainer.scrollTop - verticalAmount / frame,
						target
					);
					if (mainContainer.scrollTop === target) {
						clearInterval(interval);
					}
				}, frameRate);
			},
			down: () => {
				console.log('down');
				selectedBelt = Math.min(selectedBelt + 1, 30);
				const belt = document.getElementById(`selected-belt-${selectedBelt}`);
                console.log(belt);
				const style = window.getComputedStyle(belt);
				verticalAmount =
					parseInt(style.marginTop) +
					parseInt(style.marginBottom) +
					parseInt(style.height);
                    const elementIndex = Math.floor(mainContainer.scrollTop / verticalAmount);
					target = Math.min((elementIndex + 1) * verticalAmount, mainContainer.scrollHeight - mainContainer.clientHeight);

				interval = setInterval(() => {
					mainContainer.scrollTop = Math.min(
						mainContainer.scrollTop + verticalAmount / frame,
						target
					);
					if (mainContainer.scrollTop === target) {
						clearInterval(interval);
					}
				}, frameRate);
			},
		};

		const driverKeys = Object.keys(driver);
		if (driverKeys.includes(direction)) {
			driver[direction]();
		} else {
			console.log('No or wrong direction');
		}
	};

	const generateElementsForVisionMethod = () => {
		beltArray.forEach((beltValue, index) => {
			const belt = document.createElement('div');
			belt.classList.add('belt');
			belt.id = `selected-belt-${index}`;

			elementArray.forEach((number) => {
				const element = document.createElement('div');
				element.classList.add('element');
				element.innerHTML = `<p>${beltValue} ${number}</p>`;
				belt.appendChild(element);
			});
			mainContainer.appendChild(belt);
		});
	};

	generateElementsForVisionMethod();
})();
