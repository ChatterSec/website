// ascii theme by https://replit.com/@jgordon510/perlin-vanilla-js

import alea from 'alea';
import { createNoise2D } from "simplex-noise";

class Topography {
    constructor(el, seed, noiseScale = 0.02) {
        this.target = document.getElementById(el);
        this.seed = seed || Math.random();
        this.noiseScale = noiseScale;
    }

    updateSeed(seed) {
        this.seed = seed;
    }

    ascii(xOffset=0,yOffset=0) {
        var ramp = '$@B%8&WM#oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~i!lI;:,"^`\'.'

        const draw = () => {
            const prng = alea(this.seed)
            const noise2D = createNoise2D(prng);

            // Calculate the number of columns and rows based on character size and the size of the target element
            const testChar = document.createElement('span');
            testChar.innerHTML = 'M';
            this.target.appendChild(testChar);

            const charDimensions = testChar.getBoundingClientRect();
            const charWidth = charDimensions.width;
            const charHeight = charDimensions.height;

            const cols = Math.floor(this.target.offsetWidth / charWidth);
            const rows = Math.floor(this.target.offsetHeight / charHeight);
            this.target.removeChild(testChar);

            // Create a 2D array
            const map = Array.from({ length: cols }, (_, x) => {
                return Array.from({ length: rows }, (_, y) => {
                    const noiseLevel = (noise2D((x+xOffset) * this.noiseScale, (y+yOffset) * this.noiseScale) + 1) / 2;
                    return ramp[Math.floor(noiseLevel * ramp.length)];
                });
            });

            // Create a new map by transforming each row into a line
            const newMap = Array.from({ length: rows }, (_, y) => {
                return Array.from({ length: cols }, (_, x) => map[x][y]).join('');
            });

            this.target.innerHTML = newMap.join('<br>');
        }

        const target = this.target;
        const resizeObserver = new ResizeObserver(function (entries) {
            for (let entry of entries) {
                if (entry.target === target) {
                    draw();
                }
            }
        });

        resizeObserver.observe(this.target);
        draw();
        return draw;
    }
}

export default Topography;