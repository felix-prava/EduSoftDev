import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const TextEditor = forwardRef(
  ({ setFormData, formData, fieldName, fieldValue }, ref) => {
    const [state, setState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
      setState(editorState);
    };

    let editorState = state;
    const newState = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    /* function uploadCallback() {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: 'http://image_src.com' } });
    });
  } */
    const variable24 = fieldValue !== '';
    useEffect(() => {
      if (variable24) {
        if (typeof fieldValue !== 'undefined') {
          setState(EditorState.createWithContent(stateFromHTML(fieldValue)));
          editorState = state;
        }
      }
    }, [variable24]);

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
        <Editor
          editorState={state}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onEditorStateChange={onEditorStateChange}
          // toolbar={{ image: { uploadCallback: uploadCallback } }}
        />
      </Fragment>
    );
  }
);

export default TextEditor;
