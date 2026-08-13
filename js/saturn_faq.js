document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-toggle-btn');
        const question = item.querySelector('.faq-question');

        const toggleFAQ = () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.height = '0px';
                }
            });

            // Toggle current
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq-answer');

            if (isActive) {
                item.classList.remove('active');
                answer.style.height = '0px';
            } else {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
            }
        };

        button.addEventListener('click', toggleFAQ);
        question.addEventListener('click', toggleFAQ);
    });

    // Open the first FAQ by default to match mockup
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.height = firstAnswer.scrollHeight + 'px';
    }
});
