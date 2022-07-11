import { useState } from "react";
import { dbService, storageService } from "../fBase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { RouterProps } from "../routes/Home";

const NweetFForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

const NweetInput = styled.textarea`
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

const NweetSubmit = styled.input`
    padding: 5px;
    margin-right: -150px;
    border: none;
    border-radius: 10px;
    background-color: #00acee;
    color: whitesmoke;
    font-size: 8px;
    font-weight: bold;
    cursor: pointer;
`;

const FileIcon = styled.svg`
    margin-left: -150px;
    width: 15px;
    height: 15px;
    cursor: pointer;
`;

const FileInput = styled.input`
    border: none;
    background-color: transparent;
    color: whitesmoke;
`;

const NweetForm = ({ userObj }: RouterProps) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const [file, setFile] = useState(false);
    const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setNweet(value);
    };
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj?.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            createrId: userObj?.uid,
            text: nweet,
            createdAt: Date.now(),
            attachmentUrl,
        };
        console.log(nweetObj);
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { files },
        } = event;
        if (files !== null) {
            const reader = new FileReader();
            reader.onloadend = (event: any) => {
                const {
                    currentTarget: { result },
                } = event;
                setAttachment(result);
            };
            reader.readAsDataURL(files[0]);
        }
    };
    const onClearAttachment = () => setAttachment("");
    const toggleFile = () => setFile((prev) => !prev);
    return (
        <NweetFForm onSubmit={onSubmit}>
            <NweetInput
                typeof="text"
                value={nweet}
                onChange={onChange}
                placeholder="무슨 일이 일어나고 있나요?"
                maxLength={25}
            />
            <NweetSubmit type="submit" value="트윗" />
            <FileIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="whitesmoke"
                onClick={toggleFile}
            >
                <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z" />
            </FileIcon>
            {file ? (
                <FileInput
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                />
            ) : null}

            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </NweetFForm>
    );
};

export default NweetForm;
