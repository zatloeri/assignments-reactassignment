import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Footer } from "./components/Footer";
import { useQuery } from "react-query";
import { ListItemFromApi, getTodoListItems } from "./api/items";
import { TodoListHeader } from "./todo-list/TodoListHeader";
import { TodoListItem } from "./todo-list/TodoListItem";

export const TodoList: React.FC = () => {
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
            <TodoListItem onItemChange={refetch} id={item.id} key={index} label={item.title} />
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
