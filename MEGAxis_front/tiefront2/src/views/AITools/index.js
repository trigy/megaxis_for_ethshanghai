import React, { useState } from 'react';
import { Image, Button, Divider, ConfigProvider, theme, Tag } from 'antd';
import title_decorate from '../../assets/icon/aitools-title-decorate.svg';
import share_fav from '../../assets/icon/aitools-share-fav.svg';
import enter_opentarget from '../../assets/icon/aitools-enter-opentarget.svg';
import coins_fill from '../../assets/icon/aitools-coins-fill.svg';
import PriceIndicator from './components/PriceIndicator';
import { Rate } from 'antd';
import 'antd/dist/reset.css';
import { Card, List, Spin, Space } from 'antd';
import API_METHOD_HOST from '../../api/AITools';
import defaultCardIcon from '../../constants/base64pic/defaultCardIcon';
import Sidebar from '../../layout/sidebar_home';
import Navbar from "../../layout/navbar";
import "../../styles/index.css"


const ButtonStyle = { minWidth: 64, width: '100%' };
const Color = {
  white: 'white',
  primary: '#0ea5e9',
}
/// 以下保存页面状态
let dataFactory = {
  search: '',
  page: 0,
  total: 0,
  loadingState: null,
  source: []
};
function dataResetClear(){
  dataFactory.page =  0;
  dataFactory.total =  0;
  dataFactory.source = [
    {
      "tid": -1,
      "desc": '加载标记',
      "network":{
        "method": "netToolsGetAllByPage",
        "params": {
          "offset": 0,
          "page": 1,
          "pagecount": 20
        }
      }
    }
  ]
}
dataResetClear();

function App(){
  const [watching, setState] = useState(dataFactory);
  /// 加载数据后引起界面变化
  async function dataLoadThen(promiseFn, search = ''){
    /// 不同的 search 视为不同的从头请求(包含上一次数据清零)
    if(search != dataFactory.search){
      dataResetClear();
      dataFactory.search = search;
    }
    const response = await (dataFactory.loadingState = promiseFn());
    dataFactory.loadingState = null;
    console.log('response:', response);
    if(response){
      const loadFlagItem = dataFactory.source[dataFactory.source.length - 1];
      const { page } = response.invokeParams;
      /// 同步数据
      dataFactory.page = page;
      dataFactory.total = response.data.total;
      /// 移除 loading 条并添加新数据
      const newDatas = response.list;
      dataFactory.source.splice(dataFactory.source.length - 1, 1, ...newDatas);
      console.log(dataFactory);
      /// 计算数量是否需要 loadMore
      if(dataFactory.source.length < dataFactory.total){
        dataFactory.source.push(
          {
            ...loadFlagItem,
            network: {
              ...loadFlagItem.network,
              params: {
                ...loadFlagItem.network.params,
                page: dataFactory.page + 1,
                offset: dataFactory.source.length
              }
            }
          });
      }
      setState({
        ...dataFactory
      })
    }
  }

  /// 展示loading界面
  const uiLoadMore = (requestItem)=>{
    const { network } = requestItem;
    const { method, params } = network;
    if(!dataFactory.loadingState){
      /// 
      console.log('network:', method, 'params:', params);
      dataLoadThen(()=>API_METHOD_HOST[method].call(null, params));
    }
    return <Space size="middle">
      <Spin size="large" />
    </Space>;
  }
  
  const onClick = (item)=>{
    window.location.href=item.url;
  };

  return (
    <div>
      <Sidebar />
            <div className="right-side">
                <Navbar />
                <div className="lower">
            <div style={{ 
      maxWidth: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      overflowY: 'scroll',
      textAlign: 'start'
      }}>
  <List
    grid={{
      gutter: 26,
      column: 3,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    }}
    style={{ padding: '14px'}}
    dataSource={watching.source}
    renderItem={(item) => (
      item.tid === -1 ? uiLoadMore(item) :
      <List.Item>
        <Card 
          hoverable
          style={{ 
            minHeight: 462.5,
            maxWidth: 400,
            fontSize: 16,
            fontWeight: 400,
            color: Color.white,
            background: '#555555'
          }}
          className='item-cardroot' 
          onClick={()=>onClick(item)}
          cover={<img style={{ height: 160 }} src={item.avatar ?? defaultCardIcon}/>}>
          {item.price !== 0 && item.price != '' ? <PriceIndicator>{item.price}</PriceIndicator>: ''}
          <div className="item-cardroot" style={{ height: 230 }}>
            <div className='item-title-row' style={{
              display: 'flex', 
              'justifyContent': 'space-between', 
              cursor: 'pointer'
            }}>
              <h2 style={{ display: 'flex' }}>
                {item.name}
                <img src={title_decorate} style={{ marginLeft: 4, display: 'inline-block'}}/>
              </h2>
            </div>
            <div className='item-star-row'>
              <Rate disabled style={{ fontSize: 13, marginInlineEnd: 4}} defaultValue={5} />
            </div>
            <Divider style={{ margin: '10px 0' }}/>
            <div className='item-desc-row' style={{ height: 80, overflow: 'hidden' }}>
              <p>{item.desc}</p>
            </div>
            <div className='item-tag-date-row' style={{ display: 'flex' }}>
              <Tag icon={<img src={coins_fill} />} style={{ color: '#d5d5d5', padding: '4px'}}><Space/>{item.price > 0 ? '  Paid' : '  Free'}</Tag>
              <div style={{ color: '#a5a5a5',fontSize: 10, textAlign: 'end' ,alignSelf: 'center', width: '100%' }}>{item.updateTime ?? item.createTime}</div>
            </div>  
          </div>
          <div className='item-btn-row' style={{ display: 'flex' }}>
            <a href={item.url} style={{ width: '100%'}}>
              <Button type="primary" style={ButtonStyle} icon={ <img src={enter_opentarget} style={{ color: Color.white }}/> }></Button>
            </a>
            <a style={{ width: '100%', marginLeft: 15 }}>
              <Button style={ButtonStyle} icon={ <img src={share_fav} style={{ color: Color.primary }}/> }></Button>  
            </a>
          </div>
        </Card>
      </List.Item>
    )}
  />
  </div>
                </div>
            </div>
    </div>
  )
  
};


export default App;
