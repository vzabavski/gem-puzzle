// Menu

function createMenu() {
    const menu = document.createElement('div');
    document.body.appendChild(menu);
    menu.classList.add('menu');
    menu.innerHTML = '<h1>Gem Puzzle</h1>'
    const newGame = document.createElement('h2');
    menu.appendChild(newGame);
    newGame.innerText = 'New Game';
    newGame.id = 'newGame';
    const continueGame = document.createElement('h2');
    menu.appendChild(continueGame);
    continueGame.id = 'continueGame';
    continueGame.innerText = 'Continue';
    if (localStorage.getItem('id') === null) { 
        continueGame.style.color = 'rgba(0, 0, 0, 0.3)'
    } else {
        continueGame.style.cursor = 'pointer';
        const savedValue = localStorage.getItem('value');
        continueGame.addEventListener('click', function() {
            console.log('click')
            start(+savedValue, audioButton.id);
            menu.style.display = 'none'
        });
      
    }
    const best = document.createElement('div');
    const titleBest = document.createElement('h2');
    const closeBest = document.createElement('h4')
    menu.appendChild(best);
    menu.appendChild(titleBest);
    best.appendChild(closeBest);
    closeBest.innerText = 'Close'
    titleBest.innerText = 'Top 10';
    titleBest.style.cursor = 'pointer';
    best.classList.add('best');

    for(let i = 1; i < 11; i++) {
        let time = localStorage.getItem(`time${i}`)
        let steps = localStorage.getItem(`steps${i}`)

        if (time !== null && steps !== null) {
            best.innerHTML += `<h3>${time}</h3>`
            best.innerHTML += `<h3>${steps}</h3>`
        }
    }
    titleBest.addEventListener('click', function() {
        best.style.display = 'flex'
    })
    best.addEventListener('click', () => best.style.display = 'none')
    const field = document.createElement('div');
    menu.appendChild(field)
    field.classList.add('field');
    field.innerHTML = `<form action="/script.js"><label>Choose size:  </label><p><input class="rad" name="dzen" type="radio" value="3">3 x 3</p><p><input class="rad" name="dzen" type="radio" value="4">4 x 4</p><p><input class="rad" name="dzen" type="radio" value="5">5 x 5</p><p><input class="rad" name="dzen" type="radio" value="6">6 x 6</p><p><input class="rad" name="dzen" type="radio" value="7">7 x 7</p><p><input class="rad" name="dzen" type="radio" value="8">8 x 8</p></form>`;
    newGame.addEventListener('click', function() {                     
        newGame.style.display = 'none'; field.style.display = 'flex';
        continueGame.style.display= 'none';
        localStorage.removeItem('cellNumber');                  // Delete saved game
        localStorage.removeItem('positionTop');
        localStorage.removeItem('positionLeft');
        localStorage.removeItem('id');
        localStorage.removeItem('order');        
        localStorage.removeItem('savedTime');
        localStorage.removeItem('savedStep');
        localStorage.removeItem('currId');
        localStorage.removeItem('value')

        
    })
    const save = document.createElement('div');
    save.innerText = 'Save game'
    save.id = 'save';
    menu.appendChild(save)
    const audioButton = document.createElement('button');
    audioButton.innerHTML = 'Sound'
    audioButton.id = 'false'
    audioButton.classList.add('muteButton')
    menu.appendChild(audioButton);
    audioButton.addEventListener('click', () => {
        let isMuted = audioButton.id;
        audioButton.classList.toggle('muted')
        if(isMuted === 'false') {
            audioButton.id = 'true' 
        } else {
            audioButton.id = 'false'
        }
    });
   
    function startEverything() {
        const radio = document.getElementsByTagName('input');
        const radiated = []
        for(rad of radio) {
            radiated.push(rad)
        }
        radiated.forEach(item => item.addEventListener('click', function() {
            let val = item.getAttribute('value');
            let muteCheck = audioButton.id
            start(+val, muteCheck)
            menu.style.display = 'none'
        }))
    }
    startEverything()
}


window.addEventListener('DOMContentLoad', createMenu());
window.addEventListener('DOMContentLoad', alert('Чтобы начать игру заново, откройте меню и начните новю игру.' + '\n' + 'Чтобы продолжить игру в следующий раз, перед закрытием страницы откройте меню и нажмите Save game.' + '\n' + 'Важно: ваше сохранение будет стёрто, если вы решите начать новую игру.' + '\n' + 'Чтобы начать новую игру после победы, нажмите New game.'));

// Start

const createArray = function(num) {
    const arr = [];
    for (let i = 1; i < Math.pow(num, 2); i++) {
        arr.push(i);
    }
    return arr
}

function start(value, check) {
    let order;
    let hole;
    const startArray = createArray(value);
    switch (value) {
        case 3: order = startArray.sort(function() { return Math.random()-.5; }).concat(0); hole = 8
                init(order, hole, value, check)
            break;
        case 4: order = startArray.sort(function() { return Math.random()-.5; }).concat(0); hole = 15;
                init(order, hole, value, check)
            break;
        case 5: order = startArray.sort(function() { return Math.random()-.5; }).concat(0); hole = 24
                init(order, hole, value, check)
            break;
        case 6: order = startArray.sort(function() { return Math.random()-.5; }).concat(0); hole = 35
                init(order, hole, value, check)
            break;
        case 7: order = startArray.sort(function() { return Math.random()-.5; }).concat(0); hole = 48
                init(order, hole, value, check) 
            break;
        case 8: order = startArray.sort(function() { return Math.random()-.5; }).concat(0); hole = 63
                init(order, hole, value, check)
            break;
    }
}

// Create game field
function init(order, hole, side, check) {
    if(document.body.lastChild.id === 'time') {
        document.body.innerHTML = '';
        createMenu()
        const newMenu = document.querySelector('.menu')
        newMenu.style.display = 'none'
    }
    const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        document.body.appendChild(wrapper);
        const gem_wrapper = document.createElement('div');
        gem_wrapper.classList.add('gem_wrapper')
        wrapper.appendChild(gem_wrapper);
        const time = document.createElement('div');
        document.body.appendChild(time);
        time.id = 'time';
        const sound = document.createElement('div');
        wrapper.appendChild(sound);
        sound.id = 'sound'
        if (check === 'true') {
            sound.innerHTML = `<audio muted = 'muted' src='./sound/click.wav'></audio>`
        } else {
            sound.innerHTML = `<audio src='./sound/click.wav'></audio>`
        }
        const menuButton = document.createElement('button');
        wrapper.appendChild(menuButton);
        menuButton.id = 'menuButton'
        menuButton.innerHTML = '<h4>Menu</h4>'
    
    
       
    

    // Stopwatch
    function initTime() {
        let minutes;
        let hours;
        let seconds;
        if (localStorage.getItem('savedTime')) {
            minutes = parseInt(localStorage.getItem('savedTime')[6]);
            hours = parseInt(localStorage.getItem('savedTime')[1]);
            seconds = parseInt(localStorage.getItem('savedTime')[11]);
        } else {
            minutes = 0;
            hours = 0;
            seconds = 0;
        }
        setInterval(tick, 1000);
    
        function tick() {
                
            seconds++;
            if (seconds >= 60) { 
                minutes++;
                seconds -= 60;
            }
            if (minutes >= 60) {
                hours++;
                minutes = minutes - 60;
            }
            time.innerHTML = `Time:  ${hours}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;   
        }
            
        function addZero(n) {
              return (parseInt(n, 10) < 10 ? '0' : '') + n
        }
            
        
    }
    //  Sound
    function playSound() {
        audio = document.getElementById('sound');
        audio.firstChild.play(); 
    }
  
    
   
    
    
    //  Create counter

    function initCounter() {
        const count = document.createElement('div');
        wrapper.appendChild(count);
        count.classList.add('counter');
        if (localStorage.getItem('savedStep') !== null) {
            count.innerHTML =  `Steps: ${localStorage.getItem('savedStep')}`
        } else {
            count.innerHTML = `Step: 0`
        }
    }
   

    
    
    // Set size of game field and game cells
    let cellSize = '25%';
    function setSize(num){
        
        switch(num) {
            case 8: gem_wrapper.style.width = '80%';
                    gem_wrapper.style.height = '80%';
                    return cellSize = 31.5;
            case 15: gem_wrapper.style.width = '80%';
                    gem_wrapper.style.height = '80%';
                     return cellSize = 23.5;
            case 24: gem_wrapper.style.width = '80%';
                    gem_wrapper.style.height = '80%';
                    return cellSize = 18.7;
            case 35: gem_wrapper.style.width = '80%';
                    gem_wrapper.style.height = '80%';
                    return cellSize = 15.4;
            case 48: gem_wrapper.style.width = '80%';
                    gem_wrapper.style.height = '80%';
                    return cellSize = 13.05;
            case 63: gem_wrapper.style.width = '90%';
                    gem_wrapper.style.height = '90%';
                    return cellSize = 11.2

        }
    }

    //Отрисовка
    const id = [];
    function draw(size, num) {
        if(localStorage.getItem('cellNumber')) {
            const cellNumberArray = localStorage.getItem('cellNumber').split(','),
            positionLeftArray = localStorage.getItem('positionLeft').split(','),
            positionTopArray = localStorage.getItem('positionTop').split(','),
           
            iddd = JSON.parse(localStorage.getItem('currId'));
            console.log(iddd)
            for(let i = 0; i < cellNumberArray.length; i++) {
                const storedCell = document.createElement('div');
                gem_wrapper.appendChild(storedCell);
                storedCell.innerHTML =`<div class="number">${cellNumberArray[i]}</div>`;
                storedCell.id = iddd[storedCell.innerText];
                storedCell.innerText === '0' ? storedCell.classList.add('empty', 'cell') : storedCell.classList.add('cell')
                storedCell.style.width = size +'%';
                storedCell.style.height = size + '%';
                storedCell.style.left = `${positionLeftArray[i]}`;
                storedCell.style.top = `${positionTopArray[i]}`;
                
            }

        } else {
            for(var i = 0; i < num; i++){
                for(var j = 0; j < num; j++){
                    const child = document.createElement('div');
                    gem_wrapper.appendChild(child);
                    child.classList.add('cell');
                    child.id = i+'-'+j;
                    child.style.width = size +'%';
                    child.style.height = size + '%';
                    let left = j*size+1*j+1;
                    child.style.left = `${left}%`;
                    let top = i*size+1*i+1
                    child.style.top = top +'%';
                    id.push(child.id)            
                }
            }
            const lastCellIndex = order.length-1;
            const cells = document.querySelectorAll('.cell');
            
            for(let n = 0; n < order.length-1; n++) {
                cells[n].innerHTML = `<div class="number">${order[n]}</div>`;
            }
            cells[lastCellIndex].classList.add('empty');
            cells[lastCellIndex].innerText = '0'

        }
       
        
        
    }
    //Запуск
    initCounter()
    initTime()
    setSize(hole)
    draw(cellSize, side)

    // Движения
        const cells = document.querySelectorAll('.cell');
        const counter = document.querySelector('.counter')   

        function newCounter() {
            var step;
            if (localStorage.getItem('savedStep') !== null)  {
                
                step = parseInt(localStorage.getItem('savedStep'));
                console.log(step)
            } else {
                step = 0;
            }
            return function() {
                step++;
                counter.innerHTML = `Steps: ${step}`
                return step;
            }
        }
        const steper = newCounter();
        
        
        // Onclick
        cells.forEach(item => item.addEventListener('click', function i(){
           
            const empty = document.querySelector('.empty');         
            let t = item.style.top;
            let l = item.style.left;
            let i = item.id;
                item.style.top = empty.style.top;
                item.style.left = empty.style.left;
                item.id = empty.id;
                empty.style.top = t;
                empty.style.left = l;
                empty.id = i; 
                steper();
                playSound();

                const positionTop = [];
                const positionLeft = [];
                const cellNumber = [];  
                const currentPosition = {};
                const propPosition = {};
                const currId = {};
                order = order.sort((a, b) => a-b).splice(1, order.length-1);
                order.push('0')
                let isDone = 1;
               
                //Проверка, решения на каждый ход
                function done() {
                    cells.forEach( (cell) => {
                        cellNumber.push(cell.innerText)
                        positionLeft.push(cell.style.left) 
                        positionTop.push(cell.style.top)
                        currentPosition[cell.innerText] = cell.id;
                        currId[cell.innerText] = cell.id
                        
                    });
                   
                    
                    for(let i = 0; i < order.length; i++) {
                        if (localStorage.getItem('id') !== null) {
                            propPosition[order[i]] = localStorage.getItem('id').split(',')[i]
                        } else {
                            propPosition[order[i]] = id[i]
                        }
                        let currId = currentPosition[i],
                            propId = propPosition[i];
                        if(currId === propId) {
                            isDone++
                        } else {
                            isDone--
                        }
                    }
                    let n = 1;
                    if(isDone === order.length-1) {
                        if(localStorage.getItem(`time${n}`)) {
                            n++
                            localStorage.setItem(`time${n}`, document.getElementById('time').innerText);
                            localStorage.setItem(`steps${n}`, document.querySelector('.counter').innerText);
                        } else {
                            localStorage.setItem(`time${n}`, document.getElementById('time').innerText);
                            localStorage.setItem(`steps${n}`, document.querySelector('.counter').innerText);
                        }
                        const congrad = document.createElement('div');
                        document.body.appendChild(congrad);
                        congrad.classList.add('congrad');
                        congrad.innerHTML = `<h1>Congradulations!</h1> <h3>Time: ${document.getElementById('time').innerText.slice(6, document.getElementById('time').innerText.lenght)} </br>Steps: ${document.querySelector('.counter').innerText.slice(6, document.querySelector('.counter').innerText.length)}</h3><h4 style="cursor:pointer">New Game</h4>`
                        congrad.addEventListener('click', () => document.location.reload())
                    }
                }
       
                
                done()

            // Save game
            const save = document.getElementById("save");
            save.addEventListener('click', function() {
                const savedTime = document.getElementById('time').innerText; 
                const savedStep = document.querySelector('.counter').innerText;
                console.log(savedStep)
                localStorage.setItem('cellNumber', cellNumber);
                localStorage.setItem('positionTop', positionTop);
                localStorage.setItem('positionLeft', positionLeft);
                localStorage.setItem('id', id);
                localStorage.setItem('order', order);
                localStorage.setItem('value', side); 
                localStorage.setItem('currId', JSON.stringify(currId))
                localStorage.setItem('savedTime', savedTime.slice(savedTime.indexOf(' '), savedTime.length));
                localStorage.setItem('savedStep', savedStep.slice(savedStep.indexOf(' '), savedStep.length))
            })
            
        } ))
       
       
       const menu = document.querySelector('.menu')
        menuButton.addEventListener('click', function() {
            menu.style.top = '0';
            menu.style.display = 'flex'
        })
}





