var timer = {
    timer_element: $('.timer'),

    time: 0,
    state: 'stop',
    pomodoro_count: 0,
    interval_id: null,

    // // Standard Pomodoro time in seconds.
    // pomodoro_time: 25 * 60,
    // short_break_time: 5 * 60,
    // long_break_time: 15 * 60,

    pomodoro_time: 5,
    short_break_time: 1,
    long_break_time: 3,

    set_time: function(time) {
        this.time = time;
        this.update_display();
    },

    // Sets the time and setups the interval, only to be run when the timer is stopped initially.
    start: function(time) {
        this.setup_interval();

        this.set_time(time);
    },

    stop: function() {
        // Clear previous interval if there is any.
        if (this.interval_id !== null) {
            this.clear_interval();
        }

        this.set_time(0);
    },

    set_state: function(state) {
        this.state = state;

        if (state === 'pomodoro') {
            this.start(this.pomodoro_time);
        }
        else if (state === 'short_break') {
            this.start(this.short_break_time);
        }
        else if (state === 'stop') {
            this.stop();
        }
    },

    // Interval function is setup when the timer is set so the "leftover" time
    // from the initial setup is not kept.
    setup_interval: function() {
        // Clear previous interval if there is any.
        if (this.interval_id !== null) {
            this.clear_interval();
        }

        this.interval_id = window.setInterval(function() {timer.update();}, 1000);
    },

    clear_interval: function() {
        window.clearInterval(this.interval_id);

        this.interval_id = null;
    },

    get_time_text: function() {
        var minutes = Math.floor(this.time / 60).toString().padStart(2, "0");
        var seconds = (this.time % 60).toString().padStart(2, "0");

        return minutes + ':' + seconds;
    },

    update_display: function() {
        this.timer_element.text(this.get_time_text());
    },

    switch_to_next_state: function() {
        if (this.state === 'pomodoro') {
            this.set_state('short_break');
        }
        else if (this.state === 'short_break') {
            this.set_state('pomodoro');
        }
    },

    set_pomodoro_count: function(count) {
        this.pomodoro_count = count;

        $(`.tomato:lt(${count})`).addClass("fill");
    },

    // This gets called every second to update the clock.
    update: function() {
        if (this.time > 0) {
            this.set_time(this.time - 1);
        }
        else {
            if (this.state === 'pomodoro') {
                this.set_pomodoro_count(this.pomodoro_count + 1);
            }

            this.switch_to_next_state();
        }
    }
};

$(document).ready(function() {
    // Assign button press to the functions.
    $('.pomodoro').click(function() {timer.set_state('pomodoro')});
    $('.short-break').click(function() {timer.set_state('short_break')});
    $('.stop').click(function() {timer.set_state('stop')});
});