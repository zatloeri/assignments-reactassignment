export interface ListItemFromApi {
    id: number;
    title: string;
    done: boolean;
    createdAt: number;
}

export interface NewItemData {
    title: string;
}

export const getTodoListItems = async (): Promise<ListItemFromApi[]> => {
    return fetch("http://localhost:3000/items").then((res) => res.json());
};

export const addTodoListItem = async (item: NewItemData): Promise<Response> => {
    return fetch("http://localhost:3000/items", {
        method: "POST",
        // mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};
