import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';

const Articles = ({ article: { articles, loading }, getArticles }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8'>
            <div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl'>
              <div>
                <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
                  Articles
                </h2>
              </div>
              <div className='mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12'>
                {articles.map((article) => (
                  <ArticleItem key={article._id} article={article} />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Articles.propTypes = {
  article: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticles })(Articles);
