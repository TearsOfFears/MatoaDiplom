import { useAuth } from "../customHooks"
import Loader from '../components/Loader/Loader';
const WithAuth = props => useAuth(props) ? props.children : <Loader/> ;

export default WithAuth;
