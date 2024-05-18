import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {

    const idA = 'aaaa';
    const pwA = '1111';
    const idB = 'bbbb';
    const pwB = '2222';
    const idC = 'cccc';
    const pwC = '3333';

    const [modal, setModal] = useState(false);
    const [idValue, setId] = useState('');
    const [pwValue, setPw] = useState('');
    const [loginMessage, setLoginMessage] = useState('로그인');

    const toggleModal = () => {
        setModal(!modal)
    }
    const handleLogin = () => {

        if(idA === idValue && pwA === pwValue){
            setLoginMessage('관리자 A님, 환영합니다.')
        }else if(idB === idValue && pwB === pwValue){
            setLoginMessage('관리자 B님, 환영합니다.')
        }else if(idC === idValue && pwC === pwValue){
            setLoginMessage('관리자 C님, 환영합니다.')
        }else {
            alert('등록되지 않은 계정입니다.');
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