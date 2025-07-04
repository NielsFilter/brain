 /**
     * Represents a single neuron (a dot).
     * It handles its own position, velocity, and drawing logic.
     */
    class Neuron {
        constructor(x, y, color = null) {
            this.originX = x;
            this.originY = y;
            this.x = x;
            this.y = y;
            // Increased radius for slightly bigger neurons
            this.radius = Math.random() * 0.4 * Math.floor(canvas.height / 100)  + 1;
            // Velocity for the animation
            var scalingFactor = canvasHeightFactor();
            this.vx = (Math.random() - 0.5) * 0.3 * scalingFactor;
            this.vy = (Math.random() - 0.5) * 0.3 * scalingFactor;
            // Max distance it can travel from its origin
            this.maxDist = (Math.random() * 7 + 5);
            this.customColor = color; // For per-neuron color
        }

        /**
         * Updates the neuron's position for the animation effect.
         */
        updatePosition() {
            this.x += this.vx; // Add some randomness to the movement
            this.y += this.vy;

            const dist = Math.hypot(this.x - this.originX, this.y - this.originY);
            // Reverse direction if it moves too far from its origin
            if (dist > this.maxDist) {
                this.vx *= -1;
                this.vy *= -1;
            }
        }

        /**
         * Draws the neuron on the canvas with a given color.
         * @param {string} color - The fill color for the neuron.
         */
        draw(isHover = false) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            if(isHover) {
                ctx.fillStyle = colorToRgbaHighlight(this.customColor);
            } else // if (this.customColor) {
                ctx.fillStyle = colorToRgba(this.customColor);
            ctx.fill();

            if(isHover || Math.round(Math.random() * 10) % 2 == 0) {
                // Randomly update position for a more dynamic effect
                this.updatePosition();
            }
        }
    }