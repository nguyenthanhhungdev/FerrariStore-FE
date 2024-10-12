// src/CartIcon.jsx
// import './CartIcon.css';

const CartIcon = ({ cartCount }: { cartCount: number }) => {
  return (
    <div className="fixed top-5 left-5 flex items-center bg-white p-2 rounded-full shadow-custom z-50">
      <img
        src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
        alt="Cart"
        className="w-6 h-6"
      />
      <span className="ml-2 text-lg font-bold text-red-500">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
