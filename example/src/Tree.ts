import avatarPersonnel from './assets/logo192.png'

export const tree1 = [
  {
    id: 36,
    person: {
      id: 36,
      avatar: avatarPersonnel,
      department: '',
      name: 'Tomasz polaski',
      title: 'IT Specialist',
      totalReports: 4,
      color: 'red'
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
  {
    id: 32,
    person: {
      id: 32,
      avatar: avatarPersonnel,
      department: '',
      name: 'Emanuel walker',
      title: 'IT Specialist',
      totalReports: 0,
      color: 'red'
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 25,
    person: {
      id: 25,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kerry peter',
      title: 'IT Specialist',
      totalReports: 3,
      color: 'blue'
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
]

export const tree2 = [
  {
    id: 56,
    person: {
      id: 56,
      avatar: avatarPersonnel,
      department: '',
      name: 'Sam John',
      title: 'HR',
      totalReports: 2,
      link: 'https://github.com/unicef/react-org-chart',
      color: 'red'
    },
    hasChild: true,
    hasParent: true,
    // children: [],
  },
  {
    id: 66,
    person: {
      id: 66,
      avatar: avatarPersonnel,
      department: '',
      name: 'John doe',
      title: 'Developer',
      totalReports: 0,
      link: 'https://github.com/unicef/react-org-chart',
      color: 'yellow'
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 76,
    person: {
      id: 76,
      avatar: avatarPersonnel,
      department: '',
      name: 'Emilia rogers',
      title: 'Developer',
      totalReports: 0,
      link: 'https://github.com/unicef/react-org-chart',
      color: 'green'
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 60,
    person: {
      id: 60,
      avatar: avatarPersonnel,
      department: '',
      name: 'Ellen cott',
      title: 'IT Officer',
      totalReports: 0,
      color: 'red'
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export const tree3 = [
  {
    id: 70,
    person: {
      id: 70,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kenneth dom',
      title: 'IT Officer',
      totalReports: 0,
      color: 'black'
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
  {
    id: 45,
    person: {
      id: 45,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kin baker',
      title: 'IT Officer',
      totalReports: 0,
      color: 'red'
    },
    hasChild: false,
    hasParent: true,
    children: [],
  },
]

export const tree4 = [
  {
    id: 102,
    person: {
      id: 102,
      avatar: avatarPersonnel,
      department: '',
      name: 'Hendy kinger',
      title: 'Manager',
      totalReports: 0,
      color: 'green'
    },
    hasChild: true,
    hasParent: true,
    children: [],
  },
  {
    id: 455,
    person: {
      id: 455,
      avatar: avatarPersonnel,
      department: '',
      name: 'Kate baker',
      title: 'IT Officer',
      totalReports: 0,
      color: 'red'
    },
    hasChild: false,
    hasParent: true,
    children: [{
      id: 101,
      person: {
        id: 101,
        avatar: avatarPersonnel,
        department: '',
        name: 'Henry monger',
        title: 'Manager',
        totalReports: 3,
        color: 'red'
      },
      hasChild: true,
      hasParent: true,
      children: [],
    }],
  },
  {
    id: 444,
    person: {
      id: 444,
      avatar: avatarPersonnel,
      department: '',
      name: 'John medis',
      title: 'IT Officer',
      totalReports: 2,
      color: 'red'
    },
    hasChild: true,
    hasParent: false,
    children: [  {
      id: 70,
      person: {
        id: 70,
        avatar: avatarPersonnel,
        department: '',
        name: 'Kenneth dom',
        title: 'IT Officer',
        totalReports: 0,
        color: 'black'
      },
      hasChild: false,
      hasParent: true,
      children: [],
    },
    {
      id: 45,
      person: {
        id: 45,
        avatar: avatarPersonnel,
        department: '',
        name: 'Kin baker',
        title: 'IT Officer',
        totalReports: 0,
        color: 'red'
      },
      hasChild: false,
      hasParent: true,
      children: [],
    },],
  },
  {
    id: 456,
    person: {
      id: 456,
      avatar: avatarPersonnel,
      department: '',
      name: 'Brett lee',
      title: 'IT Officer',
      totalReports: 0,
      color: 'red'
    },
    hasChild: false,
    hasParent: false,
    children: [{
      id: 100,
      person: {
        id: 100,
        avatar: avatarPersonnel,
        department: '',
        name: 'Henry monger',
        title: 'Manager',
        totalReports: 3,
        color: 'red'
      },
      hasChild: true,
      hasParent: true,
      children: [],
    }],
  },
]

export const tree = {
  id: 100,
  person: {
    id: 100,
    avatar: avatarPersonnel,
    department: '',
    name: 'Henry monger',
    title: 'Manager',
    totalReports: 3,
    color: 'red'
  },
  hasChild: true,
  hasParent: true,
  children: tree4,
}