class ChessClock {
    constructor() {
        this.player1Time = 300; // 5 minutes in seconds
        this.player2Time = 300;
        this.activePlayer = null;
        this.interval = null;
        this.isRunning = false;

        // DOM Elements
        this.timeSelect = document.getElementById('timeSelect');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.player1Element = document.getElementById('player1');
        this.player2Element = document.getElementById('player2');
        this.player1Btn = player1.querySelector('.player-btn');
        this.player2Btn = player2.querySelector('.player-btn');

        // Event Listeners
        this.startBtn.addEventListener('click', () => this.toggleStart());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.player1Btn.addEventListener('click', () => this.switchPlayer(2));
        this.player2Btn.addEventListener('click', () => this.switchPlayer(1));
        this.timeSelect.addEventListener('change', () => this.updateInitialTime());

        // Initialize
        this.updateDisplay();
        this.disablePlayerButtons();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    updateDisplay() {
        this.player1Element.querySelector('.time').textContent = this.formatTime(this.player1Time);
        this.player2Element.querySelector('.time').textContent = this.formatTime(this.player2Time);
    }

    toggleStart() {
        if (!this.isRunning) {
            this.start();
        } else {
            this.pause();
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.textContent = 'إيقاف مؤقت';
            this.enablePlayerButtons();
            // اختيار لاعب عشوائي فقط إذا لم يكن هناك لاعب نشط
            if (!this.activePlayer) {
                this.activePlayer = Math.random() < 0.5 ? 1 : 2;
                this.updateActivePlayer();
                alert(`يبدأ اللاعب ${this.activePlayer}`);
            }
            this.startTimer();
        }
    }

    pause() {
        this.isRunning = false;
        this.startBtn.textContent = 'استئناف';
        clearInterval(this.interval);
        this.disablePlayerButtons();
    }

    startTimer() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (this.activePlayer === 1) {
                this.player1Time--;
            } else {
                this.player2Time--;
            }

            this.updateDisplay();

            if (this.player1Time <= 0 || this.player2Time <= 0) {
                this.gameOver();
            }
        }, 1000);
    }

    switchPlayer(newPlayer) {
        if (!this.isRunning) return;
        
        this.activePlayer = newPlayer;
        this.updateActivePlayer();
    }

    updateActivePlayer() {
        this.player1Element.classList.toggle('active', this.activePlayer === 1);
        this.player2Element.classList.toggle('active', this.activePlayer === 2);
    }

    gameOver() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.startBtn.textContent = 'ابدأ';
        this.disablePlayerButtons();
        
        const winner = this.player1Time <= 0 ? 'اللاعب 2' : 'اللاعب 1';
        alert(`انتهت اللعبة! الفائز هو ${winner}`);
    }

    reset() {
        clearInterval(this.interval);
        this.updateInitialTime();
        this.isRunning = false;
        this.activePlayer = null;
        this.startBtn.textContent = 'ابدأ';
        this.disablePlayerButtons();
        this.player1Element.classList.remove('active');
        this.player2Element.classList.remove('active');
    }

    updateInitialTime() {
        const newTime = parseInt(this.timeSelect.value);
        this.player1Time = newTime;
        this.player2Time = newTime;
        this.updateDisplay();
    }

    enablePlayerButtons() {
        this.player1Btn.disabled = false;
        this.player2Btn.disabled = false;
    }

    disablePlayerButtons() {
        this.player1Btn.disabled = true;
        this.player2Btn.disabled = true;
    }
}

// Initialize the chess clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChessClock();
});
