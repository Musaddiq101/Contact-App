
import './App.css';
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import {v4 as uuid } from "uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';
import api from "../api/contacts";
import EditContact from './EditContact';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //handle the contaxt added and add it to the prev contact array
  async function addContactHandler(contact) {
    console.log(contact);
    const request = {
      id : uuid(),
      ...contact

    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
    };
  

  async function updateContactHandler(contact) {
    const response = await api.put(`/contact/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts((contacts.map(contact => {
      return (
        contact.id === id ? {...response.data} : contact
      );
    })));
  };
    

  async function removeContactHandler(id) {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return (contact.id !== id);
    })
    setContacts(newContactList);
  };

  //retreivecontacts
  async function retrieveContacts() {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);// want this to happen only on first render thats why empty

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)} />
          <Route path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route path="/contact/:id" component={ContactDetail} />
          <Route path="/edit" render={(props) => (<EditContact {...props} updateContactHandler={updateContactHandler} />)} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
