const parseMarkdown = require('./parseMarkdown');

function load(url) {
  return window.fetch(url, { method: 'GET' })
    .then((res) => {
      if (res.headers.get('Content-Type') !== 'application/json') {
        return res.text().then(markdown => parseMarkdown(markdown));
      }

      return res.json();
    });
}

module.exports = load;
