import { create } from "zustand"

interface todoInfo {
    id: number;
    text: string;
    done: boolean;
    folder?: string;
}

interface TodoMainFunc {
    todos: todoInfo[];
    isActivTodos: todoInfo[];
    filterStatus:string
    addTodoText: (text: string, folderSlug?: string) => void;
    locationStor: (folderSlug?:string) => void;
    removeTodoText: (id: number, currentFilter: string, folderSlug?: string) => void;
    redactorText: (newText: string, id: number, currentFilter: string, folderSlug?: string) => void;
    provActivZadTodo: (id: number, currentFilter: string, folderSlug?: string) => void;
    filterTextMainTodo: (isActiv: string, folderSlug?: string) => void;
}

const applyFilters = (todos: todoInfo[], filterStatus: string, folderSlug?: string) => {
    return todos.filter((item) => {
        const matchesFolder = folderSlug ? item.folder === folderSlug : !item.folder;

        let matchesStatus = true;
        if (filterStatus === "active") matchesStatus = item.done === true;
        if (filterStatus === "notActive") matchesStatus = item.done === false;

        return matchesFolder && matchesStatus;
    });
};

export const useCreatTodoList = create<TodoMainFunc>((set) => ({
    todos: [],
    isActivTodos: [],
    filterStatus:"all",
    locationStor: (folderSlug) => {
        const stored = localStorage.getItem("todos");
        if (stored) {
            const data = JSON.parse(stored);
            set({ 
                todos: data, 
                isActivTodos: applyFilters(data, "all", folderSlug) 
            });
        }
    },
addTodoText: (text: string, folderSlug?: string) => set((state) => {
    const newTodo = { id: Date.now(), text, done: false, folder: folderSlug };
    const updatedTodos = [...state.todos, newTodo];
    
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    
    const filtered = updatedTodos.filter(t => 
        folderSlug ? t.folder === folderSlug : !t.folder
    );

    return { 
        todos: updatedTodos, 
        isActivTodos: filtered 
    };
}),

    removeTodoText: (id, currentFilter, folderSlug) => set((state) => {
        const updatedTodos = state.todos.filter(t => t.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        
        return { 
            todos: updatedTodos, 
            isActivTodos: applyFilters(updatedTodos, currentFilter, folderSlug) 
        };
    }),

    redactorText: (newText, id, currentFilter, folderSlug) => set((state) => {
        const updatedTodos = state.todos.map(t => t.id === id ? { ...t, text: newText } : t);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        
        return { 
            todos: updatedTodos, 
            isActivTodos: applyFilters(updatedTodos, currentFilter, folderSlug) 
        };
    }),

    provActivZadTodo: (id, currentFilter, folderSlug) => set((state) => {
        const updatedTodos = state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        
        return { 
            todos: updatedTodos, 
            isActivTodos: applyFilters(updatedTodos, currentFilter, folderSlug) 
        };
    }),
    filterTextMainTodo: (isActiv, folderSlug) => set((state) => ({
        filterStatus: isActiv,
        isActivTodos: applyFilters(state.todos, isActiv, folderSlug)
    }))
}));

interface NewTasck{
    id:number;
    name:string;
    slug?:string;
}
interface TasckNewText{
    masNew:NewTasck[];
    addNewNameText:(name:string)=>void;
    removeNewString:(id:number)=>void;
    loadingNewNameText:()=>void
}

const createSlug=(name:string):string=>{
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/[\s_-]+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
}

export const useCreatNewTasck=create<TasckNewText>((set)=>({
    masNew: (() => {
        try {
            const raw = localStorage.getItem("masNew");
            return raw ? JSON.parse(raw) as NewTasck[] : [];
        } catch {
            return [];
        }
    })(),
    addNewNameText:(name:string)=>set((state)=>{
        const newSlag=createSlug(name)
        const newText=[...state.masNew,{id:Date.now(),name,slug:newSlag}];
        localStorage.setItem("masNew",JSON.stringify(newText));
        return {masNew:newText}
    }),
    removeNewString:(id:number)=>set((state)=>{
    const newId=state.masNew.filter((ind)=>
    ind.id!==id);
    localStorage.setItem("masNew",JSON.stringify(newId));
    return {masNew:newId}
    }),
    loadingNewNameText:() => set(() => {
    try {
        const raw = localStorage.getItem("masNew");
        const parsed = raw ? JSON.parse(raw) as NewTasck[] : [];
        return { masNew: parsed };
        } catch {
            return { masNew: [] };
        }
    }),
}))

interface DarkMode {
    bakColor: boolean;
    toggleDarkMode: () => void;
}
export const useDarkMode = create<DarkMode>((set) => ({
    bakColor: localStorage.getItem("bakColor") === "true",
    toggleDarkMode: () => set((state) => {
        const nextColor = !state.bakColor;
        localStorage.setItem("bakColor", String(nextColor));
        return { bakColor: nextColor };
    }),
}));

