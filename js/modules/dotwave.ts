export class DotWaveController {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number = 0;
  private currentRadius: number = 0;
  private lastTime: number = 0;
  
  private options = {
    dotGap: 20,
    dotRadiusMax: 3,
    expansionSpeed: 250, // px per second
    lightIntensity: 0.4,
    fadeIntensity: 0.08,
    baseRadius: 1,
    baseOpacity: 0.08,
    dotColor: '0, 0, 0' // Dark dots for the light hero theme
  };

  init() {
    this.canvas = document.getElementById('dot-wave-canvas') as HTMLCanvasElement;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
    
    // Slight delay to ensure parent dimensions are computed
    setTimeout(() => {
      this.resize();
      this.lastTime = performance.now();
      this.animate = this.animate.bind(this);
      this.animate(this.lastTime);
    }, 100);
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    }
  }

  animate(time: number) {
    if (!this.canvas || !this.ctx) return;
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

    // Update wave radius
    this.currentRadius += this.options.expansionSpeed * dt;
    if (this.currentRadius > maxRadius + 300) {
      this.currentRadius = 0;
    }

    const { dotGap, dotRadiusMax, lightIntensity, baseRadius, baseOpacity, dotColor, fadeIntensity } = this.options;
    
    // Determine the spread of the wave effect.
    // We use a fixed reasonable thickness so it looks like a nice ripple.
    const waveThickness = 250; 

    // Draw grid of dots
    for (let x = 0; x <= this.canvas.width; x += dotGap) {
      for (let y = 0; y <= this.canvas.height; y += dotGap) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let size = baseRadius;
        let opacity = baseOpacity;

        const distToWave = Math.abs(distance - this.currentRadius);
        
        if (distToWave < waveThickness) {
           const intensity = 1 - (distToWave / waveThickness);
           // Easing out the ripple effect
           const easeIntensity = Math.pow(intensity, 1.5);
           
           size = baseRadius + (dotRadiusMax - baseRadius) * easeIntensity;
           opacity = baseOpacity + (lightIntensity - baseOpacity) * easeIntensity;
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${dotColor}, ${opacity})`;
        this.ctx.fill();
      }
    }

    this.animationId = requestAnimationFrame(this.animate);
  }
}

export const dotWaveController = new DotWaveController();
