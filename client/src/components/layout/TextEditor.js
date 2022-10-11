import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const TextEditor = ({ setFormData, formData, className }) => {
  const [state, setState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setState(editorState);
  };

  const editorState = state;
  const newState = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  /* function uploadCallback() {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: 'http://image_src.com' } });
    });
  } */

  useEffect(() => {
    setFormData({
      ...formData,
      body: newState,
    });
  }, [newState]);

  return (
    <Fragment>
      <div className={className}>
        <Editor
          editorState={state}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onEditorStateChange={onEditorStateChange}
          // toolbar={{ image: { uploadCallback: uploadCallback } }}
        />
      </div>
    </Fragment>
  );
};

TextEditor.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(TextEditor);
