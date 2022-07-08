import AuthForm from "../components/AuthForm";
import SocialForm from "../components/SocialForm";
import styled from "styled-components";

const AuthContainer = styled.div`
    position: relative;
    top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const Auth = () => {
    return (
        <AuthContainer>
            <AuthForm />
            <SocialForm />
        </AuthContainer>
    );
};

export default Auth;
