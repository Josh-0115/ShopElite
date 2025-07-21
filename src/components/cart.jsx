import { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = ({ onClose }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black text-lg">
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={`${item.gender}-${item.id}`}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.gender)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id, item.gender)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.gender)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t">
        <p className="font-semibold text-lg">
          Total: $
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;