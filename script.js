
const timetableBody = document.querySelector("#timetable tbody");

const subjects = [
  "Math", "English", "Science", "History", "Geography",
  "PE", "ICT", "Art", "Music", "Civic", "Biology", "Chemistry"
];

const periodDuration = 40; // minutes
const totalPeriods = 13;
let hour = 8;
let minute = 0;

// Format time in AM/PM format
function formatTime(h, m) {
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  const mm = m.toString().padStart(2, '0');
  return `${hr}:${mm} ${ampm}`;
}

// Add minutes helper function
function addMinutes(h, m, minsToAdd) {
  m += minsToAdd;
  h += Math.floor(m / 60);
  m = m % 60;
  return [h, m];
}

let periodsAdded = 0;
while (periodsAdded < totalPeriods) {
  // Insert Break at 10:00 - 10:40
  if (hour === 10 && minute === 0) {
    const breakRow = document.createElement("tr");

    const breakTimeCell = document.createElement("td");
    breakTimeCell.textContent = "10:00 AM - 10:40 AM";
    breakRow.appendChild(breakTimeCell);

    const breakCell = document.createElement("td");
    breakCell.textContent = "Break";
    breakCell.colSpan = 5;
    breakCell.style.backgroundColor = "#ffefc5";
    breakCell.style.fontWeight = "bold";
    breakRow.appendChild(breakCell);

    timetableBody.appendChild(breakRow);

    [hour, minute] = addMinutes(hour, minute, periodDuration);
    continue; // Don't count break as a period
  }

  // Insert Lunch Break at 1:00 PM - 2:00 PM
  if (hour === 13 && minute === 0) {
    const lunchRow = document.createElement("tr");

    const lunchTimeCell = document.createElement("td");
    lunchTimeCell.textContent = "1:00 PM - 2:00 PM";
    lunchRow.appendChild(lunchTimeCell);

    const lunchCell = document.createElement("td");
    lunchCell.textContent = "Lunch Break";
    lunchCell.colSpan = 5;
    lunchCell.style.backgroundColor = "#ffe0e0";
    lunchCell.style.fontWeight = "bold";
    lunchRow.appendChild(lunchCell);

    timetableBody.appendChild(lunchRow);

    [hour, minute] = addMinutes(hour, minute, 60); // Lunch is 60 minutes
    continue; // Don't count lunch as a period
  }

  // 
 const row = document.createElement("tr");

  const start = formatTime(hour, minute);
  [hour, minute] = addMinutes(hour, minute, periodDuration);
  const end = formatTime(hour, minute);

  const timeCell = document.createElement("td");
  timeCell.textContent = `${start} - ${end}`;
  row.appendChild(timeCell);

  for (let d = 0; d < 5; d++) {
    const cell = document.createElement("td");
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    cell.textContent = randomSubject;
    cell.contentEditable = true;
    row.appendChild(cell);
  }

  timetableBody.appendChild(row);
  periodsAdded++;
}