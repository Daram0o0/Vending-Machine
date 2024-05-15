import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    if(modal){
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
        
        <button 
        onClick={toggleModal}
        className="btn-login-modal">
            로그인
        </button>

        {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal} 
                className="overlay"></div>
                <div className="modal-content">
                    <h2>로그인</h2>
                    <form>
                        ID: <input id="id" type="text" /><br />
                        비밀번호: <input id="password" type="text" /><br />
                        <input type="submit" />
                    </form>
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