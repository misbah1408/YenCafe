const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
    return(
    <div className=" w-[112px] h-10 h flex items-center justify-center mt-3 text-white bg-blue-600 rounded-md"  >
      <button
        className="px-2 py-1"
        onClick={onDecrement}
      >
        <i className="fa-solid fa-minus text-sm"></i>
      </button>
      <span className="px-4 py-1">{quantity}</span>
      <button
        className="px-2 py-1"
        onClick={onIncrement}
      >
        <i className="fa-solid fa-plus text-sm"></i>
      </button>
    </div>
  )};

export default QuantitySelector