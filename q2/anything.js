window.onload = function(){
    const canva = document.getElementById("canva");
    canva.width = window.innerWidth * 0.9;   
    canva.height = window.innerHeight * 0.8; 
    const context = canva.getContext("2d");
    const step = 20;
    const angle = 12.5 * Math.PI / 180;
    const stack = [];
    
    const treePositions = [
        { x: canva.width / 3, y: canva.height },       
        { x: 50 + 2 * canva.width /4, y: canva.height },
        { x: 50 + 3 * canva.width / 4, y: canva.height }, 
        { x: 50 + canva.width / 8, y: canva.height },    
        { x: 30 + 7 * canva.width / 7.5, y: canva.height },
    ];
    

    const productionsAnything = {
        X: ()=> {
            const probability = Math.random();
            if(probability <= .5){
                return "F-[[-X]+X]+F[+FX]-X";
            } else {
                return "F+[[+X]-X]-F[-FX]+X[X]";
            }
        },
        F: ()=> {
            const probability = Math.random();
            if(probability <= .33){
                return "F[F]F";
            } else if(probability <= .66){
                return "F[+]F";
            } else {
                return "F[FF]F";
            }
        }
    };

    let drawTree = (x, y) => {
        context.save();
        context.translate(x, y);
        context.rotate(Math.PI);  

        let anything = new LSystem({
            axiom: "X",
            productions: productionsAnything,
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
        context.scale(0.4, 0.4);  
        anything.iterate(5);
        anything.final();
        context.restore();
    };

    treePositions.forEach(pos => {
        drawTree(pos.x, pos.y);
    });

    window.onresize = () => {
        canva.width = window.innerWidth * 0.9;
        canva.height = window.innerHeight * 0.8;
        context.clearRect(0, 0, canva.width, canva.height);
        treePositions.forEach(pos => {
            drawTree(pos.x, pos.y);
        });
    };
};
