
import { Link } from 'react-router-dom'

export default function Header() {
  return (
      <header>

        <Link to='/'> Shop</Link>
          <Link to='cart'> Shopping cart</Link> 
      </header>
  )
}
