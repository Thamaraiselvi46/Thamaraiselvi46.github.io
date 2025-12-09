// script.js

function handleFeedbackSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('#fbName')?.value.trim() || 'Anonymous';
    const email = form.querySelector('#fbEmail')?.value.trim();
    const page = form.querySelector('#fbPage')?.value ||
                 form.querySelector('#fbPage')?.innerText ||
                 'Unknown';
    const rating = form.querySelector('#fbRating')?.value;
    const message = form.querySelector('#fbMessage')?.value.trim();
    const statusEl = form.querySelector('#feedbackStatus');

    if (!rating) {
        if (statusEl) {
            statusEl.textContent = 'Please select a rating before submitting.';
            statusEl.style.color = '#b91c1c';
        }
        return;
    }

    const feedback = {
        name,
        email,
        page,
        rating,
        message,
        time: new Date().toISOString()
    };

    try {
        const existing = JSON.parse(localStorage.getItem('ds_feedback') || '[]');
        existing.push(feedback);
        localStorage.setItem('ds_feedback', JSON.stringify(existing));

        if (statusEl) {
            statusEl.textContent = 'Thank you! Your feedback has been saved on this browser.';
            statusEl.style.color = '#065f46';
        }

        // Optionally clear message only, keep name/email
        form.querySelector('#fbMessage').value = '';
        form.querySelector('#fbRating').value = '';
    } catch (err) {
        console.error('Error saving feedback:', err);
        if (statusEl) {
            statusEl.textContent = 'Could not save feedback (localStorage issue).';
            statusEl.style.color = '#b91c1c';
        }
    }
}

// Attach on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', handleFeedbackSubmit);
    }
});
