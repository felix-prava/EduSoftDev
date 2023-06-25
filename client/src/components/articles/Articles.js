import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticles, deleteArticle } from '../../actions/article';
import {
  articlesTranslations,
  universalTranslations,
} from '../layout/Translations';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';
import Modal from '../layout/Modal';

const Articles = ({
  auth: { user, isAuthenticated },
  article: { articles, loading },
  getArticles,
  deleteArticle,
}) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const language = user ? user.language : 'en';
  const articlesLabel = articlesTranslations.articles[language];
  const createArticleMessageLabel =
    articlesTranslations.createArticleMessage[language];
  const createArticleLinkLabel =
    articlesTranslations.createArticleLink[language];
  const discussionLabel = articlesTranslations.discussion[language];
  const readArticleLinkLabel = articlesTranslations.readArticleLink[language];
  const deleteArticleTitle = articlesTranslations.deleteArticle[language];
  const deleteArticleMessage =
    articlesTranslations.deleteArticleMessage[language];

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
                  {articlesLabel}
                </h2>
                {isAuthenticated && (
                  <p className='mt-6 text-lg tracking-tight text-gray-900'>
                    {createArticleMessageLabel}{' '}
                    <Link
                      to='/articles/create-article'
                      className='text-blue-500'
                    >
                      {createArticleLinkLabel}
                    </Link>
                  </p>
                )}
              </div>
              <div className='mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12'>
                {articles.map((article) => (
                  <ArticleItem
                    key={article._id}
                    article={article}
                    translations={{
                      discussionLabel,
                      readArticleLinkLabel,
                      language,
                      deleteArticleTitle,
                      deleteArticleMessage,
                    }}
                    currentUser={user}
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
          language={language}
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
