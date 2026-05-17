import React, { useEffect, useRef } from 'react';
import '../style/AnimatedBackground.scss';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 180 }); // Magnetic reach area

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle Object Class Setup
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.baseSize = size;
      }

      // Draw particle nodes
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      // Manage coordinate drift and screen boundaries
      update() {
        if (this.x > window.innerWidth || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > window.innerHeight || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Magnetic check: pull/grow nodes resting close to cursor position
        let dx = mouseRef.current.x - this.x;
        let dy = mouseRef.current.y - this.y;
        let distance = Math.hypot(dx, dy);

        if (distance < mouseRef.current.radius) {
          // Soft sizing pop animation when cursor enters perimeter
          if (this.size < this.baseSize * 2.5) this.size += 0.2;
          
          // Micro gravity drift toward pointer coordinates
          this.x += (dx / distance) * 0.5;
          this.y += (dy / distance) * 0.5;
        } else if (this.size > this.baseSize) {
          this.size -= 0.1;
        }

        // Run continuous underlying linear kinetic shift pathing
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Populate space dynamically based on viewport density
    const initParticles = () => {
      particlesArray = [];
      const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 9000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (window.innerWidth - size * 2) + size;
        let y = Math.random() * (window.innerHeight - size * 2) + size;
        let directionX = (Math.random() - 0.5) * 0.4;
        let directionY = (Math.random() - 0.5) * 0.4;
        let color = 'rgba(255, 42, 117, 0.2)'; // Soft magenta default point

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // Draw lines connecting close nodes (Constellation Layer)
    const connectParticles = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.hypot(dx, dy);

          // Connect points if they are close enough to each other
          if (distance < 110) {
            // Calculate distance to cursor to determine if this link should "glow"
            let mouseA = Math.hypot(mouseRef.current.x - particlesArray[a].x, mouseRef.current.y - particlesArray[a].y);
            let mouseB = Math.hypot(mouseRef.current.x - particlesArray[b].x, mouseRef.current.y - particlesArray[b].y);
            
            // Link glows bright pink only near the mouse, otherwise it stays a dim ambient purple
            if (mouseA < mouseRef.current.radius || mouseB < mouseRef.current.radius) {
              opacityValue = (1 - distance / 110) * 0.25;
              ctx.strokeStyle = `rgba(255, 42, 117, ${opacityValue})`;
              ctx.lineWidth = 1;
            } else {
              opacityValue = (1 - distance / 110) * 0.04;
              ctx.strokeStyle = `rgba(147, 51, 234, ${opacityValue})`; // Muted purple for idle background lines
              ctx.lineWidth = 0.5;
            }

            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    resizeCanvas();

    // Main Engine Render loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-fluid-canvas" />;
}