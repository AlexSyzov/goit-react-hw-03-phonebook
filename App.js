import React, { Component } from "react";
import Section from "./components/Section";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import { v4 as uuidv4 } from "uuid";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmission = (name, number) => {
    if (this.isInContacts(name)) {
      alert(`${name} is already in contacts!`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { id: uuidv4(), name, number }],
    }));
  };

  isInContacts = (name) => {
    return this.state.contacts.some(
      (contact) => name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  handleContactDeletion = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  // handleFormSubmission = (e) => {
  //   e.preventDefault();
  //   const { name, number } = this.state;

  //   if (!this.checkPhoneNumber(number)) {
  //     error({
  //       text: "Wrong phone number format. It must look like this: xxx-xx-xx",
  //       width: "300px",
  //       delay: 3000,
  //     });
  //     return;
  //   }

  //   this.setState((prevState) => ({
  //     name: "",
  //     contacts: [...prevState.contacts, { id: uuidv4(), name, number }],
  //     number: "",
  //   }));
  // };

  getVisibleContacts = (e) => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onFormSubmission={this.handleFormSubmission} />
        </Section>

        <Section title="Contacts">
          <Filter filter={filter} onInputChange={this.handleInputChange} />
          <ContactList
            contacts={visibleContacts}
            onContactDeletion={this.handleContactDeletion}
          />
        </Section>
      </>
    );
  }
}
