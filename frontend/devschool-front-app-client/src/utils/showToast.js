import {toastr} from "react-redux-toastr";
import React from 'react';

export const showToast = (header, response) => {
    if (response.status !== 200 && response.status !== 201) {
        toastr.error(header, 'Something went wrong. Status code: ' + response.status)
    } else {
        const toastrOptions = {
            component: (
                <ol>
                    {
                        response.header['full-path'] ? response.header['full-path'].split('|').map((jump, index) => (
                            (<li key={index}>{jump}</li>))
                        ) : <li>No info about jumps</li>
                    }
                </ol>
            )
        };
        toastr.success(header, 'List of jumps: ', toastrOptions);
    }
};