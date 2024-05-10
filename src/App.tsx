import React, { useEffect, useMemo, useReducer, useState } from 'react';
import './App.css';

interface DrinkMachine {
  drinks: Drink[];
  money: number;
  totalPrice: number;
}

interface Drink {
  name: string;
  price: number;
  isActive: boolean;
  image: string | null | undefined;
}

type DrinkMachineAction = { type: "INSERT_COIN", value: number } | { type: "RESET" } | { type: "SELECT_DRINK", value: Drink } | { type: "DELETE_DRINK", drink: Drink } | { type: "RESET_DRINK" };

function App() {
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
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState<string | null | undefined>(null);

  function drinkReducer(prev: DrinkMachine, action: DrinkMachineAction) {
    const temp = { ...prev };
    switch (action.type) {
      case "INSERT_COIN":
        temp.money = prev.money + action.value;
        break;
      case "RESET":
        temp.money = 0;
        temp.totalPrice = 0;
        break;
      case "SELECT_DRINK":
        temp.drinks = [...prev.drinks, action.value];
        temp.money = prev.money - action.value.price;
        temp.totalPrice = prev.totalPrice + action.value.price;
        break;
      case "DELETE_DRINK":
        temp.drinks = temp.drinks.filter((drink) => drink !== action.drink);
        temp.totalPrice = temp.totalPrice - action.drink.price;
        break;
      case "RESET_DRINK":
        temp.drinks = [];
        break;
      default:
        break;
    }
    return temp;
  }

  const [drinkMachine, dispatch] = useReducer(drinkReducer, {
    drinks: [],
    money: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    console.log(drinkMachine.drinks);
  }, [drinkMachine.drinks]);

  const [inputMoney, setInputMoney] = useState<number>(0);

  function add500() {
    dispatch({ type: "INSERT_COIN", value: 500 });
  }

  function Addnumber() {
    dispatch({ type: "INSERT_COIN", value: inputMoney });
  }

  function resetCoin() {
    dispatch({ type: "RESET" });
  }

  function selectDrink(drink: Drink) {
    if (drinkMachine.money >= drink.price) {
      dispatch({ type: "SELECT_DRINK", value: { ...drink } });
    } else {
      alert("잔돈이 없습니다.");
    }
  }

  function addDrink(drink: Drink) {
    setDrinks([...drinks, drink]);
    setName('');
    setPrice('');
    setIsActive(false);
    setImage('');
  }

  function DeleteDrink(drink: Drink) {
    dispatch({ type: "DELETE_DRINK", drink: drink });
  }

  function resetDrink() {
    dispatch({ type: "RESET_DRINK" });
  }

  const totalPrice = useMemo(() => {
    if (drinkMachine.drinks.length === 0) {
      return 0;
    } else {
      return drinkMachine.drinks.reduce((prev, current) => prev + current.price, 0); // 콜백 함수 형식 수정
    }
  }, [drinkMachine.drinks]);

  return (
    <div>
      <h2>잔액 : {drinkMachine.money}</h2>
      <button onClick={add500}>500원 투입</button>
      <input
        type="number"
        value={inputMoney}
        onChange={(e) => setInputMoney(Number(e.target.value))}
      />
      <button onClick={Addnumber}>금액 투입</button>
      <button onClick={resetCoin}>동전 반환</button>
      <hr />
      <label>이름</label>
      <input placeholder='음료수 이름' value={name} onChange={(e) => setName(e.target.value)} />
      <label>가격</label>
      <input placeholder='음료수 가격' value={price} onChange={(e) => setPrice(e.target.value)} />
      <label>활성화</label>
      <input type='checkbox' checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      <label htmlFor="file">사진첨부</label>
      <input type='file' accept="image/*" onChange={(e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          setImage(URL.createObjectURL(file));
        }
      }} />
      {image && <img style={{
        height: "50px", width: "300px"
      }} src={image} alt="Preview" />}
      <button onClick={() => addDrink({ name: name, price: parseInt(price), isActive: isActive, image: image })}>입력</button>
      <hr />

      <div style={{ display: "flex", flexDirection: "row" }}>
        {
          drinks.filter(val => val.isActive === true).map((drink) => {
            return <div style={{ display: "flex", flexDirection: "column", width: "100px" }}>
              <img
                style={{ height: "50px", width: "300px" }}
                src={drink.image ? drink.image : undefined}
                alt="Preview"
              />
              <button onClick={() => selectDrink(drink)}>{drink.name} 선택</button></div>
          })
        }
        <h2>총 금액: {totalPrice}</h2> {/* totalPrice 변수 사용 */}
      </div>
      <hr />
      <button onClick={resetDrink}>음료수 다 빼기</button>
      <ul>
        {drinkMachine.drinks.map((drink, index) => <li key={index}>이름 : {drink.name}, 가격 : {drink.price} <button onClick={() => { DeleteDrink(drink) }}>빼기</button></li>)}
      </ul>
    </div >
  );
}

export default App;
