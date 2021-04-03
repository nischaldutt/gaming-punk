import Games from "../components/games";
import TwitchLogin from "../components/games/TwitchLogin";
import VideoPlayer from "../components/games/VideoPlayer";
import GamesDashboard from "../components/games/GamesDashboard";
import StreamsDashboard from "../components/games/StreamsDashboard";
import StreamList from "../components/streams/StreamList";
import StreamCreate from "../components/streams/StreamCreate";
import StreamEdit from "../components/streams/StreamEdit";
import StreamDelete from "../components/streams/StreamDelete";
import StreamShow from "../components/streams/StreamShow";

const routes = [
  {
    path: "/",
    component: Games,
    exact: true,
  },
  {
    path: "/login",
    component: TwitchLogin,
    exact: true,
  },
  {
    path: "/game/:user_login",
    component: VideoPlayer,
    exact: true,
  },
  {
    path: "/games",
    component: GamesDashboard,
    exact: true,
  },
  {
    path: "/games/:game_name",
    component: StreamsDashboard,
    exact: true,
  },
  {
    path: "/streams",
    component: StreamList,
    exact: true,
  },
  {
    path: "/streams/new",
    component: StreamCreate,
    exact: true,
  },
  {
    path: "/streams/edit/:id",
    component: StreamEdit,
    exact: true,
  },
  {
    path: "/streams/delete/:id",
    component: StreamDelete,
    exact: true,
  },
  {
    path: "/streams/:id",
    component: StreamShow,
    exact: true,
  },
];

export default routes;
