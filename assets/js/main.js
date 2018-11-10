class Particle {
	constructor(context, x, y, d = 2, color = '#9294AE', movement = 10, lerp = 0.05) {
		this.context = context;

		this.x = this.currentX = this.targetX = x;
		this.y = this.currentY = this.targetY = y;
		this.d = d;
		this.lerp = lerp;
		this.color = color;
		this.movement = movement;
	}

	draw() {
		var context = this.context,
			r = this.d / 2;
		context.fillStyle = this.color;
		context.beginPath();

		var x = this.x - r,
			y = this.y - r;

		if (Math.abs(this.targetX - this.currentX) < this.movement * 0.1) {
			this.targetX = x + Math.random() * this.movement * (Math.random() < 0.5 ? -1 : 1);
		}
		if (Math.abs(this.targetY - this.currentY) < this.movement * 0.1) {
			this.targetY = y + Math.random() * this.movement * (Math.random() < 0.5 ? -1 : 1);
		}

		this.currentX += (this.targetX - this.currentX) * this.lerp;
		this.currentY += (this.targetY - this.currentY) * this.lerp;

		context.arc(this.currentX, this.currentY, r, 0, Math.PI * 2, false);

		context.closePath();
		context.fill();
	}

	setTarget(x, y) {

	}
}

class Canvas {
	constructor(element, particleSpacing = 50) {
		this.canvas = element;
		this.context = element.getContext('2d');

		this.particleSpacing = particleSpacing;

		window.addEventListener('resize', () => this.init());
		this.init();
	}

	init () {
		this.stop();
		this.clear();

		this.resize();

		this.createParticles();
		this.animate();
	}

	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	createParticles() {
		var cols = Math.floor(this.canvas.width / this.particleSpacing),
			rows = Math.floor(this.canvas.height / this.particleSpacing),
			colGutter = (this.particleSpacing + (this.canvas.width - cols * this.particleSpacing)) / 2,
			rowGutter = (this.particleSpacing + (this.canvas.height - rows * this.particleSpacing)) / 2;

		this.particles = [];
		for (let col = 0; col < cols; col++) {
			for (let row = 0; row < rows; row++) {
				let x = col * this.particleSpacing + colGutter,
						y = row * this.particleSpacing + rowGutter,
						particle = new Particle(this.context, x, y);
				this.particles.push(particle);
			}
		}
	}

	draw() {
		this.clear();
		if (this.particles) {
			for (let i = 0; i < this.particles.length; i++) {
				this.particles[i].draw();
			}
		}
	}

	animate() {
		this.draw();
		this.animationFrame = window.requestAnimationFrame(() => this.animate());
	}

	stop() {
		window.cancelAnimationFrame(this.animationFrame);
	}
}
var cnvs = new Canvas(document.getElementById('canvas'));

$('body').mousemove(function(e) {
    var x = (e.pageX * -1 / 10);
    $("#canvas").animate({
      left: x + 'px'
    }, 10);
});





let archiveToShow = ''

for (project of ARCHIVE) {
	archiveToShow += `<br><a class="ar-link" target="_blank" href="${project.link}">${project.name}</a> (${project.year})`
}



function showArchive() {
	swal({
		type: 'info',
		title: 'Archive',
		html: `${archiveToShow}<br><br><br>`,
		showCloseButton: true,
		showConfirmButton: false
	})
}

const archieveBtn = document.getElementById('archive')

archieveBtn.addEventListener('click', showArchive)
archieveBtn.addEventListener('touch', showArchive)
