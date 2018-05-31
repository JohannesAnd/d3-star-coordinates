import { select, selectAll, event } from 'd3-selection';
import { drag } from 'd3-drag';

import { calculateAxis, multiply, coordinateConversion } from './utils';

const SCALE = 200;
const WIDTH = 500;
const HEIGHT = 500;

let axis = [];

export function create(el, data) {
  const svg = select(el);

  axis = calculateAxis(data);

  svg.append('g').attr('class', 'axis');
  svg.append('g').attr('class', 'points');

  update(el, data);
}

export function update(el, data) {
  const svg = select(el);

  const dataPoints = svg
    .select('.points')
    .selectAll('circle')
    .data(data);

  const axisLines = svg
    .select('.axis')
    .selectAll('line')
    .data(axis, (d, i) => i);

  const axisHandles = svg
    .select('.axis')
    .selectAll('circle.handle')
    .data(axis);

  const enterDataPoints = dataPoints
    .enter()
    .append('circle')
    .attr('fill', 'blue')
    .attr('cx', d => WIDTH / 2)
    .attr('cy', d => HEIGHT / 2);

  const enterAxisLines = axisLines
    .enter()
    .append('line')
    .attr('stroke', 'red')
    .attr('stroke-width', '2px')
    .attr('x1', WIDTH / 2)
    .attr('x2', WIDTH / 2)
    .attr('y1', HEIGHT / 2)
    .attr('y2', HEIGHT / 2);

  const enterAxisHandles = axisHandles
    .enter()
    .append('circle')
    .attr('class', 'handle')
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('cx', d => WIDTH / 2)
    .attr('cy', d => HEIGHT / 2);

  dataPoints
    .merge(enterDataPoints)
    .attr('cx', d => WIDTH / 2 + multiply(d, axis.map(d => d[0])) * SCALE)
    .attr('cy', d => HEIGHT / 2 + multiply(d, axis.map(d => d[1])) * SCALE)
    .attr('r', 10);

  axisLines
    .merge(enterAxisLines)
    .attr('x1', WIDTH / 2)
    .attr('x2', d => WIDTH / 2 + d[0] * SCALE)
    .attr('y1', HEIGHT / 2)
    .attr('y2', d => HEIGHT / 2 + d[1] * SCALE);

  axisHandles
    .merge(enterAxisHandles)
    .attr('cx', d => WIDTH / 2 + d[0] * SCALE)
    .attr('cy', d => HEIGHT / 2 + d[1] * SCALE)
    .attr('r', 7);

  svg.selectAll('.handle').call(
    drag().on('drag', (d, i) => {
      axis[i] = [(event.x - WIDTH / 2) / SCALE, (event.y - HEIGHT / 2) / SCALE];
      update(el, data);
    })
  );
}

export function destroy(el) {
  select(el).remove();
}
