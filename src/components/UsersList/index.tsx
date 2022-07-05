// External
import React, { FC } from 'react';

import { UserInList } from '../index';
import { User } from '../../pages/SearchUsers/helper';

interface Props {
    users: User[];
}

const UsersList: FC<Props> = (props) => {
    const { users } = props;

    return (
        <div>
            {users.map((user: User) => {
                    return <UserInList key={user.id} user={user}/>
                }
            )}
        </div>
    )
}

export default UsersList;
