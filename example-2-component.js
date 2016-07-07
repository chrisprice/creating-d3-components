import { select } from 'd3-selection'
import { scaleIdentity, scaleOrdinal, schemeCategory10 } from 'd3-scale'

export default () => {

  let xScale = scaleIdentity() // <- configurable properties are lets, default to simplest implementation
  let yScale = scaleIdentity()
  let barHeight = 1

  const fillColor = scaleOrdinal(schemeCategory10) // <- sub-components are consts

  const instance = (selection) => { // <- create instance

    selection.each((data, i, nodes) => { // <- iterate over multi-node selections

      const updateSelection = select(nodes[i]) // <- fat-arrow, need alternative to this
        .selectAll('rect')
        .data(data)

      const enterSelection = updateSelection.enter()
        .append('rect')

      updateSelection.exit()
        .remove()

      updateSelection.merge(enterSelection)
        .attr('x', 0)
        .attr('height', barHeight)
        .attr('width', xScale)
        .attr('y', (d, i) => yScale(i))
        .attr('fill', (d, i) => fillColor(i))
    })

  }

  instance.xScale = (...args) => { // <- accessors for configurable properties
    if (!args.length) {
      return xScale
    }
    xScale = args[0]
    return instance
  }

  instance.yScale = (...args) => {
    if (!args.length) {
      return yScale
    }
    yScale = args[0]
    return instance
  }

  instance.barHeight = (...args) => {
    if (!args.length) {
      return barHeight
    }
    barHeight = args[0]
    return instance
  }

  return instance
}
