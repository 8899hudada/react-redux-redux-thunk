import React, { PureComponent } from 'react'
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreaters } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {

    render () {
        const { articleList, getMoreList, page } = this.props
        return (
            <div>
                {
                    articleList.map( (item) => (
                        <Link key={item.get('id')} to={'/detail/' + item.get('id')}>
                            <ListItem >
                                <img className="pic" src={item.get('imgUrl')} alt=""/>
                                <ListInfo>
                                    <h3 className="title">{item.get('title')}</h3>
                                    <p className="desc">{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    ))
                }
                <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    articleList: state.getIn(['home', 'articleList']),
    page: state.getIn(['home', 'articlePage'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getMoreList (page) {
            dispatch(actionCreaters.getMoreList(page))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)