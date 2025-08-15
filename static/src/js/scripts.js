
import { init as initIndex } from './index.js';

const viewMap = {
  'index': initIndex,
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const view = body.dataset.view;

  if (view && viewMap[view]) {
    viewMap[view]();
  }
});