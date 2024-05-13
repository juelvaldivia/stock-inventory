import { ItemSelector } from '../entities/Item';

export interface InitialListState {
  kind: 'InitialListState';
  items: ItemSelector[];
}

export interface UpdateListState {
  kind: 'UpdateListState';
  items: ItemSelector[];
}

export type ListSelectorState = InitialListState | UpdateListState;

export const listSelectorInitialState: ListSelectorState = {
  kind: 'InitialListState',
  items: []
};
