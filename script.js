// intern-dashboard.html form submission logic
document.getElementById('internForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const companyName = document.getElementById('companyName').value;
    const startDate = document.getElementById('startDate').value;
    const externalMentor = document.getElementById('externalMentor').value;
    const offerLetter = document.getElementById('offerLetter').files[0];

    // Just a simple log to confirm form submission
    console.log('Intern Details Submitted:', {
        companyName,
        startDate,
        externalMentor,
        offerLetter
    });

    alert('Intern details submitted successfully!');
});
