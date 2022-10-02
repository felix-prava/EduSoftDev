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
  /* uploadCallback() {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: 'http://dummy_image_src.com' } });
    });
  } */
  render() {
    console.log(this.props);
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

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
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
      </Fragment>
    );
  }
}
