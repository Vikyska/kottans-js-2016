'use strict';

const PostHTML = require('posthtml');

const html = `<!DOCTYPE html>
<div class="container">
<div class="row some-here">
    <div class="col-md-8 some-cool-class col-xs-12 col-xs-12">
        blah blah
    </div>
<div class="col-md-4 js-super js-nano main-content">
    <h1>Business Name or Tagline</h1>
<p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
</div>
</div>
<div class="col-xs-12">123</div>
<div class="row another-class">
    <div class="navbar-fixed col-lg-12 main-idea js-lol">
    <div class="well text-center">
    This is a well that is a great spot for a business tagline or phone number for easy access!
</div>`

// get true bootstrap markup here http://blackrockdigital.github.io/startbootstrap-small-business/

const bootstrapPattern = /col-(xs|sm|md|lg)?(-\w+)?-\d+|navbar(-\w+)?|text-(\w+)|row/;
// .container is generic class, not only bootstrap

const plugin = tree => {
  tree
    .match({tag: 'div'}, node => {

      let classList = node.attrs.class.split(' '),
          newClassList = [],
          jsAttr = '';

      classList.forEach(item => {

        if (!bootstrapPattern.test(item)) {

          if (/js-\w+/.test(item)) {
            jsAttr += item.slice(3).concat(' ') // slice 'js-'
          } else {
            newClassList.push(item)
          }

        }
      })

      node.attrs = {
        class: (newClassList.length) ? newClassList.join(' ') : null
      }

      if (jsAttr) {
        node.attrs = {
          'data-js': jsAttr.slice(0, -1)
        }
      }

      return node
    })
}


PostHTML([plugin])
  .process(html)
  .then(result => {
    console.log(result.html)
  })
  .catch(error => console.log(error));