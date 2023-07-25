import Admin_dashboard from '../Pages/Admin_dashboard'
import DashboardUser from '../Pages/DashboardUser'

export const uriList = {
    Admin_dashboard: '/Admin_dashboard',
    DashboardUser: '/DashboardUser',
}

const routeList = [
    {
		path: uriList.Admin_dashboard,
		pathName: uriList.Admin_dashboard,
		breadCrumb: 'Admin_dashboard',
		isProtected: true,
		auth: '',
		component: Admin_dashboard,
		layout: false,
	},
    {
		path: uriList.DashboardUser,
		pathName: uriList.DashboardUser,
		breadCrumb: 'DashboardUser',
		isProtected: true,
		auth: '',
		component: DashboardUser,
		layout: true,
	},
]

export default routeList
