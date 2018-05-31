import React from 'react';
import StarCoordinate from './StarCoordinate';

const data = [[0.2, 0.3, 0.1], [0.4, 0.1, 0.8], [0.6, 0, 0]];

export default class App extends React.Component {
  componentDidMount() {
    document.querySelector('#loaderWrapper').classList.add('hidden');
  }
  render() {
    return <StarCoordinate data={data} />;
  }
}
