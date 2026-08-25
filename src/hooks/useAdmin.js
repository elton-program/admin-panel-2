import {
  AddAdmin,
  ChangeAdmin,
  DeleteAdmin,
  EditAdmin,
  GetAdmin,
} from "@/sorovlar/GetAdmin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const useAdmin = () => {
  const client = useQueryClient();
  const admin = useQuery({
    queryKey: ["admin"],
    queryFn: GetAdmin,
  });
  const mut = useMutation({
    mutationFn: DeleteAdmin,
    onSuccess: () => {
      client.invalidateQueries(["admin"]);
    },
  });
  const add = useMutation({
    mutationFn: AddAdmin,
    onSuccess: () => {
      client.invalidateQueries(["admin"]);
    },
  });
  const edit = useMutation({
    mutationFn: EditAdmin,
    onSuccess: () => {
      client.invalidateQueries(["admin"]);
    },
  });
  const change = useMutation({
    mutationFn: ChangeAdmin,
    onSuccess: () => {
      client.invalidateQueries(["admin"]);
    },
  });
  return {
    admin: admin.data,
    isLoading: admin.isLoading,
    deleteAdmin: mut.mutate,
    addAdmin: add.mutate,
    editAdmin: edit.mutate,
    changeAdmin: change.mutate,
  };
};
