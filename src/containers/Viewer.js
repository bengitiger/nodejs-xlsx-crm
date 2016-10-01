import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, PageHeader, Table, Alert, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { getDataRequest } from 'actions/data';
import { DataItem } from 'components';
import FontAwesome from 'react-fontawesome';

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 1
    }
  }
  componentDidMount() {
    this.props.getDataRequest(this.state.page);
  }
  showAlert() {
    alert("개발 예정입니다.");
  }
  nextPage() {
    this.setState({
      page : this.state.page + 1
    }, () => {
      this.props.getDataRequest(this.state.page);
    })
  }
  setPageZero() {
    this.setState({
      page : 1
    }, () => {
      this.props.getDataRequest(this.state.page);
    })
  }
  render() {
    const ts = {
      textAlign : "center"
    };
    const pr = {
      textAlign : "right"
    }
    const mapToComponents = data => {
      return data.map((item, i) => {
        return (
          <DataItem
            data={item}
            key={item.idx}
          />);
      });
    };
    return(
      <Row>
        <Col md={12}>
          <PageHeader>데이터 <small>전체보기</small></PageHeader>
              <Alert bsStyle="success">
                <FontAwesome name='exclamation-circle'/> <strong>결제 날짜</strong>를 기준으로 내림차순 정렬되며 100개씩 출력됩니다.
                <span className="pull-right">
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button disabled={ this.state.page == 1 ? true : false } onClick={this.setPageZero.bind(this)} bsSize="xsmall" bsStyle="primary">첫 페이지로</Button>
                    <Button onClick={this.nextPage.bind(this)} bsSize="xsmall" bsStyle="primary">다음 100개 보기</Button>
                  </ButtonGroup>
                </ButtonToolbar>
                </span>
              </Alert>
          <Table>
            <thead>
              <tr>
              <th style={ts}>Idx</th>
              <th>구분</th>
              <th style={ts}>주문 번호</th>
              <th style={ts}>결제 날짜</th>
              <th>판매 금액</th>
              <th>판매 단가</th>
              <th style={ts}>주문자</th>
              <th style={ts}>연락처</th>
              <th style={ts}>휴대전화</th>
              <th>제품명</th>
              <th style={ts}>수량</th>
              <th>주소</th>
              </tr>
            </thead>
            <tbody>
              { mapToComponents(this.props.dataRows) }
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dataStatus : state.data.status,
    dataRows : state.data.rows,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataRequest : (page) => {
      return dispatch(getDataRequest(page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
