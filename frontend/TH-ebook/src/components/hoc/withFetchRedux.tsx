import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store/rootReducer.ts";
import { getBooksAction } from "../../features/book/bookSlice.ts";
import LoadingSpinner from "../_Common/LoadingSpinner.tsx";

interface WithReduxDataProps<T> {
  data: T;
}

const withReduxData = <P extends WithReduxDataProps<T>, T>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, keyof WithReduxDataProps<T>>) => {
    const dispatch = useDispatch();

    const { data, errors, isLoading } = useSelector(
      (state: StateType) => state.books
    );

    // Sử dụng useEffect với callback được định nghĩa rõ ràng
    useEffect(() => {
      const fetchBooks = async () => {
        console.log("Fetching books..."); // Debug log
        console.log("Action type:", getBooksAction.type); // Debug log
        console.log("Dispatching action:", getBooksAction()); // Debug log
        console.log("Dispatch:", dispatch); // Debug log
        try {
          dispatch(getBooksAction());
          console.log("Books fetched successfully"); // Debug log
        } catch (error) {
          console.error("Error fetching books:", error); // Debug log
        }
      };

      fetchBooks().then(() => console.log("Fetch books done")); // Debug log
    }, [data, dispatch]); // Chỉ phụ thuộc vào dispatch
    dispatch(getBooksAction());

    console.log("data in HOC:", data);

    if (isLoading) {
      return <LoadingSpinner isLoading={isLoading} />;
    }

    if (errors) {
      return <div className="text-2xl text-red-900">Error loading data</div>;
    }

    const componentProps = {
      ...props,
      data,
    } as P;

    return <WrappedComponent {...componentProps} />;
  };
};

export default withReduxData;
