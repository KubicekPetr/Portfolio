const grey = '#FDF6EE';
const darkBlue = '#023586';
const pink = '#FCD4D4';
const darkPink = '#FCD4D4';
const lightPink = '#FEE5E1';
const salmon = '#FEC1A2';
const blue = '#0179F0';
const lightBlue = '#4098F1';
const orange = '#FFB572';


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

const fillFromTriangles = (div, cube, top, right, bottom, left) => {
    div.style.width = 0 + 'px';
    div.style.height = 0 + 'px';
    div.style.borderTop = `${cube / 2}px solid ${top}`;
    div.style.borderLeft = `${cube / 2}px solid ${left}`;
    div.style.borderRight = `${cube / 2}px solid ${right}`;
    div.style.borderBottom = `${cube / 2}px solid ${bottom}`;
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

    let x = 0;
    let y = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 11; j++) {
            const cube = createCube(cubeSize, x, y);

            // section for modifying cube
            if (j <= 2 && i === 0) {
                cube.style.background = darkBlue;
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
