// Knight ou Aorcerer - Guerreiro ou Mago
// LittleMonster ou BigMonster


class Character {

    _life = 1;
    maxLive = 1;
    attack = 0;
    defense = 0;
    
    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super('Juniely');
        this.life = 100;
        this.attack = 2;
        this.defense = 8;
        this.maxLive = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super('Douglas');
        this.life = 100;
        this.attack = 5;
        this.defense = 5;
        this.maxLive = this.life;
    }
}

class LittleMonster extends Character {
    constructor(name) {
        super('LittleMonster');
        this.life = 100;
        this.attack = 15;
        this.defense = 5;
        this.maxLive = this.life;
    }
}

class BigMonster extends Character {
    constructor(name) {
        super('BigMonster');
        this.life = 100;
        this.attack = 20;
        this.defense = 5;
        this.maxLive = this.life;
    }
}

/* Fim das Classes dos personagens */

class Stage {
    constructor(fiht1, figh2,figh1El,figh2El, logObject ) {

        this.fiht1 = fiht1;
        this.figh2 = figh2;
        this.figh1El = figh1El;
        this.figh2El = figh2El;
        this.log = logObject;

    }

    start() {
        this.update();
        

        this.figh1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fiht1,this.figh2));

        this.figh2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figh2, this.fiht1));
    }

    update() {
       this.figh1El.querySelector('.name').innerHTML = `${this.fiht1.name} - ${this.fiht1.life.toFixed(1)}💗`;
       let f1Pct = (this.fiht1.life / this.fiht1.maxLive) * 100;
       this.figh1El.querySelector('.bar').style.width = `${f1Pct}%`;


       this.figh2El.querySelector('.name').innerHTML = `${this.figh2.name} - ${this.figh2.life.toFixed(1)}💗`;
       let f2Pct = (this.figh2.life / this.figh2.maxLive) * 100;
       this.figh2El.querySelector('.bar').style.width = `${f2Pct}%`; 
    }

    doAttack(attracking, attacked) {
        if(attracking.life <= 0 || attacked.life <=0) {
            alert(`Atacando Cachorro morto.`);
            return;
        }

        let attackFactor = (Math.random() * 3).toFixed(2);
        let defenseFactor = (Math.random() * 5).toFixed(2);
    
        let actualAttack = attracking.attack *attackFactor;
        let actualDefense = attracking.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attracking.name} Causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} Conseguiu denfeder...`)
        }


        this.update();
    }
}

//CLASSE DE LOG DO GAME

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
        
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}