import React, {useState, useEffect} from "react";
import ContactCard from "./ContactCard";
import {Link} from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

function ContactList(props) {
    const {contacts, retrieveContacts, searchTerm, searchResults, searchHandler } = useContactsCrud();

    useEffect(() => {
        retrieveContacts();
    }, []);

    //rendering each contact in the list
    const renderContactList = (searchTerm.length < 1 ? contacts : searchResults).map((contact) => {
        return (
            <ContactCard contact={contact}  key={contact.id}/>
        );
    });

    function onUserSearch(e) {
        searchHandler(e.target.value)

    };

    return (
        <div className="main ui segment" style={{paddingTop: "60px"}}>
          <h2>
            Contact List
            <Link to="/add">
              <button className="ui right floated button blue ">Add Contact</button>
            </Link>
          </h2>
          <div className="ui fluid search">
            <div className="ui icon input">
              <input
                type="text"
                placeholder="Search Contacts"
                className="prompt"
                value={searchTerm}
                onChange={(e) => onUserSearch(e)}
              />
              <i className="search icon"></i>
            </div>
          </div>
          <div className="ui celled list">
            {renderContactList.length > 0
              ? renderContactList
              : "No Contacts available"}
          </div>
        </div>
      );
};

export default ContactList;