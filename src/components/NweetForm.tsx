import { useState } from "react";
import { dbService, storageService } from "../fBase";
import { v4 as uuidv4 } from "uuid";
import { RouterProps } from "react-router-dom";

const NweetForm = ({ userObj }: any) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
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
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            createrId: userObj.uid,
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
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={nweet}
                onChange={onChange}
                placeholder="What's on your mind?"
                maxLength={25}
            />
            <input type="submit" value="&rarr;" />
            <input type="file" accept="image/*" onChange={onFileChange} />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default NweetForm;
