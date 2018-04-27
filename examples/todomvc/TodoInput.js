// @flow
import React from 'react';
import { TextInput } from '../../src/components';

type Props = {};

export const TodoInput = ({ value, onKeyDown, onChange }) => {
  return (
    <TextInput
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
      autoFocus
    />
  );
};

export default TodoInput;
