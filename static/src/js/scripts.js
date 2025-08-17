
import { init as initIndex } from './index.js';
import { init as initResults } from './results.js';

const viewMap = {
  'index': initIndex,
  'results': initResults,
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const view = body.dataset.view;

  if (view && viewMap[view]) {
    viewMap[view]();
  }
});