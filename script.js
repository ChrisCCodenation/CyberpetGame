//Classes have been added and specified to show the creatures statuses and what function is needed to amend each depleting status.
class Creature {
    constructor() {
        this.hunger = 70;
        this.hygiene = 70;
        this.fun = 70;
    }

    feed() {
        this.hunger = Math.min(this.hunger + 10, 100);
    }

    wash() {
        this.hygiene = Math.min(this.hygiene + 10, 100);
    }

    play() {
        this.fun = Math.min(this.fun + 10, 100);
    }

    decreaseStats() {
        this.hunger = Math.max(this.hunger - 1, 0);
        this.hygiene = Math.max(this.hygiene - 1, 0);
        this.fun = Math.max(this.fun - 1, 0);
    }

    isDead() {
        return this.hunger === 0 || this.hygiene === 0 || this.fun === 0;
    }
}

let pet;
let petImageSrc = '';

const selectPet = (type) => {
    petImageSrc = type === 'gremlin' ? './Pictures/spike_walking_cropped.gif' : './Pictures/Link.png';
    pet = new Creature();
    document.getElementById('petImage').src = petImageSrc;
    document.getElementById('petSelectionScreen').style.display = 'none';
    document.getElementById('mainGame').style.display = 'flex';
    startGame();
};

document.getElementById('selectGremlin').addEventListener('click', () => selectPet('gremlin'));
document.getElementById('selectWolf').addEventListener('click', () => selectPet('wolf'));

const updateMeters = () => {
    document.getElementById('Feed').value = pet.hunger;
    document.getElementById('Wash').value = pet.hygiene;
    document.getElementById('Play').value = pet.fun;
};

const handleZeroMeter = (meterId) => {
    let gameOverText;
    switch (meterId) {
        case 'Feed':
            gameOverText = "Your pet died of hunger! SHAME ON YOU";
            break;
        case 'Wash':
            gameOverText = "Your pet got sick due to poor hygiene! You should take a cold shower and think about what you did.";
            break;
        case 'Play':
            gameOverText = "Your pet got bored and left you.";
            break;
        default:
            gameOverText = "Unknown meter reached zero.";
    }
    document.getElementById('gameOverText').textContent = gameOverText;
    document.getElementById('gameOverText').style.display = 'block';
    document.getElementById('restartButton').style.display = 'block';
};

// Decrease stats interval
const startGame = () => {
    const interval = setInterval(() => {
        pet.decreaseStats();
        updateMeters();
        
        if (pet.isDead()) {
            clearInterval(interval);
            const zeroMeter = pet.hunger === 0 ? 'Feed' : pet.hygiene === 0 ? 'Wash' : 'Play';
            handleZeroMeter(zeroMeter);
            document.querySelectorAll('button.help').forEach(button => button.disabled = true);
        }
    }, 1000);

    // Add event listeners
    document.getElementById('feed').addEventListener('click', () => {
        pet.feed();
        updateMeters();
    });

    document.getElementById('wash').addEventListener('click', () => {
        pet.wash();
        updateMeters();
    });

    document.getElementById('play').addEventListener('click', () => {
        pet.play();
        updateMeters();
    });

    document.getElementById('restartButton').addEventListener('click', () => {
        location.reload();
    });
};


// By Mark, Chris and Rebecca

