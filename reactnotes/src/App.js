import React, { Component } from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import "./App.css";
import firebase from "./config.js";
// import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);
    this.app = firebase;

    this.db = this.app
      .database()
      .ref()
      .child("notes");
    this.state = {
      notes: []
    };
  }

  componentWillMount() {
    const previousNote = this.state.notes;
    firebase
      .database()
      .ref()
      .on("child_added", snap => {
        previousNote.push({
          id: snap.key,
          noteContent: snap.val().noteContent
        });

        this.setState({
          notes: previousNote
        });
      });

    firebase
      .database()
      .ref()
      .on("child_removed", snap => {       
        for (var i = 0; i < previousNote.length; i++) {
          
          if (previousNote[i].id === snap.key) {
            previousNote.splice(i, 1);
          }
        }
        this.setState({
          notes: previousNote
        });
      });
  }

  addNote = note => {
    firebase
      .database()
      .ref()
      .push()
      .set({ noteContent: note });
  };

  removeNote = noteId => {
    firebase
      .database()
      .ref()
      .child(noteId)
      .remove();
  };

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
                removeNote={this.removeNote}
              />
            );
          })}
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
