import React, { useEffect, useState } from "react";
import NweetForm from "../components/NweetForm";
import { dbService } from "../fBase";
import Nweet from "./../components/Nweet";

interface RouterProps {
    userObj: any;
}

interface NweetProps {
    id: string;
    nweet: string;
    createrId: string;
}

const Home = ({ userObj }: RouterProps) => {
    const [nweets, setNweets] = useState<any>([]);
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);
    return (
        <div>
            <NweetForm userObj={userObj} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                {nweets.map((nweet: NweetProps) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.createrId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
