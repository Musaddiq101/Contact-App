import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import {v4 as uuid } from "uuid";

const contactsCrudContext = createContext();


export function ContactsCrudContextProvider({children}) {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    

     //retreivecontacts
    async function retrieveContacts() {
        const response = await api.get("/contacts");
        if (response.data) setContacts(response.data);
    };

     //delete contact
    async function removeContactHandler(id) {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) => {
          return (contact.id !== id);
        })
        setContacts(newContactList);
      };

    //handle the contaxt added and add it to the prev contact array
    async function addContactHandler(contact) {
        console.log(contact);
        const request = {
        id : uuid(),
        ...contact,
        };
        const response = await api.post("/contacts", request)
        setContacts([...contacts, response.data]);
    };

    //update contact
    async function updateContactHandler(contact) {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const {id} = response.data;
        setContacts((contacts.map(contact => {
          return (
            contact.id === id ? {...response.data} : contact
          );
        })));
      };

    //search functionality  
    function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
        const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(newContactList);
    } else {
        setSearchResults(contacts);
    }
    };  

    const value= {
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retrieveContacts,
        removeContactHandler,
        addContactHandler,
        updateContactHandler
    };

    return <contactsCrudContext.Provider value={value}>
        {children}
    </contactsCrudContext.Provider>
}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
}

