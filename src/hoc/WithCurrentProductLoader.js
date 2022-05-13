import {useCurrentProductLoader} from "../customHooks"
import Loader from '../components/Loader/Loader';
const WithCurrentProductLoader = props => useCurrentProductLoader(props) ? props.children : <Loader/> ;

export default WithCurrentProductLoader;