import {useSpring, animated} from 'react-spring'
import { Component } from "react";
import "./Mutate.scss"

const NUMBER_OF_BITS = 125;

const BITS = new Array(NUMBER_OF_BITS).fill(0).map((val, i) => ({
  index: i,
  src: `./images/blue-bits/${i}.png`
}))

function bitLoaded(bit, event) {
  console.log(event, bit)
}

function nextStyle(bit) {
  let x = Math.round(Math.random() * 500)
  let y = Math.round(Math.random() * 300)
  let rotate = Math.round(Math.random() * 180)
  return {
    transform: `rotate(${rotate}deg) translate3d(${x}px, ${y}px, 0px)`,
    opacity: '100%'
  }
}

class Gene extends Component {
  render() {
    let props = useSpring({
      from: { opacity: '0%' },
      to: async next => {
        while (1) {
          await next(nextStyle(this.props.bit))
        }
      }
    })

    return (
      <animated.div className="bit" style={props}>
        <img src={`${this.props.bit.src}`}
             onLoad={e => bitLoaded(this.props.bit, e)}
             alt=""/>
      </animated.div>
    )
  }
}

class Mutate extends Component {
  genes = []

  render() {
    let props = useSpring({
      loop: true,
      from: { rotateZ: 0 },
      to: { rotateZ: 360 },
      config: { duration: 100000 },
    })

    return (
      <animated.div className="mutator" style={props}>
        {
          BITS.map((bit, index) =>
            <Gene bit={bit}
                  ref={(geneRef) => this.genes[index] = geneRef}
                  key={bit.index}/>
          )
        }
      </animated.div>
    )
  }
}

export default Mutate
