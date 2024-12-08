window.onload = function(){
    const canva = document.getElementById("canva");
    canva.width = window.innerWidth * 0.9;   
    canva.height = window.innerHeight * 0.8; 
    
    const context = canva.getContext("2d");
    const step = 20;
    const angle = 30 * Math.PI / 180;
    const it = 10;
    let stack = [];
    
    context.translate(canva.width / 2, canva.height*.9);
    context.scale(0.4, 0.4); 

    const productionBall = {
        G: "X-G-X",
        X: "G+Y+G",
        Y: "[+F]F[-F]",
    };

    let ball = new LSystem({
        axiom: "G",
        productions: productionBall,
        finals: {
            F: () => {
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(0, -step);
                context.strokeStyle = "lightblue";
                context.stroke();
                context.translate(0, -step);
            },
            G: () => {
                context.translate(0, -step);
            },
            X: () => {},
            Y: () => {},
            "+": () => {
                context.rotate(angle);
            },
            "-": () => {
                context.rotate(-angle);
            },
            "[": () => {
                context.save();
                stack.push(context.getTransform());
            },
            "]": () => {
                context.restore();
                context.setTransform(stack.pop());
            }
        }
    });

    ball.iterate(it);
    ball.final();

    window.onresize = () => {
        canva.width = window.innerWidth * 0.9;
        canva.height = window.innerHeight * 0.8;
        context.translate(canva.width / 2, canva.height*.9);
        context.scale(0.4, 0.4);
        context.clearRect(0, 0, canva.width, canva.height);
        ball.final();  
    };
}