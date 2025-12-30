import './App.css'
import ChaiCard from './components/ChaiCard'
import Counter from './components/Counter'
import ChaiList from './components/ChaiList'
import { OrderForm } from './components/orderForm'

import type { Chai } from '../types'
import { Card } from './components/Card'

const menu: Chai[] = [
  { id: 1, name: "Masala", price: 15 },
  { id: 2, name: "Green", price: 30 },
  { id: 3, name: "Adrak", price: 25 },
]

function App() {

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <ChaiCard
          name="Headphones"
          price={5000}
        />
        <ChaiCard
          name="Iphone"
          price={50000}
        />
      </div>
      <div>
        <Counter />
      </div>
      <div>
        <ChaiList items={menu} />
      </div>
      <div>
        <OrderForm onSubmit={(order) => console.log("Placed: ", order.name, " ", order.cups)} />
      </div>
      <div>
        <Card
        title='Chai aur TypeScript'
        footer={<button>Order Now</button>}
        />
      </div>
    </>
  )
}

export default App
