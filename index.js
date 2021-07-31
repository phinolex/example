/*
 *  This example show how to load complex shapes created with PhysicsEditor (https://www.codeandweb.com/physicseditor)
 */


var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 960,
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: "matter",
        matter: {
            // debug: true
        }
    }
};


var game = new Phaser.Game(config);

function preload() {
    // Load sprite sheet generated with TexturePacker
    this.load.atlas('sheet', 'assets/fruit-sprites.png', 'assets/fruit-sprites.json');

    // Load body shapes from JSON file generated using PhysicsEditor
    this.load.json('shapes', 'assets/fruit-shapes.json');
}

function create() {
    var shapes = this.cache.json.get('shapes');

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

    // sprites are positioned at their center of mass
    var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
    ground.setPosition(0 + ground.centerOfMass.x, 280 + ground.centerOfMass.y);  // corrected position: (0,280)

    this.player = this.matter.add.sprite(250, 250, 'sheet', 'orange', {inertia: Infinity}, {shape: shapes.orange});
    

    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

}
function update() {
    
    if (this.left.isDown) {
            this.player.setVelocityX(-5);
        } else if (this.right.isDown) {
            this.player.setVelocityX(5);
        } else {
            this.player.setVelocityX(0);
        }

    if (this.up.isDown) {
            this.player.setVelocityY(-5);
    }
} //update end