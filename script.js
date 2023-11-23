const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const tt = document.getElementById("tt");
const timers = document.getElementsByClassName("timers")[0];
const noTimers = document.getElementsByClassName("no_timers")[0];
let idx = 0;
let arr = [];

function addTimer() {
    // console.log(hh.value > 0);
    idx++;
    let hour, minute, second;
    if (isNaN(hh.value) || isNaN(mm.value) || isNaN(tt.value))
        alert("Invalid Input");
    else if (hh.value < 0 || mm.value < 0 || mm.value > 59 || tt.value < 0 || tt.value > 59)
        alert("Invalid Input");
    else if (hh.value == 0 && mm.value == 0 && tt.value == 0)
        alert("Invalid Input");
    else {
        hour = hh.value == "" ? "00" : (hh.value.length < 2 ? `0${hh.value}` : hh.value);
        minute = mm.value == "" ? "00" : (mm.value.length < 2 ? `0${mm.value}` : mm.value);
        second = tt.value == "" ? "00" : (tt.value.length < 2 ? `0${tt.value}` : tt.value);
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `card${idx}`);
        card.innerHTML = `
            <p>Time Left :</p>
            <div class="time_left">
                <input value="${hour}" id="hh_value${idx}" disabled></input>hr :
                <input value="${minute}" id="mm_value${idx}" disabled></input>min :
                <input value="${second}" id="tt_value${idx}" disabled></input>sec
            </div>
            <div class="buttons">
                <button class="delete_button" index_number="${idx}" onclick=pauseTimer(event)>Pause</button>
                <button class="delete_button" index_number="${idx}" onclick=deleteTimer(event)>Cancel</button>
            </div>
        `;
        hh.value = '';
        mm.value = '';
        tt.value = '';
        noTimers.style.display = 'none';
        timers.appendChild(card);
        startTimer(idx);
    }
}

function startTimer(idx) {
    const hr = document.getElementById(`hh_value${idx}`);
    const min = document.getElementById(`mm_value${idx}`);
    const sec = document.getElementById(`tt_value${idx}`);
    arr[idx] = setInterval(() => {
        if (sec.value == 0) {
            sec.value = 60;
            min.value = min.value - 1;
        }
        if (min.value == -1) {
            min.value = 59;
            hr.value = hr.value - 1;
        }
        sec.value = sec.value - 1;
        sec.value = sec.value.length < 2 ? `0${sec.value}` : sec.value;
        min.value = min.value.length < 2 ? `0${min.value}` : min.value;
        hr.value = hr.value.length < 2 ? `0${hr.value}` : hr.value;
        if (sec.value == 0 && min.value == 0 && hr.value == 0) {
            clearInterval(arr[idx]);
            stopTimer(idx);
            playAlarm();
        }

    }, 1000);
}

function pauseTimer(event) {
    const index_number = event.target.getAttribute("index_number");
    if (event.target.innerText == "Pause") {
        event.target.innerText = "Resume";
        clearInterval(arr[index_number]);
    } else {
        event.target.innerText = "Pause";
        startTimer(index_number);
    }
}

function deleteTimer(event) {
    const index_number = event.target.getAttribute("index_number");
    clearInterval(arr[index_number]);
    const timerToBeDelete = event.target.parentElement.parentElement;
    timerToBeDelete.remove();
    if (timers.children.length === 0)
        noTimers.style.display = 'block';
}

function stopTimer(idx) {
    const card2 = document.getElementById(`card${idx}`);
    card2.classList.remove("card");
    card2.classList.add("card2");
    card2.innerHTML = `
        <p>Timer Is Up !!!</p>
        <button onclick=removeCard(event)>Delete</button>
    `;
}

function removeCard(event) {
    event.target.parentElement.remove();
    if (timers.children.length === 0)
        noTimers.style.display = 'block';
}

function playAlarm() {
    const alarm = new Audio("./alarm.mp3");
    alarm.play();
}
