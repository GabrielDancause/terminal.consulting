/* ========================================
   Terminal Consulting — Interactive Terminal
   ======================================== */

(function () {
    'use strict';

    // ── Config ──
    var CHAR_SPEED = 35;
    var OUTPUT_SPEED = 12;
    var FORMSPREE_ID = 'YOUR_FORM_ID'; // Replace with your Formspree form ID from formspree.io

    // ── DOM ──
    var terminal = document.getElementById('terminal');
    var hiddenInput = document.getElementById('hidden-input');

    // ── State ──
    var interactive = false;
    var currentInputSpan = null;
    var currentCursor = null;
    var flowMode = null;   // null = normal, or { step, data }

    // ══════════════════════════════════════
    //  PHASE 1: Intro Animation
    // ══════════════════════════════════════

    var lines = document.querySelectorAll('.line');
    var queue = [];

    lines.forEach(function (line) {
        var delay = parseInt(line.getAttribute('data-delay'), 10);
        if (isNaN(delay)) return;
        queue.push({ el: line, delay: delay });
    });

    queue.sort(function (a, b) { return a.delay - b.delay; });

    var startTime = Date.now();

    function processQueue() {
        if (queue.length === 0) {
            startInteractive();
            return;
        }
        var elapsed = Date.now() - startTime;
        var next = queue[0];
        if (elapsed >= next.delay) {
            queue.shift();
            revealLine(next.el, processQueue);
        } else {
            requestAnimationFrame(processQueue);
        }
    }

    function revealLine(line, callback) {
        line.classList.add('visible');
        var typed = line.querySelector('.typed');
        if (!typed) { callback(); return; }
        var text = typed.getAttribute('data-text') || '';
        var speed = typed.classList.contains('command') ? CHAR_SPEED : OUTPUT_SPEED;
        var i = 0;
        typed.classList.add('typing-cursor');
        (function typeChar() {
            if (i < text.length) {
                typed.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                typed.classList.remove('typing-cursor');
                callback();
            }
        })();
    }

    // ══════════════════════════════════════
    //  PHASE 2: Interactive Mode
    // ══════════════════════════════════════

    function startInteractive() {
        interactive = true;
        addPrompt();
        hiddenInput.focus();

        // Keep focus on hidden input
        document.addEventListener('click', function () {
            if (interactive) hiddenInput.focus();
        });

        hiddenInput.addEventListener('input', function () {
            if (currentInputSpan) {
                currentInputSpan.textContent = hiddenInput.value;
                scrollToBottom();
            }
        });

        hiddenInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                var value = hiddenInput.value.trim();
                hiddenInput.value = '';
                handleEnter(value);
            }
        });
    }

    function addPrompt(prefix) {
        var line = document.createElement('div');
        line.className = 'input-line';

        var prompt = document.createElement('span');
        prompt.className = prefix ? 'flow-prompt' : 'prompt';
        prompt.textContent = prefix || '$';

        var input = document.createElement('span');
        input.className = prefix ? 'flow-input' : 'input-text';

        var cursor = document.createElement('span');
        cursor.className = 'cursor active';
        cursor.textContent = '▋';

        line.appendChild(prompt);
        line.appendChild(document.createTextNode(' '));
        line.appendChild(input);
        line.appendChild(cursor);
        terminal.appendChild(line);

        currentInputSpan = input;
        currentCursor = cursor;
        hiddenInput.value = '';
        scrollToBottom();
    }

    function handleEnter(value) {
        // Freeze current line (remove cursor, lock text)
        if (currentCursor) currentCursor.remove();
        currentInputSpan = null;
        currentCursor = null;

        if (flowMode) {
            handleFlowStep(value);
        } else {
            executeCommand(value);
        }
    }

    // ── Commands ──

    function executeCommand(cmd) {
        var command = cmd.toLowerCase().trim();

        switch (command) {
            case 'help':
                printLines([
                    'Available commands:',
                    '  request    — Submit a work request',
                    '  services   — What we do',
                    '  portfolio  — Our work',
                    '  contact    — Reach us',
                    '  clear      — Clear terminal'
                ]);
                addPrompt();
                break;

            case 'services':
                printLines([
                    '  [1] Website builds',
                    '  [2] Maintenance',
                    '  [3] Automation'
                ]);
                addPrompt();
                break;

            case 'portfolio':
                printLink('  aubergedenosaieux.com', 'https://aubergedenosaieux.com');
                printLink('  aliimperiale.com', 'https://aliimperiale.com');
                printLink('  gab.ae', 'https://gab.ae');
                addPrompt();
                break;

            case 'contact':
                printLink('  hello@terminal.consulting', 'mailto:hello@terminal.consulting');
                addPrompt();
                break;

            case 'clear':
                terminal.innerHTML = '';
                addPrompt();
                break;

            case 'request':
                flowMode = { step: 'name', data: {} };
                printLines(['Your name:']);
                addPrompt();
                break;

            case '':
                addPrompt();
                break;

            default:
                printLines([cmd + ': command not found. Type help for available commands.'], 'error');
                addPrompt();
                break;
        }
    }

    // ── Request Flow ──

    function handleFlowStep(value) {
        if (!value && flowMode.step !== 'confirm') {
            printLines(['Please enter a value.'], 'error');
            addPrompt();
            return;
        }

        switch (flowMode.step) {
            case 'name':
                flowMode.data.name = value;
                flowMode.step = 'email';
                printLines(['Your email:']);
                addPrompt();
                break;

            case 'email':
                if (!value.includes('@')) {
                    printLines(['Please enter a valid email.'], 'error');
                    addPrompt();
                    return;
                }
                flowMode.data.email = value;
                flowMode.step = 'message';
                printLines(['What do you need?']);
                addPrompt();
                break;

            case 'message':
                flowMode.data.message = value;
                submitRequest();
                break;
        }
    }

    function submitRequest() {
        printLines(['Sending...'], 'dim');

        var data = flowMode.data;
        flowMode = null;

        fetch('https://formspree.io/f/' + FORMSPREE_ID, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                _subject: 'New request from ' + data.name
            })
        })
        .then(function (res) { return res.json(); })
        .then(function (result) {
            if (result.ok || result.success) {
                printLines(['✓ Request submitted. We\'ll be in touch.'], 'success');
            } else {
                printLines(['✗ Something went wrong. Email us at hello@terminal.consulting'], 'error');
            }
            addPrompt();
        })
        .catch(function () {
            printLines(['✗ Network error. Email us at hello@terminal.consulting'], 'error');
            addPrompt();
        });
    }

    // ── Helpers ──

    function printLines(texts, className) {
        texts.forEach(function (text) {
            var line = document.createElement('div');
            line.className = 'line visible output';
            if (className) line.classList.add(className);
            line.textContent = text;
            terminal.appendChild(line);
        });
        scrollToBottom();
    }

    function printLink(text, href) {
        var line = document.createElement('div');
        line.className = 'line visible output';
        var a = document.createElement('a');
        a.className = 'link';
        a.href = href;
        a.textContent = text;
        if (href.startsWith('http')) {
            a.target = '_blank';
            a.rel = 'noopener';
        }
        line.appendChild(a);
        terminal.appendChild(line);
        scrollToBottom();
    }

    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    // ── Kick off ──
    requestAnimationFrame(processQueue);
})();
