document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '-1'
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighter';
    const waves = [];
    const waveCount = 10; 
    let time = 0;

    function Wave(y, color) {
        this.y = y;
        this.baseAmplitude = 15 + Math.random() * 10;
        this.amplitude = this.baseAmplitude;
        this.baseFrequency = 0.015 + Math.random() * 0.005;
        this.frequency = this.baseFrequency;
        this.phase = Math.random() * 2 * Math.PI;
        this.speed = 0.02 + Math.random() * 0.01;
        this.color = color;
        this.angle = Math.random() * Math.PI - Math.PI / 2;
    }

    Wave.prototype.draw = function() {
        ctx.save();
        ctx.translate(canvas.width / 2, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(-canvas.width, 0);
        for (let i = -canvas.width; i < canvas.width; i++) {
            const x = i;
            const y = Math.sin(this.phase + (i * this.frequency)) * this.amplitude;
            ctx.lineTo(x, y);
        }
        ctx.fillStyle = this.color;
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(-canvas.width, canvas.height);
        ctx.fill();

        ctx.restore();
    };

    Wave.prototype.update = function() {
        this.phase += this.speed;
        // Determine the rhythm based on time intervals
        const baseRhythm = Math.sin(time * 0.02); // Slower, smoother rhythm
        let rhythm = baseRhythm;

        if (Math.floor(time / 500) % 5 === 0) { // Brief, faster intervals every 500 frames, repeating every 5 intervals
            rhythm += Math.sin(time * 0.1) * 0.5; // Adding a quicker, more pronounced rhythm
        }

        this.amplitude = this.baseAmplitude + rhythm * 5;
        this.frequency = this.baseFrequency + rhythm * 0.005;
    };

    const colors = ['rgba(50, 50, 50, 0.4)', 'rgba(80, 80, 80, 0.4)', 'rgba(110, 110, 110, 0.4)'];

    for (let i = 0; i < waveCount; i++) {
        waves.push(new Wave(i * canvas.height / (waveCount + 1), colors[i % colors.length]));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        waves.forEach(wave => {
            wave.update();
            wave.draw();
        });
        requestAnimationFrame(animate);
        time++;
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        waves.forEach((wave, index) => {
            wave.y = index * canvas.height / (waveCount + 1);
        });
    });
});
