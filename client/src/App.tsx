import { TodoList } from "./TodoList";
import { ThemeProvider } from "./components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <TodoList />
            </QueryClientProvider>
        </ThemeProvider>
    );
};
