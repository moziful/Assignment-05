async function fetchModalIssues(issueId) {

    const response = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`
    );

    const { data: issue } = await response.json();


    document.getElementById("modalTitle").innerText = issue.title;

    document.getElementById("modalStatus").innerText =
        issue.status.toUpperCase();

    document.getElementById("modalAuthor").innerText =
        issue.author;

    document.getElementById("modalDate").innerText =
        "• " + new Date(issue.createdAt).toLocaleDateString();

    document.getElementById("modalDescription").innerText =
        issue.description;

    document.getElementById("modalAssignee").innerText =
        issue.assignee;


    // Priority
    const priorityEl = document.getElementById("modalPriority");

    priorityEl.innerText = issue.priority.toUpperCase();
    priorityEl.className =
        `px-3 py-1 text-xs rounded-full font-semibold ${getPriorityClass(issue.priority)}`;


    // Labels
    const labelsContainer = document.getElementById("modalLabels");
    labelsContainer.innerHTML = "";

    issue.labels.forEach(label => {

        const span = document.createElement("span");

        span.className =
            `px-2 py-1 text-xs rounded-full border font-medium ${getLabelClass(label)}`;

        span.innerText = label.toUpperCase();

        labelsContainer.appendChild(span);

    });


    document.getElementById("my_modal_1").showModal();
}

function getLabelClass(label) {

    if (label === "bug")
        return "bg-red-100 text-red-500 border-red-200";

    if (label === "help wanted")
        return "bg-orange-100 text-orange-500 border-orange-200";

    if (label === "enhancement")
        return "bg-purple-100 text-purple-500 border-purple-200";

    return "bg-gray-100 text-gray-500 border-gray-200";
}


function getPriorityClass(priority) {

    if (priority === "high")
        return "bg-red-500 text-white";

    if (priority === "medium")
        return "bg-orange-400 text-white";

    if (priority === "low")
        return "bg-gray-400 text-white";

}

