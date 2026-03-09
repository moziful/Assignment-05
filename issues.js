let allIssues = [];
async function fetchIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    allIssues = data.data;
    // console.log(allIssues);
    // console.log(Array.isArray(allIssues));
    loadIssues("all");
}
fetchIssues();

const allCatagoryButton = document.getElementById("allCatagoryButton");
const openCatagoryButton = document.getElementById("openCatagoryButton");
const closedCatagoryButton = document.getElementById("closedCatagoryButton");

const catagoryButtons = [allCatagoryButton, openCatagoryButton, closedCatagoryButton];

function activeButton(clickedButton) {
    for (const button of catagoryButtons) {
        if (button !== clickedButton) {
            button.classList.remove("bg-[#4A00FF]", "text-white");
            button.classList.add("border-2", "text-gray");
        }
        clickedButton.classList.remove("border-2", "text-gray");
        clickedButton.classList.add("bg-[#4A00FF]", "text-white");
    }
}

function loadIssues(status) {
    let displayIssues;
    if (status === "all") {
        displayIssues = allIssues;
    } else {
        displayIssues = allIssues.filter(issue => issue.status === status);
    }
    console.log(displayIssues);
    const issuesContainer = document.getElementById("issuesContainer");
    issuesContainer.innerHTML = "";
    displayIssues.forEach(issue => {
        const issueElement = document.createElement("div");
        issueElement.classList.add("border-t-4", "border-green-500", "w-full", "shadow-lg", "rounded-md");
        issueElement.innerHTML = `
            <div class="p-3 bg-white w-full shadow rounded-t-sm">
                <!-- Details -->
                <div class="flex flex-col gap-3">
                    <!-- Status + Priority -->
                    <div class="flex justify-between">
                        <img class="w-6 h-6" src="./assets/Open-Status.png" alt="">
                            <div
                                class="w-20 bg-red-200 flex justify-center text-xs text-red-500 font-medium items-center rounded-full">
                                ${issue.priority.toUpperCase()}
                            </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-2">
                            <p class="font-semibold text-sm">${issue.title}</p>
                            <p class="text-xs">${issue.description}
                            </p>
                        </div>
                        <div class="flex gap-1">
                            <div
                                class="min-w-14 p-1 bg-red-200 flex gap-1 justify-center text-xs text-red-500 font-medium items-center rounded-full border-2 border-red-300">
                                <i class="fa-solid fa-bug"></i>
                                ${issue.labels[0].toUpperCase()}
                            </div>
                            <div
                                class="min-w-28 p-1 bg-orange-200 flex gap-1 justify-center text-xs text-orange-500 font-medium items-center rounded-full border-2 border-orange-300">
                                ${issue.labels[1]?.toUpperCase() || ""}
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        <div class="p-3 bg-white w-full rounded-b-sm border-t-2 border-gray-200">
            <div class="text-gray text-xs flex flex-col gap-1">
                <p>${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
        </div>
        `;
        issuesContainer.appendChild(issueElement);
    });
}

allCatagoryButton.addEventListener("click", () => {
    activeButton(allCatagoryButton);
    loadIssues("all");
});
openCatagoryButton.addEventListener("click", () => {
    activeButton(openCatagoryButton);
    loadIssues("open");
});
closedCatagoryButton.addEventListener("click", () => {
    activeButton(closedCatagoryButton);
    loadIssues("closed");
});