import React, { FC, useEffect, useMemo, useState, memo } from 'react';
import moment from 'moment';

import useRequest from '../../hooks/use-request';
import { Repo, UserDetails} from './helper';
import { RepoItem } from '../../components';

import './index.scss';

const UserInfo: FC = () => {
    const [repoQuery, setRepoQuery] = useState('' as string);
    const [repos, setRepos] = useState([] as Repo[]);
    const [requestParams, setRequestParams] = useState({} as any);
    const [user, setUser] = useState({} as UserDetails);

    const { doRequest } = useRequest(requestParams);

    useEffect(() => {
        doRequest()
    }, [requestParams]);

    useMemo(() => {
        setRequestParams({
            url: `https://api.github.com/users${window.location.pathname}`,
            method: 'get',
            onSuccess: (res: any) => {
                setUser(res);
                setRequestParams({
                    url: `https://api.github.com/users${window.location.pathname}/repos`,
                    method: 'get',
                    onSuccess: (res: any) => {
                        setRepos(res);
                    }
                });
            }
        });
        },
        [window.location.pathname]);

    return (
        <>
            <h1 className='title'>GitHub Searcher</h1>
            <div className='detail-info'>
                <div className='detail-info-wrapper'>
                    <img src={user.avatar_url} alt={user.login} className='detail-info-image'/>
                    <div className='detail-info-user-info'>
                        <p className='detail-info-p'>User Name: <span className='detail-info-accent'>{user.name ? user.name : '-'}</span></p>
                        <p className='detail-info-p'>Email: <span className='detail-info-accent'>{user.email ? user.email : '-'}</span></p>
                        <p className='detail-info-p'>Location: <span className='detail-info-accent'>{user.location ? user.location : '-'}</span></p>
                        <p className='detail-info-p'>Join Date: <span className='detail-info-accent'>{user.created_at ? moment(user.created_at).format('MMMM Do YYYY') : '-'}</span></p>
                        <p className='detail-info-p'><span className='detail-info-accent'>{user.followers}</span> Followers</p>
                        <p className='detail-info-p'>Following <span className='detail-info-accent'>{user.following}</span></p>
                    </div>
                </div>
                {user.bio && <div className='detail-info-description'>{user.bio}</div>}
                <div className='search-wrapper'>
                    <input
                        type='search'
                        onChange={(e) => setRepoQuery(e.target.value)}
                        placeholder='Search for User`s Repositories'
                        className='search'
                    />
                </div>
                <div>
                    {repos.map(rep => <RepoItem repository={rep}/>)}
                </div>
            </div>
        </>
    )
}

export default memo(UserInfo);
