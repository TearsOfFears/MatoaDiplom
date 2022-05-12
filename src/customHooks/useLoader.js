import {
    useState
} from 'react'
import {
    useSelector
} from "react-redux";

const mapState = ({
    user,
    contentHome,
    productsData
}) => ({
    currentUser: user.currentUser,
    userLoading: user.loading,
    contentHomeLoading: contentHome.showLoading,
    contentProductLoading: productsData.showLoading
})

const useLoader = props => {
    const {
        userLoading,
        contentHomeLoading
    } = useSelector(mapState);
    const [hide, setIsHide] = useState(false);

    if (!contentHomeLoading && !userLoading)
        setTimeout(() => setIsHide(true), 1000);
    return hide;
}

export default useLoader;