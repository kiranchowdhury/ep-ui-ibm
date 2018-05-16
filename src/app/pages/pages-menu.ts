import { NbMenuItem } from '@nebular/theme';
import { EpMenuItem } from '../@theme/components/menu-services/menu.service';

export const MENU_ITEMS: EpMenuItem[] = [
  {
    title: 'My Workspace',
    link: '/pages/workspace',
  },
  {
    title: 'Create Quote',
    link: '/pages/managequotes'
  },
  {
    title: 'Duplicate Screening',
    link: '/pages/managequotes'
  },
  {
    title: 'Assign Backup',
    link: '/pages/backup'
  }
];
