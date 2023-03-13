import { useEffect, useState } from "react";
import { useSort } from "../hooks/hooks";

const IsEditTo = ({ name, isEdit, title, handleChange, newValue }) => {
  if (isEdit) {
    return (
      <input
        className="editInput"
        name={name}
        value={newValue}
        onChange={handleChange}
        placeholder="EDIT"
      />
    );
  } else {
    return <h1 className="cardTitle">{title}</h1>;
  }
};
const TodoList = ({ list, deleteTodo, editTodo }) => {
  const [isEdit, setIsEdit] = useState("");
  const [newValue, setNewValue] = useState({
    title: "",
    desc: "",
  });
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 4,
  });
  const [page, setPage] = useState(1);

  const [type, setType] = useState("asc");

  const [searchValue, setSearchValue] = useState("");
  const filterTodos = () => {
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        item.desc.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  };
  console.log(list, type);
  const arrSorted = useSort(type, list);
  const filteredList = filterTodos(arrSorted);
  useEffect(() => {}, [list]);

  const handleChange = (e) => {
    setNewValue({ ...newValue, [e.target.name]: e.target.value });
  };

  const openEditPanel = (todo) => {
    setNewValue({ title: todo.title, desc: todo.desc });
    setIsEdit(todo.id);
  };
  const submitNewValue = (todo) => {
    const newTodo = { ...todo, title: newValue.title, desc: newValue.desc };
    editTodo(newTodo);
    setIsEdit(false);
  };
  const allPage = Math.ceil(list.length / pagination.limit);

  const nextPage = () => {
    if (page === allPage) return;
    setPagination({
      ...pagination,
      offset: pagination.offset + pagination.limit,
    });
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPagination({
      ...pagination,
      offset: pagination.offset - pagination.limit,
    });
    setPage(page - 1);
  };
  return (
    <div className="listWrapper">
      <input
        value={searchValue}
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={() => setType("asc")}>Sort asc</button>
      <button onClick={() => setType("desc")}>Sort desc</button>
      <button onClick={() => setType("letter")}>Sort letter</button>
      {filteredList
        .slice(pagination.offset, pagination.offset + pagination.limit)
        .map((todo) => (
          <div className="todoCard" key={todo.id}>
            <div className="todoCardTitleWrapper">
              <IsEditTo
                name="title"
                newValue={newValue.title}
                handleChange={handleChange}
                isEdit={isEdit === todo.id}
                title={todo.title}
              />
              <IsEditTo
                name="desc"
                newValue={newValue.desc}
                handleChange={handleChange}
                isEdit={isEdit === todo.id}
                title={todo.desc}
              />
            </div>
            <div className="todoCardBtnWrapper">
              <button className="btnCard" onClick={() => openEditPanel(todo)}>
                Edit
              </button>
              {isEdit ? (
                <button
                  className="btnCard"
                  onClick={() => submitNewValue(todo)}
                >
                  Сохранить
                </button>
              ) : (
                <button className="btnCard" onClick={() => deleteTodo(todo.id)}>
                  Удалить
                </button>
              )}
            </div>
          </div>
        ))}
      <button onClick={prevPage}>prev page</button>
      {page + "/" + allPage}
      <button onClick={nextPage}>next page</button>
    </div>
  );
};
export default TodoList;
