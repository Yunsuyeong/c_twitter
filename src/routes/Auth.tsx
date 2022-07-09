import AuthForm from "../components/AuthForm";
import SocialForm from "../components/SocialForm";
import styled from "styled-components";

const AuthContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Auth = () => {
    return (
        <AuthContainer>
            <AuthForm />
            <div
                style={{
                    width: "0.1px",
                    height: "100vh",
                    border: "0.01px solid gray",
                }}
            ></div>
            <SocialForm />
        </AuthContainer>
    );
};

export default Auth;
