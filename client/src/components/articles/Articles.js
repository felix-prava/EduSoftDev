import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article';
import Spinner from '../layout/Spinner';

const Articles = ({ article: { articles, loading }, getArticles }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  console.log(articles);

  return <Fragment>{loading ? <Spinner /> : 'Articles'}</Fragment>;
};

Articles.propTypes = {
  article: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticles })(Articles);
