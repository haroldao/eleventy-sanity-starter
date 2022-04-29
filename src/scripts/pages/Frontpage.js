import gsap from 'gsap';
import { select, selectAll } from '../utils/helper';
import store from '../utils/store';

export class Frontpage {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'frontpage') return;

    /**
     * Elements
     */
    this.elements = {};

    /**
     * State
     */
    this.state = {};
    this.isMobile = window.innerWidth < store.mobile;

    /**
     * Events
     */
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.events();
  }

  resize() {
    this.isMobile = window.innerWidth < store.mobile;
  }

  events() {}

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
