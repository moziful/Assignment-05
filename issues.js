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
        issueElement.classList.add("border-t-4", issue.status === "open" ? "border-green-500" : "border-purple-500", "w-full", "shadow-lg", "rounded-md");
        issueElement.innerHTML = `
            <div class="p-3 bg-white w-full shadow rounded-t-sm">
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
                                class="p-1 px-2 bg-red-200 flex gap-1 justify-center text-[10px] text-red-500 font-medium items-center rounded-full border-2 border-red-300">
                                <i class="fa-solid ${issue.labels[0] === "bug" ? "fa-bug" : issue.labels[0] === "enhancement" ? "fa-wand-magic-sparkles" : "fa-book"}"></i>
                                ${issue.labels[0].toUpperCase()}
                            </div>
                            <div
                                class="p-1 px-2 bg-orange-200 flex gap-1 justify-center text-[10px] text-orange-500 font-medium items-center rounded-full border-2 border-orange-300">
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
    document.getElementById("numberOfIssues").innerText = displayIssues.length;
    // for (const label of issues.label[1]) {
    //     const labelElement = document.createElement("div");
    //     labelElement.classList.add("min-w-28", "p-1", "bg-orange-200", "flex", "gap-1", "justify-center", "text-xs", "text-orange-500", "font-medium", "items-center", "rounded-full", "border-2", "border-orange-300");
    //     labelElement.innerText = label.toUpperCase();
    //     document.getElementById("labelsContainer").appendChild(labelElement);
    // }
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