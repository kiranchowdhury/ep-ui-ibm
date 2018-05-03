import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ePricer',
    icon: 'nb-home',
    link: '/pages/welcome',
    home: true,
  },
  {
    title: 'Search quotes',
    icon: 'nb-search',
    link: '/pages/searchquotes'
  },
  {
    title: 'Create quote',
    icon: 'nb-plus-circled',
    link: '/pages/managequotes'
  },
  {
    title: 'Opened quotes',
    icon: 'ion-folder',
    link: '/pages/openedquotes',
    children: [
      {
        title: '6123178',
        link: '/pages/managequotes/6123178'
      },
      {
        title: '6123179',
        link: '/pages/managequotes/6123179'
      },
      {
        title: '6123188',
        link: '/pages/managequotes/6123188'
      }
    ]
  },
  {
    title: 'Manage quotes',
    icon: 'nb-keypad',
    link: '/pages/managequotes'
  },
  {
    title: 'Duplicate Screening',
    icon: 'ion-ios-copy',
    link: '/pages/screening'
  },
  {
    title: 'Assign backup',
    icon: 'ion-person-stalker',
    link: '/pages/managequotes'
  },
  {
    title: 'UI Assets',
    group: true,
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Popovers',
        link: '/pages/ui-features/popovers',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
];
