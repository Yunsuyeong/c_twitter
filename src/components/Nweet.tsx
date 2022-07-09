import React, { useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "../fBase";

interface NweetProps {
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
    border: none;
    border-radius: 10px;
    background-color: #00acee;
    color: whitesmoke;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
`;

const EditCancelBtn = styled.button`
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
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    min-width: 300px;
    border-radius: 30px;
    background-color: whitesmoke;
`;

const NweetText = styled.p`
    color: black;
    font-size: 14px;
    font-weight: 400;
`;

const Nweet = ({ nweetObj, isOwner }: NweetProps) => {
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
        const ok = window.confirm("Do you want to delete this nweet?");
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
                        <NweetText>{nweetObj.text}</NweetText>
                        {nweetObj.attachmentUrl && (
                            <img
                                src={nweetObj.attachmentUrl}
                                width="40px"
                                height="40px"
                            />
                        )}
                        {isOwner ? (
                            <div>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={onToggleEdit}>Edit</button>
                            </div>
                        ) : null}
                    </NweetContainer>
                </>
            )}
        </Nweets>
    );
};

export default Nweet;
