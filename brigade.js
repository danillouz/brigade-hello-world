'use strict';

const { events } = require('brigadier');

events.on('exec', (event, project) => {
  console.log('[EVENT] "exec"');
  console.log('   [exec] event: ', event);
  console.log('   [exec] project: ', project);
});

events.on('gcr_image_push', (event, project) => {
  console.log('[EVENT] "gcr_image_push"');
  console.log('   [gcr_image_push] event: ', event);
  console.log('   [gcr_image_push] project: ', project);
});

events.on('after', (event, project) => {
  console.log('[EVENT] "after"');
  console.log('   [after] event: ', event);
  console.log('   [after] project: ', project);
});

events.on('error', (event, project) => {
  console.log('[EVENT] "error"');
  console.log('   [error] event: ', event);
  console.log('   [error] project: ', project);
});
