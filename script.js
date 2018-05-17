// Standard Pomodoro time in seconds.
var pomodoro_time = 25 * 60;
var break_time = 5 * 60;

var timer = {
    element: $('.timer'),
    time: 0,

    set: function(time) {
        this.time = time;

        this.update_display();
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
            this.set(this.time - 1);
        }

        console.log(this.time);
    }
};

$(document).ready(function() {
    // Assign button press to the functions.
    $('.pomodoro').click(function() {timer.set(pomodoro_time)});
    $('.break').click(function() {timer.set(break_time)});
});

window.setInterval(function() {timer.update()}, 1000);