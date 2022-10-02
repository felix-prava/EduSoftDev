import React, { Component, Fragment } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  currentState = '<p></p>\n';
  /* uploadCallback() {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: 'http://image_src.com' } });
    });
  } */

  render() {
    const { editorState } = this.state;
    const newState = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (this.currentState !== newState) {
      console.log(this.currentState);
      console.log(newState);
      this.currentState = newState;
      this.props.setFormData({
        ...this.props.formData,
        body: newState,
      });
    }

    return (
      <Fragment>
        <div className={this.props.className}>
          <Editor
            editorState={editorState}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onEditorStateChange={this.onEditorStateChange}
            // toolbar={{ image: { uploadCallback: this.uploadCallback } }}
          />
        </div>
      </Fragment>
    );
  }
}
