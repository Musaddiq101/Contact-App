import React, {useRef} from "react";
import ContactCard from "./ContactCard";
import {Link} from "react-router-dom";

function ContactList(props) {

    const inputEl = useRef("");

    function deleteContact(id) {
        props.getContactId(id)
    };

    function getSearchTerm() {
        props.searchKeyword(inputEl.current.value);

    }
    //rendering each contact in the list
    const renderContactList = props.contacts.map(contact => {
        return (
            <ContactCard contact={contact} clickHandler={deleteContact} key={contact.id}/>
        );
    });

    return (
        <div className="main" >
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search" >
                <div className="ui icon input">
                    <input ref={inputEl}className="prompt" type="text" placeholder="Search Contacts" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
            {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}
            </div>
        </div>
        
    );
}
export default ContactList;