async function fetchModalIssues(issueId) {
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await response.json();

    const issue = data.data;

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDescription").innerText = issue.description;
    document.getElementById("modalStatus").innerText = issue.status;
    document.getElementById("modalPriority").innerText = issue.priority;
    document.getElementById("modalAuthor").innerText = issue.author;
    document.getElementById("modalAssignee").innerText = issue.assignee;
    document.getElementById("modalLabel").innerText = issue.labels.join(", ");

    document.getElementById("my_modal_1").showModal();
}