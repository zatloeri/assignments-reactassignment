import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Footer } from "./components/Footer";
import { useQuery } from "react-query";
import { ListItemFromApi, getTodoListItems } from "./api/items";
import { TodoListHeader } from "./todo-list/TodoListHeader";
import { TodoListItem } from "./todo-list/TodoListItem";
import { useCallback, useEffect, useRef, useState } from "react";

type OfflineListItemsMap = Record<string, ListItemFromApi | null>;

const cleanAndSortOfflineListItemsMap = (offlineListItems: OfflineListItemsMap) => {
    const listItemsWithoutRemovedItems = Object.values(offlineListItems).filter(Boolean) as ListItemFromApi[];
    const sortedByDoneAndDate = listItemsWithoutRemovedItems.sort((itemA, itemB) => {
        // done and not done should be sorted separately
        if (itemA.done !== itemB.done) {
            return itemA.done ? 1 : -1;
        }
        return itemA.createdAt <= itemB.createdAt ? -1 : 1;
    }) as ListItemFromApi[];

    return sortedByDoneAndDate;
};

const useOfflineListItems = (listItemsFromApi: ListItemFromApi[] | undefined) => {
    const [offlineListItems, setOfflineListItems] = useState<OfflineListItemsMap>({});

    const offlineListItemsAsArray = cleanAndSortOfflineListItemsMap(offlineListItems);
    const highestIdUsed = useRef(0);

    useEffect(() => {
        const newOfflineItems = listItemsFromApi?.reduce((acc, item) => {
            if (item.id > highestIdUsed.current) {
                highestIdUsed.current = item.id;
            }
            acc[item.id] = item;
            return acc;
        }, {} as OfflineListItemsMap);
        setOfflineListItems(newOfflineItems || {});
    }, [listItemsFromApi]);

    const changeItem = useCallback(
        (id: number, value: Partial<ListItemFromApi> | null) => {
            const newListItems = { ...offlineListItems };

            const itemToUpdate = newListItems[id] as ListItemFromApi;
            newListItems[id] = value !== null ? { ...itemToUpdate, ...value } : null;

            setOfflineListItems(newListItems);
        },
        [offlineListItems, setOfflineListItems]
    );

    const onItemAdd = useCallback(
        (params: Partial<ListItemFromApi>) => {
            const id = ++highestIdUsed.current;
            changeItem(id, {
                ...params,
                id,
                done: false,
                createdAt: Date.now(),
            });
        },
        [changeItem]
    );

    const onItemChange = useCallback(
        (params: Partial<ListItemFromApi> & Pick<ListItemFromApi, "id">) => changeItem(params.id, params),
        [changeItem]
    );

    const onItemDelete = useCallback(
        (params: Partial<ListItemFromApi> & Pick<ListItemFromApi, "id">) => changeItem(params.id, null),
        [changeItem]
    );

    return { onItemChange, onItemDelete, onItemAdd, offlineListItemsAsArray };
};

export const TodoList: React.FC = () => {
    const {
        isLoading,
        error,
        data: listItemsFromApi,
    } = useQuery<ListItemFromApi[]>({
        queryKey: ["todos"],
        queryFn: getTodoListItems,
    });
    const { onItemAdd, onItemChange, onItemDelete, offlineListItemsAsArray } = useOfflineListItems(listItemsFromApi);

    const allItemsCount = offlineListItemsAsArray?.length || 0;
    let doneItemsCount = 0;
    let ListItems: React.ReactNode | React.ReactNode[] = "Unknown state";
    if (error) {
        ListItems = <span>Error fetching data</span>;
    } else if (isLoading) {
        ListItems = <span>Loading...</span>;
    } else if (!offlineListItemsAsArray) {
        ListItems = <span>No data</span>;
    } else {
        ListItems = offlineListItemsAsArray.map((item, index) => {
            if (item.done) {
                doneItemsCount += 1;
            }
            return (
                <TodoListItem
                    onItemChange={onItemChange}
                    onItemDelete={onItemDelete}
                    id={item.id}
                    key={index}
                    label={item.title}
                    isChecked={item.done}
                />
            );
        });
    }

    return (
        <Container>
            <Layout>
                <TodoListHeader onNewItemAdd={onItemAdd}>To Do app</TodoListHeader>
                <List>{ListItems}</List>
                <Footer doneItems={doneItemsCount} todoItems={allItemsCount - doneItemsCount} />
            </Layout>
        </Container>
    );
};
