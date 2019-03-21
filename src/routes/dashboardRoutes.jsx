import EventsPage from '../Components/Events/Event.jsx'

const dashboardRoutes = [
    {
        path: "/dashboard",
        sidebarName: "Events",
        navbarName: "Checkout all the events",
        component: EventsPage
    },
    {
        path: "/tickets",
        sidebarName: "Tickets`",
        navbarName: "Checkout all the tickets",
        component: EventsPage
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
]

export default dashboardRoutes