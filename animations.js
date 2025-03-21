function startAnimation() {
    const canvas = document.getElementById("spiderCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let nodes = [];
    let mouse = { x: null, y: null };
    let texts = ["Flawless Apps", "Secured Apps", "AI Apps", "Smooth UX", "Scalable", "high performance", "User-Friendlly"];

    document.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    class Node {


        constructor(x, y, text) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.text = text;
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                this.x -= dx * 0.03;
                this.y -= dy * 0.03;
            } else {
                this.x += this.speedX;
                this.y += this.speedY;
            }

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(59, 206, 222, 0.8)";
            ctx.fill();
            ctx.closePath();

            ctx.font = "16px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(this.text, this.x + 10, this.y - 10);
        }
    }

    function createWeb() {
        nodes = [];
        for (let i = 0; i < texts.length; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            nodes.push(new Node(x, y, texts[i]));
        }

        // Determine if it's a mobile screen
        const isMobile = window.innerWidth <= 768;

        // Set number of nodes based on screen size
        const extraNodeCount = isMobile ? 15 : 50;

        for (let i = 0; i < extraNodeCount; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            nodes.push(new Node(x, y, ""));
        }

    }

    function connectNodes() {
        ctx.strokeStyle = "rgba(192, 219, 234, 0.3)";
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        connectNodes();
        requestAnimationFrame(animate);
    }


    function startHandwritingAnimation() {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const text = "Welcome to the Factory of Animated , Fancy, and Robust Apps!";
        let index = 0;
        let x = canvas.width / 8;
        let y = canvas.height / 9;
        let opacity = 1.0;

        ctx.font = "36px Arial";
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`; // Cyan color with opacity
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        function drawLetterByLetter() {
            if (index < text.length) {
                ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
                ctx.fillText(text[index], x, y);
                x += ctx.measureText(text[index]).width;
                index++;
                setTimeout(drawLetterByLetter, 100);
            } else {
                fadeOutText();
            }
        }

        function fadeOutText() {
            let fadeInterval = setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
                ctx.fillText(text, canvas.width / 8, y);
                opacity -= 0.05;
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                }
            }, 100);
        }

        drawLetterByLetter();
    }

    window.onload = startHandwritingAnimation;

    startHandwritingAnimation();
    createWeb();
    animate();
    showAnimatedText();
}

