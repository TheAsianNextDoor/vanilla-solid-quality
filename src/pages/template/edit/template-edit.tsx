import { Menu } from '@suid/icons-material';
import {
  useDragDropContext,
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
  DragEventHandler,
} from '@thisbeyond/solid-dnd';
import { Component, createSignal, For } from 'solid-js';

import { Checkbox, TextField } from '../../../common/components';
import { AttributeType, Item, ItemType } from '../../../features/template-list/template-store';

const convertItemToComponent = (item: Item) => {
  const { itemType } = item;
  switch (itemType) {
    case ItemType.TEXT_INPUT:
      return TextField;

    case ItemType.CHECKBOX:
      return Checkbox;

    default:
      // eslint-disable-next-line no-console
      console.error('unknown item type: ', itemType);
      return null;
  }
};

const list: Item[] = [
  {
    id: '1',
    name: 'Text Input',
    itemType: ItemType.TEXT_INPUT,
    value: '',
    attributes: [
      { id: 'label', attributeType: AttributeType.TEXT, label: 'Label', value: 'Inspection Notes' },
      { id: 'required', attributeType: AttributeType.CHECKBOX, label: 'Is Required', value: false },
      {
        id: 'helperText',
        attributeType: AttributeType.TEXT,
        label: 'Helper Text',
        value: 'Fill out your inspection notes',
      },
      {
        id: 'placeholder',
        attributeType: AttributeType.TEXT,
        label: 'Placeholder',
        value: 'Ex. unit does not meet compliance',
      },
    ],
  },
  {
    id: '2',
    name: 'Checkbox',
    itemType: ItemType.CHECKBOX,
    value: '',
    attributes: [
      { id: 'label', attributeType: AttributeType.TEXT, label: 'Label', value: 'Inspection Passed?' },
      { id: 'required', attributeType: AttributeType.CHECKBOX, label: 'Is Required', value: null },
      { id: 'helperText', attributeType: AttributeType.TEXT, label: 'Helper Text', value: '' },
      { id: 'placeholder', attributeType: AttributeType.TEXT, label: 'Placeholder', value: '' },
    ],
  },
  {
    id: '3',
    name: 'Text Input',
    itemType: ItemType.TEXT_INPUT,
    value: '',
    attributes: [
      { id: 'label', attributeType: AttributeType.TEXT, label: 'Label', value: 'Todos' },
      { id: 'required', attributeType: AttributeType.CHECKBOX, label: 'Is Required', value: null },
      { id: 'helperText', attributeType: AttributeType.TEXT, label: 'Helper Text', value: '' },
      { id: 'placeholder', attributeType: AttributeType.TEXT, label: 'Placeholder', value: '' },
    ],
  },
];

const retrieveItemProps = (item: Item) => {
  return item.attributes.reduce((acc: Record<string, unknown>, attr) => {
    acc[attr.id] = attr.value;

    return acc;
  }, {});
};

const Sortable: Component<{ item: Item }> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const sortable = createSortable(props.item.id);
  // @ts-ignore
  const [state] = useDragDropContext();

  const Comp = convertItemToComponent(props.item);
  const itemProps = retrieveItemProps(props.item);

  return (
    <div
      use:sortable
      class="border-solid flex-row justify-start items-center flex border-black border-2 m-3 bg-gray-100"
    >
      <Menu ref={sortable.ref} class="ml-5 cursor-grab active:cursor-grabbing" />
      <span
        class="p-3 w-full"
        classList={{
          'opacity-25': sortable.isActiveDraggable,
          'transition-transform': !!state.active.draggable,
        }}
      >
        <Comp {...itemProps} />
      </span>
    </div>
  );
};

export const TemplateEdit = () => {
  const [items, setItems] = createSignal(list);
  const [activeItem, setActiveItem] = createSignal('');
  const ids = () => items().map((item) => item.id);

  const onDragStart: DragEventHandler = ({ draggable }) => setActiveItem(draggable.id as string);

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const fromIndex = items().findIndex((item) => item.id === draggable.id);
      const toIndex = items().findIndex((item) => item.id === droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = items().slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
  };

  return (
    <>
      <div>
        <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd} collisionDetector={closestCenter}>
          <DragDropSensors />
          <div class="column self-stretch">
            <SortableProvider ids={ids()}>
              <For each={items()}>{(item) => <Sortable item={item} />}</For>
            </SortableProvider>
          </div>
          <DragOverlay>
            <div class="sortable">{activeItem()}</div>
          </DragOverlay>
        </DragDropProvider>
      </div>
    </>
  );
};
