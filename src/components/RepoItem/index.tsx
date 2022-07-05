import React, { FC } from 'react';

import { Repo } from '../../pages/UserInfo/helper';

import './index.scss'

interface Props {
    repository: Repo
}

const RepoItem: FC<Props> = (props) => {
    const { repository } = props;
    return (
        <>
            <div className='reposetory-info-wrapper'>
                <p>{repository.name}</p>
                <div>
                    <p>{repository.forks} Forks</p>
                    <p>{repository.stargazers_count} Stars</p>
                </div>
            </div>
        </>
    )
}

export default RepoItem;
