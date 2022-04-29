import Highway from '@dogstudio/highway';
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset.min.js';
import smoothscroll from 'smoothscroll-polyfill';
import { selectAll } from '../utils/helper';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from 'gsap';

export class Base extends Highway.Renderer {
  onEnter() {
    setTimeout(() => {
      smoothscroll.polyfill();
      // gsap.registerPlugin(ScrollTrigger);

      /**
       * Components
       */
      // selectAll('[data-carousel]').forEach((el) => new Carousel(el));
      // new Nav();

      /**
       * Animations
       */
      // selectAll('[data-animation="fadein"]').forEach((el) => new FadeIn(el));

      /**
       * Pages
       */
      // new Frontpage();
    }, 100);
  }

  onLeaveCompleted() {
    window.dispatchEvent(new CustomEvent('leavecomplete'));
  }
}
