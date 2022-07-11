import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserObj } from "./App";
import { RouterProps } from "./Router";

const NavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavMenu = styled.ul`
    display: flex;
    gap: 30px;
`;

const NavItem = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    font-size: 10px;
`;

const NavDescription = styled.span`
    font-weight: bold;
`;

const TwitterIcon = styled.svg`
    width: 20px;
    height: 20px;
`;

const UserIcon = styled.svg`
    width: 20px;
    height: 20px;
`;

const Navigation = ({ userObj }: RouterProps) => {
    return (
        <NavContainer>
            <NavMenu>
                <NavItem>
                    <Link to="/">
                        <TwitterIcon
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="#1DA1F2"
                        >
                            <path
                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452
                0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568
                130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3
                27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431
                13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3
                105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0
                57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827
                21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                            />
                        </TwitterIcon>
                    </Link>
                    <NavDescription>Home</NavDescription>
                </NavItem>
                <NavItem>
                    <Link to="/profile">
                        <UserIcon
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="#1DA1F2"
                        >
                            <path
                                d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96
    128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52
    34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                            />
                        </UserIcon>
                    </Link>
                    <NavDescription>
                        {userObj?.displayName}'s Profile
                    </NavDescription>
                </NavItem>
            </NavMenu>
        </NavContainer>
    );
};

export default Navigation;
