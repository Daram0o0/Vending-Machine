import React, { useReducer, useState } from 'react';
import './App.css';
interface DrinkMachine {
  drinks: Drink[];
  money: number;
}
interface Drink {
  name: string;
  price: number;
  isActive: boolean;
}
interface User {
  price: number;
  items: any[];
}

type DrinkMachineAction = { type: "INSERT_COIN", value: number } | { type: "RESET" } | { type: "SELECT_DRINK", value: Drink } | { type: "ADD_DRINK", value: Drink }

function App() {
  const [drinks, setDrinks] = useState<Drink[]>([
    {
      name: "콜라",
      price: 1500,
      isActive: true
    },
    {
      name: "사이다",
      price: 1600,
      isActive: false
    },
    {
      name: "환타",
      price: 1800,
      isActive: false
    },
    {
      name: "암바사",
      price: 2000,
      isActive: true
    },
  ])


  function drinkReducer(prev: DrinkMachine, action: DrinkMachineAction) {
    const temp = { ...prev }
    switch (action.type) {
      case "INSERT_COIN":
        temp.money = prev.money + action.value;
        break;
      case "RESET":
        temp.money = 0
        break
      case "SELECT_DRINK":
        temp.drinks = [...prev.drinks, action.value]
        temp.money = prev.money - action.value.price
        break
      default:
        break;
    }
    return temp

  }

  const [drinkMachine, dispatch] = useReducer(drinkReducer, {
    drinks: [],
    money: 0,
  })

  function add500() {
    dispatch({ type: "INSERT_COIN", value: 500 })
  }
  function resetCoin() {
    dispatch({ type: "RESET" })
  }
  function selectDrink(drink: Drink) {
    dispatch({ type: "SELECT_DRINK", value: drink })
  }
  function addDrink(drink: Drink) {
    setDrinks([...drinks, drink])
    setName('');
    setPrice('');
    setIsActive(false);
  }

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <h2>잔액 : {drinkMachine.money}</h2>
      <button onClick={add500}>500원 투입</button>
      {/* 500원 투입이 아닌 input과 투입 같이둬서 원하는 금액으로 투입가능하게 하기 */}
      <button onClick={resetCoin}>동전 반환</button>
      <hr />
      <label>이름</label>
      <input placeholder='음료수 이름' value={name} onChange={(e) => setName(e.target.value)} />
      <label>가격</label>
      <input placeholder='음료수 가격' value={price} onChange={(e) => setPrice(e.target.value)} />
      <label>활성화</label>
      <input type='checkbox' checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      <button onClick={() => addDrink({ name: name, price: parseInt(price), isActive: isActive })}>입력</button>
      <hr />


      {
        drinks.map((drink) => {
          return <button onClick={() => selectDrink(drink)}>{drink.name} 선택</button>
        })
      }

      {/* 음료수 비우기 버튼 => 실행 */}
      {/* 선택한 음료수만 빼기 */}
      <ul>
        {drinkMachine.drinks.map((drink) => {
          return <li>{drink.name}</li>
        })}
      </ul>
    </div >
  );
}

export default App;
