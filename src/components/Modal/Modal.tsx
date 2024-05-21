import React, { useState } from "react";
import "./Modal.css";
import { useContext } from "react";
import LoginContext from "../../context/LoginContext";

export default function Modal() {
    const { setUserName } = useContext(LoginContext)
    const userList = [
        {
            id: "admin",
            pw: "1234",
            name: "관리자"
        },
        {
            id: "aaaa",
            pw: "1111",
            name: "A등급 회원"
        },
        {
            id: "bbbb",
            pw: "2222",
            name: "B등급 회원"
        },
        {
            id: "cccc",
            pw: "3333",
            name: "C등급 회원"
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
            return (element.id === idValue && element.pw === pwValue)
        })
        if (findUser) {
            setUserName(findUser.name);
            setLoginMessage(findUser.name + "님 환영 합니다.")
        } else {
            alert("ID혹은 패스워드를 확인 하여 주세요")
        }
        toggleModal();
    }

    if (modal) {
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
                        <div className="id-pw-wrapper">
                            <div className="id-pw-container">
                                <div className="id-pw-input">
                                    <label>ID:</label>
                                    <input id="id"
                                        type="text"
                                        value={idValue}
                                        onChange={e => setId(e.target.value)}
                                    />

                                </div>
                                <div className="id-pw-input">
                                    <label>PW:</label>
                                    <input id="password"
                                        type="password"
                                        value={pwValue}
                                        onChange={e => setPw(e.target.value)}
                                    />
                                </div>
                            </div>
                            <input className="btn-submit"
                                type="submit"
                                value={"로그인"}
                                onClick={handleLogin}
                            />
                        </div>


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