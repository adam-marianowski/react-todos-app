import Todos from "./components/Todos.jsx";

const App = () => {
  return (
    <div className="" style={{ height: "100vh", overflow: "hidden" }}>
      <Todos />

      <footer
        className="fixed-bottom card p-2 text-center"
        data-testid="footer"
      >
        @Adam Marianowski
      </footer>
    </div>
  );
};

export default App;
