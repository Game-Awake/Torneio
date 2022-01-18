class Main extends Phaser.Scene
{

    constructor ()
    {
        super('main');
        this.teams = 0;
        this.board = {teams:[],types:[]};
        this.json = null;
    }

    init(data) {
      this.teams = data.teams;
      this.json = data.json;
      this.currentGame = 0;
    }

    preload ()
    {
      this.load.json("jogo","data/"+jogo+".json");
      this.load.html("question", "html/question.html");
    }

    create ()
    {
      scene = this;
      this.urls = {};
      this.urls.arrisque = "../Arrisque-e-responda/game.html";
      this.urls.sera = "../Sera-que-contem/game.html";
      this.tournament = new TournamentDiagram(this,100,100);
      this.tournament.alpha = 0;
      parent.add(this.urls);
      this.currentGame = 0;
    }
    suffleArray(items) {
      let newOrder = [];
      let i = 0;
      while (items.length > 0) {
          newOrder[i++] = items.splice(
            Phaser.Math.Between(0, items.length - 1),
            1
          )[0];
      }
      return newOrder;
    }
    enableGame() {
      this.input.on('pointerdown', () => 
      {
        this.nextGame();
      });
      this.tournament.show();
    }
    nextGame() {
      let teams = this.tournament.getCurrentPlayers();
      if(this.tournament.currentGame == 8 ||
        this.tournament.currentGame == 12) {
        this.currentGame++;
      }
      parent.showGame(0,parent.games[this.currentGame],teams);
    }
}