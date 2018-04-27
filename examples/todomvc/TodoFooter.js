import React from 'react';
import { View, Text, List, ListItem } from '../../src/components';
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from './TodoMVC';

const pluralize = (count, word) => {
  return count === 1 ? word : `${word}s`;
};

const filters = [
  {
    url: '#/',
    filter: ACTIVE_TODOS,
    label: 'All',
  },
  {
    url: '#/active',
    filter: ACTIVE_TODOS,
    label: 'Active',
  },
  {
    url: '#/completed',
    filter: COMPLETED_TODOS,
    label: 'Completed',
  },
];

const TodoFooter = ({ count, nowShowing, onClearCompleted, completedCount }) => {
  const activeTodoWord = pluralize(count, 'item');

  return (
    <View>
      <Text>
        <Text bold>{count}</Text>
        {activeTodoWord} left
      </Text>

      <List items={filters} horizontal>
        {filter => (
          <Link key={filter.filter} href={filter.url} active={nowShowing === filter.filter}>
            {filter.label}
          </Link>
        )}
      </List>
      {completedCount > 0 && <Button onPress={onClearCompleted}>Clear completed</Button>}
    </View>
  );
};

export default TodoFooter;
