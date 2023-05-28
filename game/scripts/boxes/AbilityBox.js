class AbilityBox extends Box {
    constructor() {
        super("./assets/others/boxes/abilityBox.png")

    }

    pickUp() {
        let random = Math.round(Math.random()) + 1;
        if (random === 1){
            game.player.firstAbilityUsage++;
        }else{
            game.player.secondAbilityUsage++;
        }
        game.player.setAbilitiesUsage();
    }
}