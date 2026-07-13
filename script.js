const tasks = [
    "🤲 Read 100x Astaghfirullah + 100x La ilaha illallah + Drink 250ml Water",
    "📖 Drink 500ml Water + Watch a Hadith Video",
    "🧹 Clean Your Room & Desk + Drink 250ml Water",
    "🌍 Watch an Educational Video (World • Why • How)",
    "📖 Drink 250ml Water + Watch a Hadith Video",
    "📝 Visualize Your Dream Life for 5 Minutes + Write It Down",
    "📰 Watch Today's News (Somoy TV)",
    "🎥 Watch an Important Informative Video",
    "💻 Watch an Educational Video (Study Abroad) + 250ml water",
    "🎬 Watch a Documentary / Nature Video + Drink 250ml Water"
  ];

// ...তারপর আমি যে Spin Logic দিয়েছি সেটা এখান থেকে শুরু হবে...

const wheel = document.getElementById("wheel");
const btn = document.getElementById("spinBtn");
const result = document.getElementById("resultText");

let spinning = false;

// =============================
// Remaining Random Tasks
// =============================
let remainingIndexes =
JSON.parse(localStorage.getItem("remainingTasks")) || [];

if (remainingIndexes.length === 0) {
    remainingIndexes = [...Array(tasks.length).keys()];
    shuffleRemaining();
}

function shuffleRemaining() {

    for (let i = remainingIndexes.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [remainingIndexes[i], remainingIndexes[j]] =
        [remainingIndexes[j], remainingIndexes[i]];
    }

    localStorage.setItem(
        "remainingTasks",
        JSON.stringify(remainingIndexes)
    );
}

// =============================
// Spin Button
// =============================
btn.onclick = () => {

    if (spinning) return;

    spinning = true;
    btn.disabled = true;

    // সব Task শেষ হলে আবার নতুন Random Cycle
    if (remainingIndexes.length === 0) {
        remainingIndexes = [...Array(tasks.length).keys()];
        shuffleRemaining();
    }

    // Random Unique Task
    const index = remainingIndexes.shift();

    localStorage.setItem(
        "remainingTasks",
        JSON.stringify(remainingIndexes)
    );

    // Wheel Animation
    const rounds = 6 + Math.floor(Math.random() * 4);

    const deg =
        (rounds * 360) +
        (index * (360 / tasks.length));

    wheel.style.transition =
        "transform 5s cubic-bezier(.17,.67,.15,1)";

    wheel.style.transform = `rotate(${deg}deg)`;

    setTimeout(() => {

        result.innerHTML = tasks[index];

        btn.disabled = false;
        spinning = false;

    }, 5200);
};