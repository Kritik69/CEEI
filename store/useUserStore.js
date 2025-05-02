import { create } from "zustand";
import _ from "lodash";

export const useUserStore = create((set, get) => ({
  users: [],
  search: "",
  sort: "name-asc",

  setUsers: (users) => set({ users }),
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),

  getFilteredSortedUsers: () => {
    const { users, search, sort } = get();
    let filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const [key, order] = sort.split("-");
    return _.orderBy(filtered, [key], [order]);
  },
}));
