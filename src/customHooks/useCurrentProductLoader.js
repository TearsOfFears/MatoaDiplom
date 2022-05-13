import {
    useState
} from 'react'
import {
    useSelector
} from "react-redux";

const mapState = ({
    productsData
}) => ({
    showLoadingCurrentProduct: productsData.showLoadingCurrentProduct
})

const useCurrentProductLoader= props => {
    const {showLoadingCurrentProduct} = useSelector(mapState);
    const [hide, setIsHide] = useState(false);
    console.log(showLoadingCurrentProduct);
    if (!showLoadingCurrentProduct)
        setTimeout(() => setIsHide(true), 1000);
    return hide;
}

export default useCurrentProductLoader;