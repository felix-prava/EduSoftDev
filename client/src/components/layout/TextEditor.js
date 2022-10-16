import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const TextEditor = forwardRef(
  ({ setFormData, formData, fieldName, className }, ref) => {
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
        [fieldName]: newState,
      });
    }, [newState]);

    useImperativeHandle(ref, () => ({
      setEmptyEditor() {
        setState(EditorState.createEmpty());
      },
    }));

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
  }
);

export default TextEditor;
