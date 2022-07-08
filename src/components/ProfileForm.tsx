import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

const ProfileForm = ({ userObj, refreshUser }: any) => {
    const history = useHistory();
    const [newDisplayname, setNewDisplayname] = useState("");
    const onChange = (event: FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setNewDisplayname(value);
    };
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayname) {
            await userObj.updateProfile({
                displayName: newDisplayname,
            });
            refreshUser();
        }
        history.push("/profile");
    };
    return (
        <form onSubmit={onSubmit}>
            <input
                value={newDisplayname}
                onChange={onChange}
                type="text"
                placeholder="Display name"
            />
            <input type="submit" value="Update Profile" />
        </form>
    );
};

export default ProfileForm;
