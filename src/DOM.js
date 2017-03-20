require('./styles.css');

const html = require('./template.html');

function init(element) {
  element.innerHTML += html;
}

module.exports = {
  init
};
