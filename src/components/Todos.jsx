import TodosForm from "./TodosForm.jsx";
import TodosList from "./TodosList.jsx";
import { useTodos } from "../hooks/useTodos.jsx";

const Todos = () => {
  const { addTodo, toggleTodo, todos, deleteTodo } = useTodos();

  return (
    <div
      className=" d-flex flex-column py-4"
      style={{ height: "100%", overflow: "hidden" }}
      data-testid="component"
    >
      <TodosForm onSubmitForm={addTodo}></TodosForm>
      <div className="overflow-scroll" data-testid="list">
        <TodosList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        ></TodosList>
      </div>
    </div>
  );
};

export default Todos;
