import {useSpring, animated} from 'react-spring'
import "./Mutate.scss"

const NUMBER_OF_BITS = 125;

const BITS = new Array(NUMBER_OF_BITS).fill(0).map((val, i) => ({
  index: i,
  src: `./images/blue-bits/${i}.png`
}))

function Gene({bit}) {
  let props = useSpring({
    from: { left: '0%', top: '0%', width: '0%', height: '0%', background: 'lightgreen' },
    to: async next => {
      while (1) {
        await next({ left: '0%', top: '0%', width: '100%', height: '100%', background: 'lightblue' })
        await next({ height: '50%', background: 'lightgreen' })
        await next({ width: '50%', left: '50%', background: 'lightgoldenrodyellow' })
        await next({ top: '0%', height: '100%', background: 'lightpink' })
        await next({ top: '50%', height: '50%', background: 'lightsalmon' })
        await next({ width: '100%', left: '0%', background: 'lightcoral' })
        await next({ width: '50%', background: 'lightseagreen' })
        await next({ top: '0%', height: '100%', background: 'lightskyblue' })
        await next({ width: '100%', background: 'lightslategrey' })
      }
    },
  })
  return (
    <animated.div className="bit" style={props}>
      <img src={`${bit.src}`}/>
    </animated.div>
  )
}

function Mutate() {
  let props = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    config: { duration: 1000 * 900 },
  })
  return (
    <animated.div className="mutator" style={props}>
      {
        BITS.map(bit =>
          <Gene bit={bit} key={bit.index}/>
        )
      }
    </animated.div>
  )
}

export default Mutate
