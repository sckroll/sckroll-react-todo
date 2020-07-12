import React, { useState, useRef, useCallback, useReducer } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// 많은 데이터 렌더링 테스트
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// function todoReducer(todos, action) {
//   switch (action.type) {
//     case 'INSERT':
//       // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
//       return todos.concat(action.todo);
//     case 'REMOVE':
//       // { type: 'REMOVE', todo: { id: 1, text: 'todo', checked: false } }
//       return todos.filter(todo => todo.id !== action.id);
//     case 'TOGGLE':
//       // { type: 'TOGGLE', todo: { id: 1, text: 'todo', checked: false } }
//       return todos.map(todo =>
//         todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
//       );
//     default:
//       return todos;
//   }
// }

// const App = () => {
//   // 두 번째 파라미터 대신 세 번째 파라미터에 초기 상태를 넣어줌으로써
//   // 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수 호출
//   const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)

//   // 고윳값으로 사용될 id
//   // ref를 사용하여 변수 담기
//   const nextId = useRef(2501);

//   // 항목 삽입
//   const onInsert = useCallback(
//     text => {
//       const todo = {
//         id: nextId.current,
//         text,
//         checked: false,
//       };
//       dispatch({ type: 'INSERT', todo });
//       nextId.current += 1;
//     },
//     [],
//   );

//   // 항목 삭제
//   const onRemove = useCallback(
//     id => {
//       dispatch({ type: 'REMOVE', id });
//     },
//     [],
//   );

//   // 항목 토글
//   const onToggle = useCallback(
//     id => {
//       dispatch({ type: 'TOGGLE', id });
//     },
//     [],
//   );

//   return (
//     <TodoTemplate>
//       <TodoInsert onInsert={onInsert} />
//       <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
//     </TodoTemplate>
//   );
// };

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링해보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어보기',
  //     checked: false,
  //   },
  // ]);
  // useState에 기본값으로 createBulkTodos()를 넣으면 리렌더링될 때마다 호출
  // useState에 기본값으로 createBulkTodos를 넣으면 처음 렌더링될 때만 호출
  const [todos, setTodos] = useState(createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  // id 값은 렌더링되는 정보가 아니므로 useState 대신 useRef 사용
  // (단순히 새로운 항목을 만들 때 참조되는 값)
  // const nextId = useRef(4);
  const nextId = useRef(2501);

  // 항목 삽입
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // 새로운 상태의 파라미터를 넣는 대신 상태 업데이트를 정의하는
      // 업데이트 함수를 대신 넣어줄 수 있음 (함수형 업데이트)
      // 그러면 useCallback을 사용할 때 두 번째 파라미터로 넣는 배열에
      // 아무 것도 넣지 않아도 됨
      setTodos(todos => todos.concat(todo));
      // setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [],
    // [todos],
  );

  // 항목 삭제
  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
      // setTodos(todos.filter(todo => todo.id !== id));
    },
    [],
    // [todos],
  );

  // 항목 토글
  const onToggle = useCallback(
    id => {
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
      // setTodos(
      //   todos.map(todo =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
    },
    [],
    // [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
