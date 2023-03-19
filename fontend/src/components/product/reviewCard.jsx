import React from 'react';
import {Rating} from "@mui/material";
import profilePng from "../../assets/Profile.png";
const ReviewCard = ({ review,rating }) => {
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User"/>
            <p>{review.name}</p>
            <Rating value={rating} readOnly />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};


export default ReviewCard;