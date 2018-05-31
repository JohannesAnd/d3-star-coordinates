import React from 'react';

import { create, update, destroy } from './viz';

export default class StarCoordinate extends React.Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
    this.created = false;
  }
  componentDidMount() {
    if (this._ref.current) {
      create(this._ref.current, this.props.data);
      this.created = true;
    }
  }
  componentDidUpdate() {
    if (!this.created)
      create(this._ref.current, this.props.data, this.state.axis);

    update(this._ref.current, this.props.data, this.state.axis);
  }
  componentWillUpdate() {
    destroy(this._ref.current);
  }
  render() {
    return <svg ref={this._ref} width={500} height={500} />;
  }
}
