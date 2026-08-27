import {
  AddSalon,
  DeleteSalon,
  EditSalon,
  GetSalon,
  ToggleCat,
} from "@/sorovlar/GetSalon";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const useSalon = () => {
  const client = useQueryClient();
  const salon = useQuery({
    queryKey: ["salon"],
    queryFn: GetSalon,
  });
  const mut = useMutation({
    mutationFn: DeleteSalon,
    onSuccess: () => {
      client.invalidateQueries(["salon"]);
    },
  });
  const add = useMutation({
    mutationFn: AddSalon,
    onSuccess: () => {
      client.invalidateQueries(["salon"]);
    },
  });
  const edit = useMutation({
    mutationFn: EditSalon,
    onSuccess: () => {
      client.invalidateQueries(["salon"]);
    },
  });
  const toggleMut = useMutation({
  mutationFn: ToggleCat,
  onSuccess: () => {
    client.invalidateQueries(["salon"]);
  },
});
  return {
    salon: salon.data,
    isLoading: salon.isLoading,
    toggleStatus: toggleMut.mutate,
    deleteSalon: mut.mutate,
    addSalon: add.mutate,
    editSalon: edit.mutate,
  };
};
