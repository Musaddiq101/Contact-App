import React from "react";
import ContactCard from "./ContactCard";

function ContactList(props) {

    //rendering each contact in the list
    const renderContactList = props.contacts.map(contact => {
        return (
            <ContactCard contact={contact}/>
        );
    });

    return (
        <div className="ui celled list">
            {renderContactList}
        </div>
    );
}
export default ContactList;