/**
 *
 * ListApplication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { List, Icon, Badge, Button, Modal, Input } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectListApplication from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as a from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ListApplication extends React.PureComponent {
  state = {
    item: '',
    visible: false,
    confirmLoading: false,
    editMode: false,
    selectedItem: null,
  };

  editModal = (item, index) => {
    this.setState({
      item: item.item,
      visible: true,
      editMode: true,
      selectedItem: index,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleAddItem = () => {
    if (this.state.editMode) {
      this.handleEditItem();
    } else {
      this.setState({
        confirmLoading: true,
      });

      this.props.addList({
        item: this.state.item,
      });

      setTimeout(() => {
        this.setState({
          visible: false,
          item: '',
          confirmLoading: false,
        });
      }, 500);
    }
  };

  handleEditItem = () => {
    this.setState({
      confirmLoading: true,
    });

    this.props.editList({
      selectedItem: this.state.selectedItem,
      item: this.state.item,
    });

    setTimeout(() => {
      this.setState({
        visible: false,
        item: '',
        confirmLoading: false,
        editMode: false,
      });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = e => {
    this.setState({
      item: e.target.value,
    });
  };

  showConfirm = index => {
    const that = this;
    Modal.confirm({
      title: 'Do you Want to delete this item?',
      onOk() {
        that.props.deleteList({
          selectedItem: index,
        });
      },
      onCancel() {
        // eslint-disable-next-line no-console
        console.log('Cancel');
      },
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { listApplication } = this.props;
    const { list } = listApplication;
    return (
      <div className="list-application">
        <Helmet>
          <title>ListApplication</title>
          <meta name="description" content="Description of ListApplication" />
        </Helmet>
        <List
          header={<div>List application</div>}
          bordered
          dataSource={list}
          renderItem={(listItem, index) => (
            <List.Item
              style={
                index === this.state.selectedItem ? { background: '#ddd' } : {}
              }
              actions={[
                <span
                  onClick={() => this.editModal(listItem, index)}
                  onKeyPress={() => this.editModal(listItem, index)}
                  role="presentation"
                >
                  <Icon type="edit" />
                </span>,
                <span
                  onClick={() => this.showConfirm(index)}
                  onKeyPress={() => this.showConfirm(listItem, index)}
                  role="presentation"
                >
                  <Icon type="delete" />
                </span>,
              ]}
            >
              <span>
                <Badge status="default" className="badge-design" />
              </span>
              {listItem.item}
            </List.Item>
          )}
        />
        <div className="btn-style">
          <Button className="btn-design" onClick={this.showModal}>
            Add New Item
          </Button>
        </div>
        <Modal
          title={this.state.editMode === true ? 'Update Item' : 'Add new item'}
          visible={visible}
          onOk={this.handleAddItem}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText={this.state.editMode === true ? 'Update' : 'Submit'}
        >
          <Input
            placeholder="Enter item"
            name="item"
            value={this.state.item}
            onChange={e => this.handleChange(e)}
          />
        </Modal>
      </div>
    );
  }
}

ListApplication.defaultProps = {
  addList: () => null,
  editList: () => null,
  // deleteList: () => null,
  // submitAction: () => null,
};

ListApplication.propTypes = {
  addList: PropTypes.func,
  editList: PropTypes.func,
  listApplication: PropTypes.object,
  // deleteList: PropTypes.func,
  // submitAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listApplication: makeSelectListApplication(),
});

function mapDispatchToProps(dispatch) {
  return {
    addList: payload => dispatch(a.addItemAction(payload)),
    editList: payload => dispatch(a.editItemAction(payload)),
    deleteList: payload => dispatch(a.deleteItemAction(payload)),
    submitAction: () => dispatch(a.submitAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'listApplication', reducer });
const withSaga = injectSaga({ key: 'listApplication', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ListApplication);
