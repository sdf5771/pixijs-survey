import {
  Application,
  extend,
} from '@pixi/react'

import {
  Container,
  FederatedPointerEvent,
  Graphics,
  Sprite,
  Assets,
} from 'pixi.js'
import { useCallback, useState } from 'react';

extend({
  Container,
  Graphics,
  Sprite,
})

function App() {
  const [count, setCount] = useState(0)
  
  const drawCallback = useCallback(async (graphics: Graphics) => {
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png')
    const xAxis = 0
    const yAxis = 0
    const sprites: Sprite[] = []

    graphics.clear()
    graphics.setFillStyle({ color: 'red' })
    graphics.setStrokeStyle({ color: 'blue', width: 10 })

    if(count === 0) return;

    Array.from({ length: count }).forEach((_, index) => {
      const sprite = Sprite.from(texture)
      const x = xAxis + index * 100;
      const y = yAxis + index * 100;
      sprite.x = x
      sprite.y = y
      sprite.eventMode = 'static'
      sprite.cursor = 'pointer';
      sprite.on('pointerdown', (event: FederatedPointerEvent) => {
        console.log('pointerdown', event)
        
        sprite.scale.x *= 1.25;
        sprite.scale.y *= 1.25;
        console.log('sprite ', sprite)
      })
      sprites.push(sprite)
    })
    graphics.addChild(...sprites)
  }, [count])
  return (
    <main>
      <Application width={1000} height={1000} background="#1099bb">
        <pixiContainer x={0} y={0}>
          <pixiGraphics draw={drawCallback} />
        </pixiContainer>
      </Application>
      <button onClick={() => setCount(prev => prev + 1)}> Count: {count} </button>
    </main>
  )
}

export default App
