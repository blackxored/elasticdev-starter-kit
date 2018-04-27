import React from 'react';
import Head from 'next/head';
import TodoApp from '../../examples/todomvc/TodoMVC';

export default () => (
  <>
    <Head>
      <title>TodoMVC • ElasticDev Starter Kit</title>
    </Head>
    <TodoApp />
  </>
);
