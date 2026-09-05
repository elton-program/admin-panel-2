import {
  AddCategory,
  DeleteCategory,
  EditCategory,
  GetCategory,
  ToggleCat,
} from "@/sorovlar/GetCategory";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const useCategory = () => {
  const client = useQueryClient();
  const category = useQuery({
    queryKey: ["category"],
    queryFn: GetCategory,
  });
  const mut = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const add = useMutation({
    mutationFn: AddCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const edit = useMutation({
    mutationFn: EditCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const toggleMut = useMutation({
  mutationFn: ToggleCat,
  onSuccess: () => {
    client.invalidateQueries({ queryKey: ["category"] });
  },
});
  return {
    category: category.data,
    isLoading: category.isLoading,
    toggleStatus: toggleMut.mutate,
    deleteCategory: mut.mutate,
    addCategory: add.mutate,
    editCategory: edit.mutate,
  };
};
