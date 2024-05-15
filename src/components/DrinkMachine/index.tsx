import { useEffect, useReducer, useState } from "react";
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
    image: string | null | undefined
  }
  interface User {
    price: number;
    items: any[];
  }
  
type DrinkMachineAction = { type: "INSERT_COIN", value: number } | { type: "RESET" } | { type: "SELECT_DRINK", value: Drink } | { type: "DELETE_DRINK", drink: Drink } | { type: "RESET_DRINK" }
  
function DrinkMachine() {
    const [drinks, setDrinks] = useState<Drink[]>([
      {
        name: "콜라",
        price: 1500,
        isActive: true,
        image: null,
      },
      {
        name: "사이다",
        price: 1600,
        isActive: false,
        image: null,
      },
      {
        name: "환타",
        price: 1800,
        isActive: false,
        image: null,
      },
      {
        name: "암바사",
        price: 2000,
        isActive: true,
        image: null,
      },
    ])
  
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isActive, setIsActive] = useState(false);
  
  
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
        default:
          break;
      }
      return temp
  
    }
  
    const [drinkMachine, dispatch] = useReducer(drinkReducer, {
      drinks: [],
      money: 0,
      totalPrice: 0,
      cart : []
    })
  
    useEffect(() => {
      console.log(drinkMachine.drinks);
    }, [drinkMachine.drinks]);
  
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
    function selectDrink(drink: Drink) {
      if (drinkMachine.money >= drink.price) {
        dispatch({ type: "SELECT_DRINK", value: {...drink} })
      } else {
        alert("잔돈이 없습니다.")
      }
    }
    function addDrink(drink: Drink) {
      setDrinks([...drinks, drink])
      setName('');
      setPrice('');
      setIsActive(false);
      setImage('')
    }
    function DeleteDrink(drink: Drink) {
      dispatch({ type: "DELETE_DRINK", drink: drink })
    }
    function resetDrink() {
      dispatch({ type: "RESET_DRINK" })
    }
    
    const [image, setImage] = useState<string | null | undefined>(null);
  
    return (
      <div className="vending-machine">
        <div className="left">
          <div className="drinks">
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
            <DrinkItem
              name="콜라"
              price={1500}
              isActive={true}
              image={null}
            />
          </div>
        </div>
        <div className="right">
          <UserInfo/>
          <Cart/>
        </div>
      </div>
    )
  }
  function DrinkItem(some : Drink) {
    return (
      <div className="item">
        <img src={some.image ? some.image : `/source/thum.jpg`}/>
        <p>{some.name}</p>
        <p>{`${some.price}`}₩</p>
      </div>
    )
  }

  function UserInfo() {
    return (
      <div className="user-info">대충 로그인</div>
    )
  }
  function Cart() {
    return (
      <div className="cart">
        <strong>장바구니</strong>
        <div className="cartitem">
          <p>콜라 1500₩ <CartButton/></p>
          <p>제로콜라 2000₩ <CartButton/></p>
          <p>제로콜라 2000₩ <CartButton/></p>
          <p>제로콜라 2000₩ <CartButton/></p>
          <p>-제로콜라 2000₩ <CartButton/></p>
          <p>-제로콜라 2000₩ <CartButton/></p>
          <p>-제로콜라 2000₩ <CartButton/></p>
          <p>제로콜라 2000₩ <CartButton/></p>
          <p>제로콜라 2000₩ <CartButton/></p>
        </div>
        <strong>총 금액 :</strong>
      </div>  
    )
  }

  function CartButton() {
    return (
      
      <span><button>-</button> 개수 <button>+</button></span>
    );
  }

  export default DrinkMachine