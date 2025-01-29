class SimpleCaptcha {
    constructor(runtime) {
        this.runtime = runtime;
        this.captchaText = "";
        this.success = false;
    }

    getInfo() {
        return {
            id: "simpleCaptcha",
            name: "Simple Captcha",
            color1: "#003cff",
            color2: "#0037cd",
            color3: "#0033b3",
            blocks: [
                {
                    opcode: "openCaptcha",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Open Captcha",
                },
                {
                    opcode: "captchaSuccess",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "succeeded?",
                }
            ]
        };
    }

    openCaptcha() {
        this.captchaText = this.generateCaptcha();
        this.success = false;
        this.showCaptchaDialog();
    }

    captchaSuccess() {
        return this.success;
    }

    generateCaptcha() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
        let captcha = "";
        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    showCaptchaDialog() {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.left = "50%";
        modal.style.top = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.background = "white";
        modal.style.padding = "20px";
        modal.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
        modal.style.zIndex = "1000";

        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 80;
        modal.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "lightgray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 8; i++) {
            ctx.strokeStyle = `rgb(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150})`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        ctx.font = "30px Arial";
        for (let i = 0; i < this.captchaText.length; i++) {
            ctx.fillStyle = `rgb(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150})`;
            ctx.fillText(this.captchaText[i], 20 + i * 30, Math.random() * 30 + 30);
        }

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter Captcha";
        modal.appendChild(input);

        const submit = document.createElement("button");
        submit.innerText = "Submit";
        submit.onclick = () => {
            if (input.value === this.captchaText) {
                this.success = true;
            }
            document.body.removeChild(modal);
        };
        modal.appendChild(submit);

        document.body.appendChild(modal);
    }
}

Scratch.extensions.register(new SimpleCaptcha());
