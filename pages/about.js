import React from 'react';
import Page from '../src/components/Page';

export default class AboutPage extends React.Component {
  render() {
    let meta = {
      title: 'Page 1',
      description: 'Page 1 description'
    };

    return (
      <Page title="About Me" activePage="about" meta={meta}>
        <h1>Page 1</h1>
      </Page>
    );
  }
}
AboutPage.propTypes = {};
