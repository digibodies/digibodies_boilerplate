import React from 'react';
import Page from '../src/components/Page';

export default class IndexPage extends React.Component {
  render() {
    let meta = {
      title: 'Index',
      description: 'The index page description'
    };

    return (
      <Page isFluid activePage="home" meta={meta}>
        <h1>Index</h1>
      </Page>
    );
  }
}
IndexPage.propTypes = {};
