import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const TextEditor2 = ({ setFormData, formData, className }) => {
  let state = {
    editorState: EditorState.createEmpty(),
  };

  let onEditorStateChange = (editorState) => {
    state.editorState = editorState;
  };

  let currentState = '<p></p>\n';
  /* uploadCallback() {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: 'http://image_src.com' } });
    });
  } */

  const { editorState } = state;
  const newState = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  if (currentState !== newState) {
    console.log(currentState);
    console.log(newState);
    currentState = newState;
    setFormData({
      ...formData,
      body: newState,
    });
  }

  return (
    <Fragment>
      <div className={className}>
        <Editor
          editorState={state.editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onEditorStateChange={onEditorStateChange}
          // toolbar={{ image: { uploadCallback: this.uploadCallback } }}
        />
      </div>
    </Fragment>
  );
};

TextEditor2.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(TextEditor2);
