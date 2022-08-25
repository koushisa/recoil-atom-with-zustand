import { selector, useRecoilValue } from "recoil";
import { AtomWithZustand } from "../lib/recoil/atomWithZustand";

type Store = {
  counter: number;
  incrementAsync: () => void;
  increment: () => void;
  update: (newValue: number) => void;
};

const store = AtomWithZustand.createStore<Store>((set) => ({
  counter: 0,
  increment() {
    set((store) => {
      return {
        counter: store.counter + 1
      };
    });
  },
  incrementAsync() {
    setTimeout(() => {
      set((store) => {
        return {
          counter: store.counter + 1
        };
      });
    }, 1000);
  },

  update(newValue: number) {
    set((store) => {
      return {
        counter: newValue
      };
    });
  }
}));

export const counterStore = AtomWithZustand.withAtom(store);
const multipliedState = selector({
  key: "multipliedState",
  get: ({ get }) => get(counterStore).counter * 2
});

export const useCounter = () => {
  const counter = useRecoilValue(counterStore).counter;
  const multiplied = useRecoilValue(multipliedState);

  return { counter, multiplied };
};
export const useCounterAction = () => {
  const { incrementAsync, increment, update } = useRecoilValue(counterStore);

  return { incrementAsync, increment, update };
};
