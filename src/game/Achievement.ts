import Phaser from 'phaser';

export interface AchievementConfig {
  id: string;
  message: string;
  subtext?: string;
}

export class AchievementManager {
  private scene: Phaser.Scene;
  private unlockedAchievements: Set<string>;
  private currentToast: Phaser.GameObjects.Container | null;
  private catchStartTime: number;
  private shelfStartTime: number;
  private isInContactWithArm: boolean;
  private hasPassedThreshold: boolean;
  private isOnShelf: boolean;
  private onAchievement: (id: string) => void;
  private gameStartTime: number;
  private readonly CATCH_START_DELAY = 8000; // 2 second delay before catch checking starts

  constructor(scene: Phaser.Scene, onAchievement: (id: string) => void) {
    this.scene = scene;
    this.unlockedAchievements = new Set();
    this.currentToast = null;
    this.catchStartTime = 0;
    this.shelfStartTime = 0;
    this.isInContactWithArm = false;
    this.hasPassedThreshold = false;
    this.isOnShelf = false;
    this.onAchievement = onAchievement;
    this.gameStartTime = this.scene.time.now;
  }

  private showAchievement(message: string, subtext?: string) {
    if (this.currentToast) {
      this.currentToast.destroy();
    }

    const toast = this.scene.add.container(400, 650);
    
    // Create main text
    const text = this.scene.add.text(0, subtext ? -12 : 0, message, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    // Create subtext if provided
    const subtextObject = subtext ? this.scene.add.text(0, 12, subtext, {
      fontSize: '16px',
      color: '#cccccc',
      fontFamily: 'Arial'
    }).setOrigin(0.5) : null;
    
    // Calculate background size based on the larger of main text or subtext
    const padding = 40;
    const textWidth = Math.max(text.width, subtextObject?.width || 0);
    const backgroundWidth = Math.max(300, textWidth + padding * 2);
    const backgroundHeight = subtext ? 80 : 60; // Taller if there's subtext
    
    const background = this.scene.add.rectangle(0, 0, backgroundWidth, backgroundHeight, 0x000000, 0.8);
    background.setStrokeStyle(2, 0xffffff);
    
    const toastElements = [background, text];
    if (subtextObject) {
      toastElements.push(subtextObject);
    }
    toast.add(toastElements);
    
    this.scene.tweens.add({
      targets: toast,
      y: 550,
      duration: 500,
      ease: 'Back.out',
      onComplete: () => {
        this.scene.time.delayedCall(2000, () => {
          this.scene.tweens.add({
            targets: toast,
            y: 650,
            duration: 500,
            ease: 'Back.in',
            onComplete: () => {
              toast.destroy();
              if (this.currentToast === toast) {
                this.currentToast = null;
              }
            }
          });
        });
      }
    });

    this.currentToast = toast;
  }

  unlockAchievement(id: string, message: string, subtext?: string) {
    if (!this.unlockedAchievements.has(id)) {
      this.unlockedAchievements.add(id);
      this.showAchievement(message, subtext);
      this.onAchievement(id);
    }
  }

  checkDropAchievement(coffee: Phaser.GameObjects.Rectangle) {
    const body = coffee.body as MatterJS.BodyType;
    if (coffee.y > 600 && coffee.x > 0 && coffee.x < 800) {
      this.unlockAchievement('drop', 'Oops!');
    }
  }

  checkThrowRightAchievement(coffee: Phaser.GameObjects.Rectangle) {
    if (coffee.x > 800 && coffee.y > 0 && coffee.y < 600) {
      this.unlockAchievement('throw_right', 'Yeet it!');
    }
  }

  checkDrinkAchievement(coffee: Phaser.GameObjects.Rectangle) {
    // Screen height boundaries for drinking (25% to 50% of screen height)
    const minY = 600 * 0.25; // 25% from top
    const maxY = 600 * 0.50; // 50% from top

    if (coffee.x < 0 && coffee.y > minY && coffee.y < maxY) {
      this.unlockAchievement('drink', 'Over the shoulder!', 'Throw the noodles over your shoulder');
    }
  }

  resetCatchTracking() {
    this.catchStartTime = 0;
    this.isInContactWithArm = false;
    this.hasPassedThreshold = false;
    this.gameStartTime = this.scene.time.now; // Reset the game start time when creating new coffee
  }

  checkCatchAchievement(
    coffee: Phaser.GameObjects.Rectangle,
    upperArm: Phaser.GameObjects.Rectangle,
    forearm: Phaser.GameObjects.Rectangle,
    hand: Phaser.GameObjects.Rectangle
  ) {
    // Don't check for catch achievement until after the delay
    if (this.scene.time.now - this.gameStartTime < this.CATCH_START_DELAY) {
      return;
    }

    // Check if coffee has passed the top 20% of the screen height
    const topThreshold = 600 * 0.1; // 20% from top
    if (coffee.y < topThreshold && coffee.x > 0 && coffee.x < 800) {
      this.hasPassedThreshold = true;
    }

    // Check if coffee is in contact with any arm part
    const isContactingArm = this.scene.matter.overlap(coffee, [upperArm, forearm, hand]);
    
    if (isContactingArm) {
      if (!this.isInContactWithArm) {
        // Just started contact
        this.isInContactWithArm = true;
        if (this.hasPassedThreshold) {
          this.catchStartTime = this.scene.time.now;
        }
      } else if (this.hasPassedThreshold && this.scene.time.now - this.catchStartTime >= 5000) {
        this.unlockAchievement('catch', 'Catch!', 'Successfully caught and held the coffee for 5 seconds');
        this.hasPassedThreshold = false;
      }
    } else {
      this.isInContactWithArm = false;
      if (!isContactingArm) {
        // Reset catch timing if we lose contact with the arm
        this.catchStartTime = 0;
      }
    }
  }

  checkShelfAchievement(coffee: Phaser.GameObjects.Rectangle, shelf: Phaser.GameObjects.Rectangle) {
    const coffeeBody = coffee.body as MatterJS.BodyType;
    const isOverlapping = this.scene.matter.overlap(coffee, shelf);
    const isStable = Math.abs(coffeeBody.velocity.x) < 0.1 && Math.abs(coffeeBody.velocity.y) < 0.1;
    const isUpright = Math.abs(coffeeBody.angle % (2 * Math.PI)) < 0.3; // Allow small deviation from upright

    if (isOverlapping && isStable) {
      if (!this.isOnShelf) {
        this.isOnShelf = true;
        this.shelfStartTime = this.scene.time.now;
      } else if (this.scene.time.now - this.shelfStartTime >= 6000) { // 6 seconds
        if (isUpright) {
          this.unlockAchievement('shelf_success', 'You put the coffee on the shelf!');
        } else {
          this.unlockAchievement('shelf_almost', 'Almost!', 'The coffee mug should be upright on the shelf');
        }
      }
    } else {
      this.isOnShelf = false;
    }
  }
}