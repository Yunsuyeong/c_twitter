import { authService } from "../fBase";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ProfileForm from "../components/ProfileForm";
import { useState } from "react";
import { RouterProps } from "./Home";

const ProfileContainer = styled.div`
    position: relative;
    top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const ProfileEditBtn = styled.button`
    width: 200px;
    height: 20px;
    border: none;
    border-radius: 10px;
    background-color: #00acee;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const LogoutBtn = styled.button`
    width: 200px;
    height: 20px;
    border: none;
    border-radius: 10px;
    background-color: #d35400;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const Profile = () => {
    const history = useHistory();
    const onEditClick = () => {
        history.push("/profile/edit");
    };
    const onLogoutClick = () => {
        const ok = window.confirm("정말 로그아웃 하시겠습니까?");
        if (ok) {
            authService.signOut();
            history.push("/");
        }
    };

    return (
        <ProfileContainer>
            <ProfileEditBtn onClick={onEditClick}>프로필 편집</ProfileEditBtn>
            <LogoutBtn onClick={onLogoutClick}>로그아웃</LogoutBtn>
        </ProfileContainer>
    );
};

export default Profile;
