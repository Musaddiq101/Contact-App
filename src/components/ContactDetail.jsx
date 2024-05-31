import React from "react";
import user from "../images/user.jpg";
import {Link, useLocation} from "react-router-dom"


function ContactDetail(props) {
    const location = useLocation();
    const {name, email} = location.state.contact;

    return (
        <div className="main" style={{paddingTop: "60px"}}>
            <div className="ui centered card">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="ui container">
                <div className="ui grid ">
                    <div className="six wide column"></div>
                    <div className="four wide column">
                        <Link to="/">
                            <button className="ui fluid button blue ">Back to Contact List</button>
                        </Link>
                    </div> 
                    <div className="four wide column"></div>    
                </div> 
            </div>
        </div>
    );
};

export default ContactDetail;