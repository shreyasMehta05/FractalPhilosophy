function findAngle(r){
    let angle = (r % 30) - 15 + 10;
    return angle * Math.PI / 180;
}

window.onload = function() {
    const canva = document.getElementById("canva");
    canva.width = window.innerWidth * 0.9;   
    canva.height = window.innerHeight * 0.8; 

    const context = canva.getContext("2d");
    const step = 20;
    const stack = [];
    
    context.translate(canva.width / 2, canva.height);
    context.scale(0.5, 0.5);    

    const angle = findAngle(59);
    context.rotate(Math.PI);

    const productionTree = {
        X: "F[-X]X[+X][+X]F-[-X]+X[-X]",
        F: "FF"
    };

    let tree = new LSystem({
        axiom: "X",
        productions: productionTree,
        finals: {
            X: () => {},
            F: () => {
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(0, step);
                context.strokeStyle = "lightgreen";
                context.stroke();
                context.translate(0, step);
            },
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

    tree.iterate(5);
    tree.final();

    window.onresize = () => {
        canva.width = window.innerWidth * 0.9;
        canva.height = window.innerHeight * 0.8;
        context.translate(canva.width / 2, canva.height);
        context.scale(0.2, 0.2);
        context.clearRect(0, 0, canva.width, canva.height);
        tree.final(); 
    };
}