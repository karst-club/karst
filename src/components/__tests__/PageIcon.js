import React from 'react';
import renderer from 'react-test-renderer';
import PageIcon from '../PageIcon';

describe('PageIcon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PageIcon emoji="❤️" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
