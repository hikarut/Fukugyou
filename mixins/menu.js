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
      { title: 'Home', url: process.env.constant.sitePathHome, icon: faHome },
      {
        title: 'About',
        url: process.env.constant.sitePathAbout,
        icon: faQuestionCircle
      },
      {
        title: 'News',
        url: process.env.constant.sitePathNews,
        icon: faNewspaper
      },
      {
        title: 'Engineer',
        url: process.env.constant.sitePathPosts,
        icon: faLaptopCode
      },
      {
        title: 'Contact',
        url: process.env.constant.sitePathContact,
        icon: faEnvelope
      },
      {
        title: 'Privacy',
        url: process.env.constant.sitePathPrivacy,
        icon: faKey
      }
    ]
  })
}
