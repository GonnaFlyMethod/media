import { GoTrashcan } from 'react-icons/go'
import Button from './Button';
import { removeUser } from '../store';
import useThunk from '../hooks/user-thunk'
import ExpandablePanel from './ExpandablePanel';
import { Fragment } from 'react';
import AlbumsList from './AlbumsList';


function UsersListItem( { user } ){
    const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser)
    
    const handleUserRemove = () => {
        doRemoveUser(user.id)
    }

    const header = <Fragment>
        <Button className="mr-5" loading={isDeletingUser} onClick={handleUserRemove}><GoTrashcan></GoTrashcan></Button>
                
        {error && <div>Error occurred while deleting user</div>}
        {user.name}
    </Fragment>

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}></AlbumsList>
            </ExpandablePanel>
                    
    );
}

export default UsersListItem;