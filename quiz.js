const questions = [
    "How often do you feel anxious or stressed?",
    "Do you have trouble falling or staying asleep?",
    "Do you feel emotionally drained after social interactions?",
    "Do you experience frequent mood swings or irritability?",
    "Do you feel overwhelmed by daily tasks or responsibilities?",
    "Do you feel a lack of motivation to engage in activities you once enjoyed?",
    "Do you often feel like you are unable to cope with stress or challenges?",
    "Do you find it hard to concentrate or focus on tasks?"
];

const options = ["Often", "Sometimes", "Rarely", "Never"];

const quizForm = document.getElementById('quizForm');
const container = document.getElementById('questions-container');
const resultBox = document.getElementById('quiz-result');

// Generate Questions
questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<p>${index + 1}. ${q}</p>`;

    options.forEach(opt => {
        div.innerHTML += `
            <label>
                <input type="radio" name="q${index + 1}" value="${opt.toLowerCase()}"> ${opt}
            </label>
        `;
    });

    container.appendChild(div);
});

// Submit handler
quizForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const answers = new FormData(quizForm);
    let score = 0;
    let unanswered = 0;

    // Reset highlights
    document.querySelectorAll('.question').forEach(div => div.classList.remove('unanswered'));

    questions.forEach((_, i) => {
        const ans = answers.get(`q${i + 1}`);
        if (!ans) {
            document.querySelectorAll('.question')[i].classList.add('unanswered');
            unanswered++;
        } else {
            if (ans === "often") score += 3;
            else if (ans === "sometimes") score += 2;
            else if (ans === "rarely") score += 1;
        }
    });

    if (unanswered > 0) {
        resultBox.style.display = "block";
        resultBox.innerHTML = `⚠️ <strong>Please answer all questions before submitting.</strong>`;
        return;
    }

    let message = "", emoji = "", suggestion = "";

    if (score >= 18) {
        emoji = "😢";
        message = "It seems like you're going through a tough time.";
        suggestion = `
            💡 <strong>Suggestions:</strong><br>
            - Try talking to a trusted friend or professional 🗣️<br>
            - Practice daily mindfulness or breathing exercises 🧘‍♀️<br>
            - Make time for small joys and rest 🛌<br>
            - You are not alone — support is available. ❤️
        `;
    } else if (score >= 10) {
        emoji = "😟";
        message = "You may be experiencing moderate stress or emotional strain.";
        suggestion = `
            💡 <strong>Suggestions:</strong><br>
            - Stay physically active 🏃<br>
            - Maintain a consistent sleep schedule ⏰<br>
            - Limit screen time and try journaling 📖<br>
            - Reach out if you're ever feeling stuck 💬
        `;
    } else {
        emoji = "😌";
        message = "You're doing great! Keep taking care of yourself.";
        suggestion = `
            🌟 <strong>Tips to Maintain Well-being:</strong><br>
            - Keep a gratitude journal 🙏<br>
            - Stay socially connected 💞<br>
            - Take breaks and celebrate small wins 🎉<br>
            - Share kindness — it uplifts both you and others 💌
        `;
    }

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <div style="font-size: 24px;">${emoji} <strong>Your Result:</strong></div>
        <p>${message}</p>
        <div class="suggestions">${suggestion}</div>
    `;
});

// Reset result on form reset
quizForm.addEventListener('reset', () => {
    resultBox.style.display = "none";
    document.querySelectorAll('.question').forEach(div => div.classList.remove('unanswered'));
});
