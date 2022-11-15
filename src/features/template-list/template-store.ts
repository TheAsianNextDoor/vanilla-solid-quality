import { createStore } from 'solid-js/store';

export enum ItemType {
  CHECKBOX = 'CHECKBOX',
  DROP_DOWN = 'DROP_DOWN',
  TEXT = 'TEXT',
  TEXT_AREA_INPUT = 'TEXT_AREA_INPUT',
  TEXT_INPUT = 'TEXT_INPUT',
}

export enum AttributeType {
  TEXT = 'TEXT',
  CHECKBOX = 'CHECKBOX',
  DROP_DOWN = 'DROP_DOWN',
}

export interface Attribute {
  id: string;
  attributeType: AttributeType;
  label: string;
  value: string | boolean | null | undefined;
  options?: { label: string; value: string }[];
}

export interface Item {
  id: string;
  itemType: ItemType;
  name: string;
  value: string | null;
  attributes: Attribute[];
  multiSelectValues?: { label: string; value: string }[];
}

const [items, setItems] = createStore<Item[]>([]);

export const getTemplateItems = () => items;

export const setTemplateItems = (items: Item[]) => setItems(items);
