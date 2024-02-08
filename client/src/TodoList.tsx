import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Footer } from "./components/Footer";
import { useQuery } from "react-query";
import { ListItemFromApi, getTodoListItems } from "./api/items";
import { TodoListHeader } from "./todo-list/TodoListHeader";
import { TodoListItem } from "./todo-list/TodoListItem";

export const TodoList: React.FC = () => {
    const {
        isLoading,
        error,
        data: listItemsFromApi,
        refetch,
    } = useQuery<ListItemFromApi[]>({
        queryKey: ["todos"],
        queryFn: getTodoListItems,
    });

    const allItemsCount = listItemsFromApi?.length || 0;
    let doneItemsCount = 0;
    let ListItems: React.ReactNode | React.ReactNode[] = "Unknown state";
    if (error) {
        ListItems = <span>Error fetching data</span>;
    } else if (isLoading) {
        ListItems = <span>Loading...</span>;
    } else if (!listItemsFromApi) {
        ListItems = <span>No data</span>;
    } else {
        ListItems = listItemsFromApi.map((item, index) => {
            if (item.done) {
                doneItemsCount += 1;
            }
            return (
                <TodoListItem
                    onItemChange={refetch}
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
                <TodoListHeader onNewItemAdd={refetch}>To Do app</TodoListHeader>
                <List>{ListItems}</List>
                <Footer doneItems={doneItemsCount} todoItems={allItemsCount - doneItemsCount} />
            </Layout>
        </Container>
    );
};
