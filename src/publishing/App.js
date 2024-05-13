import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <VendingMachine />
  )
}

function VendingMachine() {
  return(
    <div calssName="vendingMachine">
    <UserMenu />
    <LoginAndCart />
    </div>
  )
}

function LoginAndCart() {
  return(
    <div className="loginAndCart">
      <Login />
      <Cart />
    </div>
  )
}

function Login(){
  return(
    <div className="login">
      <span className="loginText">로그인</span>
      <div className="profile"></div>
    </div>
  )
}

function Cart(){
  return(
    <div className="cart">
      <span className="cartText">장바구니</span>      
    </div>
  )
}

function AdminMenu(){

}

function UserMenu(){
  return(
    <div className="userMenu">
      <span className="menu">메뉴가 보이는:</span>      
      <UserChoice />
    </div>
  )
}

function UserChoice(){
  return(
    <div className="userChoice">
      <Item />
      <Item />
      <Item />
  </div>
  )
}

function AddItem(){
  return(
    <div className="addItem">

    </div>
  )
}

function Item(){
  return (
    <div className="item">
    </div>
  )
}

export default App;
