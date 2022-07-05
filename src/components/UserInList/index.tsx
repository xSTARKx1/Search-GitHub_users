// External
import React, { FC, useEffect, useState, memo } from 'react';
import {
    Link
} from 'react-router-dom';

import { User } from '../../pages/SearchUsers/helper';
import useRequest from '../../hooks/use-request';

import './index.scss'

interface Props {
    user: User;
}

const UserInList: FC<Props> = (props) => {
    const { user } = props;
    const [requestParams, setRequestParams] = useState({} as any);
    const [repoCount, setRepoCount] = useState(0);

    const { doRequest } = useRequest(requestParams);

    useEffect(() => {
        doRequest()
    }, [requestParams]);

    useEffect(() => {
        setRequestParams({
            url: user.url,
            method: 'get',
            onSuccess: (res: any) => {
                setRepoCount(res.public_repos);
            }
        })
        },
        [user]);

    return (
        <nav className='user-wrapper'>
            <Link to={`${user.login}`} className='user-link'>
                <div className='user-info'>
                    <img src={user.avatar_url} alt={user.login} className='user-info-image'/>
                    <div className='user-info-wrapper'>
                        <p className='user-info-name'>{user.login}</p>
                        <p className='user-info-count'>Repo: {repoCount}</p>
                    </div>
                </div>
            </Link>
        </nav>
    )
}

export default memo(UserInList);
