import React, { useState } from "react";
import { dbService, storageService } from "../fBase";

interface NweetProps {
    nweetObj: any;
    isOwner: boolean;
}

const Nweet = ({ nweetObj, isOwner }: NweetProps) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
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
        <div>
            {editing ? (
                <div>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            onChange={onChange}
                            placeholder="Edit your nweet"
                            required
                        />
                        <input type="submit" value="Update nweet" />
                        <button onClick={onToggleEdit}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <div>
                        <h4>{nweetObj.text}</h4>
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
                    </div>
                </>
            )}
        </div>
    );
};

export default Nweet;
