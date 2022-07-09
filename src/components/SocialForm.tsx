import { authService, firebaseInstance } from "../fBase";
import styled from "styled-components";

const SocialContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const GoogleBtn = styled.button`
    width: 160px;
    height: 20px;
    border: none;
    border-radius: 10px;
    background-color: #00acee;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const GithubBtn = styled.button`
    width: 160px;
    height: 20px;
    border: none;
    border-radius: 10px;
    background-color: #d35400;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const SocialForm = () => {
    const onSocialAccount = async (event: any) => {
        const {
            currentTarget: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider as any);
    };
    return (
        <SocialContainer>
            <GoogleBtn onClick={onSocialAccount} name="google">
                Google 계정으로 가입하기
            </GoogleBtn>
            <GithubBtn onClick={onSocialAccount} name="github">
                Github 계정으로 가입하기
            </GithubBtn>
        </SocialContainer>
    );
};

export default SocialForm;
