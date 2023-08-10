$(document).ready(function () {
    let scheduleEntries = [];

    $('.saveBtn').on("click", function () {
        const value = $(this).siblings(".description").val();
        const time = $(this).parent().attr("id");
        const dateAdded = moment().format("dddd, MMMM Do");

        scheduleEntries.push({ description: value, time, date: dateAdded });
        saveScheduleEntriesToLocalStorage();
        updateUI();
    });

    function hourUpdater() {
        const presentHour = moment().hour();

        $(".time-block").each(function () {
            const denyHour = parseInt($(this).attr("id").split("-")[1]);

            $(this).removeClass("past present future");
            $(this).addClass(presentHour > denyHour ? "past" : presentHour === denyHour ? "present" : "future");
        });
    }

    function setTime() {
        let timeRemaining = 15;

        setInterval(function () {
            if (timeRemaining === 0) {
                hourUpdater();
                timeRemaining = 15;
            }

            timeRemaining--;
        }, 1000);
    }
    setTime();

    async function loadScheduleEntriesFromLocalStorage() {
        const storedScheduleEntries = JSON.parse(localStorage.getItem("ScheduleEntries")) || [];
        scheduleEntries = storedScheduleEntries;
    }

    async function saveScheduleEntriesToLocalStorage() {
        localStorage.setItem("ScheduleEntries", JSON.stringify(scheduleEntries));
    }

    async function updateUI() {
        await loadScheduleEntriesFromLocalStorage();

        for (const entry of scheduleEntries) {
            $("#" + entry.time).children(".description").text(entry.description);
        }
        $("#currentDay").text(moment().format("dddd, MMMM Do"));
    }

    updateUI();
});
