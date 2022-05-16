import {useProductLoader} from "../customHooks"
import Loader from '../components/Loader/Loader';
const WithProductLoader = props => useProductLoader(props) ? props.children : <Loader/> ;

export default WithProductLoader;