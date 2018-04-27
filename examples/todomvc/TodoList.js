import React from 'react';
import { gql, List } from '../../src';
import TodoItem from './TodoItem';

const TodoListQuery = gql`
  query TodoListQuery($filter: TodoFilter) {
    viewer {
      allTodos(filter: $filter) {
        edges {
          node {
            ...TodoItemMaster
          }
        }
      }
    }
  }
  ${TodoItem.fragments.master}
`;

export const TodoList = () => (
  <List query={TodoListQuery} connection="viewer.allTodos" infiniteScroll>
    {(todo, { filter }) => <TodoItem {...filter(TodoItem.fragments.master, todo)} />}
  </List>
);
