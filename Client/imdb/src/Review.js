import './review.css';

export default function Review({
body,
author,
score,
title,
creationTime
}){


    return (
        <div className="list-item">
            <div className="rating">
                <svg class="ipl-icon ipl-star-icon  " xmlns="http://www.w3.org/2000/svg" fill="#c39400" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
                <span className="score">{score}</span>
                <span className="point-scale">/10</span>
            </div>
            <h2 className="title">{title}</h2>
            <div className="display-name-date">
                <span className="display-name">{author.username}</span>
                <span className="display-date">{creationTime.slice(0,10)}</span>
            </div>
            <p className="content">{body}</p>
        </div>
    )
}