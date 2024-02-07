export interface ListItemFromApi {
    id: number;
    title: string;
    done: boolean;
    createdAt: number;
}

export interface NewItemData {
    title: string;
}

export interface ExistingItemData extends NewItemData {
    id: number;
    checked: boolean;
}

export const getTodoListItems = async (): Promise<ListItemFromApi[]> => {
    return fetch("http://localhost:3000/items").then((res) => res.json());
};

export const addTodoListItem = async (item: NewItemData): Promise<Response> => {
    return fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};

export const editTodoListItem = async (item: ExistingItemData): Promise<Response> => {
    return fetch(`http://localhost:3000/items/${item.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};
