// Standard Pomodoro time in seconds.
var pomodoro_time = 25 * 60;
var break_time = 5 * 60;

var timer = {
    element: $('.timer'),
    time: 0,
    interval_id: null,

    set: function(time) {
        this.time = time;

        this.setup_interval();
        this.update_display();
    },

    // Interval function is setup when the timer is set so the "leftover" time
    // from the initial setup is not kept.
    setup_interval: function() {
        // Clear previous interval if there is any.
        if (this.interval_id !== null) {
            window.clearInterval(this.interval_id);
        }

        this.interval_id = window.setInterval(function() {timer.update();}, 1000);
    },

    get_time_text: function() {
        var minutes = Math.floor(this.time / 60).toString().padStart(2, "0");
        var seconds = (this.time % 60).toString().padStart(2, "0");

        return minutes + ':' + seconds;
    },

    update_display: function() {
        this.element.text(this.get_time_text());
    },

    // This gets called every second to update the clock.
    update: function() {
        if (this.time > 0) {
            this.time = this.time - 1;
            this.update_display();
        }
    }
};

$(document).ready(function() {
    // Assign button press to the functions.
    $('.pomodoro').click(function() {timer.set(pomodoro_time)});
    $('.break').click(function() {timer.set(break_time)});
});