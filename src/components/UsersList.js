import { useEffect } from "react";
import { fetchUsers, addUser } from "../store";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/user-thunk";
import UsersListItem from "./UsersListItems";

function UsersList(){
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    const {data } = useSelector((state) => {
        return state.users
    })

    let content;

    if (isLoadingUsers){
        content = (<div>
            <Skeleton numOfGrayBoxes={10} className="h-10 w-full"></Skeleton>
        </div>
        )
    }else if (loadingUsersError){
        content =  <div>Error occurred while fetching data</div>
    }else{
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user}></UsersListItem>
        })
    }
    
    return <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 tex-xl">Users</h1>
            <Button loading={isCreatingUser} primary rounded onClick={handleUserAdd}>Add user</Button>
            {creatingUserError && 'Error occurred while creating user'}

        </div>
        {content}
        </div>
}

export default UsersList;