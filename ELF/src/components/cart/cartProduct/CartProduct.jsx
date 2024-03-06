import { useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity } from '../../../features/cartSlice'
import photo from '../../../assets/picture.jpg'

export default function CartProduct({i}) {
    const dispatch = useDispatch()
    return (
      
      <div key={i.name} className="cart__good">
          <div className="cart__goods__photo">
            <img src={photo} alt="photo" />
          </div>
          <h5>{i.name}</h5>
            <p> {i.price}</p>
            <span>
                <a onClick={() => dispatch(increaseQuantity(i))}>+</a>
                <p>{i.quantity}</p>
                <a onClick={() => dispatch(decreaseQuantity(i))}>-</a>
            </span>
         
      </div>
  )
}
