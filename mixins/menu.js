import {
  faHome,
  faQuestionCircle,
  faNewspaper,
  faLaptopCode,
  faEnvelope,
  faKey
} from '@fortawesome/free-solid-svg-icons'

export default {
  data: () => ({
    menus: [
      { title: 'Home', url: '/', icon: faHome },
      { title: 'About', url: '/about/', icon: faQuestionCircle },
      { title: 'News', url: '/news/', icon: faNewspaper },
      { title: 'Engineer', url: '/posts/', icon: faLaptopCode },
      { title: 'Contact', url: '/contact/', icon: faEnvelope },
      { title: 'Privacy', url: '/privacy/', icon: faKey }
    ]
  })
}
