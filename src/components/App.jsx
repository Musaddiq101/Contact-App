
import './App.css';
import React, {useState, useEffect} from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //handle the contaxt added and add it to the prev contact array
  function addContactHandler(contact) {
    setContacts((prevContacts => {
      return [...prevContacts, contact];
    }));
    console.log(contact);
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //setting statet of contacts after retreiveing
    if (retrieveContacts) {setContacts(retrieveContacts)};
  }, []) // want this to happen only on first render thats why empty

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
