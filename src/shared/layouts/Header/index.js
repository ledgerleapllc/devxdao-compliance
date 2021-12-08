import { useSelector } from "react-redux";
import { detectTypeUser } from '@shared/core/utils';

const Header = () => {
  const user = useSelector(state => state.authReducer?.user);
  
  return (
    <header className="flex justify-end bg-transparent pb-6">
      <div className="flex flex-col text-right">
        <p>{user?.email}</p>
        <span className="text-sm text-primary capitalize">{detectTypeUser(user)}</span>
      </div>
    </header>
  )
}

export default Header;
