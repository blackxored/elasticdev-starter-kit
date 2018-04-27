import React from 'react';
import { CheckBox, gql, Text, View, compose, withIdHandler } from '../../src';

const TodoItem = ({ id, text, isCompleted, onToggle }) => (
  <View onPress={onToggle} direction="row" align="space-between">
    <CheckBox checked={isCompleted} />
    <Text>{text}</Text>
  </View>
);

TodoItem.fragments = {
  master: gql`
    fragment TodoItemMaster on Todo {
      id
      text
      isCompleted
    }
  `,
  detail: gql`
    fragment TodoItemDetail on Todo {
      id
      text
      isCompleted
      completedAt
      createdAt
    }
  `,
};

/*
  withIdHandler('onToggle'):

  withHandlers({
    onToggle: ({ onToggle, id }) => onToggle(id),
  });
 */
export default compose(withIdHandler('onToggle'))(TodoItem);
