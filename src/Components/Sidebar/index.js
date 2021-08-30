import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <Link to='/authors' className='sidebar-link'>Authors</Link>
            <Link to='/books' className='sidebar-link'>Books</Link>
        </div>
    );
}

export default Sidebar;