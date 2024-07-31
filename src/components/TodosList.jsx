function TodosList({ onToggleTodo, onDeleteTodo, todos }) {
  return (
    <div className="mt-5">
      {todos.length > 0 ? (
        <div className="d-flex justify-content-center mb-3">
          <small className="text-secondary" data-testid="counter">
            You have <span className="fw-bold">{todos.length}</span>
            {todos.length === 1 ? " todo" : " todos"}
          </small>
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center"
          data-testid="fallback"
        >
          <span className="fs-2">No todos here yet</span>
          <span className="text-secondary">
            Add some todos to display them here
          </span>
        </div>
      )}

      <div
        className=" mx-auto d-flex justify-content-center gap-4 flex-column mb-5"
        style={{ width: "90%" }}
      >
        {todos.map((todo) => (
          <div key={todo.id} className="card d-flex p-3" data-testid="list">
            <div
              data-testid="title"
              className={todo.complete ? "text-decoration-line-through" : ""}
            >
              {todo.title}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteTodo(todo.id)}
                data-testid="delete"
              >
                <i className="bi bi-trash"></i>
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => onToggleTodo(todo)}
                data-testid="toggle"
              >
                <i className="bi bi-check-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodosList;
