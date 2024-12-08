window.onload = function() {
    const canva = document.getElementById('canva');
    const context = canva.getContext('2d');
    
    canva.width = window.innerWidth * 0.8;  
    canva.height = window.innerHeight * 0.8; 
    
    context.scale(.03, .03); 
    
    const productionsNoise = {
        F: (predecessor, leftContext, rightContext) => {
            if (leftContext === 'F' && rightContext === 'F') {
                return "F-+F+F";
            }
            return "F-F++F-F";
        }
    };
    
    context.translate(canva.width+12000, 18000+canva.height);
    const angle = Math.PI / 2;
    const step = 20;
    
    let noise = new LSystem({
        axiom: "F+F",
        productions: productionsNoise,
        finals: {
            F: () => {
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(0, -step);
                context.strokeStyle = "lightblue";
                context.stroke();
                context.translate(0, -step);
            },
            "+": () => {
                context.rotate(angle);
            },
            "-": () => {
                context.rotate(-angle);
            }
        }
    });

    noise.iterate(9);
    noise.final();
    
    window.onresize = () => {
        canva.width = window.innerWidth * 0.8;
        canva.height = window.innerHeight * 0.8;
        context.translate(canva.width / 2, canva.height / 2);
        context.clearRect(-canva.width / 2, -canva.height / 2, canva.width, canva.height);
        noise.final();
    };
};
