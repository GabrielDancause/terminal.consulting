/* ========================================
   Terminal Consulting — Typing Animation
   ======================================== */

(function () {
    'use strict';

    var CHAR_SPEED = 35;       // ms per character for commands
    var OUTPUT_SPEED = 12;     // ms per character for output (faster)

    var lines = document.querySelectorAll('.line');
    var finalCursor = document.querySelector('.line:last-child .cursor');
    var queue = [];

    // Build queue from data-delay attributes
    lines.forEach(function (line) {
        var delay = parseInt(line.getAttribute('data-delay'), 10);
        if (isNaN(delay)) return;

        queue.push({ el: line, delay: delay });
    });

    // Sort by delay
    queue.sort(function (a, b) { return a.delay - b.delay; });

    // Start the sequence
    var startTime = Date.now();

    function processQueue() {
        if (queue.length === 0) {
            // All done — activate final blinking cursor
            if (finalCursor) finalCursor.classList.add('active');
            return;
        }

        var elapsed = Date.now() - startTime;
        var next = queue[0];

        if (elapsed >= next.delay) {
            queue.shift();
            revealLine(next.el, function () {
                processQueue();
            });
        } else {
            requestAnimationFrame(processQueue);
        }
    }

    function revealLine(line, callback) {
        line.classList.add('visible');

        var typed = line.querySelector('.typed');
        if (!typed) {
            callback();
            return;
        }

        var text = typed.getAttribute('data-text') || '';
        var speed = typed.classList.contains('command') ? CHAR_SPEED : OUTPUT_SPEED;
        var i = 0;

        typed.classList.add('typing-cursor');

        function typeChar() {
            if (i < text.length) {
                typed.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                typed.classList.remove('typing-cursor');
                callback();
            }
        }

        typeChar();
    }

    // Kick off
    requestAnimationFrame(processQueue);
})();
