// @ts-nocheck
import { AnimationController } from './modules/animation.ts';
import { audioController } from './modules/audio.ts';
import { quizController } from './modules/quiz.ts';
import { matrixController } from './modules/matrix.ts';

const animationController = new AnimationController();
animationController.init();
audioController.init();
quizController.init();
matrixController.init();
