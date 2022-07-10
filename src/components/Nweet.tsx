import React, { useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "../fBase";

interface NweetProps {
    userObj: any;
    nweetObj: any;
    isOwner: boolean;
}

const Nweets = styled.div`
    display: flex;
`;

const NweetEditForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
`;

const NweetEditInput = styled.textarea`
    width: 100%;
    max-width: 250px;
    height: 60px;
    border: none;
    background-color: transparent;
    color: whitesmoke;
    font-size: 12px;
    ::placeholder {
        color: whitesmoke;
        font-weight: bold;
    }
`;

const NweetEditSubmit = styled.input`
    padding: 5px;
    border: none;
    border-radius: 10px;
    background-color: #00acee;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const EditCancelBtn = styled.button`
    padding: 5px;
    border: none;
    border-radius: 10px;
    background-color: #d35400;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const NweetContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 300px;
    height: 100%;
    min-height: 80px;
    padding-left: 5px;
    border-radius: 10px;
    background-color: whitesmoke;
`;

const NweetName = styled.h4`
    margin-top: 10px;
    color: black;
    font-size: 10px;
    font-weight: bold;
`;

const NweetText = styled.p`
    margin-top: -5px;
    color: black;
    font-size: 10px;
    font-weight: 400;
`;

const NweetTime = styled.span`
    margin-top: 5px;
    color: black;
    font-size: 8px;
    font-weight: 400;
`;

const NweetDeleteBtn = styled.button`
    padding: 2px;
    border: none;
    border-radius: 10px;
    background-color: #d35400;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const NweetEditBtn = styled.button`
    padding: 2px;
    border: none;
    border-radius: 10px;
    background-color: #00acee;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const Nweet = ({ userObj, nweetObj, isOwner }: NweetProps) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState("");
    const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setNewNweet(value);
    };
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    };
    const onDeleteClick = async () => {
        const ok = window.confirm("이 트윗을 지우시겠습니까?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl) {
                await storageService
                    .refFromURL(nweetObj.attachmentUrl)
                    .delete();
            }
        }
    };
    const onToggleEdit = () => setEditing((prev) => !prev);
    const year = new Date(nweetObj.createdAt).getFullYear();
    const month = new Date(nweetObj.createdAt).getMonth() + 1;
    const day = new Date(nweetObj.createdAt).getDate();
    const hour = new Date(nweetObj.createdAt).getHours();
    const minute = new Date(nweetObj.createdAt).getMinutes();
    return (
        <Nweets>
            {editing ? (
                <div>
                    <NweetEditForm onSubmit={onSubmit}>
                        <NweetEditInput
                            typeof="text"
                            onChange={onChange}
                            placeholder="수정할 내용을 입력하세요"
                            required
                        />
                        <NweetEditSubmit type="submit" value="수정" />
                        <EditCancelBtn onClick={onToggleEdit}>
                            취소
                        </EditCancelBtn>
                    </NweetEditForm>
                </div>
            ) : (
                <>
                    <NweetContainer>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "30px",
                            }}
                        >
                            <NweetName>
                                {userObj.displayName} @{userObj.uid}
                            </NweetName>
                            {isOwner ? (
                                <div>
                                    <NweetDeleteBtn onClick={onDeleteClick}>
                                        삭제
                                    </NweetDeleteBtn>
                                    <NweetEditBtn onClick={onToggleEdit}>
                                        수정
                                    </NweetEditBtn>
                                </div>
                            ) : null}
                        </div>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <NweetText>{nweetObj.text}</NweetText>
                            {nweetObj.attachmentUrl && (
                                <img
                                    src={nweetObj.attachmentUrl}
                                    width="50px"
                                    height="50px"
                                />
                            )}
                            <NweetTime>
                                {hour}:{minute} {year}/{month}/{day}
                            </NweetTime>
                        </div>
                    </NweetContainer>
                </>
            )}
        </Nweets>
    );
};

export default Nweet;
