import ProfileForm from "../components/ProfileForm";

const Edit = ({ userObj, refreshUser }: any) => {
    return <ProfileForm userObj={userObj} refreshUser={refreshUser} />;
};

export default Edit;
