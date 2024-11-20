window.onload = function() {
    const userRole = window.localStorage.getItem('userRole');
    const dashboardContent = document.getElementById('dashboard-content');
    
    if (userRole === 'intern') {
        dashboardContent.innerHTML = `
            <h2>Intern Dashboard</h2>
            <button onclick="window.location.href='internship_details.html'">Submit Internship Details</button>
            <button onclick="window.location.href='report_submission.html'">Submit Report</button>
        `;
    } else if (userRole === 'mentor') {
        dashboardContent.innerHTML = `
            <h2>Mentor Dashboard</h2>
            <button onclick="window.location.href='report_submission.html'">Submit Report</button>
        `;
    } else if (userRole === 'admin') {
        dashboardContent.innerHTML = `
            <h2>Admin Dashboard</h2>
            <button onclick="window.location.href='view_interns.html'">Manage Interns</button>
            <button onclick="window.location.href='view_reports.html'">View Reports</button>
        `;
    }
};
