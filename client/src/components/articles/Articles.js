import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticles, deleteArticle } from '../../actions/article';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';
import Modal from '../layout/Modal';

const Articles = ({
  auth: { isAuthenticated },
  article: { articles, loading },
  getArticles,
  deleteArticle,
}) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);

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
                {isAuthenticated && (
                  <p className='mt-6 text-lg tracking-tight text-gray-900'>
                    Do you want to share something interesting with us?{' '}
                    <Link
                      to='/articles/create-article'
                      className='text-blue-500'
                    >
                      Create your own article
                    </Link>
                  </p>
                )}
              </div>
              <div className='mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12'>
                {articles.map((article) => (
                  <ArticleItem
                    key={article._id}
                    article={article}
                    toggleModal={() => setModal(!modal)}
                    setModalData={setModalData}
                  />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {modal && (
        <Modal
          modalData={modalData}
          hideModal={() => setModal(false)}
          action={() => deleteArticle(modalData[2])}
        />
      )}
    </Fragment>
  );
};

Articles.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  article: state.article,
});

export default connect(mapStateToProps, { getArticles, deleteArticle })(
  Articles
);
