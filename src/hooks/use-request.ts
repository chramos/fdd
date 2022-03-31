import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

//@ts-ignore
const useReceive = <Q = unknown, E = unknown, D = Q>(fn, key, options) => {
  const data = useQuery<Q, E, D>({ queryFn: fn, queryKey: key, ...options });
  return data;
};
//@ts-ignore
const useSend = <D = unknown, E = unknown, V = void>(fn, key, options) => {
  const data = useMutation<D, E, V>({
    mutationFn: fn,
    mutationKey: key,
    ...options,
  });
  return data;
};
type SharedProps<K, A, B, C> = K extends QueryKey
  ? {
      requestFn: UseQueryOptions<A, B, C>["queryFn"];
    } & Omit<UseQueryOptions<A, B, C>, "queryFn" | "queryKey">
  : {
      requestFn: UseMutationOptions<A, B, C>["mutationFn"];
    } & Omit<UseMutationOptions<A, B, C>, "mutationFn" | "mutationKey">;

type UseRequestType<K = unknown, A = unknown, B = unknown, C = void> = {
  requestKey?: K;
} & SharedProps<K, A, B, C>;
/**
 * @author Henrique Ramos <henrique@80lines.com>
 * @version 1.0.0
 */
const useRequest = <K = unknown, A = unknown, B = unknown, C = void>(
  { requestFn, requestKey }: UseRequestType<K, A, B, C>,
  options?: K extends QueryKey
    ? Omit<UseQueryOptions<A, B, C, QueryKey>, "queryFn" | "queryKey">
    : Omit<UseMutationOptions<A, B, C, unknown>, "mutationFn" | "mutationKey">
) => {
  const data = (requestKey ? useReceive : useSend)<A, B, C>(
    requestFn,
    requestKey,
    options
  );
  const result = {
    data: data.data,
    loading: data.isLoading,
    error: data.error,
    //@ts-ignore
    refetch: data.refetch,
    //@ts-ignore
    fetch: data.mutate,
  };
  type QueryResult = UseQueryResult<A, B>;
  type MutateResult = UseMutationResult<A, B, C>;

  return result as unknown as K extends QueryKey
    ? {
        data: QueryResult["data"];
        loading: QueryResult["isLoading"];
        error: QueryResult["error"];
        refetch: QueryResult["refetch"];
      }
    : {
        data: MutateResult["data"];
        loading: MutateResult["isLoading"];
        error: MutateResult["error"];
        fetch: MutateResult["mutate"];
      };
};
export default useRequest;
