import { authService } from "../fBase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onEditClick = () => {
        history.push("/profile/edit");
    };
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <div>
            <button onClick={onEditClick}>Edit Profile</button>
            <button onClick={onLogoutClick}>Log Out</button>
        </div>
    );
};

export default Profile;
