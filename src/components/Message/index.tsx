// External
import React, { FC } from 'react';

import './index.scss';

interface Props {
    message: string | null;
}

const Message: FC<Props> = (props) => {
    const { message } = props;

    return (
        <h2 className='message'>{message}</h2>
    )
};

export default Message;
