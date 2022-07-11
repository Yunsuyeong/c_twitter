import ProfileForm from "../components/ProfileForm";
import { RouterProps } from "../components/Router";

const Edit = ({ userObj, isLoggedIn, refreshUser }: RouterProps) => {
    return (
        <ProfileForm
            userObj={userObj}
            isLoggedIn={isLoggedIn}
            refreshUser={refreshUser}
        />
    );
};

export default Edit;
