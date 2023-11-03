import { requests } from './agent';

const airacFiles = {
    list: (env, params) => requests.get(`/airac-files/${env}`, { params }),
    active: (env) => requests.get(`/airac-files/${env}/active`),
    range: (env, from, to) => requests.get(`/airac-files/${env}/range?from=${from}&to=${to}`),
    details: (env, id) => requests.get(`/airac-files/${env}/${id}`),
    download: (env, body) => requests.post(`/airac-files/${env}/download`, body, { responseType: 'arraybuffer' })
};

export { airacFiles };