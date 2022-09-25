import React, { Fragment } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
  return (
    <Fragment>
      <Editor
        editorState={editorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
        onEditorStateChange={this.onEditorStateChange}
      />
      ;
    </Fragment>
  );
};

export default TextEditor;
