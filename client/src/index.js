import React from 'react';
import ReactDOM from 'react-dom';
import { message, List, Card, Icon, Upload } from 'antd';
import fetch from './fetch';
import 'antd/dist/antd.css';
import './index.css';

const { Dragger } = Upload;


class ListItem extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  getList() {
    fetch
      .getData()
      .then(data => {
        if (data.data) {
          const list = data.data.map(item => ({
            title: item.match(/\/([^\/]*)$/)[1],
            url: item
          }));

          this.setState({
            data: list
          });
        }
      });
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <Card title={item.title} style={{ overflow: 'hidden', height: '400px' }}>
              <img src={item.url} style={{ overflow: 'hidden',  width: '300px' }} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

const props = {
  name: 'file',
  multiple: true,
  action: 'http://127.0.0.1:4000/file',
  onSuccess(res) {
    const { status } = res;
    if (status === 'done') {
      message.success(`file uploaded successfully.`);
      this.parent.updateImgList();
    } else if (status === 'error') {
      message.error(`file upload failed.`);
    }
  }
};

const UploadImg = () => {
  return (<Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <Icon type="inbox" />
    </p>
    <p className="ant-upload-text">点击选择上传图片或者拖拽图片到当前区域上传</p>
  </Dragger>)
}


class App extends React.Component {
  constructor() {
    super();
  }

  updateImgList() {
    this.refs.ListItem.getList('list');
  }

  render() {
    props.parent = this;
    return (
      <div style={{ position: 'relative' }}>
        <UploadImg props={props} />
        <ListItem ref='ListItem'/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

