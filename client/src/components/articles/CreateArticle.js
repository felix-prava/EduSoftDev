import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArticle } from '../../actions/article';

const CreateArticle = ({ addArticle }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    body: '',
  });

  return <Fragment>CreateArticle</Fragment>;
};

CreateArticle.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

export default connect(null, { addArticle })(CreateArticle);
