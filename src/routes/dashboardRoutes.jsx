import EventsPage from '../views/Events/Event.jsx'

const dashboardRoutes = [
    {
        path: "/events",
        sidebarName: "Events",
        navbarName: "Checkout all the events",
        component: EventsPage
    },
    { redirect: true, path: "/", to: "/events", navbarName: "Redirect" }
]

export default dashboardRoutes