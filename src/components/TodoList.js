import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  // react-virtualized를 사용하여 화면에 보이는 부분만 렌더링
  // 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않음
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이 (테두리가 포함된 두 번째 항목부터의 높이)
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );

  // return (
  //   <div className="TodoList">
  //     {todos.map(todo => (
  //       <TodoListItem
  //         todo={todo}
  //         key={todo.id}
  //         onRemove={onRemove}
  //         onToggle={onToggle}
  //       />
  //     ))}
  //   </div>
  // );
};

export default React.memo(TodoList);
// export default TodoList;
