let currentStatus = "all";
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

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    loadIssues();
});

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

function loadIssues() {

    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let displayIssues = allIssues;

    // Filter by Status
    if (currentStatus !== "all") {
        displayIssues = displayIssues.filter(issue =>
            issue.status === currentStatus
        );
    }
    // Filter by Search
    if (searchText !== "") {
        displayIssues = displayIssues.filter(issue =>
            issue.title.toLowerCase().includes(searchText) ||
            issue.description.toLowerCase().includes(searchText) ||
            issue.author.toLowerCase().includes(searchText) ||
            issue.createdAt.toLowerCase().includes(searchText) ||
            issue.labels.some(label => label.toLowerCase().includes(searchText))
        );
    }

    const issuesContainer = document.getElementById("issuesContainer");
    issuesContainer.innerHTML = "";

    displayIssues.forEach(issue => {
        const issueElement = document.createElement("div");
        issueElement.classList.add("border-t-4", issue.status === "open" ? "border-green-500" : "border-purple-500", "w-full", "shadow-lg", "rounded-md");
        issueElement.innerHTML = `
            <div onclick="fetchModalIssues(${issue.id})" class="p-3 bg-white w-full shadow rounded-t-sm">
                <!-- Details -->
                <div class="flex flex-col gap-3">
                    <!-- Status + Priority -->
                    <div class="flex justify-between">
                        <img class="w-6 h-6" src=${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"} alt="">
                            <div
class="w-20 ${issue.priority.toUpperCase() === "HIGH"
                ? "bg-red-200 text-red-500"
                : issue.priority.toUpperCase() === "MEDIUM"
                    ? "bg-orange-200 text-orange-500"
                    : "bg-gray-200 text-gray-500"
            } flex justify-center text-xs font-medium items-center rounded-full">
  ${issue.priority.toUpperCase()}
</div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col gap-2">
                            <p class="font-semibold text-sm">${issue.title}</p>
                            <p class="text-xs">${issue.description}
                            </p>
                        </div>
                        <div id="labelsContainer" class="flex gap-1">
                            <div
    class="p-1 px-2 flex gap-1 justify-center text-[10px] font-medium items-center rounded-full border-2 
    ${issue.labels[0] === 'enhancement' ? 'bg-green-200 text-green-500 border-green-300' :
                issue.labels[0] === 'documentation' ? 'bg-purple-200 text-purple-500 border-purple-300' :
                    'bg-red-200 text-red-500 border-red-300'}">
    <i class="fa-solid 
       ${issue.labels[0] === 'bug' ? 'fa-bug' : issue.labels[0] === 'enhancement' ? 'fa-wand-magic-sparkles' : 'fa-book'}">
    </i>
    ${issue.labels[0].toUpperCase()}
</div>
                            ${issue.labels[1] ? `
<div
    class="p-1 px-2 bg-orange-200 flex gap-1 justify-center text-[10px] text-orange-500 font-medium items-center rounded-full border-2 border-orange-300">
    ${issue.labels[1].toUpperCase()}
</div>` : ''}
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

    document.getElementById("numberOfIssues").innerText = displayIssues.length;
}

allCatagoryButton.addEventListener("click", () => {
    activeButton(allCatagoryButton);
    currentStatus = "all";
    loadIssues();
});

openCatagoryButton.addEventListener("click", () => {
    activeButton(openCatagoryButton);
    currentStatus = "open";
    loadIssues();
});

closedCatagoryButton.addEventListener("click", () => {
    activeButton(closedCatagoryButton);
    currentStatus = "closed";
    loadIssues();
});