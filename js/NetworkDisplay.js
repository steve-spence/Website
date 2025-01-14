let canvasContainer = document.querySelector(".canvas-container")
//let network = document.querySelector(".network")
let heroContainer = document.querySelector(".hero-container")
const waveHeight = 8;

function getRelativePosition(node, parent) {
    const nodeRect = node.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    const relativePosition = {
        x: nodeRect.left - parentRect.left + window.scrollX, // Subtract parent left
        y: nodeRect.top - parentRect.top + window.scrollY   // Subtract parent top
    };

    return relativePosition;
}

function connectNodes(inputNodes, outputNodes, nodeRadius) {
    // Create a canvas to draw connections
    const networkCanvas = document.createElement('canvas');
    const networkCTX = networkCanvas.getContext('2d');
    canvasContainer.appendChild(networkCanvas);

    // Function to update canvas dimensions based on the network size
    function updateNetworkCanvasSize() {
        const networkRect = network.getBoundingClientRect();

        // Set canvas size to match the network container size
        networkCanvas.width = networkRect.width;
        networkCanvas.height = networkRect.height;
    }

    updateNetworkCanvasSize(); // Initially update canvas size

    // Style canvas to overlay content
    networkCanvas.style.position = 'absolute';
    networkCanvas.style.top = '0';
    networkCanvas.style.left = '0';
    networkCanvas.style.pointerEvents = 'none'; // Make the canvas non-interactive so it doesn't block any interactions

    // Function to draw connections
    function drawConnections() {
        networkCTX.clearRect(0, 0, networkCanvas.width, networkCanvas.height); // Clear the canvas

        inputNodes.forEach(inputNode => {
            const inputRect = inputNode.getBoundingClientRect();
            const inputCenter = {
                x: (inputRect.left + inputRect.width / 2 + window.scrollX) -
                 (network.getBoundingClientRect().x + window.scrollX),
                y: (inputRect.top + inputRect.height / 2 + window.scrollY) - 
                (network.getBoundingClientRect().y + window.scrollY)
            };

            outputNodes.forEach(outputNode => {
                const outputRect = outputNode.getBoundingClientRect();
                // position is adjusted for offset from center
                const outputCenter = {
                    x: (outputRect.left + outputRect.width / 2 + window.scrollX) -
                    (network.getBoundingClientRect().x + window.scrollX),
                    y: (outputRect.top + outputRect.height / 2 + window.scrollY)- 
                    (network.getBoundingClientRect().y + window.scrollY)
                };

                // Calculate the line start points based on the radius (subtract radius from center)
                const inputEdge = {
                    x: inputCenter.x + (nodeRadius * Math.cos(0)),  // Adjust x-coordinate based on radius
                    y: inputCenter.y + (nodeRadius * Math.sin(0)),  // Adjust y-coordinate based on radius
                };

                const outputEdge = {
                    x: outputCenter.x + (nodeRadius * Math.cos(Math.PI)),  // Adjust x-coordinate for the opposite direction
                    y: outputCenter.y + (nodeRadius * Math.sin(Math.PI)),  // Adjust y-coordinate for the opposite direction
                };

                // Draw the line between the edges of the nodes (not their centers)
                networkCTX.beginPath();
                networkCTX.moveTo(inputEdge.x, inputEdge.y); 
                networkCTX.lineTo(outputEdge.x, outputEdge.y);
                networkCTX.strokeStyle = '#7c7c7c';
                networkCTX.lineWidth = 1;
                networkCTX.stroke();
            });
        }); 
    }

    drawConnections(); // Draw the initial connections

    // Redraw connections on resize or scroll
    window.addEventListener('resize', () => {
        updateNetworkCanvasSize(); // Update canvas size on resize
        drawConnections(); // Redraw connections
    });

    window.addEventListener('scroll', drawConnections); // Redraw connections on scroll
}

// // Fetch nodes from the DOM
// const inputNodes = document.querySelectorAll('.input-layer .node');
// const hiddenNodes1 = document.querySelectorAll('.hidden-layer1 .node');
// const hiddenNodes2 = document.querySelectorAll('.hidden-layer2 .node');
// const outputNodes = document.querySelectorAll('.output-layer .node');

// // Define the radius of your nodes (you can adjust this value as needed)
// const nodeRadius = 10;

// // Call the function to connect the nodes
// connectNodes(inputNodes, hiddenNodes1, nodeRadius);
// connectNodes(hiddenNodes1, hiddenNodes2, nodeRadius);
// connectNodes(hiddenNodes2, outputNodes, nodeRadius);



// // update time for all nodes aniamtion
// var nodes = document.querySelectorAll('.node');
// nodes.forEach(node => {
//     var time = Math.random()*10;
//     time = time < 1 ? 1 : time;
//     node.style.setProperty('--animation-time', time + 's');
// });

//----------------------- Header Background ---------------------------------------

const waveCanvas = document.getElementById('waveCanvas');
const waveCTX = waveCanvas.getContext('2d');

const particles = [];
const mouse = { x: null, y: null };

// Particle class
class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = x;
        this.baseY = y;
        this.color = color;
    }

    draw() {
        waveCTX.beginPath();
        waveCTX.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        waveCTX.fillStyle = this.color;
        waveCTX.fill();
        waveCTX.closePath();
    }

    update() {
        const amplitude = 30;
        this.y = this.baseY + Math.sin(this.baseX * 0.05 + performance.now() * 0.002) * amplitude;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.size = 5;
        } else {
            this.size = 2;
        }
        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particles.length = 0; // Clear existing particles
    const particleDensity = Math.floor((waveCanvas.width * waveCanvas.height) / 10000); // Density factor
    for (let i = 0; i < particleDensity; i++) {
        const x = Math.random() * waveCanvas.width;
        const y = Math.random() * waveCanvas.height;
        const size = 2;
        const color = 'rgba(255, 255, 255, 0.8)';
        particles.push(new Particle(x, y, size, color));
    }
}

// Animate particles
function animate() {
    waveCTX.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

// Handle canvas resize
function resizeCanvas() {
    const heroRect = heroContainer.getBoundingClientRect();
    waveCanvas.width = heroRect.width;
    waveCanvas.height = heroRect.height;
    initParticles(); // Reinitialize particles on resize
}

// Mousemove event
waveCanvas.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});


// Initialize canvas and start animation
function initialize() {

    waveCanvas.width = window.innerWidth;
    waveCanvas.height = window.vh*.1*waveHeight;
    initParticles();
    animate();
}

window.addEventListener('resize', resizeCanvas);
initialize();


//----------------------- Set Section ---------------------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".header-list-items a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 0) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const parent = link.parentElement;
    parent.classList.remove("header-active");
    if (link.getAttribute("href") === `#${current}`) {
        parent.classList.add("header-active");
    }
  });
});

//----------------------- Glasses ---------------------------------------
// Select the photo div
const heroPhoto = document.getElementById('hero-photo');

// Add a click event listener
heroPhoto.addEventListener('click', () => {
  // Check if the overlay already exists
  if (!heroPhoto.querySelector('.hero-glasses-overlay')) {
    // Create a new overlay div
    const overlay = document.createElement('div');
    overlay.classList.add('hero-glasses-overlay');
    
    // Append the overlay to the hero photo
    heroPhoto.appendChild(overlay);
  }
});
