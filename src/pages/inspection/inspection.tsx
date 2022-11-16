import { Component } from 'solid-js';

import styles from './inspection.module.css';

const items = [
  {
    id: 1,
    title: 'Metal meets requirements',
    description:
      'Nulla Lorem proident aliquip in consectetur officia labore eiusmod non officia excepteur fugiat amet aliqua.',
    parentTask: 'Wind Tower 5',
    links: [{ title: 'Metal Manual', link: 'link1' }],
    actions: ['observations', 'comments', 'attachments', 'photos'],
    status: 'Not Started',
    statusOptions: ['Completed', 'Pending', 'Not Started', 'Skipped'],
  },
  {
    id: 2,
    title: 'Wood meets requirements',
    description: 'Cupidatat proident cillum et anim eu fugiat excepteur anim duis laboris reprehenderit veniam quis.',
    parentTask: 'Wind Tower 5',
    links: [
      { title: 'Metal Manual', link: 'link2' },
      { title: 'Wood Manual', link: 'link3' },
    ],
    actions: ['observations', 'comments', 'attachments', 'photos'],
    status: 'Completed',
    statusOptions: ['Completed', 'Pending', 'Not Started', 'Skipped'],
  },
  {
    id: 3,
    title: 'Water meets requirements',
    description: 'Enim esse amet sunt irure.',
    parentTask: 'Wind Tower 5',
    links: [],
    actions: ['observations', 'comments', 'attachments', 'photos'],
    status: 'Pending',
    statusOptions: ['Completed', 'Pending', 'Not Started', 'Skipped'],
  },
];

const InfoItem: Component<{ title: string; content: string }> = (props) => {
  return (
    <div>
      <div class="underline">{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
};

export const Inspection = () => {
  return (
    <>
      {items.map((inspection) => (
        <div class="my-5 bg-gray-100">
          <div class={styles.grid}>
            <div class="bg-cyan-100 border-r-black border-r-2 w-full p-8 flex flex-col gap-3">
              <div class="text-2xl">{inspection.title}</div>
              <InfoItem title="Parent Task" content={inspection.parentTask} />
              <InfoItem title="Description" content={inspection.description} />
              <InfoItem title="Status" content={inspection.status} />
            </div>
            <div class="flex flex-col gap-3 p-8">
              <div class="text-2xl">Actions</div>
              <div>Tabs</div>
              <div>tab area</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
