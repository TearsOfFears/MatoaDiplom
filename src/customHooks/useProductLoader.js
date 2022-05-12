import {
    useState
} from 'react'
import {
    useSelector
} from "react-redux";

const mapState = ({
    productsData
}) => ({
    contentProductLoading: productsData.showLoading
})

const useProductLoader = props => {
    const {contentProductLoading} = useSelector(mapState);
    const [hide, setIsHide] = useState(false);

    if (!contentProductLoading)
        setTimeout(() => setIsHide(true), 1000);
    return hide;
}

export default useProductLoader;