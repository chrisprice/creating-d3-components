import { select } from 'd3-selection' // <- split into modules
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale'

export const data = [ 18, 15, 20, 22, 23, 10 ]

const container = select('svg')

const WIDTH = 640, HEIGHT = 320

const render = () => {

  const xScale = scaleLinear()
    .domain([ 0, 30 ])
    .range([ 0, WIDTH ])

  const yScale = scaleLinear()
    .domain([ 0, data.length ])
    .range([ 0, HEIGHT ])

  const updateSelection = container.selectAll('rect')
    .data(data)

  const enterSelection = updateSelection.enter()
    .append('rect')

  updateSelection.exit()
    .remove()

  const barHeight = HEIGHT / data.length
  const fillColor = scaleOrdinal(schemeCategory10) // <- category10 scale split up for re-use e.g. new quanitized scales

  updateSelection.merge(enterSelection) // <- must merge the selections
    .attr('x', 0) // <- attr now only accepts a single key/value
    .attr('height', barHeight)
    .attr('width', xScale)
    .attr('y', (d, i) => yScale(i))
    .attr('fill', (d, i) => fillColor(i))

  // requestAnimationFrame(render) // <- leave commented out until above is fixed
}

requestAnimationFrame(render)
