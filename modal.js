let modalIssues = [];
async function fetchModalIssues() {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/35");
    const data = await response.json();
    modalIssues = data.data;
    console.log(modalIssues);
    // console.log(Array.isArray(allIssues));
    loadModalIssues();
}
fetchModalIssues();

function loadModalIssues() {
    const issueTitle = modalIssues.title;
    const issueDescription = modalIssues.description;
    const issueAuthor = modalIssues.author;
    const issueCreatedAt = modalIssues.createdAt;
    const issueStatus = modalIssues.status;
    const issuePriority = modalIssues.priority;
    const issueAssignee = modalIssues.assignee;
    const issueLabels = modalIssues.labels;



    document.getElementById("modalTitle").innerText = issueTitle;
    document.getElementById("modalDescription").innerText = issueDescription;
    document.getElementById("modalAuthor").innerText = issueAuthor;
    document.getElementById("modalCreatedAt").innerText = issueCreatedAt;
    document.getElementById("modalStatus").innerText = issueStatus;
    document.getElementById("modalPriority").innerText = issuePriority;
    document.getElementById("modalAssignee").innerText = issueAssignee;
    document.getElementById("modalLabels").innerText = issueLabels;
}