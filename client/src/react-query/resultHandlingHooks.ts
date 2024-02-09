import { useEffect } from "react";
import { UseMutationResult } from "react-query";

export const useMutationSuccessEffect = <TData, TError, Variables, TContext>(
    mutationResult: UseMutationResult<TData, TError, Variables, TContext>,
    callback: (variables: Variables) => void
) => {
    useEffect(() => {
        if (mutationResult.isSuccess) {
            callback(mutationResult.variables || ({} as Variables));
        }
        // Callback intentionally left out from deps list
    }, [mutationResult.isSuccess]);
};
