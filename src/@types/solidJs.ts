import { createSortable } from '@thisbeyond/solid-dnd';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      other: [() => any, (v: any) => any];
      sortable: boolean;
    }
  }
}

export {};
