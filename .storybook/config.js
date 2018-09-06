import { configure, addDecorator } from '@storybook/react';

import '../src/styles/index.scss'
import '../src/styles/index.less'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../stories", true, /.stories?.js$/));
}

configure(loadStories, module);
