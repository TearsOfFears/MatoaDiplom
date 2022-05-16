import {useLoader} from "../customHooks"
import Loader from '../components/Loader/Loader';
const WithLoader = props => useLoader(props) ? props.children : <Loader/> ;

export default WithLoader;