import { useState } from "react";
import { authService } from "../fBase";
import styled from "styled-components";

const AuthFContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const EmailBtn = styled.button`
    width: 160px;
    height: 20px;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    color: black;
    font-size: 10px;
    font-weight: bold;
`;

const AuthFForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AuthInput = styled.input`
    padding: 5px 5px;
    outline: none;
    border: 1px solid whitesmoke;
    background-color: transparent;
    color: whitesmoke;
    font-size: 12px;
    font-weight: 400;
    ::placeholder {
        color: whitesmoke;
        font-weight: bold;
    }
`;

const AuthSubmit = styled.input`
    width: 160px;
    height: 20px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    background-color: transparent;
    color: whitesmoke;
    font-weight: bold;
    cursor: pointer;
`;

const ExchangeBtn = styled.button`
    margin-right: -100px;
    border: none;
    background-color: transparent;
    color: #3498db;
    font-size: 6px;
    cursor: pointer;
`;

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (error: any) {
            setError(error.message);
        }
    };
    const toggleAcount = () => setNewAccount((prev) => !prev);
    return (
        <AuthFContainer>
            <EmailBtn>이메일 주소로 가입하기</EmailBtn>
            <AuthFForm onSubmit={onSubmit}>
                <AuthInput
                    onChange={onChange}
                    value={email}
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
                <AuthInput
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={onChange}
                />
                <AuthSubmit
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
            </AuthFForm>
            <ExchangeBtn onClick={toggleAcount}>
                {newAccount ? "Log In" : "Create Account"}
            </ExchangeBtn>
        </AuthFContainer>
    );
};

export default AuthForm;
