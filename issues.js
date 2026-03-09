let allIssues = [];
async function fetchIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    allIssues = data.data;
    // console.log(allIssues);
    // console.log(Array.isArray(allIssues));
    filterIssues("all");
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

function filterIssues(status) {
    let displayIssues;
    if (status === "all") {
        displayIssues = allIssues;
    } else {
        displayIssues = allIssues.filter(issue => issue.status === status);
    }
    console.log(displayIssues);
}

allCatagoryButton.addEventListener("click", () => {
    activeButton(allCatagoryButton);
    filterIssues("all");
});
openCatagoryButton.addEventListener("click", () => {
    activeButton(openCatagoryButton);
    filterIssues("open");
});
closedCatagoryButton.addEventListener("click", () => {
    activeButton(closedCatagoryButton);
    filterIssues("closed");
});