import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getArticle } from '../../actions/article';

const Article = ({ getArticle, article: { article, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getArticle(id);
  }, [getArticle]);

  return loading || article === null ? (
    <Spinner />
  ) : (
    <Fragment>{article.subject}</Fragment>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticle })(Article);
