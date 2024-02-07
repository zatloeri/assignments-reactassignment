import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header, HeaderProps } from "./components/Header";
import { Footer } from "./components/Footer";
import { useMutation, useQuery } from "react-query";
import { ListItemFromApi, addTodoListItem, getTodoListItems } from "./api/items";
import { ListItem } from "./components/ListItem";
import { useCallback, useEffect } from "react";

export const TodoList = () => {
    const { isLoading, error, data, refetch } = useQuery<ListItemFromApi[]>({
        queryKey: ["todos"],
        queryFn: getTodoListItems,
    });

    const addItemMutation = useMutation({ mutationFn: addTodoListItem });

    const apiAddItem = useCallback<HeaderProps["handleAddItem"]>(
        (data) => {
            addItemMutation.mutate(data);
        },
        [addItemMutation]
    );

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

    useEffect(() => {
        if (addItemMutation.isSuccess) {
            refetch();
        }
    }, [addItemMutation.isSuccess]);

    return (
        <Container>
            <Layout>
                <Header handleAddItem={apiAddItem}>To Do app</Header>
                <List>{ListItems}</List>
                <Footer />
            </Layout>
        </Container>
    );
};
