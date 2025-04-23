import Phaser from 'phaser';
import { AchievementManager } from './Achievement';
import { HandSVG } from './HandSVG';
import { ForearmSVG } from './ForearmSVG';
import { UpperArmSVG } from './UpperArmSVG';
import { ShelfSVG } from './ShelfSVG';
import { NoodleBowlSVG } from './CoffeeMugSVG';
import { RobotBodySVG } from './RobotBodySVG';
import { CoffeeDispenserSVG } from './CoffeeDispenserSVG';

export class RobotArmScene extends Phaser.Scene {
  private shoulder!: Phaser.GameObjects.Rectangle;
  private upperArm!: Phaser.GameObjects.Rectangle;
  private upperArmSVG!: Phaser.GameObjects.DOMElement;
  private forearm!: Phaser.GameObjects.Rectangle;
  private forearmSVG!: Phaser.GameObjects.DOMElement;
  private hand!: Phaser.GameObjects.Rectangle;
  private handSVG!: Phaser.GameObjects.DOMElement;
  private noodles!: Phaser.GameObjects.Rectangle;
  private noodlesSVG!: Phaser.GameObjects.DOMElement;
  private shelf!: Phaser.GameObjects.Rectangle;
  private shelfSVG!: Phaser.GameObjects.DOMElement;
  private shoulderAnchor!: Phaser.GameObjects.Rectangle;
  private robotBodySVG!: Phaser.GameObjects.DOMElement;
  private coffeeDispenserSVG!: Phaser.GameObjects.DOMElement;
  private achievementManager!: AchievementManager;
  private onAchievement: (id: string) => void;
  
  private shoulderJoint!: MatterJS.ConstraintType;
  private elbowJoint!: MatterJS.ConstraintType;
  private wristJoint!: MatterJS.ConstraintType;

  private qKey!: Phaser.Input.Keyboard.Key;
  private wKey!: Phaser.Input.Keyboard.Key;
  private oKey!: Phaser.Input.Keyboard.Key;
  private pKey!: Phaser.Input.Keyboard.Key;
  private gKey!: Phaser.Input.Keyboard.Key;
  private hKey!: Phaser.Input.Keyboard.Key;
  private rKey!: Phaser.Input.Keyboard.Key;
  private nKey!: Phaser.Input.Keyboard.Key;

  // Control indicators
  private qText!: Phaser.GameObjects.Text;
  private wText!: Phaser.GameObjects.Text;
  private oText!: Phaser.GameObjects.Text;
  private pText!: Phaser.GameObjects.Text;
  private gText!: Phaser.GameObjects.Text;
  private hText!: Phaser.GameObjects.Text;

  // Noodles off-screen tracking
  private noodlesOffscreenTime: number = 0;
  private isOffscreen: boolean = false;

  // Collision categories
  private readonly CATEGORY_ARM = 0x0002;
  private readonly CATEGORY_NOODLES = 0x0004;
  private readonly CATEGORY_SHELF = 0x0008;

  // Noodles starting position
  private readonly NOODLES_START_X = 200;
  private readonly NOODLES_START_Y = 100;

  // Fixed shoulder position
  private readonly SHOULDER_X = 100;
  private readonly SHOULDER_Y = 300;

  // Arm segment dimensions
  private readonly UPPER_ARM_LENGTH = 200;
  private readonly FOREARM_LENGTH = 200;
  private readonly HAND_LENGTH = 100;
  private readonly ARM_THICKNESS = 40;

  constructor(onAchievement: (id: string) => void) {
    super({ key: 'RobotArmScene' });
    this.onAchievement = onAchievement;
  }

  createNoodleBowl() {
    // Create physics rectangle with 40x40 dimensions
    this.noodles = this.add.rectangle(this.NOODLES_START_X, this.NOODLES_START_Y, 40, 40);
    this.matter.add.gameObject(this.noodles, {
      friction: 0.0025,
      frictionAir: 0.0001,
      density: 0.00046,
      restitution: 0.2,
      collisionFilter: {
        category: this.CATEGORY_NOODLES,
        mask: this.CATEGORY_ARM | this.CATEGORY_SHELF
      }
    });

    // Create SVG DOM element with 40x40 dimensions
    const noodlesDiv = document.createElement('div');
    noodlesDiv.style.width = '40px';
    noodlesDiv.style.height = '40px';
    noodlesDiv.style.position = 'absolute';
    noodlesDiv.style.zIndex = '2';
    noodlesDiv.innerHTML = NoodleBowlSVG;
    
    // Create DOM element with center anchor point (20, 20)
    this.noodlesSVG = this.add.dom(this.NOODLES_START_X, this.NOODLES_START_Y, noodlesDiv);
    
    // Reset achievement tracking when creating a new noodle bowl
    this.achievementManager.resetCatchTracking();
    
    // Reset tracking variables
    this.noodlesOffscreenTime = 0;
    this.isOffscreen = false;
  }

  destroyNoodleBowl() {
    if (this.noodles) {
      this.noodles.destroy();
    }
    if (this.noodlesSVG) {
      this.noodlesSVG.destroy();
    }
  }

  checkNoodlesPosition() {
    if (!this.noodles) return;

    const isNowOffscreen = 
      this.noodles.x < 0 || // Left
      this.noodles.x > 800 || // Right
      this.noodles.y > 600; // Bottom

    if (isNowOffscreen) {
      if (!this.isOffscreen) {
        // Noodles just went offscreen
        this.isOffscreen = true;
        this.noodlesOffscreenTime = this.time.now;
      } else if (this.time.now - this.noodlesOffscreenTime >= 1800) {
        // Noodles have been offscreen for x seconds
        this.destroyNoodleBowl();
        this.createNoodleBowl();
      }
    } else {
      // Noodles are onscreen
      this.isOffscreen = false;
    }
  }

  create() {
    this.achievementManager = new AchievementManager(this, this.onAchievement);
    
    this.matter.world.setBounds(0, 0, 800, 600);
    this.matter.world.setGravity(0, 0.66);

    // Create robot body SVG first (lowest z-index)
    const robotBodyDiv = document.createElement('div');
    robotBodyDiv.style.width = '240px';
    robotBodyDiv.style.height = '400px';
    robotBodyDiv.style.position = 'absolute';
    robotBodyDiv.style.zIndex = '0';
    robotBodyDiv.innerHTML = RobotBodySVG;
    
    this.robotBodySVG = this.add.dom(this.SHOULDER_X - 60, this.SHOULDER_Y-10, robotBodyDiv);

    // Create shoulder anchor
    this.shoulderAnchor = this.matter.add.rectangle(this.SHOULDER_X, this.SHOULDER_Y, 20, 20, { 
      isStatic: true,
      isSensor: true
    });
    
    const armConfig = {
      isStatic: false,
      ignoreGravity: true,
      friction: 0.00,
      frictionAir: 0.05,
      density: 0.001,
      restitution: 0.01,
      angularDamping: 0.1,
      collisionFilter: {
        category: this.CATEGORY_ARM,
        mask: this.CATEGORY_NOODLES | this.CATEGORY_SHELF
      }
    };
    
    // Create arm segments with z-index 1
    this.upperArm = this.add.rectangle(
      this.SHOULDER_X + this.UPPER_ARM_LENGTH/2,
      this.SHOULDER_Y,
      this.UPPER_ARM_LENGTH,
      this.ARM_THICKNESS
    );
    this.matter.add.gameObject(this.upperArm, armConfig);
    
    const upperArmDiv = document.createElement('div');
    upperArmDiv.style.width = `${this.UPPER_ARM_LENGTH}px`;
    upperArmDiv.style.height = `${this.ARM_THICKNESS}px`;
    upperArmDiv.style.position = 'absolute';
    upperArmDiv.style.zIndex = '1';
    upperArmDiv.innerHTML = UpperArmSVG;
    
    this.upperArmSVG = this.add.dom(
      this.SHOULDER_X + this.UPPER_ARM_LENGTH/2,
      this.SHOULDER_Y,
      upperArmDiv
    );

    this.forearm = this.add.rectangle(
      this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH/2,
      this.SHOULDER_Y,
      this.FOREARM_LENGTH,
      this.ARM_THICKNESS
    );
    this.matter.add.gameObject(this.forearm, armConfig);
    
    const forearmDiv = document.createElement('div');
    forearmDiv.style.width = `${this.FOREARM_LENGTH}px`;
    forearmDiv.style.height = `${this.ARM_THICKNESS}px`;
    forearmDiv.style.position = 'absolute';
    forearmDiv.style.zIndex = '1';
    forearmDiv.innerHTML = ForearmSVG;
    
    this.forearmSVG = this.add.dom(
      this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH/2,
      this.SHOULDER_Y,
      forearmDiv
    );

    this.hand = this.add.rectangle(
      this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH + this.HAND_LENGTH/2,
      this.SHOULDER_Y,
      this.HAND_LENGTH,
      this.ARM_THICKNESS
    );
    this.matter.add.gameObject(this.hand, armConfig);
    
    const handDiv = document.createElement('div');
    handDiv.style.width = `${this.HAND_LENGTH}px`;
    handDiv.style.height = `${this.ARM_THICKNESS}px`;
    handDiv.style.position = 'absolute';
    handDiv.style.zIndex = '1';
    handDiv.innerHTML = HandSVG;
    
    this.handSVG = this.add.dom(
      this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH + this.HAND_LENGTH/2,
      this.SHOULDER_Y,
      handDiv
    );

    // Create shelf with z-index 1
    const shelfWidth = 140;
    const shelfHeight = 30;
    const shelfX = 800 - shelfWidth/2;
    const shelfY = 300;

    this.shelf = this.add.rectangle(shelfX, shelfY, shelfWidth, shelfHeight);
    this.matter.add.gameObject(this.shelf, { 
      isStatic: true,
      friction: 0.6,
      restitution: 0,
      collisionFilter: {
        category: this.CATEGORY_SHELF,
        mask: this.CATEGORY_ARM | this.CATEGORY_NOODLES
      }
    });

    const shelfDiv = document.createElement('div');
    shelfDiv.style.width = `${shelfWidth}px`;
    shelfDiv.style.height = `${shelfHeight}px`;
    shelfDiv.style.position = 'absolute';
    shelfDiv.style.zIndex = '1';
    shelfDiv.innerHTML = ShelfSVG;
    
    this.shelfSVG = this.add.dom(shelfX, shelfY, shelfDiv);

    // Create noodle dispenser last (highest z-index)
    const dispenserDiv = document.createElement('div');
    dispenserDiv.style.width = '80px';
    dispenserDiv.style.height = '120px';
    dispenserDiv.style.position = 'absolute';
    dispenserDiv.style.zIndex = '3';
    dispenserDiv.innerHTML = CoffeeDispenserSVG;
    
    this.coffeeDispenserSVG = this.add.dom(this.NOODLES_START_X, this.NOODLES_START_Y - 80, dispenserDiv);

    // Create initial noodle bowl
    this.createNoodleBowl();

    // Add control indicators with z-index 2
    const textStyle = {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#888888'
    };

    this.wText = this.add.text(this.SHOULDER_X + this.UPPER_ARM_LENGTH/2, this.SHOULDER_Y - 30, 'W', textStyle);
    this.qText = this.add.text(this.SHOULDER_X + this.UPPER_ARM_LENGTH/2, this.SHOULDER_Y + 30, 'Q', textStyle);
    this.pText = this.add.text(this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH/2, this.SHOULDER_Y - 30, 'P', textStyle);
    this.oText = this.add.text(this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH/2, this.SHOULDER_Y + 30, 'O', textStyle);
    this.hText = this.add.text(this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH + this.HAND_LENGTH/2, this.SHOULDER_Y - 30, 'H', textStyle);
    this.gText = this.add.text(this.SHOULDER_X + this.UPPER_ARM_LENGTH + this.FOREARM_LENGTH + this.HAND_LENGTH/2, this.SHOULDER_Y + 30, 'G', textStyle);
    
    const jointConfig = {
      stiffness: 0.2,
      damping: 0.5,
      angularStiffness: 0.2
    };
    
    this.shoulderJoint = this.matter.add.constraint(
      this.shoulderAnchor,
      this.upperArm.body as MatterJS.BodyType,
      0,
      0.8,
      {
        pointA: { x: 0, y: 0 },
        pointB: { x: -this.UPPER_ARM_LENGTH/2, y: 0 },
        ...jointConfig
      }
    );

    this.elbowJoint = this.matter.add.constraint(
      this.upperArm.body as MatterJS.BodyType,
      this.forearm.body as MatterJS.BodyType,
      0,
      0.8,
      {
        pointA: { x: this.UPPER_ARM_LENGTH/2, y: 0 },
        pointB: { x: -this.FOREARM_LENGTH/2, y: 0 },
        ...jointConfig
      }
    );

    this.wristJoint = this.matter.add.constraint(
      this.forearm.body as MatterJS.BodyType,
      this.hand.body as MatterJS.BodyType,
      0,
      0.8,
      {
        pointA: { x: this.FOREARM_LENGTH/2, y: 0 },
        pointB: { x: -this.HAND_LENGTH/2, y: 0 },
        ...jointConfig
      }
    );

    // Setup controls
    this.qKey = this.input.keyboard.addKey('Q');
    this.wKey = this.input.keyboard.addKey('W');
    this.oKey = this.input.keyboard.addKey('O');
    this.pKey = this.input.keyboard.addKey('P');
    this.gKey = this.input.keyboard.addKey('G');
    this.hKey = this.input.keyboard.addKey('H');
    this.rKey = this.input.keyboard.addKey('R');
    this.nKey = this.input.keyboard.addKey('N');

    // Add focus event listeners to chat input
    const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (chatInput) {
      chatInput.addEventListener('focus', () => {
        this.input.keyboard.enabled = false;
      });
      chatInput.addEventListener('blur', () => {
        this.input.keyboard.enabled = true;
      });
    }
  }

  update() {
    // Check noodles position and respawn if needed
    this.checkNoodlesPosition();

    // Check for noodle bowl reset
    if (Phaser.Input.Keyboard.JustDown(this.rKey) || Phaser.Input.Keyboard.JustDown(this.nKey)) {
      if (this.noodles) {
        this.noodles.destroy();
      }
      if (this.noodlesSVG) {
        this.noodlesSVG.destroy();
      }
      this.createNoodleBowl();
    }

    // Update SVG positions and rotations
    if (this.upperArm && this.upperArmSVG) {
      this.upperArmSVG.setPosition(this.upperArm.x, this.upperArm.y);
      this.upperArmSVG.setRotation(this.upperArm.rotation);
    }

    if (this.forearm && this.forearmSVG) {
      this.forearmSVG.setPosition(this.forearm.x, this.forearm.y);
      this.forearmSVG.setRotation(this.forearm.rotation);
    }

    if (this.hand && this.handSVG) {
      this.handSVG.setPosition(this.hand.x, this.hand.y);
      this.handSVG.setRotation(this.hand.rotation);
    }

    if (this.noodles && this.noodlesSVG) {
      this.noodlesSVG.setPosition(this.noodles.x, this.noodles.y);
      this.noodlesSVG.setRotation(this.noodles.rotation);
    }

    // Update control indicator positions and colors
    const updateControlIndicator = (
      text: Phaser.GameObjects.Text,
      part: Phaser.GameObjects.Rectangle,
      isTop: boolean,
      isPressed: boolean
    ) => {
      const angle = part.rotation;
      const radius = isTop ? -30 : 50;
      const x = (part.x) - (text.width/2) + Math.cos(angle - Math.PI/2) * radius;
      const y = part.y + Math.sin(angle - Math.PI/2) * radius;
      
      text.setPosition(x, y);
      text.setRotation(angle);
      text.setColor(isPressed ? '#000000' : '#888888');
    };

    // Update control indicators
    updateControlIndicator(this.wText, this.upperArm, true, this.wKey.isDown);
    updateControlIndicator(this.qText, this.upperArm, false, this.qKey.isDown);
    updateControlIndicator(this.pText, this.forearm, true, this.pKey.isDown);
    updateControlIndicator(this.oText, this.forearm, false, this.oKey.isDown);
    updateControlIndicator(this.hText, this.hand, true, this.hKey.isDown);
    updateControlIndicator(this.gText, this.hand, false, this.gKey.isDown);

    // Only process keyboard input if keyboard is enabled
    if (this.input.keyboard.enabled) {
      // Different rotation forces for each joint
      const upperArmForce = 9;
      const forearmForce = 7;
      const wristForce = 3;
      
      // Upper arm control using torque
      if (this.qKey.isDown) {
        const body = this.upperArm.body as MatterJS.BodyType;
        body.torque = -upperArmForce;
      } else if (this.wKey.isDown) {
        const body = this.upperArm.body as MatterJS.BodyType;
        body.torque = upperArmForce;
      }

      // Forearm control
      if (this.oKey.isDown) {
        const body = this.forearm.body as MatterJS.BodyType;
        body.torque = -forearmForce;
      } else if (this.pKey.isDown) {
        const body = this.forearm.body as MatterJS.BodyType;
        body.torque = forearmForce;
      }

      // Hand control
      if (this.gKey.isDown) {
        const body = this.hand.body as MatterJS.BodyType;
        body.torque = -wristForce;
      } else if (this.hKey.isDown) {
        const body = this.hand.body as MatterJS.BodyType;
        body.torque = wristForce;
      }
    }

    // Check achievements
    this.achievementManager.checkDropAchievement(this.noodles);
    this.achievementManager.checkThrowRightAchievement(this.noodles);
    this.achievementManager.checkDrinkAchievement(this.noodles);
    this.achievementManager.checkCatchAchievement(
      this.noodles,
      this.upperArm,
      this.forearm,
      this.hand
    );
    this.achievementManager.checkShelfAchievement(this.noodles, this.shelf);
  }
}