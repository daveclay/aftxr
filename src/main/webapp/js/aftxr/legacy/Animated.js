function Animated(delay) {
    var animationScheduler = new AnimationScheduler();
    var handle;

    this.getAnimationScheduler = function() {
        return animationScheduler;
    };

    this.animate = function() {
        var self = this;
        handle = animationScheduler.start(function() {
            self.update();
        }, delay);
    };

    this.stop = function() {
        animationScheduler.stop(handle);
        handle = null;
    };
}

function AnimationScheduler() {
    this.start = function(fn, delay) {
        var start = new Date().getTime();
        var handle = {};

        function loop() {
            var current = new Date().getTime();
            var delta = current - start;

            if (delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }
            // This isn't right.
            handle.value = window.requestAnimationFrame(loop);
        }

        handle.value = window.requestAnimationFrame(loop);
        return handle;
    };

    this.stop = function (handle) {
        if (cancelAnimationFrame) {
            cancelAnimationFrame(handle.value);
        } else {
            clearTimeout(handle);
        }
    };
}


