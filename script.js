let countdown;

// Alarm Sound
const alarm = new Audio("./mp3/microsammy-clock-alarm-8761.mp3");

// Store alerted times
let alertedTimes = [];

function startExam() {
  let minutes = parseInt(document.getElementById("minutes").value);

  if (minutes <= 0 || isNaN(minutes)) {
    alert("Please enter valid minutes");
    return;
  }

  let totalSeconds = minutes * 60;

  // Clear old timer
  clearInterval(countdown);

  // Reset alerts
  alertedTimes = [];

  // Alert every 30 minutes
  let alertPoints = [];

  for (let i = minutes - 30; i > 0; i -= 30) {
    alertPoints.push(i * 60);
  }

  countdown = setInterval(function () {
    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;

    hrs = hrs.toString().padStart(2, "0");
    mins = mins.toString().padStart(2, "0");
    secs = secs.toString().padStart(2, "0");

    document.getElementById("timer").innerHTML = `${hrs} : ${mins} : ${secs}`;

    // Check alert points
    if (
      alertPoints.includes(totalSeconds) &&
      !alertedTimes.includes(totalSeconds)
    ) {
      alertedTimes.push(totalSeconds);

      let remainingMinutes = totalSeconds / 60;

      alarm.currentTime = 0;
      alarm.play();
    }

    // Time Finished
    if (totalSeconds <= 0) {
      clearInterval(countdown);

      let timer = document.getElementById("timer");

      timer.innerHTML = "ដល់ម៉ោងហើយកូនៗ";
      timer.style.fontSize = "90px";
      timer.style.color = "red";
      timer.style.fontWeight = "bold";

      //animation class
      timer.classList.add("blink-text");

      alarm.currentTime = 0;
      alarm.play();

      return;
    }

    totalSeconds--;
  }, 1000);
}
