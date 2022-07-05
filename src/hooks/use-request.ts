import axios from 'axios';
import { useState } from 'react';

interface Props {
    url?: string,
    method?: string,
    onSuccess?: (data:any) => void,
    onErrors?: (data:any) => void
}

export default (props: Props) => {
    const { url, method, onSuccess, onErrors } = props;
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    let response;

    const doRequest = async () => {
        try {
            setErrors(null);
            setLoading(true);

            axios.defaults.headers.common['Authorization'] = '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';
            // @ts-ignore
            response = await axios[method](url);

            if (onSuccess) {
                onSuccess(response.data);
                setLoading(false);
            }
            return response.data;
        } catch (err: any) {
            setErrors(err.response);
            if(onErrors) {
                onErrors(err.response)
            }
        }
    };
    return { doRequest, errors, loading };
};
