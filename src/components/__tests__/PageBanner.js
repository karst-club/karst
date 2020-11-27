import React from 'react';
import renderer from 'react-test-renderer';
import PageBanner from '../PageBanner';

describe('PageBanner', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PageBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
