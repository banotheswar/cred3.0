import { sessionOut } from '../api_services/SharedServices'

const PrivateRouting = (props) => {
  let token=sessionStorage.getItem("token")
  return token?props?.children:sessionOut()
}

export default PrivateRouting