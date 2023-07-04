import request from '../utils/request'

function netToolsGetAllByPage(invokeParams){
    const { offset, page = 1, pagecount = 20 } = invokeParams;
    const requestParams = {
        type: 1,
        offset,
        limit: pagecount
    };
    return request({
        url: '/tools/getByType',
        method: 'post',
        data: requestParams
    }).then((response)=>{
        return {
            ...response,
            requestParams,
            invokeParams,
            list: response.data.ToolInfos
        }
    });
}

function netPromptGetByKey(invokeParams){
    const { key='', offset, page = 1, pagecount = 20 } = invokeParams;
    const requestParams = {
        key,
        offset,
        limit: pagecount
    };
    return request({
        url: '/prompt/getByKey',
        method: 'post',
        data: requestParams
    }).then((response)=>{
        return {
            ...response,
            requestParams,
            invokeParams,
            list: response.data.ToolInfos
        };
    });
}

export default {
    netToolsGetAllByPage,
    netPromptGetByKey
}