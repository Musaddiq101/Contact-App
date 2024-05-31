import React from "react";
import user from "../images/user.png";
import {Link} from "react-router-dom"
import { useContactsCrud } from "../context/ContactsCrudContext";


function ContactCard(props) {
    const {id, name, email } = props.contact ;
    const {removeContactHandler} = useContactsCrud();

    function deleteContact(id) {
        removeContactHandler(id);
    };

    return (
        <div className="ui item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content" style={{fontSize: "18px"}}>
                <Link to={`/contact/${id}`} state={{contact: props.contact}} >
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>  
            </div>
            <i className="ui right floated trash alternate outline icon" style={{color:"red", marginTop:"7px", marginLeft: "10px" , fontSize:"20px"}} onClick={() => deleteContact(id)}>
            </i>
            <Link to={`/edit`} state={{contact: props.contact}}>
                <i className="ui right floated edit alternate outline icon" style={{color:"blue", marginTop:"7px", fontSize:"20px"}}></i>
            </Link> 
        </div>
    );
};

export default ContactCard;