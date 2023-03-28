import React, {useEffect} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {clearErrors} from "../../actions/userAction.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MetaData from "../layout/metaData.jsx";
import Loader from "../layout/loading/loader.jsx";
import './profile.css'
const Profile = () => {
    const dispatch = useDispatch();
    const {error, loading, isAuthenticated, user} = useSelector(state => state.user);
     const location = useLocation()

    const path = location.pathname || 'home'
    //console.log(path)
    let navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (!isAuthenticated ) {
            navigate('/home');
        }
    }, [dispatch, error])
    return (
        <>
            {loading ? (
                    <Loader/>)
                : (
                    <>
                        <MetaData title={`${user.name} profile`}/>
                        <ToastContainer/>
                        <div className="profileContainer">
                            <div>
                                <h1>My Profile</h1>
                                <img src={user.avatar?.url} alt={user.name}/>
                                <Link to="/me/update">Edit Profile</Link>
                            </div>
                            <div>
                                <div>
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>

                                <div>
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/password/update">Change Password</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default Profile;