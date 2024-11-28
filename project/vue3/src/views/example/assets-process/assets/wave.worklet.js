class WavePattern {
  static get inputProperties() {
    return ['--wave-color', '--wave-amplitude', '--wave-frequency'];
  }

  paint(ctx, size, properties) {
    const color = properties.get('--wave-color') || '#1989fa';
    const amplitude = parseInt(properties.get('--wave-amplitude')) || 20;
    const frequency = parseInt(properties.get('--wave-frequency')) || 20;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < size.width; x++) {
      const y = amplitude * Math.sin((x / frequency) * Math.PI) + (size.height / 2);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  }
}

registerPaint('wave-pattern', WavePattern); 