import StateObserver from '@/core/common/StateObserver.ts';
import {
  ListSelectorState,
  listSelectorInitialState
} from '@/core/listSelector/ListSelectorState.ts';
import { ItemSelector } from '../entities/Item';

class ListSelectorHandler extends StateObserver<ListSelectorState> {
  constructor() {
    super(listSelectorInitialState);
  }

  async update(items: ItemSelector[]) {
    const listSelectorState: ListSelectorState = {
      kind: 'UpdateListState',
      items: items
    };

    this.changeState(listSelectorState);
  }
}

export default ListSelectorHandler;
