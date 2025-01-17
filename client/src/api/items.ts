export interface ListItemFromApi {
    id: number;
    title: string | number;
    done: boolean;
    createdAt: number;
}

export interface NewItemData {
    title: string | number;
}

export interface EditItemData extends Partial<NewItemData>, Pick<ListItemFromApi, "id"> {
    done?: boolean;
}


export type DeleteItemData = Pick<ListItemFromApi, "id">;

export type MarkItemDoneData = DeleteItemData;

export const getTodoListItems = async (): Promise<ListItemFromApi[]> => {
    return fetch("http://localhost:3000/items?_sort=done,createdAt").then((res) => res.json());
};

export const addTodoListItem = async (item: NewItemData): Promise<Response> => {
    return fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, done: false }),
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

export const markTodoListItemDone = async (item: MarkItemDoneData): Promise<Response> => {
    return fetch(`http://localhost:3000/items/markdone/${item.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const deleteTodoListItem = async (item: DeleteItemData): Promise<Response> => {
    return fetch(`http://localhost:3000/items/${item.id}`, {
        method: "DELETE",
    });
};
