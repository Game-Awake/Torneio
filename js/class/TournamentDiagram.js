class TournamentDiagram {

    constructor(scene,x,y) {
        this.scene = scene;
        this.style = {
            fontSize: 18,
            fontFamily: 'Arial',
            align: "center",
            color:'#0000ff',
            wordWrap: { width: 100, useAdvancedWrap: true }
        }
        this.teams = ["De repente","Água Viva","Foliou","Govinda","Pra sempre Pierrot","Alegria de Viver","Cotidiano Primavera","Todos Juntos"];
        this.total = 8;
        let j = 0;
        this.currentTeam = 0;
        this.currentGame = 0;
        let posX = [0,150,300,450,600,750];
        let posY = [0,50,150];
        let stepY = [100,200,0];
        this.blocks = [];
        while(this.total > 1) {
            this.total = this.total / 2;
            for(let i=0;i<this.total;i++) {
                this.blocks.push(this.drawTeamLeft(x+posX[j],y+posY[j]+stepY[j]*i,this.teams[this.currentTeam++],i));
            }
            for(let i=0;i<this.total;i++) {
                this.blocks.push(this.drawTeamRight(x+posX[posX.length-(j+1)],y+posY[j]+stepY[j]*i,this.teams[this.currentTeam++],i));
            }
            j++;
        }
        this.currentTeam = 8;
        this.currentPhase = 0;
        let index = 0;
        x = 475;
        this.blocks.push(new Option(x,y,100,50,0xffffff,2,0x000000,
            "", this.style,
            () => {}, this.scene));
        this.drawLine(x-25, y+150,25, 2);
        this.drawLine(x, y+150,25, 2);
        this.drawLine(x, y+25,2, 125);
    }

    drawTeamLeft(x,y,team,pos) {
        let signal = 1;
        let index = pos%2;
        let block = new Option(x,y,100,50,0xffffff,2,0x000000,
            team, this.style,
            () => {}, this.scene);
        if(this.total > 1) {
            this.drawLine(x+(50*signal), y,25, 2);
            this.drawLine(x+(75*signal), y-(50*index*(4/this.total)),2, 50*(4/this.total));
            this.drawLine(x+(75*signal),y-(50*(index == 0 ? -1 : 1)*(4/this.total)),25, 2);
        }
        return block;
    }

    drawTeamRight(x,y,team,pos) {
        let signal = -1;
        let index = pos%2;
        let block = new Option(x,y,100,50,0xffffff,2,0x000000,
            team, this.style,
            () => {}, this.scene);
        if(this.total > 1) {
            this.drawLine(x+(75*signal), y,25, 2);
            this.drawLine(x+(75*signal), y-(50*index*(4/this.total)),2, 50*(4/this.total));
            this.drawLine(x+(100*signal),y-(50*(index == 0 ? -1 : 1))*(4/this.total),25, 2);
        }
        return block;
    }

    drawLine(x1,y1,w,h) {
        let line = this.scene.add.rectangle(x1,y1,w,h,0x000000);
        line.setOrigin(0);      
    }

    showWinner(pos) {
        pos += this.currentGame;
        this.blocks[this.currentTeam].setText(this.teams[pos]);
        this.teams[this.currentTeam] = this.teams[pos];
        this.currentTeam++;
        this.currentGame += 2;
        let blockIndex = (pos%2==0)?pos+1:pos-1;
        this.blocks[blockIndex].block();
    }

    getCurrentPlayers() {
        return [
            this.teams[this.currentPhase++],
            this.teams[this.currentPhase++]
        ]
    }

    show() {
        for(let i=0;i<this.blocks.length;i++) {
            this.blocks[i].alpha = 1;
        }
    }

}