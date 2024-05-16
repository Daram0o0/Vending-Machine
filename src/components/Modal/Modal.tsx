import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
    const userList = [
        {
            id : "aaaa",
            pw : "1111",
            name : "관리자"
        },
        {
            id : "bbbb",
            pw : "1111",
            name : "A등급 회원"
        },
        {
            id : "cccc",
            pw : "1111",
            name : "B등급 회원"
        },
        {
            id : "dddd",
            pw : "1111",
            name : "C등급 회원"
        },
    ]

    const [modal, setModal] = useState(false);
    const [idValue, setId] = useState('');
    const [pwValue, setPw] = useState('');
    const [loginMessage, setLoginMessage] = useState('로그인');

    const toggleModal = () => {
        setModal(!modal)
    }
    const handleLogin = () => {
        const findUser = userList.find(element => {
            return element.id === idValue
        })
        if (findUser) {
            setLoginMessage(findUser.name + "님 환영 합니다.")
        } else {
            alert("ID혹은 패스워드를 확인 하여 주세요")
        }
        toggleModal();
    }

    if(modal){
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
        
        <button 
        className="btn-login-modal"
        onClick={toggleModal}>
            {loginMessage}
        </button>

        {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal} 
                className="overlay"></div>
                <div className="modal-content">
                    <h2>로그인</h2>
                    <label>
                        ID: 
                        <input id="id" 
                        type="text" 
                        value={idValue}
                        onChange={ e => setId(e.target.value)}
                        /><br />
                        비밀번호: 
                        <input id="password" 
                        type="password" 
                        value={pwValue}
                        onChange={ e => setPw(e.target.value)}
                        /><br />
                        <input className="btn-submit"
                        type="submit" 
                        onClick={handleLogin} 
                        />
                    </label>
                    <button 
                    className="close-modal"
                    onClick={toggleModal}
                    >닫기
                    </button>
                </div>
            </div>            
        )}

        </>
    );
}