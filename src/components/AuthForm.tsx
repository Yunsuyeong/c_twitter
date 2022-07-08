import { useState } from "react";
import { authService } from "../fBase";
import styled from "styled-components";

const AuthFContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
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
            setPassword("value");
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
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={email}
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
            </form>
            <button onClick={toggleAcount}>
                {newAccount ? "Log In" : "Create Account"}
            </button>
        </AuthFContainer>
    );
};

export default AuthForm;
