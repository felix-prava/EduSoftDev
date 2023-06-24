import axios from 'axios';

const setLanguage = (language) => {
  if (language) {
    axios.defaults.headers.common['esd-language'] = language;
  } else {
    delete axios.defaults.headers.common['esd-language'];
  }
};

export default setLanguage;
