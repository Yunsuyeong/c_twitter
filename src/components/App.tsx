import { useEffect, useState } from "react";
import { authService } from "../fBase";
import AppRouter from "./Router";

export interface UserObj {
    displayName: undefined | null | string;
    uid: undefined | string;
    updateProfile: (args: any) => any;
}

export interface nweetObj {
    id: number;
    attachmentUrl: string | null;
    createdAt: string | number | Date;
    createrId: string;
    text: string;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userObj, setUserObj] = useState<UserObj>();
    const [init, setInit] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user: any) => {
            if (user) {
                console.log(user);
                setIsLoggedIn(true);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args: any) => user.updateProfile(args),
                });
                if (user.displayName === null) {
                    const name = user.email.split("@")[0];
                    user.displayName = name;
                }
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user?.displayName,
            uid: user?.uid,
            updateProfile: (args) => user?.updateProfile(args),
        });
    };

    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    userObj={userObj}
                    isLoggedIn={isLoggedIn}
                />
            ) : (
                "Initializing..."
            )}
        </>
    );
}

export default App;
