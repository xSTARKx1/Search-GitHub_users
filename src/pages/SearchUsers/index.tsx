import React, { FC, useEffect, useState, useMemo } from 'react';

import { UsersList, Message } from '../../components/index';
import { User } from './helper';
import useRequest from '../../hooks/use-request';

import './index.scss';

const SearchUsers: FC = () => {
    const [userQuery, setUserQuery] = useState('' as string);
    const [users, setUsers] = useState([] as User[]);
    const [message, setMessage] = useState('Please, Enter Your query :)' as string | null);
    const [requestParams, setRequestParams] = useState({} as any);

    const { doRequest, errors } = useRequest(requestParams);

    useEffect(() => {
        doRequest()
    }, [requestParams]);

    useEffect(() => {
       if (errors) setMessage(errors);
    }, [errors]);

    useMemo(() => {
        if (userQuery) {
            setRequestParams({
                url: `https://api.github.com/search/users?q=${userQuery}`,
                method: 'get',
                onSuccess: (res: any) => {
                    setMessage('');
                    setUsers(res.items);
                }
            })
        }
    },[userQuery])

    return (
        <>
            <h1 className='title'>GitHub Searcher</h1>
            <div className='search-wrapper'>
                <input
                    type='search'
                    onChange={(e) => {
                        if(e.target.value === '') {
                            setUsers([]);
                            setMessage('Please, Enter Your query :)')
                            return;
                        }
                        setUserQuery(e.target.value)
                    }}
                    placeholder='Search for Users'
                    className='search'
                />
            </div>
            { message ? <Message message={message}/> : <UsersList users={users}/> }
        </>
    )
}

export default SearchUsers;
