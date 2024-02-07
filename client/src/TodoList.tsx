import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Footer } from "./components/Footer";
import { useQuery } from "react-query";
import { ListItemFromApi, getTodoListItems } from "./api/items";
import { ListItem } from "./components/ListItem";
import { TodoListHeader } from "./todo-list/TodoListHeader";

export const TodoList = () => {
    const { isLoading, error, data, refetch } = useQuery<ListItemFromApi[]>({
        queryKey: ["todos"],
        queryFn: getTodoListItems,
    });

    let ListItems: React.ReactNode | React.ReactNode[] = "Unknown state";
    if (error) {
        ListItems = "Error fetching data";
    } else if (isLoading) {
        ListItems = "Loading...";
    } else if (!data) {
        ListItems = "No data";
    } else {
        ListItems = data.map((item, index) => (
            <ListItem
                key={index}
                label={item.title}
                handleEdit={() => console.warn("unimplemented")}
                handleRemoval={() => console.warn("unimplemented")}
            />
        ));
    }

    return (
        <Container>
            <Layout>
                <TodoListHeader onNewItemAdd={refetch}>To Do app</TodoListHeader>
                <List>{ListItems}</List>
                <Footer />
            </Layout>
        </Container>
    );
};
