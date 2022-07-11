import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { RouterProps } from "./Router";

const ProfileFForm = styled.form`
    position: relative;
    top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const ProfileInput = styled.input`
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

const ProfileSubmit = styled.input`
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

const ProfileBackBtn = styled.button`
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

const ProfileForm = ({ userObj, refreshUser }: RouterProps) => {
    const history = useHistory();
    const [newDisplayname, setNewDisplayname] = useState("");
    const onBackClick = () => {
        history.push("/profile");
    };
    const onChange = (event: FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setNewDisplayname(value);
    };
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userObj?.displayName !== newDisplayname) {
            await userObj?.updateProfile({
                displayName: newDisplayname,
            });
            refreshUser();
        }
        history.push("/profile");
    };
    return (
        <div>
            <ProfileFForm onSubmit={onSubmit}>
                <ProfileInput
                    value={newDisplayname}
                    onChange={onChange}
                    type="text"
                    placeholder="사용자 명"
                />
                <ProfileSubmit type="submit" value="프로필 업데이트" />
                <ProfileBackBtn onClick={onBackClick}>뒤로가기</ProfileBackBtn>
            </ProfileFForm>
        </div>
    );
};

export default ProfileForm;
