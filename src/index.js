import 'phaser';

const scene = {
  preload: preload,
  create: create,
  update: update,
};

const config = {
    type: Phaser.AUTO,
    zoom: 3,
    width: 180,
    height: 100,
    scene: scene,
};

let game = new Phaser.Game(config);

import img_bg from '../assets/bg.png';

import img_fukidashi from '../assets/fukidashi.png';
import img_str_uwaki from '../assets/str_uwaki.png';
import img_str_gokai from '../assets/str_gokai.png';

import img_tetsu from '../assets/tetsu.png';
import img_pun from '../assets/pun.png';
import img_taku from '../assets/taku.png';
import img_ase from '../assets/ase.png';

import img_bullet from '../assets/bullet-test.png';

function preload() {
  this.load.image('bg', img_bg);
  this.load.image('bullet1', img_bullet);
  this.load.spritesheet('fukidashi', img_fukidashi, { frameWidth: 64, frameHeight: 32 });
  this.load.spritesheet('uwaki', img_str_uwaki, { frameWidth: 49, frameHeight: 20 });
  this.load.spritesheet('gokai', img_str_gokai, { frameWidth: 52, frameHeight: 20 });
  this.load.spritesheet('tetsu', img_tetsu, { frameWidth: 16, frameHeight: 32 });
  this.load.spritesheet('pun', img_pun, { frameWidth: 16, frameHeight: 16 });
  this.load.spritesheet('taku', img_taku, { frameWidth: 16, frameHeight: 32 });
  this.load.spritesheet('ase', img_ase, { frameWidth: 16, frameHeight: 15 });
}

let bg;
let bullets;

function create() {
  bg = [this.add.image(0, 0, 'bg').setOrigin(0), this.add.image(0, 0, 'bg').setOrigin(0)]

  this.anims.create({
    key: 'fukidashi',
    frames: this.anims.generateFrameNumbers('fukidashi'),
    frameRate: 9,
    repeat: -1,
  });

  // tetsu animation
  this.anims.create({
    key: 'throw',
    frames: this.anims.generateFrameNumbers('tetsu'),
    frameRate: 9,
    repeat: -1,
  });
  this.add.sprite(30, 50).setOrigin(0).play('throw');
  this.anims.create({
    key: 'pun',
    frames: this.anims.generateFrameNumbers('pun'),
    frameRate: 18,
    repeat: -1,
  });
  this.add.sprite(25, 47).setOrigin(0).play('pun');
  this.add.sprite(5, 20).setOrigin(0).play('fukidashi');
  this.anims.create({
    key: 'uwakida-',
    frames: this.anims.generateFrameNumbers('uwaki'),
    frameRate: 18,
    repeat: -1,
  });
  this.add.sprite(10, 20).setOrigin(0).play('uwakida-');

  // taku animation
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('taku'),
    frameRate: 9,
    repeat: -1,
  });
  this.add.sprite(130, 52).setOrigin(0).play('run');
  this.anims.create({
    key: 'ase',
    frames: this.anims.generateFrameNumbers('ase'),
    frameRate: 18,
    repeat: -1,
  });
  this.add.sprite(125, 45).setOrigin(0).play('ase');
  this.add.sprite(105, 25).setOrigin(0).play('fukidashi');
  this.anims.create({
    key: 'gokaida-',
    frames: this.anims.generateFrameNumbers('gokai'),
    frameRate: 18,
    repeat: -1,
  });
  this.add.sprite(110, 25).setOrigin(0).play('gokaida-');

  // 
  let Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function (scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet1');
    },
    fire: function (x, y, time) {
      this.speed = 4 + Math.random(3);
      this.start_time = time;
      this.theta = 0 - (0.3 + Math.random(2.0));
      this.setPosition(x, y);
      this.setActive(true);
      this.setVisible(true);
    },
    update: function (time, delta) {
      let speed = this.speed;
      this.x += speed * Math.cos(this.theta);
      this.y += speed * Math.sin(this.theta);
      this.y += 0.009 * (time - this.start_time);
      if (this.x > 190 || this.y > 110) {
        this.setActive(false);
        this.setVisible(false);
      }
    },
  });

  bullets = this.add.group({
    classType: Bullet,
    maxSize: 20,
    runChildUpdate: true,
  });
}

let last_fired = 0;

function update(time, delta) {
  // background scrolling
  if (bg[1].x <= 0) {
    let x = 0;
    bg[0].setPosition(x, bg[0].y);
    bg[1].setPosition(x + bg[0].width, bg.y);
  } else {
    let x = bg[0].x;
    bg[0].setPosition(x - 2, bg[0].y);
    bg[1].setPosition(x - 2 + bg[0].width, bg[0].y);
  }

  // throw objects
  if (time >= last_fired) {
    let bullet = bullets.get()
    if (bullet) {
      bullet.fire(40, 60, time);
      last_fired = time + 120;
    }
  }
}
