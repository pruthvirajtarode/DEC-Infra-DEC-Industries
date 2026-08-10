/**
 * DEC AI Foundations - State Management
 * Handles localStorage, progress tracking, and module states.
 */

const State = {
    // Default state if nothing is in localStorage
    _state: {
        progress: {
            module1: 0,
            module2: 0,
            module3: 0,
            module4: 0,
            overall: 0
        },
        trainerMode: false,
        completedExercises: [],
        assistantConfig: null
    },

    init() {
        const saved = localStorage.getItem('dec_ai_state');
        if (saved) {
            try {
                this._state = JSON.parse(saved);
            } catch(e) {
                console.error('Failed to parse saved state, resetting.');
            }
        }
        this.save();
    },

    save() {
        localStorage.setItem('dec_ai_state', JSON.stringify(this._state));
        this.updateUI();
    },

    get(key) {
        return this._state[key];
    },

    set(key, value) {
        this._state[key] = value;
        this.save();
    },

    markExerciseComplete(exerciseId, moduleId) {
        if (!this._state.completedExercises.includes(exerciseId)) {
            this._state.completedExercises.push(exerciseId);
            this.recalculateProgress(moduleId);
        }
    },

    recalculateProgress(moduleId) {
        // Simplified progress calculation for demo purposes
        // In reality, this would count specific exercises per module
        let count = this._state.completedExercises.filter(id => id.startsWith(moduleId)).length;
        // Assume 5 exercises per module for 100%
        let pct = Math.min(100, Math.round((count / 1) * 100));
        this._state.progress[moduleId] = pct;
        
        // Overall
        const p = this._state.progress;
        this._state.progress.overall = Math.round((p.module1 + p.module2 + p.module3 + p.module4) / 4);
        
        this.save();
    },

    toggleTrainerMode() {
        this._state.trainerMode = !this._state.trainerMode;
        this.save();
        return this._state.trainerMode;
    },

    updateUI() {
        // Update progress bars
        const fill = document.getElementById('nav-progress-fill');
        const text = document.getElementById('nav-overall-progress');
        if (fill && text) {
            fill.style.width = this._state.progress.overall + '%';
            text.innerText = this._state.progress.overall + '%';
        }

        // Toggle trainer visibility
        const trainerElements = document.querySelectorAll('.trainer-only');
        trainerElements.forEach(el => {
            if (this._state.trainerMode) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });

        const btn = document.getElementById('btn-trainer-mode');
        if (btn) {
            btn.innerText = this._state.trainerMode ? 'Disable Trainer Mode' : 'Enable Trainer Mode';
        }
    }
};

window.State = State;
