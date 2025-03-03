const arrayContainer = document.getElementById("array-container");
const statusText = document.getElementById("status");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const targetInput = document.getElementById("target-input");

let arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]; // Sorted array
let target = null;
let steps = [];
let currentStep = 0;

// Function to generate search steps
function binarySearchSteps(arr, target) {
    let low = 0, high = arr.length - 1;
    let steps = [];

    while (low <= high) {
        let mid = Math.floor((low + ( high-low)) / 2);
        steps.push({ low, high, mid });

        if (arr[mid] === target) {
            steps.push({ low, high, mid, found: true });
            return steps;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    steps.push({ low: -1, high: -1, mid: -1, found: false });
    return steps;
}

// Function to display array
function renderArray(step) {
    arrayContainer.innerHTML = ""; // Clear previous elements

    arr.forEach((num, index) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent = num;

        // Highlight search range
        if (index >= step.low && index <= step.high) {
            box.classList.add("searching");
        } else {
            box.classList.add("faded");
        }

        // Highlight mid element
        if (index === step.mid) {
            box.classList.add("active");
        }

        arrayContainer.appendChild(box);
    });
}

// Function to proceed to the next step
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderArray(steps[currentStep]);

        if (steps[currentStep].found) {
            statusText.textContent = `Element found at index ${steps[currentStep].mid}`;
            nextButton.disabled = true;
        }
    } else {
        statusText.textContent = "Element not found";
        nextButton.disabled = true;
    }
}

// Function to start the search after getting target input
function startBinarySearch() {
    target = parseInt(targetInput.value);

    if (isNaN(target)) {
        statusText.textContent = "Please enter a valid number!";
        return;
    }

    steps = binarySearchSteps(arr, target);
    currentStep = 0;
    nextButton.disabled = false;
    statusText.textContent = "Searching...";
    renderArray(steps[currentStep]);
}

// Event listeners
startButton.addEventListener("click", startBinarySearch);
nextButton.addEventListener("click", nextStep);
