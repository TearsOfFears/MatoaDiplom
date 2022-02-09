import { useAuth } from "../customHooks"
import {HistoryRouterProps} from 'react-router-dom'

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;
