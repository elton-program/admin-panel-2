import {
  AddProducts,
  DeleteProducts,
  EditProducts,
  GetProducts,
} from "@/sorovlar/GetProducts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProducts = ({ page = 1, limit = 10, search = "" } = {}) => {
  const client = useQueryClient();
  const products = useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => GetProducts({ page, limit, search }),
    keepPreviousData: true,
  });
  const mut = useMutation({
    mutationFn: DeleteProducts,
    onSuccess: () => {
      client.invalidateQueries(["products"]);
    },
  });
  const add = useMutation({
    mutationFn: AddProducts,
    onSuccess: () => {
      client.invalidateQueries(["products"]);
    },
  });
  const edit = useMutation({
    mutationFn: EditProducts,
    onSuccess: () => {
      client.invalidateQueries(["products"]);
    },
  });

  return {
    products: products.data,
    isLoading: products.isLoading,
    deleteProduct: mut.mutate,
    addProduct: add.mutate,
    editProduct: edit.mutate,
  };
};
