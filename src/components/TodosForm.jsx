const TodosForm = ({ onSubmitForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const id = Math.floor(Math.random() * 100000).toString();
    const title = form.get("title");
    const newTodo = { id, title, complete: false };

    if (title === "") return;

    onSubmitForm(newTodo);
    e.target.reset();
  };

  return (
    <form
      data-testid="form"
      onSubmit={handleSubmit}
      className="mx-5 d-flex flex-column justify-content-center align-items-center gap-2"
    >
      <input
        data-testid="input"
        name="title"
        type="text"
        className="form-control text-center"
        placeholder="e.g. Go shopping..."
      />
      <small className="text-secondary ">Click Enter to add new todo</small>
    </form>
  );
};

export default TodosForm;
