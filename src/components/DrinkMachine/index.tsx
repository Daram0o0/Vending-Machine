import { useCallback, useEffect, useReducer, useState } from "react";
import "../../css/vending-machine.css"
import { disconnect } from "process";
interface DrinkMachine {
    drinks: Drink[];
    money: number;
    totalPrice: number;
    cart : Drink[];
  }
  interface Drink {
    name: string;
    price: number;
    isActive: boolean;
    image: string | null | undefined;
  }
  interface User {
    price: number;
    items: any[];
  }
  interface CartProps {
    cart: Drink[];
  }
type DrinkMachineAction = { type: "INSERT_COIN", value: number } | { type: "RESET" } | { type: "SELECT_DRINK", value: Drink } | { type: "DELETE_DRINK", drink: Drink } | { type: "RESET_DRINK" } | {type : "CART_ADD_DRINK", drink : Drink}
  
function DrinkMachine() {

    function drinkReducer(prev: DrinkMachine, action: DrinkMachineAction) {
      const temp = { ...prev }
      switch (action.type) {
        case "INSERT_COIN":
          temp.money = prev.money + action.value;
          break;
        case "RESET":
          temp.money = 0
          temp.totalPrice = 0
          break;
        case "SELECT_DRINK":
          temp.drinks = [...prev.drinks, action.value]
          temp.money = prev.money - action.value.price
          temp.totalPrice = prev.totalPrice + action.value.price
          break;
        case "DELETE_DRINK":
          temp.drinks = temp.drinks.filter((drink, index) => drink !== action.drink);
          temp.totalPrice = temp.totalPrice - action.drink.price
          break;
        case "RESET_DRINK":
          temp.drinks = []
          break;
        case "CART_ADD_DRINK":
          temp.cart = [...temp.cart, action.drink]
          break;
        default:
          break;
      }
      return temp
  
    }
  
    const [drinkMachine, dispatch] = useReducer(drinkReducer, {
      drinks: [],
      money: 0,
      totalPrice: 0,
      cart : [
      ]
    })
  
    const [inputMoney, setInputMoney] = useState<number>(0);
  
    function add500() {
      dispatch({ type: "INSERT_COIN", value: 500 })
    }
    function Addnumber() {
      dispatch({ type: "INSERT_COIN", value: inputMoney });
    }
    function resetCoin() {
      dispatch({ type: "RESET" })
    }
    
    function DeleteDrink(drink: Drink) {
      dispatch({ type: "DELETE_DRINK", drink: drink })
    }
    function resetDrink() {
      dispatch({ type: "RESET_DRINK" })
    }

    function keepDrink(drink : Drink) {
      dispatch({type : "CART_ADD_DRINK", drink : drink})
    }
    
    const [image, setImage] = useState<string | null | undefined>(null);
    return (
      <div className="vending-machine">
        <div className="left">
          <div className="drinks">
            <DrinkItem
              drink={{
                name : "콜라",
                isActive : false,
                image : null,
                price : 1500,
              }}
              onClick={keepDrink}
            />
            <DrinkItem
              drink={{
                name : "사이다",
                isActive : false,
                image : null,
                price : 1400,
              }}
              onClick={keepDrink}
            />
            <DrinkItem
              drink={{
                name : "암바사",
                isActive : false,
                image : null,
                price : 1200,
              }}
              onClick={keepDrink}
            />
          </div>
        </div>
        <div className="right">
          <UserInfo/>
          <Cart cart={drinkMachine.cart}/>
        </div>
      </div>
    )
  }
  function DrinkItem({drink, onClick} : {drink : Drink, onClick : (drink : Drink) => void}) {
    return (
      <div className="item" onClick={() => {
        onClick(drink)
      }}>
        <img src={drink.image ? drink.image : `/source/thum.jpg`}/>
        <p>{drink.name}</p>
        <p>{`${drink.price}`}₩</p>
      </div>
    )
  }
  function UserInfo() {
    return (
      <div className="user-info">대충 로그인</div>
    )
  }
  function Cart({ cart }: CartProps) {
    return (
      <div className="cart">
        <h3>장바구니</h3>
        {cart.length === 0 ? (
          <p>장바구니가 비어있습니다.</p>
        ) : (
          <>
            {cart.map((drink, index) => (
              <div key={index} className="cart-item">
              </div>
            ))}
            {cart.length > 0 && (
              <p>
                {cart[0].name} - {cart[0].price}₩ (x{cart.length})
              </p>
            )}
            <div className="button">
              <button>+</button><span>{cart.length}</span><button>-</button>
            </div>
            <p></p>
            <p>총 금액: {cart.reduce((total, drink) => total + drink.price, 0)}₩</p>
          </>
        )}
      </div>
    );
  }

  function CartButton() {
    return (
      <div className="cart">대충 장바구니</div>
    )
  }

  export default DrinkMachine