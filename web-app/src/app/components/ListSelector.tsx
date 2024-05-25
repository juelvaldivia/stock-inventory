import React, { useEffect } from 'react';

import { ItemSelector } from '@/core/entities/Item.ts';

import { useListSelectorHandler } from '@/app/common/ContextsHandlers.tsx';
import { useObserverState } from '@/app/common/StateObserverBuilder.tsx';

interface ListSelectorProps<T extends ItemSelector> {
  title?: string;
  items: T[];
}

export const convertToItems = <T extends { id: string; name: string }>(
  objects: T[]
): ItemSelector[] => {
  return objects.map((obj) => ({
    id: obj.id,
    name: obj.name,
    selected: 0
  }));
};

const ListSelector: React.FC<ListSelectorProps<ItemSelector>> = ({ title, items }) => {
  const listSelectorHandler = useListSelectorHandler();
  const selectorState = useObserverState(listSelectorHandler);

  useEffect(() => {
    if (selectorState.kind === 'InitialListState') {
      listSelectorHandler.update(items);
    }
  }, [selectorState.kind, items, listSelectorHandler]);

  const onAddItem = (item: ItemSelector) => {
    const updatedItems = selectorState.items.map((oldItem) =>
      oldItem.id === item.id ? { ...oldItem, selected: oldItem.selected + 1 } : oldItem
    );

    listSelectorHandler.update(updatedItems);
  };

  const onRemoveItem = (item: ItemSelector) => {
    const updatedItems = selectorState.items.map((oldItem) => {
      if (oldItem.id === item.id) {
        const updatedSelected = Math.max(0, oldItem.selected - 1);

        return { ...oldItem, selected: updatedSelected };
      }
      return oldItem;
    });

    listSelectorHandler.update(updatedItems);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4">{title || 'List of Items'}</h2>
      <div className="row flex flex-wrap justify-start">
        {selectorState.items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-auto justify-center shadow-md rounded-md p-2 m-2 ${
              item.selected ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <span
              className="cursor-pointer text-xs md:text-sm lg:text-base"
              onClick={() => onRemoveItem(item)}
            >
              -
            </span>
            <span className="flex-grow text-center text-xs md:text-sm lg:text-base">
              {item.name}:{` ${item.selected}`}
            </span>
            <span
              className="cursor-pointer text-xs md:text-sm lg:text-base"
              onClick={() => onAddItem(item)}
            >
              +
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSelector;
