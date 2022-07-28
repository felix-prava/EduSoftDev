import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getLearningMaterial,
  updateLearningMaterial,
} from '../../actions/learning';

const EditLesson = ({
  learning: { learningMaterial },
  getLearningMaterial,
  updateLearningMaterial,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    module: '',
    expNeeded: '',
    expGained: '',
    expMax: '',
    body: '',
    shortDescription: '',
  });

  const { name, module, expNeeded, expGained, expMax, body, shortDescription } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateLearningMaterial(formData, lessonId, learningMaterial.type);
  };

  const { lessonId } = useParams();
  useEffect(() => {
    if (!learningMaterial) getLearningMaterial(lessonId);
    if (learningMaterial) {
      setFormData({
        name: learningMaterial.name || '',
        module: learningMaterial.module || '',
        expNeeded: learningMaterial.expNeeded || '',
        expGained: learningMaterial.expGained || '',
        expMax: learningMaterial.expMax || '',
        body: learningMaterial.body || '',
        shortDescription: learningMaterial.shortDescription || '',
      });
    }
  }, [getLearningMaterial, learningMaterial, lessonId]);

  return (
    <Fragment>
      <div className='container mt-8'>
        <form
          className='space-y-8 divide-y divide-gray-200'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div>
                <h3 className='text-2xl font-bold leading-6 font-medium text-gray-900 sm:text-2xl'>
                  Edit lesson
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    What's the title of this lesson?{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-8 divide-y divide-gray-200'>
                <div className='pt-8'>
                  <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='expNeeded'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Experience Needed{' '}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='number'
                          step='any'
                          name='expNeeded'
                          value={expNeeded}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='expGained'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Experience Gained{' '}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='number'
                          step='any'
                          name='expGained'
                          value={expGained}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='expMax'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Max Experience{' '}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='number'
                          name='expMax'
                          value={expMax}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='body'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Body{' '}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      name='body'
                      value={body}
                      onChange={(e) => onChange(e)}
                      rows='3'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='shortDescription'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Short description{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='shortDescription'
                      value={shortDescription}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end mb-8'>
              <Link to={`/modules/${module}`}>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditLesson.propTypes = {
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  updateLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  updateLearningMaterial,
})(EditLesson);
