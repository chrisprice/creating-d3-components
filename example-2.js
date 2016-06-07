import { select } from 'd3-selection' // <- simplified set of dependencies
import { scaleLinear } from 'd3-scale'
import component from './example-2-component' // <- import component

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

  const barHeight = HEIGHT / data.length

  const instance = component() // <- instantiate component
    .xScale(xScale) // <- configure component
    .yScale(yScale)
    .barHeight(barHeight)

  container.datum(data) // <- assign data to node
    .call(instance) // <- invoke component

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
