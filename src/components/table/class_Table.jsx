import React from 'react'

import './table.css'

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: this.props.limit,
            headerData: this.props.headData,
            bodyData: this.props.limit && this.props.bodyData ? this.props.bodyData.slice(0, Number(this.props.limit)) : this.props.bodyData,
            currPage: 0
        };
    }

    selectPage(page) {
        const start = Number(this.state.limit) * page;
        const end = start + Number(this.state.limit);
        this.setState({
            bodyData: this.state.bodyData.slice(start, end),
            currPage: page
        });
    }

    render() {
        let pages = 1
        let range = []

        if (this.state.limit !== undefined) {
            let page = Math.floor(this.state.bodyData.length / Number(this.state.limit))
            pages = this.state.bodyData.length % Number(this.state.limit) === 0 ? page : page + 1
            range = [...Array(pages).keys()]
        }

        return (
            <div>
                <div className="table-wrapper">
                    <table>
                        {
                            this.state.headData && this.props.renderHead ? (
                                <thead>
                                <tr>
                                    {
                                        this.state.headData.map((item, index) => this.props.renderHead(item, index))
                                    }
                                </tr>
                                </thead>
                            ) : null
                        }
                        {
                            this.state.bodyData && this.props.renderBody ? (
                                <tbody>
                                {
                                    this.state.bodyData.map((item, index) => this.props.renderBody(item, index))
                                }
                                </tbody>
                            ) : null
                        }
                    </table>
                </div>
                {
                    pages > 1 ? (
                        <div className="table__pagination">
                            {
                                range.map((item, index) => (
                                    <div key={index} className={`table__pagination-item ${this.state.currPage === index ? 'active' : ''}`} onClick={() => this.selectPage(index)}>
                                        {item + 1}
                                    </div>
                                ))
                            }
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Table
