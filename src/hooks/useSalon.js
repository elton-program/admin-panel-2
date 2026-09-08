import {
  AddImage,
  AddSalon,
  AddVideo,
  DeleteSalon,
  EditSalon,
  GetSalon,
  ToggleCat,
  ViewSalon,
} from "@/sorovlar/GetSalon";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const useSalon = () => {
  const client = useQueryClient();
  const salon = useQuery({
    queryKey: ["salon"],
    queryFn: GetSalon,
  });

  const SalonImage = useMutation({
    mutationFn: AddImage,
    onSuccess: () => {
      client.invalidateQueries(["salon"]);
    },
  });

  const SalonVideo = useMutation({
    mutationFn: AddVideo,
    onSuccess: () => {
      client.invalidateQueries(["salon"]);
    },
  });
  const view = useMutation({
    mutationFn: ViewSalon,
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
    viewSalon: view.mutate,

    addSalonAsync: add.mutateAsync,
    editSalonAsync: edit.mutateAsync,

    SalonImage: SalonImage.mutateAsync,
    SalonVideo: SalonVideo.mutateAsync,
  };
};
