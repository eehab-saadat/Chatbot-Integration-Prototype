document.addEventListener('DOMContentLoaded', function () {
    const askButton = document.getElementById('ask-button');
    const submitButton = document.getElementById('submit-button');
    const clearButton = document.getElementById('clear-button');
    const answerField = document.querySelector('.answer-field');
    const aiResponse = document.getElementById('ai-response');
    const askCountElement = document.getElementById('ask-count');
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupButton = document.getElementById('close-popup');
    
    let askCount = 0;
    const maxLimit = 3;

    // Function to reset all values
    function resetAll() {
        askCount = 0;
        askCountElement.innerText = `You have used AI coach ${askCount} times`;
        aiResponse.textContent = '';
        answerField.value = '';
        askButton.disabled = false;
        askButton.style.backgroundColor = '';
    }

    // Function to show the pop-up
    function showPopup(message) {
        const popupContent = popupOverlay.querySelector('.popup-content p');
        popupContent.textContent = message;
        popupOverlay.style.display = 'flex';
    }

    // Function to hide the pop-up
    function hidePopup() {
        popupOverlay.style.display = 'none';
    }

    // Call resetAll to initialize values when the page loads
    resetAll();

    fetch('/get_question')
        .then(response => response.json())
        .then(data => {
            document.getElementById('question').innerText = data.question;
        });
        
    askButton.addEventListener('click', function () {
        if (askCount < maxLimit) {
            const question = document.getElementById('question').innerText;
            const answer = document.getElementById('answer').value;
            fetch('/ask_ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question, answer: answer })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('ai-response').innerText = data.ai_response;
                askCount++;
                if (askCount === maxLimit) {
                    askCountElement.innerText = "You have achieved your max AI limit";
                    askButton.disabled = true;
                    askButton.style.backgroundColor = 'lightgrey';
                } else {
                    askCountElement.innerText = `You have used AI coach ${askCount} times`;
                }
            });
        }
    });

    submitButton.addEventListener('click', function () {
        const question = document.querySelector('.question').textContent;
        const answer = answerField.value;
        const aiResponseElem = document.getElementById('ai-response');
        const aiResponseText = aiResponseElem ? aiResponseElem.textContent : ' ';

        if (!answer.trim()) {
            showPopup('Cannot submit empty field.');
            return;
        }

        fetch('/submit_answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer, aiResponse: aiResponseText })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Received:', data);
            // Show pop-up
            showPopup('Data submitted successfully!');
            // Reset values on frontend after submission
            fetch('/get_question')
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.question').textContent = data.question;
                    answerField.value = '';
                    aiResponse.textContent = '';
                });
        });
    });

    clearButton.addEventListener('click', function () {
        aiResponse.textContent = '';
    });

    closePopupButton.addEventListener('click', hidePopup);
});
