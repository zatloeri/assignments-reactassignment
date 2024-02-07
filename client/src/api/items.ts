export interface ListItemFromApi {
    id: number;
    title: string;
    done: boolean;
    createdAt: number;
}

export interface NewItemData {
    title: string;
}

export interface EditItemData extends NewItemData, Pick<ListItemFromApi, "id"> {
    checked: boolean;
}

export type DeleteItemData = Pick<ListItemFromApi, "id">;

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

export const editTodoListItem = async (item: EditItemData): Promise<Response> => {
    return fetch(`http://localhost:3000/items/${item.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};

export const deleteTodoListItem = async (item: DeleteItemData): Promise<Response> => {
    return fetch(`http://localhost:3000/items/${item.id}`, {
        method: "DELETE",
    });
};
