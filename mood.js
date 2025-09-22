const form = document.getElementById("mood-form");
const historyList = document.getElementById("mood-history");
const suggestionBox = document.getElementById("suggestion-box");

// Load previous moods from localStorage
window.onload = function () {
  const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
  savedMoods.forEach(entry => addMoodToDOM(entry));
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const mood = document.getElementById("mood").value;
  const notes = document.getElementById("notes").value;
  const date = new Date().toLocaleDateString();

  const moodEntry = { mood, notes, date };
  addMoodToDOM(moodEntry);

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem("moods")) || [];
  existing.push(moodEntry);
  localStorage.setItem("moods", JSON.stringify(existing));

  // Show suggestion
  showSuggestion(mood);

  // Reset form
  form.reset();
});

function addMoodToDOM(entry) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${entry.date}</strong>: ${entry.mood} - ${entry.notes || "No additional notes"}`;
  historyList.prepend(li); // Latest entry first
}

function showSuggestion(mood) {
  let suggestion = "";
  switch (mood) {
    case "😰 Anxious":
    case "😖 Stressed":
      suggestion = "Try breathing exercises or short walks to calm your mind. You can also talk to our AI chatbot 🤖.";
      break;
    case "😔 Sad":
      suggestion = "Consider journaling or talking to someone you trust. Our AI chatbot is here to listen.";
      break;
    case "😊 Happy":
    case "🤩 Excited":
      suggestion = "That's great! Keep doing what makes you feel good. 😊";
      break;
    case "😐 Neutral":
      suggestion = "Try doing something creative or relaxing today to lift your mood.";
      break;
  }

  suggestionBox.innerText = suggestion;
  suggestionBox.style.display = "block";
}
