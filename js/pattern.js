const grey0 = '#FDF6EE';
const darkBlue1 = '#023586';
const pink2 = '#FBD4D7';
const pink3 = '#FCD4D4';
const salmon4 = '#FEC1A2';
const pink5 = '#FCE3DF'; // FCE3DF / F9DCDC
const pink6 = '#FCD4D4';
const blue7 = '#4098F1'; // 4098F1 / 0179F1
const blue8 = '#0179F1';
const blue10 = '#0179F1'; 
const orange11 = '#FFB572'; 


const clear = () => {
    const pattern = document.getElementById("pattern");
    while (pattern.firstChild) {
        pattern.removeChild(pattern.firstChild);
    }
}

const responsivness = (width, height) => {
    let cube = 0;
    if (false) { // if not HD...
        cube = width / 11;
    } else {
        const minCube = 40;
        cube = height / 6 > minCube ? height / 6 : minCube;
        if (cube > minCube) {
            document.querySelector('body').style.overflowY = 'hidden';
        } else {
            document.querySelector('body').style.overflowY = 'visible';
        }
    }
    return cube;
}

const fillFromTriangles = (cube, cubeSize, top, right, bottom, left) => {
    cube.style.width = 0 + 'px';
    cube.style.height = 0 + 'px';
    cube.style.borderTop = `${cubeSize / 2}px solid ${top}`;
    cube.style.borderLeft = `${cubeSize / 2}px solid ${left}`;
    cube.style.borderRight = `${cubeSize / 2}px solid ${right}`;
    cube.style.borderBottom = `${cubeSize / 2}px solid ${bottom}`;
}

const getCircle = (background, offset) => {
    const circle = document.createElement('div');
    circle.style.width = '100%';
    circle.style.height = '100%';
    circle.style.borderRadius = '50%';
    circle.style.background = background;
    circle.style.transform = `translateX(${offset}%)`;
    return circle;
}

const getStripe = (background) => {
    const stripe = document.createElement('div');
    stripe.style.width = '100%';
    stripe.style.height = '33%';
    stripe.style.background = background;
    stripe.style.marginTop = '33%';
    return stripe;
}

const createCube = (size, x, y) => {
    const cube = document.createElement('div');
    cube.style.width = size + 'px';
    cube.style.height = size + 'px';
    cube.style.position = 'absolute';
    cube.style.left = x + 'px';
    cube.style.top = y + 'px';
    cube.style.overflow = 'hidden';
    return cube;
}

const render = () => {
    clear();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const cubeSize = responsivness(width, height);

    const map = [[1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0],
                 [0, 3, 4, 5, 6, 6, 6, 6, 6, 6, 0],
                 [3, 4, 7, 6, 6, 6, 6, 6, 6, 4, 8],
                 [4, 8, 6, 6, 6, 6, 6, 6, 6, 8, 3],
                 [3, 9, 4, 6, 6, 6, 6, 6, 8, 3, 4],
                 [10, 0, 6, 10, 11, 6, 4, 8, 6, 11, 10]];

    let x = 0;
    let y = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 11; j++) {
            const cube = createCube(cubeSize, x, y);

            // section for modifying cube
            switch (map[i][j]) {
                case 0:
                    cube.style.background = grey0;
                    break;
                case 1:
                    cube.style.background = darkBlue1;
                    break;
                case 2:
                    fillFromTriangles(cube, cubeSize, pink2, grey0, grey0, pink2);
                    break;
                case 3:
                    cube.style.background = pink3;
                    break;
                case 4:
                    cube.style.background = salmon4;
                    break;
                case 5:
                    fillFromTriangles(cube, cubeSize, pink5, pink6, pink6, pink5);
                    break;
                case 6:
                    cube.style.background = pink6;
                    break;
                case 7:
                    fillFromTriangles(cube, cubeSize, blue7, blue8, blue8, blue7);
                    break;
                case 8:
                    fillFromTriangles(cube, cubeSize, pink2, salmon4, salmon4, pink2);
                    break;
                case 9:
                    fillFromTriangles(cube, cubeSize, pink2, pink2, salmon4, salmon4);
                    break;
                case 10:
                    cube.style.background = blue7;
                    break;
                case 11:
                    cube.style.background = orange11;
                    break;
            }

            // section for object inside cube


            document.getElementById('pattern').appendChild(cube);
            x += cubeSize;
        }
        x = 0;
        y += cubeSize;
    }
}

const debounce = (func) => {
    let timer;
    return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
  }

window.addEventListener('load', render());
window.addEventListener('resize', debounce(render));
