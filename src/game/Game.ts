import Phaser from 'phaser';
import { RobotArmScene } from './RobotArmScene';

export const createGame = (onAchievement: (id: string) => void) => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#f0f0f0',
    parent: 'game-container',
    dom: {
      createContainer: true
    },
    physics: {
      default: 'matter',
      matter: {
        debug: false,
        gravity: { y: 1 }
      }
    },
    scene: new RobotArmScene(onAchievement)
  });
};