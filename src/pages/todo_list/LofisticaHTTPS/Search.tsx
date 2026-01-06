import { useState, useMemo, useEffect } from "react";
import "../LofisticaHTTPS/Search.css";
import { useCreatTodoList } from "../zustand";
import CatalogMain from "../../CategoryScroller/categoryMain";
import FilterMainTodoList from "../filterMainTodo";


type Props = {
  folderSlug?: string;
};

export default function Searcht({ folderSlug }: Props) {
  const todos = useCreatTodoList((state) => state.todos);
  const removeTodoText = useCreatTodoList((state) => state.removeTodoText);
  const locationStora = useCreatTodoList((state) => state.locationStor);
  const redactor = useCreatTodoList((state) => state.redactorText);
  const provActivZadach = useCreatTodoList((state) => state.provActivZadTodo);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [redactInputText, setRedactInputText] = useState("");
  const [search, setSearch] = useState("");

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setRedactInputText(text);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      redactor(redactInputText, editingId,"all");
      setEditingId(null);
    }
  };

  useEffect(() => {
    locationStora();
  }, []);

  const filteredTodos = useMemo(() => {
    if (!search.trim()) return [];

    const base = folderSlug
      ? todos.filter((t) => t.folder === folderSlug)
      : todos.filter((t) => !t.folder);

    return base.filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [todos, search, folderSlug]);

  return (
    <div>
      <main className="SearchBoxs">
      <input
        className="SearchGlobal"
        placeholder="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FilterMainTodoList/>
      <CatalogMain/>
      </main>

      {search.trim() && filteredTodos.length === 0 && (
        <p className="SearchNull">Ничего не найдено...</p>
      )}

      {filteredTodos.length > 0 && (
        <ul className="UlBoxs">
          {filteredTodos.map((ind) => {
            const isDuplicate =
              todos.filter((todo) => todo.text === ind.text).length > 1;

            return (
              <li key={ind.id} className="boxsLi">
                {editingId === ind.id ? (
                  <input
                    className="inputRedactor"
                    value={redactInputText}
                    onChange={(e) => setRedactInputText(e.target.value)}
                    placeholder="Редактировать"
                  />
                ) : (
                  <>
                    <span className={"todo_Text" + `${ind.done}`}>
                      {isDuplicate ? (
                        <span className="error">
                          Ошибка повторяется: {ind.text}
                        </span>
                      ) : (
                        ind.text
                      )}
                    </span>
                    {ind.done === false ? (
                      <p className="notParagrafActive">Не сделан</p>
                    ) : (
                      <p className="paragravActive">Сделан</p>
                    )}
                  </>
                )}

                <div className="BtnBoxs">
                  <button
                    className="BtnDelayt"
                    onClick={() => removeTodoText(ind.id,"all",folderSlug)}
                  >
                    Удалить
                  </button>
                  <button
                    className="BtnActive"
                    onClick={() => provActivZadach(ind.id,"all",folderSlug)}
                  >
                    Сделан
                  </button>
                  {editingId === ind.id ? (
                    <button className="BtnSave" onClick={saveEdit}>
                      Сохранить
                    </button>
                  ) : (
                    <button
                      className="BtnRedactor"
                      onClick={() => startEdit(ind.id, ind.text)}
                    >
                      Редактировать
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
