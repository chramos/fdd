import { isEmpty } from "lodash";
import { QueryKey } from "react-query";
import queryClient from "./query-client";

/**
 * @author Henrique Ramos <henrique@80lines.com>
 * @version 1.0.0
 */
const cacheFactory = (key: QueryKey) => {
  return {
    remove: (element: any) => {
      try {
        queryClient.setQueryData(key, (cache: any) =>
          cache.filter((item: any) => item.id !== element.id)
        );
      } catch (error) {}
    },
    save: (element: any) => {
      try {
        queryClient.setQueryData(key, (cache: any) => {
          const isArray = !isEmpty(cache) && Array.isArray(cache);
          if (isArray) {
            return cache.some((item: any) => item.id === element.id)
              ? cache.map((item: any) =>
                  item.id === element.id ? element : item
                )
              : [...cache, element];
          }
          return element;
        });
      } catch (error) {}
    },
    invalidate: () => {
      try {
        queryClient.invalidateQueries(key);
      } catch (error) {}
    },
  };
};

export default cacheFactory;
